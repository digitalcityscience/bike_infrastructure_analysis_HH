/**
 * Update entire map style and location if mapStyle changed
 * or update map location only
 * @param {*} mapSettings
 */
function updateMap(mapSettings) {

  if (isMobile()) {
    mapSettings.center = mapSettings.center_mobile;
    mapSettings.zoom = mapSettings.zoom_mobile;
  }

  if (isCurrentlyUsedMapStyle(mapSettings.style)) {
    updateMapLocation(mapSettings);
  } else {
    replaceMapStyle(mapSettings);
  }
}

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function isCurrentlyUsedMapStyle(styleUrl) {
  return styleUrl.includes(map.style.stylesheet.id);
}


async function updateMapLocation(mapSettings) {
  await map.flyTo({
    center: mapSettings.center,
    zoom: mapSettings.zoom,
    bearing: mapSettings.bearing
  });
}

function replaceMapStyle(mapSettings) {
  map = new mapboxgl.Map({
    container: "map",
    style: mapSettings.style,
    center: mapSettings.center,
    zoom: mapSettings.zoom,
    bearing: mapSettings.bearing,
    pitch: mapSettings.pitch,
    interactive: false,
    transformRequest: transformRequest,
    projection: mapSettings.projection,
    animation: "flyTo",
  });
}


/** CALLBACK FUNCTIONS */
function settingsForMaxBrauer() {
  let mapSettings = maps["map-areas-sums-max-brauer"];
  updateMap(mapSettings);
}

function settingsForResidentialStreetExample() {
  let mapSettings = maps["map-area-sums-residential"];
  updateMap(mapSettings);
}

function settingsGapsReeperbahn() {
  let mapSettings = maps["map-gaps-reeperbahn"];
  updateMap(mapSettings);
}

function settingsGapsBundestrasse() {
  let mapSettings = maps["map-gaps-bundesstrasse"];
  updateMap(mapSettings);
}

function neutralMap() {
  let mapSettings = maps["map-neutral"];
  updateMap(mapSettings);
}

function settingsSourcesStormanertrasse() {
  let mapSettings = maps["map-sources-stormaner"];
  updateMap(mapSettings);
}

function settingsSourcesAlterTeichweg() {
  let mapSettings = maps["map-sources-alter-teichweg"];
  updateMap(mapSettings);
}

function overviewGaps() {
  let mapSettings = maps["overview-gaps"];
  updateMap(mapSettings);
}


const maps = {
  "map-neutral": {
    style: "mapbox://styles/grasbrook-city-scope/clkpjf52500bg01pegfru6zgi",
    center: [10, 53.55],
    zoom: 13.5,
    center_mobile: [10, 53.55],
    zoom_mobile: 13.5,
    pitch: 20,
    bearing: 0,
  },
  "map-areas-sums-max-brauer": {
    style: "mapbox://styles/grasbrook-city-scope/clkpjf52500bg01pegfru6zgi",
    zoom: 17.0,
    zoom_mobile: 16.75,
    center: [9.939037, 53.553745],
    center_mobile:[9.93886, 53.55470],
    pitch: 39.5,
    bearing: -8,
  },
  "map-area-sums-residential": {
    style: "mapbox://styles/grasbrook-city-scope/clkpjf52500bg01pegfru6zgi",
    zoom: 17.88,
    zoom_mobile: 17.88,
    center: [9.99017, 53.51555],
    center_mobile:[9.99051, 53.5160],
    pitch: 40,
    bearing: 8,
  },
  "map-gaps-reeperbahn": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    allow_move: true,
    zoom: 19.28,
    center: [9.9673119, 53.5500528],
    pitch: 0,
    bearing: 0,
    zoom_mobile: 17.8,
    center_mobile:[9.96741, 53.55043],
  },
  "map-gaps-bundesstrasse": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    allow_move: true,
    zoom: 19.28,
    center: [9.9744, 53.56899],
    pitch: 0,
    bearing: 146,
    zoom_mobile: 18.3,
    center_mobile:[9.97475, 53.56881],
  },
  "overview-gaps": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    center: [10, 53.56],
    zoom: 13.5,
    center_mobile: [10, 53.55],
    zoom_mobile: 13.5,
    pitch: 20,
    bearing: 0,
  },
  "map-sources-stormaner": {
    style: "mapbox://styles/grasbrook-city-scope/clkr2tev500f001pe5mdb9m7a",
    zoom: 18.2,
    zoom_mobile: 17.85,
    center: [10.060457, 53.5766835],
    center_mobile: [10.0599, 53.5768],
    pitch: 34,
    bearing: -11.20,
  },
  "map-sources-alter-teichweg": {
    style: "mapbox://styles/grasbrook-city-scope/clkr2tev500f001pe5mdb9m7a",
    allow_move: true,
    zoom: 18.85,
    center: [10.0673, 53.58708],
    zoom_mobile: 18.85,
    center_mobile: [10.06756, 53.58722],
    pitch: 0,
    bearing: 85,
  },
};
