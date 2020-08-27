const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Returns created csv-writer
const getCsvWriter = (path) => {
  return createCsvWriter({
    path: path,
    header: [
      { id: 'id', title: 'id' },
      { id: 'addrSrc', title: 'addr src' },
      { id: 'addrGeo', title: 'addr geo' },
      { id: 'type', title: 'type' },
      { id: 'latitude', title: 'latitude' },
      { id: 'longitude', title: 'longitude' }
    ]
  });
};

module.exports = getCsvWriter;
