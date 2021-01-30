//store api url inside variable (looking at week summary)
var query_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get requet with query_url and send to data.features
d3.json(query_url,function(data){
  createMap(data.features);
});

function createMap(earthquake){
  //loop to create markers
  //start with coordinates
  earthquakeMarkers = earthquake.map((feature) =>
  L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
    //set marker radius to magnitude of earthquake and create pop-up with mag info
    //location and time
    radius: getRadius(feature.properties.mag),
    stroke: true,
    // color: "#20f03b",
    opacity: .5,
    weight: 1,
    fill: true,
    fillcolor: getColor(feature.geometry.coordinates[2]),
    fillOpacity: .5
  })
  .bindPopup("<h1> Magnitude: " + feature.properties.mag + feature.properties.place + feature.geometry.coordinates[2])
  )
  //earthquake layer to marker cluster group
  var earthquakes = L.layerGroup(earthquakeMarkers)
  console.log(d3.extent(d3.values(earthquake),((d) => +d.properties.mag)));
  var magnitude = earthquake.map((d) => (+d.properties.mag));
  console.log(d3.extent(magnitude));
  console.log(magnitude);

  //define streetmap (copy from GeoJSON in activities 1)
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  //create map with streetmap and earthquake layers
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  function getColor(coordinates) {
    switch (true) {
    case coordinates < 10:
      return "#ffffb2";
    case coordinates >= 10 && coordinates < 30:
      return "#fd8d3c";
    case coordinates >= 30 && coordinates < 50:
      return "#f03b20";
    case coordinates >= 50 && coordinates < 70:
      return "#bd0026";
    case coordinates >= 70 && coordinates < 90:
      return "#87cefa";
    default:
      return "#ffffb2";
    }
  }

  // Add a legend to the map off of magnitude
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(myMap){
    var div = L.DomUtil.create("div","legend");
    var depths = [-10, 10, 30, 50, 70, 90];
    var colors = [,"#fecc5c","#fd8d3c","#f03b20","#bd0026","#87cefa"];
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
      console.log(colors[i]);
    }
    return div;
  };

  legend.addTo(myMap);

    function getRadius(mag){
      if (mag === 1){
        return 1
      }
      return mag * 4;  
      }
      
    };
    









