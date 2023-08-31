import geopandas
import pandas as pd
from shapely.geometry import Point
from pathlib import Path

# PATHS
script_directory = Path(__file__).parent.absolute()
main_dir = script_directory.parent.parent.absolute()
input_data_dir = main_dir / Path("input_data")
input_data_dir_bike_paths = input_data_dir / Path("radverkehrsnetz_geoportal")


def get_bike_data(bike_file: str):
    path_prefixes = {
        2022: "july_2022",
        2023: "may_2023",
        "new_bike_infra_2022_to_2023": "new_bike_infra_2022_to_2023",
    }
    path_prefix = path_prefixes[bike_file]
    
    """
        radweg_art
        Radfahrstreifen                      5132
        Schutzstreifen                       1581
        Aufgeweiteter Radaufstellstreifen     134
        Busfahrstreifen mit Radverkehr        113
        Protected Bike Lane                    18
        Kopenhagener Radweg                    18
        In Radfahrstreifen.geojson only. But not including Radwege (separated), Fahrradstraßen etc.
    """
    radfahrstreifen = geopandas.read_file(
        input_data_dir_bike_paths / Path(f"{path_prefix}/geojson/radfahrstreifen.geojson")
    )
    radfahrstreifen = radfahrstreifen.set_crs("EPSG:25832", allow_override=True)
    bike_infra_lines = radfahrstreifen

    return buffer_bike_lanes(bike_infra_lines)


def get_surface_data(read_only_first_n_rows=None):
    if read_only_first_n_rows:
        print("WARN: only reading subset of data for fast debugging")

    # feinkartierung
    print("reading feinkartierung")
    if read_only_first_n_rows:
        feinkartierung = geopandas.read_file(
            input_data_dir / Path("feinkartierung_all_areas.gpkg"),
            rows=read_only_first_n_rows
        )
    else:
        feinkartierung = geopandas.read_file(
            input_data_dir / Path("feinkartierung_all_areas.gpkg")
        )

    feinkartierung = feinkartierung.set_crs("EPSG:25832", allow_override=True)

    #  parking input
    print("reading parking")
    if read_only_first_n_rows:
        print("WARN: only reading subset of data for fast debugging")
        all_parking: geopandas.GeoDataFrame = geopandas.read_file(
            input_data_dir / Path("all_parking.gpkg"),
            rows=read_only_first_n_rows
        ).set_crs("EPSG:25832", allow_override=True)
    else:
        all_parking: geopandas.GeoDataFrame = geopandas.read_file(
            input_data_dir / Path("all_parking.gpkg")
        ).set_crs("EPSG:25832", allow_override=True)

    return feinkartierung, all_parking


def buffer_bike_lanes(to_buffer_gdf: geopandas.GeoDataFrame):
    # buffer bike infra
    to_buffer_gdf["buffer_value"] = to_buffer_gdf["breite"].apply(
        lambda x: round((x / 2), 2)
    )

    def check_buffer_value(buffer_distance):
        if isinstance(buffer_distance, (int, float)) and buffer_distance > 0:
            return buffer_distance
        else:
            return 1

    to_buffer_gdf["buffer_value"] = to_buffer_gdf["buffer_value"].apply(
        lambda x: check_buffer_value(x)
    )
    to_buffer_gdf["buffered_geometry"] = to_buffer_gdf.apply(
        lambda row: row["geometry"].buffer(row["buffer_value"], cap_style=2), axis=1
    )
    to_buffer_gdf.geometry = to_buffer_gdf.buffered_geometry

    buffered_gdf = to_buffer_gdf.drop(columns=["buffered_geometry"])

    return buffered_gdf


def is_long_thin_stripe(poly):
    # get minimum bounding box around polygon
    box = poly.minimum_rotated_rectangle

    # get coordinates of polygon vertices
    x, y = box.exterior.coords.xy

    # get length of bounding box edges
    edge_length = (
        Point(x[0], y[0]).distance(Point(x[1], y[1])),
        Point(x[1], y[1]).distance(Point(x[2], y[2])),
    )

    # get length of polygon as the longest edge of the bounding box
    length = max(edge_length)

    # get width of polygon as the shortest edge of the bounding box
    width = min(edge_length)

    # the all_parking dataset contains some long and thin slices of parking lots
    # resulting from the union of 2 inaccurately drawn parking places at roughly the same place
    # to avoid getting long and thin slices of a parking space into the results
    # return only results with a relation of short / long line of > 1 / 5
    return width < 0.3 and (width / length) < (1 / 10)


# Parking analysis
def get_bike_in_parking_results(bike_gdf, all_parking):
    bike_infra_in_parking = get_overlay_intersection(
        bike_gdf, all_parking.copy(), "parking", 0.3
    )

    # filter long thin stripes out.
    bike_infra_in_parking = bike_infra_in_parking[
        ~bike_infra_in_parking.geometry.apply(lambda x: is_long_thin_stripe(x))
    ]

    new_parking_data_only = all_parking[
        all_parking["source_2"].notnull() & all_parking["source_1"].isnull()
    ]

    bike_in_new_parking = bike_infra_in_parking[
        bike_infra_in_parking["source_2"].notnull()
        & bike_infra_in_parking["source_1"].isnull()
    ]
    bike_in_old_parking = bike_infra_in_parking[
        bike_infra_in_parking["source_1"].notnull()
        & bike_infra_in_parking["source_2"].isnull()
    ]
    bike_in_both_parking = bike_infra_in_parking[
        bike_infra_in_parking["source_1"].notnull()
        & bike_infra_in_parking["source_2"].notnull()
    ]

    # filter those that have new parking nearby. likely the parking just moved to the side.
    # assumption validated in qgis ;)
    bike_in_old_parking.loc[:, "new_parking_nearby"] = bike_in_old_parking["geometry"].apply(
        lambda x: new_parking_data_only.intersects(x.buffer(1.5)).any()
        )
    bike_in_old_parking = bike_in_old_parking[
        ~bike_in_old_parking["new_parking_nearby"]
    ]

    return pd.concat([bike_in_both_parking, bike_in_new_parking, bike_in_old_parking])


def drop_useless_columns(gdf: geopandas.GeoDataFrame) -> geopandas.GeoDataFrame:
    cols_to_keep = [
        "status",
        "strassenname",
        "radweg_art",
        "klasse",
        "fuehrungsart",
        "benutzungspflicht",
        "mofa_frei",
        "radweg_in_mittellage",
        "oberflaeche",
        "breite",
        "radrouten",
        "zweirichtung",
        "primaere_bewirtschaftung",
        "sekundaere_bewirtschaftung",
        "geometry",
        "area",
        "nutzung",
        "datenursprung",
    ]

    all_cols = list(gdf.columns)
    cols_to_del = list(set(all_cols) - set(cols_to_keep))

    return gdf.drop(columns=cols_to_del)


def bike_infra_on_road_without_crossings(bike_infra_buffered):

    bike_infra_schutzstreifen_excl = bike_infra_buffered[
            ~bike_infra_buffered["radweg_art"].isin(["Schutzstreifen"])
        ]

    return bike_infra_schutzstreifen_excl[
        ~bike_infra_schutzstreifen_excl["fuehrungsart"].isin(
            [
                "Querung ohne Markierung",
                "Radfurt mit Lichtsignalanlage",
                "Bushaltestelle",
            ]
        )
    ]


# computing the footprint
def get_overlay_intersection(
    bike_gdf: geopandas.GeoDataFrame,   # new bike infrastructure to analyze
    other_gdf: geopandas.GeoDataFrame,  # other road infrastructure from 2019
    topic: str,
    threshold: float = 0,
):
    """
    This functions performs an overlay between the bike infrastructure and specific other road infrastructure
    and prints the size of the area of the bike infrastructure that intersects with the other road infrastructure
    Intersection areas mean that formerly other infrastructure was converted to bikes.
    """

    print(f"doing analysis for {topic}")

    other_gdf["other_area"] = other_gdf["geometry"].area

    intersection_with_other = bike_gdf.overlay(
        other_gdf, how="intersection", keep_geom_type=True
    )
    intersection_with_other["area"] = intersection_with_other["geometry"].area
    intersection_with_other = intersection_with_other[
        intersection_with_other["area"]
        > 1  # filter out minimal intersections, often appear to be lines
    ]

    if threshold > 0:
        intersection_with_other["fraction_of_other_area"] = (
            intersection_with_other["area"] / intersection_with_other["other_area"]
        )

        intersection_with_other = intersection_with_other[
            intersection_with_other["fraction_of_other_area"] > 0.3
        ]

    print(
        f"percent of original {topic} area",
        intersection_with_other["area"].sum() / other_gdf["other_area"].sum(),
        f"bike area {intersection_with_other['area'].sum()}"
        f"other area {other_gdf['other_area'].sum()}",
    )

    return drop_useless_columns(intersection_with_other)


"""
RUN ANALYSIS
# TODO area group for radweg_art in [kopenhagener, busfahrstreifen, aufgeweiteter .., Protected , Radfahrstreifen, Schutzstreifen]
"""
if __name__ == "__main__":
    result_folder = "result_geojsons"

    feinkartierung, all_parking = get_surface_data(
        read_only_first_n_rows=None
    )

    """
    Iterate over bike path infrastructure files for 2022, 2023 and the diff 2022-2023
    Compute the footprint of the bike paths on areas mapped as road_surface, parking, ... 
    in the 2019 "Feinkartierung".
    """
    for bike_file in [2022, 2023, "new_bike_infra_2022_to_2023"]:
        bike_infra_buffered = get_bike_data(bike_file)

        # compute bike path footprints on road surface
        topic = "road_surface"
        road_surface = feinkartierung[feinkartierung["nutzung"].isin(["Fahrbahn"])]
        get_overlay_intersection(
            # bike_infra_on_road_without_crossings(bike_infra_buffered),
            bike_infra_buffered,
            road_surface.copy(),
            topic
        ).to_file(
            f"{result_folder}/bike_infra_from_{topic}_{bike_file}.geojson",
            driver="GeoJSON"
        )

        #  compute bike path footprints on parking
        topic = "parking"
        bike_infra_in_parking = get_bike_in_parking_results(
            bike_infra_buffered, all_parking
        )
        print(
            "percent of original parking area",
            bike_infra_in_parking["area"].sum() / all_parking.geometry.area.sum(),
            bike_infra_in_parking["area"].sum(),
            all_parking.geometry.area.sum(),
        )

        bike_infra_in_parking.to_file(
            f"{result_folder}/bike_infra_from_{topic}_{bike_file}.geojson", driver="GeoJSON"
        )

        #  compute bike path footprints on pedestrian ways
        pedestrian = feinkartierung[feinkartierung["nutzung"] == "Gehweg"]
        topic = "pedestrian"
        get_overlay_intersection(
            bike_infra_buffered,
            pedestrian.copy(),
            topic
        ).to_file(
            f"{result_folder}/bike_infra_from_{topic}_{bike_file}.geojson",
            driver="GeoJSON"
        )

        # compute bike path footprints on bike paths
        topic = "already_been_bikes"
        already_been_bikes = feinkartierung[
            feinkartierung["nutzung"].isin(["Geh- und Radweg", "Radweg"])
        ]
        get_overlay_intersection(
            bike_infra_buffered,
            already_been_bikes.copy(),
            topic
        ).to_file(
            f"{result_folder}/bike_infra_from_{topic}_{bike_file}.geojson",
            driver="GeoJSON"
        )

        #  compute bike path footprints on greens
        topic = "greens"
        greens = feinkartierung[feinkartierung["nutzung"] == "Grünfläche"]
        get_overlay_intersection(
            bike_infra_buffered,
            greens.copy(),
            topic
        ).to_file(
            f"{result_folder}/bike_infra_from_{topic}_{bike_file}.geojson",
            driver="GeoJSON"
        )
