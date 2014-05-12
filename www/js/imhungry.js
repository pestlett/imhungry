var iah = {};

iah.geo = navigator.geolocation;
iah.radius = 250;
//https://developers.google.com/places/documentation/supported_types
iah.places = ['restaurant', 'meal_takeaway'];
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
      
      goog.loadMap(options.el, position.coords, {
        zoom: 16 // our inital zoom level
      });

      iah.findLocation();
      // shake.startWatch(function () {
      //   iah.findLocation();
      // });
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

iah.LatLng = function (lat, lng) {
  return new google.maps.LatLng(lat, lng);
};

iah.whereami = function () {
  if (iah.currentLocation !== null) {
    return iah.LatLng(iah.currentLocation.coords.latitude, iah.currentLocation.coords.longitude);
  }
};

iah.findLocation = function () {
  goog.searchLocality(iah.radius, iah.places,
  function (results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i=0, l=results.length, result; i<l; i++) {
        result = results[i];
        // if (!result.opening_hours) { continue; }
        // if (result.opening_hours.open_now === false) { continue; }
        goog.addPlace(result);
        goog.calculateRoute({
          origin: iah.whereami(),
          destination: result.geometry.location
        });
        return;
      }

      if (goog.markers.length === 0) {
        $('h1').html('There\'s nowhere open nearby, sorry. Try lieferando.');
      }
    }
  });
};