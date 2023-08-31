import geopandas

gdf = geopandas.read_file("may_2023_mischverkehr_wgs.geojson")

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
gdf.to_file("radinfrastruktur_nur_mischverkehr_mai2023.geojson")