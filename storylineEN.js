const config = {
  style: "mapbox://styles/grasbrook-city-scope/clkpjf52500bg01pegfru6zgi",
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
        '<p>Hamburg is in the midst of a mobility transition, ' +
        'which requires a reorientation of urban land use. ' +
        'The transformation of Hamburg\'s streetscape in favor of cycling ' +
        'has triggered intense debates - and no small amount of resentment among car drivers, ' +
        'who feel that their space is increasingly shrinking.</p>' +
        '<p>But what do the space conditions actually look like? Who currently claims which share of the traffic space? ' +
        'How many routes are actually covered on these areas? ' +
        'What proportion has actually been converted into new bicycle infrastructure? ' +
        'And who made space for it - and how much?</p><p>This cartographic evaluation ' +
        'attempts to bring some objectivity and sobriety into an emotional debate. ' +
        'Discover with us how almost 7% of the public traffic area is used solely for parking and how many parking spaces have been eliminated for bike paths since 2019. ' +
        'Let\'s dive in.</p>' +
        '</div>' +
        '<div class="right">' +
          '<video controls width="300px;" style="text-align: center;">' +
          '<source src="./media/intro.webm" type="video/webm" />' +
          '</video>' +
          '<div class="caption">' +
            'Musik: "Ährenfeld" by J’Used' +
          '</div>' +
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
          '<p>Who currently occupies how much traffic space? How many routes are covered on these areas?</p>' +
          '<div><canvas id="chart_verkehrsflaechen" style="height:280px; max-width:100%;"></canvas></div>' +
          '<p>Motorized traffic, with parking areas and roads, occupies 67.75% of the usable traffic area of Hamburg, ' +
          'resulting in enormous land consumption, with about 32% of all routes covered on it. ' +
          '43% of Hamburg households don\'t own a car. <br />' +
          'About 3.4% of the total area – one twentieth of the area used by cars – 22% of all routes are covered by bicycle. ' +
          'Thus, the bicycle is by far the most space-efficient means of transportation.</p>',
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
        id: "area-distribution-max-brauer",
        alignment: "left",
        hidden: false,
        title: "Area Distribution in Practice - Max-Brauer-Allee",
        description:
          '<p>But how do such space conditions come about? <br />' +
          'The typical distribution of road space on Max-Brauer-Allee serves as an example here. ' +
          'Despite comparatively plenty of space for greenery and sidewalks, driving and parking areas occupy most of the space. ' +
          'Cycling traffic only has a narrow strip at the southern end and is otherwise not represented at all. ' +
          'However, the road distribution is to be redesigned here in the future.</p>',
        location: {
          center: [9.9395, 53.55365],
          zoom: 17.52,
          pitch: 8.01,
          bearing: -11.2,
        },
        mapAnimation: "flyTo",
        rotateAnimation: false,
        callback: "settingsForMaxBrauer",
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "area-distribution-residential",
        alignment: "left",
        hidden: false,
        title: "Area Distribution in Practice - Typical Residential Area",
        image: "./media/fahrstrasse_mapillary_veloroute_hamburg.jpg",
        caption: 'Fährstrasse on Mapillary.com. Typical residential area with 3 parking rows, but without a bike lane',
        description:
          '<p>A central lane - with parking rows on both sides, a narrow sidewalk ' +
          'and some greenery. There are no dedicated areas for cycling infrastructure.<br></p>',
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
        id: "gaps-reeperbahn",
        alignment: "left",
        hidden: false,
        title: "Why does the bike path just stop here?",
        image: "./media/reeperbahn_mischverkehr_2.png",
        caption: 'Reeperbahn on Mapillary.com. The separate bike path turns into a narrow protective strip on the street.',
        description:
          '<p>Bike paths often abruptly end in "Mixed Traffic 50km/h". The bike path is either diverted to the road ' +
          '– or if it already runs on the road – it disappears. These situations mean stress for all road users.</p>',
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
        caption: 'Federal road on Mapillary.com. The protective strip disappears about 50m after the intersection.',
        description:
          'The situation on the federal road (50km/h), where a protective strip disappears a few meters ' +
          'after the intersection. After about 150m, hidden by a parking row, a new bike path begins, which is also not labeled. ' +
          'Surveys show that many people are afraid to cycle in Hamburg. ' +
          'Such rather easy-to-close gaps certainly contribute to this.',
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
          'The current conversion rate of 0.25% of all parking spaces in Hamburg within the past four years shows ' +
          'that change will take some time. However, the effects of these seemingly small changes are remarkable, ' +
          'resulting in 117 km of new cycling infrastructure. ' +
          "</p>" +
          "</div>" +
          '<div class="right">' +
          "<h2>" +
          "How much of the driving or parking spaces have actually been " +
          "converted into cycling infrastructure?" +
          "</h2>" +
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
        title: "Initial Approaches",
        description:
          "<p>" +
          "Stormaner Straße in Steilshoop: About 50 parking spaces were converted into a bike path. " +
          "The cyclists were led off the sidewalk onto the road and protected by parked cars. " +
          "The maximum number of parking spaces has been reduced by a third here. However, on the other side of the street, " +
          "nothing has changed yet. It is expected to be redesigned next year." +
          "</p>",
        image: "./media/stormaner_strasse_before.jpg",
        caption: "Situation before, Source: André Landwehr",
        location: {
          center: [10.074204, 53.613663],
          zoom: 17.62,
          pitch: 45,
          bearing: -68,
        },
        callback: "sourcesStormanerStrasse",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-grindelhof",
        alignment: "left",
        hidden: false,
        title: "Temporary Solutions",
        description:
          '<p>Grindelhof near the university: Here, a previously almost two-lane car lane ' +
          'was halved in width to create a "PopUp bike lane". ' +
          'The usual width for a car lane was adhered to. ' +
          'The right lane was marked as a parking strip. ' +
          'Thus, at least during the day, there was no loss of parking space. ' +
          'However, in the long run, this situation needs to be resolved differently because the road is often blocked by cars, as seen in the photo.</p>',
        image: "./media/grindelhof_after.jpg",
        caption: "Situation after, Source: André Landwehr",
        location: {
          center: [9.986395, 53.563658],
          zoom: 18.15,
          pitch: 0,
          bearing: -153,
        },
        callback: "sourcesGrindelhof",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-franz-brueckner-weg",
        alignment: "left",
        hidden: false,
        title: "Franz-Brückner-Weg in Alsterdorf",
        description:
          '<p>A classic parking lane has been removed, and the sidewalk has been widened to become a combined sidewalk and bike path. ' +
          'This was possible because there are hardly any intersections. In contrast to the picture, the "combined sidewalk and bike path" sign has since been erected. ' +
          'However, a two-way bike path would have been better here, ' +
          'as most of the cycling traffic is currently on the road.</p>',
        image: "./media/franz_brueckner_weg_after.jpg",
        caption: "Situation after, Source: André Landwehr",
        location: {
          center: [10.008706, 53.620217],
          zoom: 18.09,
          pitch: 0,
          bearing: -88,
        },
        callback: "sourcesFranzBruecknerWeg",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-holstenstrasse",
        alignment: "left",
        hidden: false,
        title: "Holstenstraße",
        description:
          '<p>Two of the three car lanes were converted into bike lanes. ' +
          'One car lane has been removed and the other two have been narrowed. ' +
          'The right lane was designated as a parking strip and is therefore only available during off-peak hours. ' +
          'The lane used to be a car lane during rush hours and a parking strip during off-peak hours. ' +
          'The pavement has remained unchanged. The reconstruction of the entire cross-section, ' +
          'which had already been planned, will only take place in a few years. ' +
          'The bike lanes have meanwhile been colored green, which was not yet the case in the photo.</p>',
        image: "./media/holstenstrasse_before.jpg",
        caption: "Situation before, Source: André Landwehr",
        location: {
          center: [9.928208, 53.553392],
          zoom: 18.45,
          pitch: 0,
          bearing: -49,
        },
        callback: "sourcesHolstenstrasse",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-poppenbuettel",
        alignment: "left",
        hidden: false,
        title: "Poppenbüttel",
        description:
          '<p>The previously four-lane Poppenbüttler Hauptstraße was completely redesigned as part of the "Hamburg pedaling" program. ' +
          'Only two lanes for motorized traffic were retained. The road space thus saved was used for wide, ' +
          'convenient sidewalks and separate bike paths. About 50 parking spaces were retained. ' +
          'The conversion was possible because two public parking garages offer sufficient replacement.</p>',
        image: "./media/poppenbuettel_before.jpg",
        caption: "Situation before, Source: André Landwehr",
        location: {
          center: [10.084226, 53.665869],
          zoom: 18.55,
          pitch: 0,
          bearing: -70,
        },
        callback: "sourcesPoppenbuettel",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-borstelmannsweg",
        alignment: "left",
        hidden: false,
        title: "Borstelmannsweg",
        description:
          '<p>Here, two car lanes were combined into one, and the other lane was converted into a wide bike path. ' +
          'The conversion of Borstelmannsweg is a classic win-win situation: ' +
          'The number of lanes was reduced by 50%, but due to the optimization of traffic light switching, ' +
          'the car\'s capacity even increased slightly. ' +
          'Cyclists received a separate, wide lane, and pedestrians benefit from shorter crossing distances and two additional pedestrian crossings.</p>',
        image: "./media/borstelmannsweg_after.jpg",
        caption: "Situation after, Source: André Landwehr",
        location: {
          center: [10.012554, 53.500182],
          zoom: 18.05,
          pitch: 0,
          bearing: -132,
        },
        callback: "sourcesBorstelmannsweg",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-rahlstedter-strasse",
        alignment: "left",
        hidden: false,
        title: "Rahlstedter Straße",
        description:
          '<p>A protected bike lane was added, and the remaining road space was divided into two narrower car lanes. ' +
          'In contrast to the usual division of the lane into a rush hour lane and a parking strip, ' +
          'this variant has the advantage that the lane remains passable even if wrong parkers block the bike path.</p>',
        image: "./media/rahlstedter_strasse_after.jpg",
        caption: "Situation after, Source: André Landwehr",
        location: {
          center: [10.105681, 53.593504],
          zoom: 18.22,
          pitch: 0,
          bearing: -41,
        },
        callback: "sourcesRahlstedterStrasse",
        mapAnimation: "flyTo",
        rotateAnimation: false,
        onChapterEnter: [],
        onChapterExit: [],
      },
      {
        id: "sources-summary",
        alignment: "full",
        hidden: false,
        description:
          '<div class="full-screen-container">' +
          '<div class="left">' +
          '<h1>Conclusion</h1>' +
          '<p>The examples show: It is almost always possible to create space for a bike path without losing car lanes or parking spaces. ' +
          'In addition, the realignment often benefits all road users. ' +
          'The necessary changes are often surprisingly small: A few lines of paint, some bollards, a few signs. ' +
          'The main thing is to reallocate the existing space more sensibly. ' +
          'And as the positive feedback from many residents shows: Wherever space for cyclists is created, the quality of life improves for everyone.</p>' +
          '</div>' +
          '<div class="right">' +
          '<img src="./media/conclusion.jpg" alt="Positive changes in the city" />' +
          '</div>' +
          '</div>',
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
    ]
  };  