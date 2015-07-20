// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoicXVlZW5wIiwiYSI6ImRkODMwM2YwZjAzYjU2ZDYxY2M0MTA3MTlmNzZmOGFlIn0.Rw-qtx2TGlIrlUkgdCvR_A';
// Create a map in the div #map
map = L.mapbox.map('map', 'queenp.2769e339');

//Create a marker layer (in the example done via a GeoJSON FeatureCollection)

// Ilustrating how to add geoJson objects to a map
// Can easily create geoJson objects at http://geojson.io
fakeObjsLayer = L.geoJson(fakeobjs, {
  filter: function(feature, layer) {
    // TODO: insert filter function when slider created.
    return true;
  }
});

var sliderControl = L.control.sliderControl({position: "topright", layer: fakeObjsLayer, timeAttribute:'start_year'});
map.addControl(sliderControl);
sliderControl.startSlider();
