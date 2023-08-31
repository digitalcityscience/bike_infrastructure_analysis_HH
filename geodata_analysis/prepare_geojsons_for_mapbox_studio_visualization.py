import geopandas
import pandas

not_actually_bike_infra = [
    "nan",
    "Fußgängerzone - zeitlich begrenzt",
    "Fußgängerzone (meist zeitlich begrenzt)",
    "Fußgängerüberweg/-furt (Schiebestrecke)",
    "Gehweg (Schiebestrecke)",
    "Gehweg (Fahrrad frei)",
    "Fußgängerzone - immer befahrbar",
    "Fußgängerzone - zeitlich begrenzt",
    "Gehweg (nur ZZ 1022-10)",
    "Fähre",
]

ranking = {
    "Protected Bike Lane": 3,
    "Kopenhagener Radweg": 3,
    "Fahrradstraße": 2,
    "Aufgeweiteter Radaufstellstreifen": 2,
    "Radweg (mit Grünstreifen vom Gehweg getrennt)": 2,
    "Radfahrstreifen": 2,
    "Wege in Grünflächen": 2,
    "Schutzstreifen": 1,
    "Busfahrstreifen mit Radverkehr": 1,
    "Getrennter Geh-/Radweg": 1,
    "Gemeinsamer Geh-/Radweg": 0,
    "Wirtschaftsweg": 0,
}


def rank_bikepath(row: pandas.core.series.Series):
    "ranks from 0-3, 0 being worst"
    if str(row["radweg_in_mittellage"]).lower() == "Ja".lower():
        return 0

    if row["breite"] >= 4:
        return 3

    if row["radweg_art"] == "Radfahrstreifen" and row["breite"] < 2:
        return 1
    if row["radweg_art"] == "Schutzstreifen" and row["breite"] < 1.2:
        return 0
    if row["radweg_art"] == "Getrennter Geh-/Radweg" and row["breite"] < 1:
        return 0

    return ranking[row["radweg_art"]]


gdf: geopandas.GeoDataFrame = geopandas.read_file(
    "radinfrastruktur_mai2023_ohne_mischverkehr.geojson"
)

gdf = gdf[~gdf["radweg_art"].isin(not_actually_bike_infra)]
gdf = gdf[gdf["radweg_art"].notnull()]
gdf["radweg_art_ranking"] = gdf.apply(lambda x: rank_bikepath(x), axis=1)

# gdf["lange_meter"] = round(gdf["laenge"])
# gdf = gdf.drop(columns=["laenge"])
# gdf["benutzungspflicht"] = gdf["benutzungspflicht"].apply(lambda x: "Nein" if str(x) == "nicht benutzungspflichtig" else x)
# gdf["radweg_in_mittellage"] = gdf["radweg_in_mittellage"].apply(lambda x: "Nein" if str(x) == "nan" else x)


gdf.to_file("radinfrastruktur_mai2023_ohne_mischverkehr.geojson", driver="GeoJSON")
