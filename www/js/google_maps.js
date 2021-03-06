var goog = goog || {};

/**
 * The map object
 * @type {Object}
 */
goog.map = null;
goog.markers = [];

goog.loadMap = function (el, position, options) {
  var latitude, longitude;

  latitude = position.latitude || 53;
  longitude = position.longitude || 13;

  options = options || {};
  options.center = new google.maps.LatLng(latitude, longitude);
  options.zoom = options.zoom || 8;

  goog.map = new google.maps.Map(el, options);
  goog.addMarker(true, {
    position: options.center
  });

  // Initalise google places services for later use
  goog.services = new google.maps.places.PlacesService(goog.map);
  goog.directions = new google.maps.DirectionsService(goog.map);
  goog.directionsDisplay = new google.maps.DirectionsRenderer();
  goog.directionsDisplay.setMap(goog.map);

  return goog.map;
};

goog.changeLocation = function (position) {
  if (goog.map === null) { return false; }
  if (!position.latitude) { return false; }
  if (!position.longitude) { return false; }

  goog.map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));

  if (goog.ourMarker !== null) {
    goog.ourMarker.setPosition(new google.maps.LatLng(position.latitude, position.longitude));
  }
};

goog.changeZoom = function (zoomLevel) {
  if (goog.map === null) { return false; }
  if (!zoomLevel) { return false; }

  // Anything that is out of these bounds is not useful to us
  zoomLevel = Math.min(18, Math.max(13, zoomLevel));

  goog.map.setZoom(zoomLevel);
};

goog.addMarker = function (ourMarker, options) {
  var currentMarker;

  if (!options.position) { return false; }

  options.map = goog.map;

  currentMarker = new google.maps.Marker(options);

  if (ourMarker) {
    return (goog.ourMarker = currentMarker);
  }

  return currentMarker;
};

goog.removeMarker = function (marker) {
  var markerIndex = $.inArray(marker, goog.markers);
  marker.setMap(null);
  if (markerIndex > -1) {
    goog.markers.splice(markerIndex, 1);
  }
};