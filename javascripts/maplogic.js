// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoicXVlZW5wIiwiYSI6ImRkODMwM2YwZjAzYjU2ZDYxY2M0MTA3MTlmNzZmOGFlIn0.Rw-qtx2TGlIrlUkgdCvR_A';
// Create a map in the div #map
map = L.mapbox.map('map', 'queenp.2769e339', {
  zoomControl:false,
  fadeAnimation:true,
});

// Create feature overlay layer
// Can easily create geoJson objects at http://geojson.io
hist_features_layer = L.geoJson(hist_features, {
  style: {
    color: '#222',
    fillColor: '#000',
    opacity: 1,
    fillOpacity: 0.8,
    weight: 5,
    lineJoin: "round",
  }
});

// Cribbed from Sherlock example on mapbox.com
// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections
var timeline = document.getElementById('timeline'),
    sections = timeline.getElementsByTagName('section'),
    currentId = '';

setId("1940");

function setId(newId) {
    // TODO: Replace these with proper styling, abstract out of js.
    // If the ID hasn't actually changed, don't do anything
    if (newId === currentId) return;
    hist_features_layer.eachLayer(function(layer) {
        // Does this feature exist for a given year? If so, show.
        if (layer.feature.properties.start_year <= parseInt(newId) && layer.feature.properties.end_year >= parseInt(newId)) {
          if(!map.hasLayer(layer)){
            map.setView(layer.getBounds().getCenter(), layer.feature.properties.zoom || 15);
            map.addLayer(layer);
          }
        } else {
            map.removeLayer(layer);
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
