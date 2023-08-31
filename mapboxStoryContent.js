const config = {
  style: "mapbox://styles/grasbrook-city-scope/clkpjf52500bg01pegfru6zgi",
  accessToken:
    "pk.eyJ1IjoiZ3Jhc2Jyb29rLWNpdHktc2NvcGUiLCJhIjoiY2szZnYzNWw0MDhhaDNwcnp1NDFsMTV5aiJ9.3P2XxlxJ6VbUiO_wfmrVrg",
  showMarkers: false,
  markerColor: "#3FB1CE",
  inset: false,  // removed all inset related code to declutter.
  theme: "light",
  use3dTerrain: false, //set true for enabling 3D maps.
  auto: false,
  title: "Analyse des Verkehrsraums in Hamburg",
  subtitle: "Ein Verkehrsraum-Check: Wer bekommt wie viel Platz im Verkehr?",
  byline: "André Landwehr @DigitalCityScience, HCU Hamburg",
  footer:
    "André Landwehr @DigitalCityScience, HCU Hamburg <br>" +
    "Geodatenanalyse auf Basis der Daten des Geoportals Hamburg <br>" +
    'Source-Code: <a href="?" target="_blank">PROVIDE LINK</a> <br>' +
    'Fotos auf Straßenebene von <a href="https://mapillary.com" target="_blank">Mapillary.com</a> ' +
    'unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-SA 4.0 Lizenz</a>',
  chapters: [
    {
      id: "intro",
      alignment: "left",
      hidden: false,
      description:
        '<p>Hamburg befindet sich inmitten einer Mobilitätswende, ' +
        'die eine Neuausrichtung der städtischen Flächennutzung erfordert. ' +
        'Die Transformation der Straßenlandschaft Hamburgs zugunsten des Radverkehrs ' +
        'hat intensive Debatten ausgelöst - und nicht wenig Unmut unter den Autofahrern, ' +
        'die das Gefühl haben, dass ihr Raum zunehmend schrumpft.</p>' +
        '<p>Doch wie sehen die Platzverhältnisse in Wahrheit aus? Wer beansprucht derzeit welchen Anteil des Verkehrsraums? ' +
        'Wie viele Wege werden auf diesen Flächen tatsächlich zurückgelegt? ' +
        'Welcher Anteil wurde tatsächlich in neue Fahrradinfrastruktur umgewandelt? ' +
        'Und wer hat dafür Platz gemacht - und wie viel?</p><p>Diese kartographische Auswertung ' +
        'versucht etwas Objektivität und Nüchternheit in eine emotionale Debatte zu bringen. ' +
        'Entdecken Sie mit uns wie fast 7% der öffentlichen Verkehrsfläche zum Beispiel alleine für '+ 
        'Parken verbraucht wird und wie viele Parkplätze seit 2019 für Radwege weggefallen sind. <br>' +
        'Let\'s dive in.</p>',
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
      title: "Aufteilung des Verkehrsraums in Hamburg",
      description:
        '<p>Wer nimmt momentan wie viel Verkehrsraum ein? Wie viele Wege werden auf diesen Flächen zurückgelegt?</p>' +
        '<div><canvas id="chart_verkehrsflaechen" style="height:280px; max-width:100%;"></canvas></div>' +
        '<p>Der motorisierte Verkehr nimmt mit Parkflächen und Fahrbahn 67,75% der nutzbaren Verkehrsfläche Hamburgs' +
        'in Anspruch und hat einen enormen Flächenverbrauch, auf dem ca. 32% aller Wege zurückgelegt werden.' +
        '43% der Hamburger Haushalte besitzen keinen PKW. <br />' +
        'Auf rund 3,4% der Gesamtfläche – also einem Zwanzigstel der Fläche des Autoverkehrs – werden 22% aller Wege per Rad zurückgelegt.' +
        'Somit ist das Rad bei weitem das flächeneffektivste Fortbewegungsmittel.</p>',
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
      title: "Flächenaufteilung in der Praxis - Max-Brauer-Allee",
      description:
        '<p>Doch wie kommen solche Flächenverhältnisse zustande? <br />' +
        'Als Beispiel dient hier eine typische Aufteilung der Straßenfläche an der Max-Brauer-Allee. ' +
        'Trotz vergleichsweise viel Platz für Begrünung für Fußwege nehmen Fahr- und Parkflächen einen Großteil des Platzes ein.' +
        'Der Radverkehr hat nur am Südende einen schmalen Streifen und ist ansonsten gar nicht vertreten. ' +
        'Die Straßenaufteilung soll hier allerdings in Zukunft neu gestaltet werden</p>',
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
      title: "Flächenaufteilung in der Praxis - Typisches Wohngebiet",
      image: "./media/fahrstrasse_mapillary_veloroute_hamburg.jpg",
      caption: 'Fährstrasse auf Mapillary.com. Typisches Wohngebiet mit 3 Parkreihen, jedoch ohne Radfahrstreifen',
      description:
        '<p>Eine Fahrbahn in der Mitte - an den Rändern jeweils eine Reihe Parkflächen, ein schmaler Bürgersteig' +
        'und etwas Begrünung. Dezidierte Flächen für Radinfrastruktur gibt es nicht.<br></p>',
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
      title: "Warum hört der Radweg einfach hier auf?",
      image: "./media/reeperbahn_mischverkehr_2.png",
      caption: 'Reeperbahn auf Mapillary.com. Der getrennter Radweg wird zu einem schmalen Schutzstreifen auf der Strasse.',
      description:
        '<p>Oft enden Radwege abrupt im "Mischverkehr 50km/h". Dabei wird der Radweg entweder auf die Straße verschwenkt ' +
        '– oder ­­­­­­­­­­­­­­­falls bereits auf der Straße verlaufend – aufgelöst. Diese Situationen bedeuten Stress für alle Verkehrsteilnehmenden.</p>',
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
      title: "Warum hört der Radweg einfach hier auf?",
      image: "./media/bundesstrasse_mischverkehr.jpg",
      caption: 'Bundestrasse auf Mapillary.com. Der Schutzstreifen wird ca. 50m nach der Kreuzung ersatzlos aufgelöst.',
      description:
        'Die Situation an der Bundesstrasse (50km/h), wo ein Schutzstreifen wenige Meter ' +
        'nach der Kreuzung aufgelöst wird. Nach ca. 150m beginnt verdeckt von einer ' +
        'Parkreihe ein neuer Radweg, der allerdings auch nicht ausgewiesen ist. ' +
        'Befragungen zeigen, dass viele Menschen sich nicht trauen in Hamburg Rad zu fahren. ' +
        'Solche eher einfach zu schließenden Lücken, tragen sicherlich dazu bei.',
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
      description: "Es gibt zahlreiche weitere Stellen in Hamburg",
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
        "<h1>Wie groß ist der Fußabdruck neuer Radwege?</h1>" +
        "<p>" +
        "Hamburgs Straßen scheinen verstopft, und das Bauplatz-Dilemma in der " +
        "Stadt lässt wenig Raum für neue Straßen. Die Statistik zeigt: Je mehr Menschen sich trauen, " +
        "dass weitaus flächeneffzientere Rad zu nutzen, des stärker profitieren auch " +
        "diejenigen, die wirklich auf das Auto angewiesen sind. Für " +
        "Autofahrende fühlt sich das zunächst oft so an, als würde der ohnehin " +
        "schon knappe Platz zum Parken und Fahren zusätzlich verkleinert. Der " +
        "objektive Flächenverlust ist gering. " +
        "</p>" +
        "<p>" +
        "Der langfristige Gewinn durch weniger Lärm, weniger Luftverschmutzung, " +
        "weniger asphaltierte Flächen und mehr sichere, ruhige Straßen zum " +
        "Spielen oder Ausgehen hingegen ist immens. Und das nicht nur für die 43% der " +
        "Hamburger Haushalte ohne Auto. " +
        "Jeder neue Radfahrer schafft auch Platz auf Fahrbahnen und Parkflächen, für die Menschen die wirklich Auto fahren müssen." +
        "</p>" +
        "<p>" +
        "Wie viel der Fahr- oder Parkflächen wurden tatsächlich in " +
        "Radinfrastruktur umgewandelt?" +
        "</p>" +
        "<p>" +
        "Die Wahrheit ist: Nur ein winziger Bruchteil. Seit 2019 sind zum " +
        "Beispiel gerade einmal ca. 0,27% der Parkflächen zu Radinfrastruktur " +
        "umgewandelt worden, angesichts der aufgeheizten Diskussionen in den Medien umso bemerkenswerter." +
        "</p>" +
        "<p>" +
        'Allein die aktuelle Umrüstungsrate von 0,25% aller Parkflächen in Hamburg innerhalb der vergangenen vier Jahre macht deutlich, ' +
        'dass der Wandel noch einige Zeit in Anspruch nehmen wird. Beachtlich hingegen sind die Auswirkungen dieser scheinbar kleinen Veränderungen, ' +
        'die bereits 117 km neue Radinfrastruktur ausmachen. ' +
        "</p>" +
        "</div>" +
        '<div class="right">' +
        "<h2>" +
        "Wie viel der Fahr- oder Parkflächen wurden tatsächlich in " +
        "Radinfrastruktur umgewandelt?" +
        "</h2>" +
        "<div>" +
          '<canvas id="chart_footprint" style="height:400px; max-width:100%;"></canvas>' +
        "</div> " +
        "<p>" +
        "<i" +
        ">*Ohne Kreuzungsflächen, die auch von PKW überfahren werden " +
        "können.</i" +
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
      title: "Erste Lösungsansätze",
      description:
        "<p>" +
        " Die Stormaner Straße wurde mit einem Radfahrstreifen und einer geschützten Fahrradspur aufgewertet, " +
        "auf der sich auch Kinder sicher fühlen können. Im Kreuzungsbereich wurde dafür leider der Platz " +
        "der Fußwege verringert. Größtenteils wurden aber Fahrbahn- und Parkflächen verwendet. " +
        "Trotz dieser Änderungen behält der motorisierte Verkehr noch immer den Großteil des Platzes." +
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
      title: "Parkplätze werden oft verlegt, nicht gestrichen",
      description:
        "<p>" +
        "Der Umbau am alten Teichweg, Ecke Gravensteiner Straße ist ein gutes Beispiel. " +
        "Hier wurden ca. die Hälfte der Parkflächen im Zuge des Radinfrastrukturbaus verändert: " +
        "Die Parkplätze wurden nach rechts verschoben, aber nicht gestrichen. " +
        "Dadurch konnte auf der Straßenfläche eine durchgängig befahrbare Radspur eingerichtet werden. " +
        "Auf der Karte wird der Umbau deshalb bezüglich der Parkplätze flächenneutral dargestellt. " +
        "</p>",
      image: "./media/alter_teichweg_after_2.jpg",
      caption: 
      'Alter Teichweg auf Mapillary.com. Radfahr- und Parkstreifen tauschen die Plätze. ' +
      'Seit 2019 sind nur ca. 0,27% aller Parkflächen tatsächlich für Radinfrastruktur weggefallen.',
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
        "Dieses Video wurde im Holzdamm (rechter Hand liegt das Atlantic Hotel Hamburg) aufgenommen. " +
        "Seine zentrale Lage und seine Funktion als Verbindungspunkt zwischen Außenalster und Hauptbahnhof "+
        "macht den Holzdamm zu einem wichtigen Verkehrspunkt. " +
        "</p>" +
        "<p>" +
        "Das Video illustriert, dass an dieser Stelle kein durchgängiges Konzept für Radwege besteht. " +
        "Durch den geringen Platz und dem Fehlen einer dezidierten Kennzeichnung von Radwegen werden Sicherheitsaspekte für Radfahrende vernachlässigt." +
        "</p>" +
        "</div>" +
        '<div class="right">' +
        "<div>" +
          '<video controls width="300px;">' +
          '<source src="video_holzdamm.webm" type="video/webm" />' +
          '</video>' +
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
    },{
      id: "outro",
      alignment: "center",
      hidden: false,
      title: 'Ausblick: Was sagen uns die Analysen über den Stand des Verkehrsraums?',
      description:
        "<p>" +
        "In der Debatte rund um die Mobilitätswende spielt die Aufteilung des Verkehrsraum eine entscheidende Rolle." +
        "Die Daten der vorliegenden Analyse zeigen, welches Verkehrsmittel wie viel Platz braucht. " +
        "So zeigt sich beispielsweise: Parkplätze (6,8 %) nehmen in Hamburg doppelt so viel Platz ein wie die gesamten Radwege (3,4%) zusammen." +
        "</p>" +
        "<p>" +
        "Eine stärkere Nutzung des Rads im urbanen Verkehrsraum reduziert nicht nur die Lärm- und Luftverschmutzung, " +
        "sie schafft mehr Platz und neue Räume mit hoher Aufenthaltsqualität für alle." +
        "Diese Erkenntnisse sind auch im Nationalen Radverkehrsplan 3.0 verankert. " +
        "Dieser beinhaltet die Strategie der Bundesregierung zur Förderung des Radverkehrs in Deutschland bis 2030 und räumt dem Rad " +
        "eine zentralere Funktion in der gesamten Mobilität ein, weshalb der Plan nicht nur ein lückenloses Radverkehrsnetz zum Ziel hat, " +
        "sondern es als selbstverständlich ansieht, sich schnell und sicher auf dem Rad fortbewegen zu können."+
        "</p>" +
        "<p>" +
          "Auch das hat die Analyse gezeigt: Es gibt noch viel Potential zur Anpassung und Verbesserung der Infrastruktur in Hamburg." +
        "</p>",
      // callback: "neutralMap",
      location: {
        center: [10, 53.55],
        zoom: 13.5,
        pitch: 20,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      callback: "overviewGaps",
      rotateAnimation: false,
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};
