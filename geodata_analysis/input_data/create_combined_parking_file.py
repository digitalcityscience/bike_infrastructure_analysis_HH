import geopandas
import pandas as pd
import fiona


def combine_parking_gis_and_feinkartierung():
    """
    Some parking spaces are missing in the geoportal layer "öffentlicher parkraum"
    but are listed in the Feinkartierung files.
    Create a new composite file by combining these resources.
    """

    # Geoportal layer "öffentlicher parkraum"
    parking_gis = geopandas.read_file("parking_hamburg.geojson")  # !download this first
    parking_gis["source"] = "Parkraum_GIS_2023_02_28"
    parking_gis = parking_gis.set_crs("EPSG:25832", allow_override=True)
    parking_gis["geometry"] = parking_gis["geometry"].buffer(0)

    # parking layers from feinkartierung
    # !download from transparenzportal, layers did have not been updateded since 2019 , except for adding hafencity.
    parking_layers = []
    fp = "Feinkartierung_Strasse_HH_2022-03-25.gml"  
    for layer in fiona.listlayers(fp):
        gdf = geopandas.read_file(fp, driver="GML", layer=layer)

        def is_parking(nutzung):
            return "park" in str(nutzung).lower()

        gdf = gdf[gdf["nutzung"].apply(is_parking)]
        gdf = gdf.set_crs("EPSG:25832", allow_override=True)
        gdf["geometry"] = gdf["geometry"].buffer(0)

        parking_layers.append(gdf)

    feinkartierung_parking = pd.concat(parking_layers)
    feinkartierung_parking["source"] = "Feinkartierung_2022_03_25"

    geopandas.GeoDataFrame.overlay

    all_parking = feinkartierung_parking.overlay(
        parking_gis, how="union", keep_geom_type=True
    )

    # finally create new file
    all_parking.to_file("../all_parking.geojson", driver="GeoJSON")
    crop = geopandas.clip(all_parking, gdf)
    crop.to_file("../all_parking_crop.geojson", driver="GeoJSON")
