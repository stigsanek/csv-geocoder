const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Returns created csv-writer
const getCsvWriter = (path) => {
  return createCsvWriter({
    path: path,
    header: [
      { id: 'id', title: 'id' },
      { id: 'addr', title: 'addr' },
      { id: 'latitude', title: 'latitude' },
      { id: 'longitude', title: 'longitude' }
    ]
  });
};

module.exports = getCsvWriter;
