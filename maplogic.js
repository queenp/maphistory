// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoicXVlZW5wIiwiYSI6ImRkODMwM2YwZjAzYjU2ZDYxY2M0MTA3MTlmNzZmOGFlIn0.Rw-qtx2TGlIrlUkgdCvR_A';
// Create a map in the div #map
map = L.mapbox.map('map', 'queenp.2769e339', {
  zoomControl:false
});

//Create a marker layer (in the example done via a GeoJSON FeatureCollection)
var YEAR = 1950;
// Ilustrating how to add geoJson objects to a map
// Can easily create geoJson objects at http://geojson.io
fakeObjsLayer = L.geoJson(fakeobjs, {
  // filter: function(feature, layer) {
  //   // TODO: insert filter function when slider created.
  //   //
  //   if(feature.properties.start_year < YEAR && feature.properties.end_year > YEAR) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
});

fakeObjsLayer.addTo(map);

// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections
var timeline = document.getElementById('timeline'),
    sections = timeline.getElementsByTagName('section'),
    currentId = '';

setId("1940");

function setId(newId) {
    // TODO: Replace these with proper styling, abstract out of js.
    vis_style={
      opacity:0,
      fillOpacity: 1
    }
    invis_style={
      opacity:0,
      fillOpacity: 0
    }
    // If the ID hasn't actually changed, don't do anything
    if (newId === currentId) return;
    // Otherwise, iterate through layers, setting the current
    // marker to a different color and zooming to it.
    fakeObjsLayer.eachLayer(function(layer) {
        if (layer.feature.properties.start_year < parseInt(newId) && layer.feature.properties.end_year > parseInt(newId)) {
            //map.setView(layer.getLatLng(), layer.feature.properties.zoom || 14);
            layer.setStyle(vis_style);
        } else {
            layer.setStyle(invis_style);
        }
    });
    // highlight the current section
    for (var i = 0; i < sections.length; i++) {
        sections[i].className = sections[i].id === newId ? 'active' : '';
    }
    // And then set the new id as the current one,
    // so that we know to do nothing at the beginning
    // of this function if it hasn't changed between calls
    currentId = newId;
}

timeline.onscroll = function(e) {
    var timelineHeight = timeline.offsetHeight;
    var newId = currentId;
    // Find the section that's currently scrolled-to.
    // We iterate backwards here so that we find the topmost one.
    for (var i = sections.length - 1; i >= 0; i--) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= timelineHeight) {
            newId = sections[i].id;
        }
    };
    setId(newId);
};

//var sliderControl = L.control.sliderControl({position: "topright", layer: fakeObjsLayer, timeAttribute:'start_year'});
//map.addControl(sliderControl);
//sliderControl.startSlider();
