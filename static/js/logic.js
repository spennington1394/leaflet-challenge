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
    radius: (feature.properties.mag),
    stroke: true,
    color: 'green',
    opacity: 5,
    weight: 1,
    fill: true,
    fillcolor: (feature.properties.mag),
    fillOpacity: 5
  })
  .bindPopup("<h1> Magnitude: " + feature.properties.mag + feature.properties.place +
  new Date(feature.properties.time))
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

  // Add a legend to the map off of magnitude
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(myMap){
    var div = L.DomUtil.create("div","legend");
    div.innerHTML = [
        "<k class='maglt2'></k><span>0-2</span><br>",
        "<k class='maglt3'></k><span>2-3</span><br>",
        "<k class='maglt4'></k><span>3-4</span><br>",
        "<k class='maglt5'></k><span>4-5</span><br>",
        "<k class='maggt5'></k><span>5+</span><br>"
      ].join("");
    return div;
  };

  legend.addTo(myMap);
}









