var goog = goog || {};

goog.places = [];

goog.searchLocality = function (radius, types, callback) {
  if (!iah.isNumber(radius)) { return false; }
  if (!iah.isArray(types)) { return false; }

  // We want to limit our radius of search
  radius = Math.min(500, Math.max(0, radius));

  goog.services.nearbySearch({
    location: iah.whereami(),
    radius: radius,
    types: types
  }, callback);
};

goog.getPlaceDetails = function (place, callback) {
  goog.services.getDetails(place, callback);
};

goog.addPlace = function (place) {
  if (typeof place === 'undefined') { return; }

  goog.getPlaceDetails(place, function (details, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      goog.places.push({
        marker: new goog.addMarker(false, {
          position: place.geometry.location
        }),
        details: details
      });
    }
  });
};