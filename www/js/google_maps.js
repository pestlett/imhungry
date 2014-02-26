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

	return goog.map;
};

goog.changeLocation = function (position) {
	if (goog.map === null) { return false; }
	if (!position.latitude) { return false; }
	if (!position.longitude) { return false; }

	goog.map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));
};

goog.changeZoom = function (zoomLevel) {
	if (goog.map === null) { return false; }
	if (!zoomLevel) { return false; }

	// Anything that is out of these bounds is not useful to us
	zoomLevel = Math.min(18, Math.max(13, zoomLevel));

	goog.map.setZoom(zoomLevel);
};

goog.addMarker = function (options) {
	if (!options.position) { return false; }
	if (!options.position) { return false; }

	options.map = goog.map;

	goog.markers.push(new google.maps.Marker(options));
};

goog.removeMarker = function (marker) {
	marker.setMap(null);
	if ($.inArray(marker, goog.markers) > -1) {
		goog.markers.splice($.inArray(marker, goog.markers), 1);
	}
};