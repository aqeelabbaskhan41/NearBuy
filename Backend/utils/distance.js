const calculateDistance = (longitude1, latitude1, longitude2, latitude2) => {
  // Validate input coordinates
  if ([longitude1, latitude1, longitude2, latitude2].some(coord => typeof coord !== 'number' || isNaN(coord))) {
    throw new Error('All coordinates must be valid numbers');
  }

  // Validate coordinate ranges
  if (Math.abs(latitude1) > 90 || Math.abs(latitude2) > 90) {
    throw new Error('Latitude must be between -90 and 90 degrees');
  }
  if (Math.abs(longitude1) > 180 || Math.abs(longitude2) > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees');
  }

  const earthRadius = 6371; // Earth's radius in kilometers
  const latitudeRad1 = latitude1 * Math.PI / 180; // Convert degrees to radians
  const latitudeRad2 = latitude2 * Math.PI / 180;
  const diffLat = (latitude2 - latitude1) * Math.PI / 180;
  const diffLon = (longitude2 - longitude1) * Math.PI / 180;

  // Haversine formula
  const haversineTerm = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
                        Math.cos(latitudeRad1) * Math.cos(latitudeRad2) *
                        Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
  const angle = 2 * Math.atan2(Math.sqrt(haversineTerm), Math.sqrt(1 - haversineTerm));

  const distance = earthRadius * angle;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

module.exports = calculateDistance;