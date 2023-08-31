import geopandas
import pandas

def get_all_geojsons(folder_path):
    import glob

    return glob.glob(f"{folder_path}/*.geojson")


def clean_and_save_geojson_at_fp(fp: str):
    gdf = geopandas.read_file(fp)

    cols_to_keep = [
            "radweg_art",
            "oberflaeche",
            "breite",
            "radrouten",
            "zweirichtung",
            "geometry",
        ]

    cols_to_del = list(set(gdf.columns) - set(cols_to_keep))

    gdf = gdf.drop(columns=cols_to_del)
    gdf = gdf.set_crs("EPSG:25832", allow_override=True)
    gdf = gdf.to_crs("EPSG:4326")
    gdf.to_file(fp)


def combine_all_files_to_one(files):
    print("combining files to one geojson")
    layers = []

    for fp in files:
        if "__" in fp:
            continue
        print(fp)
        gdf = geopandas.read_file(fp)
        gdf = delete_schutzstreifen(gdf)
        gdf["ursprungsflaeche"] = fp.split("from_")[1].split("_")[0]
        layers.append(gdf)

    gdf = pandas.concat(layers)

    gdf.to_file("__Fahrradinfrastruktur_Ursprungsflaechen.geojson", driver="GeoJSON")


def delete_schutzstreifen(gdf: geopandas.GeoDataFrame()):
    return gdf[gdf["radweg_art"] != "Schutzstreifen"]



files = get_all_geojsons("/home/andre/mobility_research/data/radverkehrsnetz/analysis/original_space_uses_bike_infra/results/2023")
combine_all_files_to_one(files)
