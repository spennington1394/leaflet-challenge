//store api url inside variable (looking at week summary)
var query_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get requet with query_url and send to data.features
d3.json(query_url,function(data){
  createMap(data.features);
});











