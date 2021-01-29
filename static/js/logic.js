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
  L.cirleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
    //set marker radius to magnitude of earthquake and create pop-up with mag info
    //location and time
    radius: mag(feature.properties.mag),
    stroke: true,
    color: 'green',
    opacity: .5,
    weight: 1,
    fill: true,
    fillcolor: magColor(feature.properties.mag),
    fillOpacity: .5
  })
  .bindPopup("<h1> Magnitude: " + feature.properties.mag + feature.properties.place +
  new Date(feature.properties.time))
  )
  //
  var earthquakes = L.layerGroup(earthquakeMarkers)
  console.log(d3.extent(d3.values(earthquake),((d) => +d.properties.mag));
  var magnitude = earthquake.map((d) => magCheck(+d.properties.mag));
  
}









