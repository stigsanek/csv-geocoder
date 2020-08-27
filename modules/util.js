const colors = require('colors/safe');

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

// Displays the results in the console
const renderResults = (allData, successData) => {
  if (successData.length > 0) {
    console.log(colors.green(`Successfully processed: ${successData.length}`));
  }

  const errorCount = allData.length - successData.length;

  if (errorCount > 0) {
    console.log(colors.red(`Handled with error: ${errorCount}`));
  }
};

module.exports = { splitCoords, renderResults };
