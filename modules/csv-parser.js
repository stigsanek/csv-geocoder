const fs = require('fs');
const csvParser = require('csv-parser');
const getCsvWriter = require('./csv-writer');
const runGeocoder = require('./geocoder');

const parserResults = [];

// Runs all processes
const runParser = ({ inputSeparator, inputPath, outputPath }) => {
  console.log('Started parsing...');
  const csvWriter = getCsvWriter(outputPath);

  fs.createReadStream(inputPath)
    .pipe(csvParser({ separator: inputSeparator }))
    .on('data', (data) => parserResults.push(data))
    .on('end', async () => {
      console.log('Started geocoding...');

      const records = await runGeocoder(parserResults);
      csvWriter.writeRecords(records)
        .then(() => {
          if (records.length > 0) {
            console.log(`Successfully! Processed ${records.length} lines`);
          }
        })
        .catch((e) => console.log(`Error writing to file. ${e}`));
    });
};

module.exports = runParser;
