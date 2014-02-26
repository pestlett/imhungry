var iah = {};

iah.geo = navigator.geolocation;
iah.radius = 250;
//https://developers.google.com/places/documentation/supported_types
iah.places = ['food', 'restaurant', 'meal_takeaway'];
iah.currentLocation = null;

iah.isType = function (value, type) {
	return Object.prototype.toString.call(value) === type;
};

iah.isNumber = function (value) {
	return iah.isType(value, '[object Number]');
};

iah.isArray = function (value) {
	return iah.isType(value, '[object Array]');
};

iah.init = function (options) {
	if (!options.el) { return false; }

  iah.geo.getCurrentPosition(function (position) {
      var longitude, latitude;

      iah.currentLocation = position;

      longitude = position.coords.longitude || 13;
      latitude = position.coords.latitude || 52;
      
      goog.loadMap(options.el, position.coords);
  },
  function (positionError) {
  	console.log(positionError);
  });

  iah.geo.watchPosition(function (position) {
  	iah.currentLocation = position;
  	goog.changeLocation(position.coords);
  },
  function (positionError) {
  	console.log(positionError);
  },
  {
  	enableHighAccuracy: true,
  	timeout: 3000,
  	maximumAge: 0
  });
};

iah.whereami = function () {
	if (iah.currentLocation !== null) {
		return google.maps.LatLng(iah.currentLocation.coords.latitude, iah.currentLocation.coords.longitude);
	}
}

iah.findLocation() {
	goog.searchLocality(iah.radius, iah.places,
	function (results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {

		}
	});
};