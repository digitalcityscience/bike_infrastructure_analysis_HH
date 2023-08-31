import geopandas
import pandas as pd
import csv
from pathlib import Path

# PATHS
script_directory = Path(__file__).parent.absolute()
main_dir = script_directory.parent.parent.absolute()
input_data_dir_rel = Path("input_data/radverkehrsnetz_geoportal/")
input_data_dir = main_dir / input_data_dir_rel


def buffer_bike_infra_gdf(bike_infra):
    # buffer bike infra
    bike_infra["buffer_value"] = bike_infra["breite"].apply(lambda x: round((x / 2), 2))

    def check_buffer_value(buffer_distance):
        if isinstance(buffer_distance, (int, float)) and buffer_distance > 0:
            return buffer_distance
        else:
            return 1

    bike_infra["buffer_value"] = bike_infra["buffer_value"].apply(
        lambda x: check_buffer_value(x)
    )
    bike_infra["buffered_geometry"] = bike_infra.apply(
        lambda row: row["geometry"].buffer(row["buffer_value"]), axis=1
    )
    bike_infra.geometry = bike_infra.buffered_geometry

    bike_infra = bike_infra.drop(columns=["buffered_geometry"])

    return bike_infra


"""
computes difference for all bikepath types comparing the years 2022 and 2023
exports 1 geojson containing all infrastructure that was added in 2023.
"""

layer_updates = []
export_data = []

layers = [
    "fahrradstrasse",
    "gruenflaechen",
    "mischverkehr",
    "radfahrstreifen",
    "radweg",
    "schiebestrecke",
    "sonstige",
]

for layer in layers:
    old_layer_path = input_data_dir / Path("july_2022/" + "geojson/" + layer + ".geojson")
    new_layer_path = input_data_dir / Path("may_2023/" + "geojson/" + layer + ".geojson")

    old = geopandas.read_file(old_layer_path)  # , rows=100)
    new = geopandas.read_file(new_layer_path)  # , rows=100)
    old = old.set_crs("EPSG:25832", allow_override=True)
    new = new.set_crs("EPSG:25832", allow_override=True)

    # make dict year, layer, length, area export to csv
    export_data.append(
        {
            "year": 2022,
            "layer": layer,
            "length": round(old.geometry.length.sum() / 1000, 3),
            "area": round(buffer_bike_infra_gdf(old).geometry.area.sum(), 3),
            "width_median": old["breite"].median(),
        }
    )

    # make dict year, layer, length, area export to csv
    export_data.append(
        {
            "year": 2023,
            "layer": layer,
            "length": round(new.geometry.length.sum() / 1000, 3),
            "area": round(buffer_bike_infra_gdf(new).geometry.area.sum(), 3),
            "width_median": new["breite"].median(),
        }
    )

    # To obtain the geometries that are part of df1 but are not contained
    # in df2, you can use how='difference':
    layer_updates.append(new.overlay(old, how="difference"))


# export stats to csv
with open("bike_infra_stats_2022_2023.csv", "w", newline="") as csvfile:
    fieldnames = export_data[0].keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for row in export_data:
        writer.writerow(row)


# export geojson containing all infrastructure added in 2023
new_bike_infra_gdf = geopandas.GeoDataFrame()
new_bike_infra_gdf = pd.concat([new_bike_infra_gdf, *layer_updates])
new_bike_infra_gdf.to_file("new_bike_infra_2022_to_2023", driver="GeoJSON")
