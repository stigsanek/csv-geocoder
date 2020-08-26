const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Returns created csv-writer
const getCsvWriter = (path) => {
  return createCsvWriter({
    path: path,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'addr', title: 'ADDR' },
      { id: 'coord', title: 'COORD' }
    ]
  });
};

module.exports = getCsvWriter;
