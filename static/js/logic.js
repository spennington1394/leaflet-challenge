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
  .bindPopup("<h1> Magnitude: " + feature.properties.mag +)
  )
}









