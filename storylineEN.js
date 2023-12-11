const config = {
  style: "mapbox://styles/grasbrook-city-scope/clnonhpwy00ca01qy48zxaji5",
  accessToken:
    "pk.eyJ1IjoiZ3Jhc2Jyb29rLWNpdHktc2NvcGUiLCJhIjoiY2szZnYzNWw0MDhhaDNwcnp1NDFsMTV5aiJ9.3P2XxlxJ6VbUiO_wfmrVrg",
  showMarkers: false,
  markerColor: "#3FB1CE",
  inset: false,
  theme: "light",
  use3dTerrain: false,
  auto: false,
  title: "Analysis of Traffic Space in Hamburg",
  subtitle: "A Traffic Space Check: Who gets how much space in traffic?",
  byline: "André Landwehr @DigitalCityScience, HCU Hamburg",
  footer:
    "André Landwehr @DigitalCityScience, HCU Hamburg <br>" +
    "Geodata analysis based on the data from the Geoportal Hamburg <br>" +
    'Source-Code: <a href="?" target="_blank">PROVIDE LINK</a> <br>' +
    'Street level photos from <a href="https://mapillary.com" target="_blank">Mapillary.com</a> ' +
    'under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-SA 4.0 License</a>',
  chapters: [
    {
      id: "intro",
      alignment: "full",
      hidden: false,
      description:
        '<div class="full-screen-container">' +
        '<div class="left">' +
        "<p>Hamburg is in the midst of a mobility transition, " +
        "which requires a reorientation of urban land use. " +
        "The transformation of Hamburg's streetscape in favor of cycling " +
        "has triggered intense debates - and no small amount of resentment among car drivers, " +
        "who feel that their space is increasingly shrinking.</p>" +
        "<p>But what do the space conditions actually look like? Who currently claims which share of the traffic space? " +
        "How many routes are actually covered on these areas? " +
        "What proportion has actually been converted into new bicycle infrastructure? " +
        "And who made space for it - and how much?</p><p>This cartographic evaluation " +
        "attempts to bring some objectivity and sobriety into an emotional debate. " +
        "Discover with us how almost 7% of the public traffic area is used solely for parking and how many parking spaces have been eliminated for bike paths since 2019. " +
        "Explore your own neighborhood at the story's end.</p>" +
        "<p>Let's dive in.</p>" +
        "</div>" +
        '<div class="right">' +
        '<video controls width="300px;" style="text-align: center;">' +
        '<source src="./media/intro.webm" type="video/webm" />' +
        "</video>" +
        '<div class="caption">' +
        'Musik: "Ährenfeld" by J’Used' +
        "</div>" +
        "</div>",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "area_distribution",
      alignment: "right",
      hidden: false,
      title: "Distribution of Traffic Space in Hamburg",
      description:
        "<p><i>" +
        "3.4% of the traffic area is bike lanes. This space serves 22% of all trips." +
        "</i></p>" +
        "<p>Who currently occupies how much traffic space? How many routes are covered on these areas?</p>" +
        '<div><canvas id="chart_verkehrsflaechen" style="height:280px; max-width:100%;"></canvas></div>' +
        "<p>Motorized traffic, with parking areas and roads, occupies 67.75% of the usable traffic area of Hamburg, " +
        "resulting in enormous land consumption, with about 32% of all routes covered on it. " +
        "43% of Hamburg households don't own a car. <br />" +
        "About 3.4% of the total area – one twentieth of the area used by cars – 22% of all routes are covered by bicycle. " +
        "Thus, the bicycle is by far the most space-efficient means of transportation.</p>",
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 60,
        bearing: 0,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "area-distribution-landungsbruecken",
      alignment: "left",
      hidden: false,
      title: "Area Distribution in Practice - Landungsbrücken",
      description:
        "<p>But how do such space conditions come about? <br />" +
        "The distribution of road space at Landungsbrücken serves as an example here. " +
        "Despite its status as popular tourist destination, with plenty of foot-traffic, " +
        "most of the space is dominated by car infrastructure. </p>",
      location: {
        center: [9.9395, 53.55365],
        zoom: 17.52,
        pitch: 8.01,
        bearing: -11.2,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsForLandungsbruecken",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "area-distribution-landungsbruecken",
      alignment: "left",
      hidden: false,
      title: "Area Distribution in Practice - Landungsbrücken",
      description:
        "<p>Around 100 years ago, the reality here was very different. " +
        "This video draws inspiration from the good old times and shows an alternative proposal for the distribution of space.</p>" +
        '<video controls width="300px;" style="text-align: center;">' +
        '<source src="./media/landungsbruecken.webm" type="video/webm" />' +
        "</video>" +
        '<div class="caption">' +
        'Video: <a href="https://visualutopias.com/" target="blank" >Jan Kamensky, Visual Utopias</a>' +
        "</div>",
      location: {
        center: [9.9395, 53.55365],
        zoom: 17.52,
        pitch: 8.01,
        bearing: -11.2,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "area-distribution-residential",
      alignment: "left",
      hidden: false,
      title: "Area Distribution in Practice - Typical Residential Area",
      description:
        "<p>A central lane - with parking rows on both sides, a narrow sidewalk " +
        "and some greenery. <br>No dedicated areas for cycling infrastructure.<br></p>",
      location: {
        center: [9.99026, 53.51601],
        zoom: 17.88,
        pitch: 36,
        bearing: 92.8,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsForResidentialStreetExample",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "area-distribution-residential",
      alignment: "left",
      hidden: false,
      title: "Flächenaufteilung in der Praxis - Typisches Wohngebiet",
      description:
        "<p>Look at Jan Kamensky's take on space distribution here.</p>" +
        '<video controls width="300px;" style="text-align: center;">' +
        '<source src="./media/wohlwillstrasse.webm" type="video/webm" />' +
        "</video>" +
        '<div class="caption">' +
        'Video: <a href="https://visualutopias.com/" target="blank" >Jan Kamensky, Visual Utopias</a>' +
        "</div>",
      location: {
        center: [9.99026, 53.51601],
        zoom: 17.88,
        pitch: 36,
        bearing: 92.8,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "gaps-reeperbahn",
      alignment: "left",
      hidden: false,
      title: "Why does the bike path just end here?",
      image: "./media/reeperbahn_mischverkehr_2.png",
      caption:
        "Reeperbahn on Mapillary.com. The separate bike path turns into a narrow strip on the street.",
      description:
        '<p>Bike paths often abruptly end in "Mixed Traffic 50km/h". The bike path is either diverted to the road ' +
        "– or if it already runs on the road – it disappears. These situations mean stress for all road users.</p>",
      location: {
        center: [9.9673119, 53.5500528],
        zoom: 19.28,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsGapsReeperbahn",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "gaps-bundesstrasse",
      alignment: "left",
      hidden: false,
      title: "Why does the bike path just stop here?",
      image: "./media/bundesstrasse_mischverkehr.jpg",
      caption:
        "Federal road on Mapillary.com. The protective strip disappears about 50m after the intersection.",
      description:
        "The situation on the federal road (50km/h), where a protective strip disappears a few meters " +
        "after the intersection. After about 150m, hidden by a parking row, a new bike path begins, which is also not labeled. " +
        "Surveys show that many people are afraid to cycle in Hamburg. " +
        "Such rather easy-to-close gaps certainly contribute to this.",
      location: {
        zoom: 19.28,
        center: [9.97436, 53.56899],
        pitch: 0,
        bearing: 143,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsGapsBundestrasse",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "overview-gaps",
      alignment: "center",
      hidden: false,
      description: "There are many other such places in Hamburg",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      callback: "overviewGaps",
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "intro-sources",
      alignment: "full",
      hidden: false,
      description:
        '<div class="full-screen-container">' +
        '<div class="left">' +
        "<h1>How big is the footprint of new bike paths?</h1>" +
        "<p>" +
        "Hamburg's streets seem congested, and the building plot dilemma in the " +
        "city leaves little room for new roads. Statistics show: The more people dare to " +
        "use the much more space-efficient bike, the more those who really depend on cars benefit. For " +
        "car drivers, it often initially feels as if the already scarce space for parking and driving is being further reduced. The " +
        "objective loss of space is small. " +
        "</p>" +
        "<p>" +
        "The long-term gain from less noise, less air pollution, " +
        "less asphalted areas, and more safe, quiet streets to " +
        "play or go out, on the other hand, is immense. And not just for the 43% of " +
        "Hamburg households without a car. " +
        "Each new cyclist also creates space on roads and parking areas for those who really need to drive." +
        "</p>" +
        "<p>" +
        "How much of the driving or parking spaces were actually converted into " +
        "cycling infrastructure?" +
        "</p>" +
        "<p>" +
        "The truth is: only a tiny fraction. For example, since 2019 only about 0.27% of all parking spaces have " +
        "been converted into cycling infrastructure, given the heated discussions in the media, this is all the more remarkable." +
        "</p>" +
        "<p>" +
        "The current conversion rate of 0.25% of all parking spaces in Hamburg within the past four years shows " +
        "that change will take some time. However, the effects of these seemingly small changes are remarkable, " +
        "resulting in 117 km of new cycling infrastructure. " +
        "</p>" +
        "</div>" +
        '<div class="right">' +
        "<h2>" +
        "How much of the driving or parking spaces have actually been " +
        "converted into cycling infrastructure?" +
        "</h2>" +
        "<p><i>Since 2019, 0.71% of roadway space and 0.27% of parking space has been converted to bicycle infrastructure. So, in total, less than 1% of the area for car traffic.</i></p>" +
        "<div>" +
        '<canvas id="chart_footprint" style="height:400px; max-width:100%;"></canvas>' +
        "</div> " +
        "<p>" +
        "<i" +
        ">*Excluding intersection areas that can also be crossed by cars. " +
        "</i" +
        ">" +
        "<br />" +
        "</p>" +
        "</div>" +
        "</div>",
      callback: "neutralMap",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "sources-stormaner-strasse",
      alignment: "left",
      hidden: false,
      title: "First improvements",
      description:
        "<p>" +
        "Stormaner Straße has been upgraded with a bike lane and a protected bike lane, " +
        "on which children can also feel safe. In the intersection area, unfortunately, the space " +
        " of the footpaths was reduced. For the most part, however, roadway and parking areas were used. " +
        "Despite these changes, motorized traffic still retains most of the space." +
        "</p>",
      location: {
        zoom: 18.2,
        center: [10.060457, 53.5766835],
        pitch: 34,
        bearing: -11.2,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsSourcesStormanertrasse",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "sources-alter-teichweg",
      alignment: "left",
      hidden: false,
      title: "Parking spaces are often relocated, not deleted",
      description:
        "<p>" +
        "The reconstruction at the old pond path, corner Gravensteiner Street is a good example. " +
        "Here, about half of the parking spaces were changed as part of the bike infrastructure construction: " +
        "The parking spaces were moved to the right, but not deleted. " +
        "This allowed for a continuous bike lane to be installed on the street surface. " +
        "On the map, the reconstruction is therefore shown as neutral in terms of area with regard to the parking spaces. " +
        "</p>",
      image: "./media/alter_teichweg_after_2.jpg",
      caption:
        "Old pond path on Mapillary.com. Bike lane and parking lane swap places. " +
        "Since 2019, only about 0.27% of all parking spaces have actually been removed for bike infrastructure.",
      location: {
        zoom: 19.2,
        center: [10.0673, 53.58708],
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "settingsSourcesAlterTeichweg",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "video-holzdamm",
      alignment: "full",
      hidden: false,
      description:
        '<div class="full-screen-container">' +
        '<div class="left">' +
        "<h1>Es gibt noch viel zu tun</h1>" +
        "<p>" +
        "This video was shot at Holzdamm (Atlantic Hotel Hamburg is on the right). " +
        "Its central location and its function as a connection point between the Outer Alster and the main station " +
        "makes the Holzdamm an important traffic point. " +
        "<p>" +
        "The video illustrates that there is no consistent concept for bike lanes at this location. " +
        "Due to the limited space and the lack of dedicated signage for bike lanes, safety aspects for cyclists are neglected." +
        "</p>" +
        "</div>" +
        '<div class="right">' +
        "<div>" +
        '<video controls width="300px;">' +
        '<source src="./media/video_holzdamm.webm" type="video/webm" />' +
        "</video>" +
        "</div>" +
        "</div>",
      callback: "neutralMap",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "outro",
      alignment: "center",
      hidden: false,
      title:
        "Outlook: What do the analyses tell us about the state of the transportation space?",
      description:
        "<p>" +
        "In the debate around the mobility turnaround, the division of transport space plays a crucial role. " +
        "The data in this analysis shows which mode of transport needs how much space. " +
        "For example, it shows: Parking spaces (6.8%) take up twice as much space in Hamburg as total bike lanes (3.4%) combined." +
        "</p>" +
        "<p>" +
        "Greater use of bicycles in urban traffic space not only reduces noise and air pollution, " +
        "it creates more space and new spaces with high quality of stay for all. " +
        "These findings are also embodied in the National Cycling Plan 3.0. " +
        "This contains the Federal Government's strategy for promoting cycling in Germany until 2030 and gives cycling " +
        "a more central function in overall mobility, which is why the plan not only aims for a seamless cycling network, " +
        "but takes it for granted that people will be able to get around quickly and safely by bike." +
        "</p>" +
        "<p>" +
        "This is another thing the analysis showed: there is still a lot of potential for adapting and improving the infrastructure in Hamburg." +
        "</p>",
      // callback: "neutralMap",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      callback: "neutralMap",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "explore-map",
      alignment: "left",
      hidden: false,
      description:
        "Move the map and explore your own neighborhood! What's the space distribution there like?",
      location: {
        zoom: 18.2,
        center: [10.05692, 53.58058],
        pitch: 34,
        bearing: -11.2,
      },
      mapAnimation: "flyTo",
      callback: "overviewNewInfra",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};
