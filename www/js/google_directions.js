var goog = goog || {};

goog.directions = null;
goog.directionsDisplay = null;
goog.defaultTravelMode = google.maps.TravelMode.WALKING;

goog.calculateRoute = function (options) {
  if (!options.origin) { return; }
  if (!options.destination) { return; }
  if (!options.travelMode) { options.travelMode = goog.defaultTravelMode; }

  goog.directions.route(options, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK && goog.directionsDisplay !== null) {
      goog.directionsDisplay.setDirections(response);
    }
  });
};