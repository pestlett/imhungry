var goog = goog || {};

goog.services = new google.maps.places.PlacesService(goog.map);

goog.searchLocality = function (radius, types, callback) {
	if (!iah.isNumber(radius)) { return false; }
	if (!iah.isArray(types)) { return false; }

	radius = Math.min(500, Math.max(0, radius));

	goog.services.nearbySearch({
		location: iah.whereami(),
		radius: radius,
		type: types
	}, callback);
};