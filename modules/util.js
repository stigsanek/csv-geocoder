// Splits coords string
const splitCoords = (str, separator = ' ') => {
  const coords = str.split(separator);

  if (coords.length > 0) {
    return {
      longitude: coords[0],
      latitude: coords[1]
    };
  }
};

module.exports = { splitCoords };
