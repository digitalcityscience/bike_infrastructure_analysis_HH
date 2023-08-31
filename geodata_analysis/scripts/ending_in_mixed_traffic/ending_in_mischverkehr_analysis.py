import geopandas
import shapely
from shapely.geometry import LineString
import math
from pathlib import Path


# PATHS
script_directory = Path(__file__).parent.absolute()
main_dir = script_directory.parent.parent.absolute()
input_data_dir_rel = Path("input_data/radverkehrsnetz_geoportal/")
input_data_dir = main_dir / input_data_dir_rel


def ending_in_mischverkehr():
    """
    checks if a bike lane ends in mixed traffic ("mischverkehr")
    """

    mischverkehr = geopandas.read_file(
        input_data_dir / Path("may_2023/geojson/mischverkehr.geojson")
        )
    mischverkehr = mischverkehr.set_crs("EPSG:25832", allow_override=True)
    mischverkehr["geom_wkt"] = mischverkehr["geometry"].apply(lambda geom: geom.wkt)

    radfahrstreifen = geopandas.read_file(
        input_data_dir / Path("may_2023/geojson/radfahrstreifen.geojson")
    )
    radfahrstreifen = radfahrstreifen.set_crs("EPSG:25832", allow_override=True)
    radfahrstreifen["geom_wkt"] = radfahrstreifen["geometry"].apply(
        lambda geom: geom.wkt
    )

    # Perform overlay analysis using the intersection operation
    intersection = geopandas.overlay(
        mischverkehr, radfahrstreifen, how="intersection", keep_geom_type=False
    )

    def rad_into_misch(row) -> bool:
        misch = shapely.wkt.loads(row["geom_wkt_1"])
        rad = shapely.wkt.loads(row["geom_wkt_2"])

        def rad_is_end_misch_is_start(misch: LineString, rad: LineString) -> bool:
            return misch.coords[0] == rad.coords[-1]

        def calculate_bearing(linestring: LineString):
            start_point = linestring.coords[0]
            end_point = linestring.coords[-1]

            start_x, start_y = start_point[0], start_point[1]
            end_x, end_y = end_point[0], end_point[1]

            delta_x = end_x - start_x
            delta_y = end_y - start_y

            angle = math.atan2(delta_y, delta_x)
            bearing = math.degrees(angle)
            if bearing < 0:
                bearing += 360

            return bearing

        if rad_is_end_misch_is_start(misch, rad):
            bearing_1 = calculate_bearing(misch)
            bearing_2 = calculate_bearing(rad)

            if abs(bearing_1 - bearing_2) < 30:
                return True

        return False

    intersection["match"] = intersection.apply(lambda row: rad_into_misch(row), axis=1)
    intersection = intersection[intersection["match"] is True]

    print(intersection.head())
    print(intersection.describe())

    return intersection


def clean_results(result_gdf: geopandas.GeoDataFrame) -> geopandas.GeoDataFrame:
    """
    Bike paths at some nodes split into 2 seperate almost parallel ways.
    One would be on the street (mischverkehr) the other one could be a separate shared bike and pedestrian path.
    These nodes should not be counted as ending in mixed traffic.
    Cleaning those by buffering the node and checking for intersections with "Geh- und Radweg" infrastructure.
    Prefilter: The 2 almost parallel bikeways should have the same street name.
    """

    separate_bike_paths = geopandas.read_file(
        input_data_dir / Path("may_2023/geojson/radweg.geojson")
    )
    separate_bike_paths.set_crs("EPSG:25832", allow_override=True)

    def is_connected_to_bike_path(row):
        on_this_street = separate_bike_paths[separate_bike_paths["strassenname"] == row["strassenname_1"]]

        if on_this_street.geometry.intersects(row.geometry.buffer(2)).any():
            return True

        return False

    result_gdf["is_connected_to_bike_path"] = result_gdf.apply(
        lambda row: is_connected_to_bike_path(row),
        axis=1
    )

    cleaned_results = result_gdf[~result_gdf["is_connected_to_bike_path"]]

    return cleaned_results


if __name__ == "__main__":
    results = clean_results(ending_in_mischverkehr())

    results.to_file(
        "cleaned_nodes.geojson",
        driver="GeoJSON"
    )

    # prepare files for publishing in mapbox studio
    cols_to_keep = ["gml_id_1", "gml_id_2", "radweg_art_1", "geometry"]

    results.set_crs("EPSG:25832", allow_override=True)
    results = results.to_crs("EPSG:4326")
    results.to_file("ending_in_mischverkehr_final_points.geojson", driver="GeoJSON")

    gdf_lines = results.copy()
    gdf_lines["geometry"] = geopandas.GeoSeries.from_wkt(results["geom_wkt_1"])
    gdf_lines = gdf_lines.set_crs("EPSG:25832", allow_override=True)
    gdf_lines = gdf_lines.to_crs("EPSG:4326")
    gdf_lines = gdf_lines.drop(columns=list(set(list(results.columns))-set(cols_to_keep)))
    gdf_lines.to_file("ending_in_mischverkehr_final_lines.geojson", driver="GeoJSON")
