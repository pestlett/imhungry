var goog = goog || {};

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