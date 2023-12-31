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

  console.log("interactive?");
  console.log(mapSettings.interactive, map._interactive);
  console.log(mapSettings.interactive == map._interactive);
  if (
    isCurrentlyUsedMapStyle(mapSettings.style) &&
    mapSettings.interactive == map._interactive
  ) {
    updateMapLocation(mapSettings);
  } else {
    replaceMap(mapSettings);
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
    bearing: mapSettings.bearing,
  });
}

function replaceMap(mapSettings) {
  map = new mapboxgl.Map({
    container: "map",
    style: mapSettings.style,
    center: mapSettings.center,
    zoom: mapSettings.zoom,
    bearing: mapSettings.bearing,
    pitch: mapSettings.pitch,
    interactive: mapSettings.interactive,
    transformRequest: transformRequest,
    projection: mapSettings.projection,
    animation: "flyTo",
  });
}

/** CALLBACK FUNCTIONS */
function settingsForLandungsbruecken() {
  let mapSettings = maps["map-areas-sums-landungsbruecken"];
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

function overviewNewInfra() {
  let mapSettings = maps["overview-new-infra"];
  updateMap(mapSettings);
}

const maps = {
  "map-neutral": {
    style: "mapbox://styles/grasbrook-city-scope/clnonhpwy00ca01qy48zxaji5",
    center: [10, 53.55],
    zoom: 13.5,
    center_mobile: [10, 53.55],
    zoom_mobile: 13.5,
    pitch: 20,
    bearing: 0,
    interactive: false,
  },
  "map-areas-sums-landungsbruecken": {
    style: "mapbox://styles/grasbrook-city-scope/clnonhpwy00ca01qy48zxaji5",
    zoom: 18.7,
    zoom_mobile: 16.75,
    center: [9.97025, 53.54585],
    center_mobile: [9.96881, 53.54536],
    pitch: 35,
    bearing: -152.8,
    interactive: false,
  },
  "map-area-sums-residential": {
    style: "mapbox://styles/grasbrook-city-scope/clnonhpwy00ca01qy48zxaji5",
    zoom: 19,
    zoom_mobile: 18.5,
    center: [9.96129, 53.55345],
    center_mobile: [9.96175, 53.55368],
    pitch: 58,
    bearing: 29.6,
    interactive: false,
  },
  "map-gaps-reeperbahn": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    allow_move: true,
    zoom: 19.28,
    center: [9.9673119, 53.5500528],
    pitch: 0,
    bearing: 0,
    zoom_mobile: 17.8,
    center_mobile: [9.96741, 53.55043],
    interactive: false,
  },
  "map-gaps-bundesstrasse": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    allow_move: true,
    zoom: 19.28,
    center: [9.9744, 53.56899],
    pitch: 0,
    bearing: 146,
    zoom_mobile: 18.3,
    center_mobile: [9.97475, 53.56881],
    interactive: false,
  },
  "overview-gaps": {
    style: "mapbox://styles/grasbrook-city-scope/clks480ty00p601qpf0ol1tm7",
    center: [10, 53.56],
    zoom: 13.5,
    center_mobile: [10, 53.55],
    zoom_mobile: 13.5,
    pitch: 20,
    bearing: 0,
    interactive: false,
  },
  "map-sources-stormaner": {
    style: "mapbox://styles/grasbrook-city-scope/clkr2tev500f001pe5mdb9m7a",
    zoom: 18.2,
    zoom_mobile: 17.85,
    center: [10.060457, 53.5766835],
    center_mobile: [10.0599, 53.5768],
    pitch: 34,
    bearing: -11.2,
    interactive: false,
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
    interactive: false,
  },
  "overview-new-infra": {
    style: "mapbox://styles/grasbrook-city-scope/clkr2tev500f001pe5mdb9m7a",
    zoom: 18.2,
    zoom_mobile: 17.85,
    center: [10.05692, 53.58058],
    center_mobile: [10.05692, 53.58058],
    pitch: 34,
    bearing: -11.2,
    interactive: true,
  },
};
