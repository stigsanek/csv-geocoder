const fs = require('fs');
const colors = require('colors/safe');

const csvParser = require('csv-parser');
const getCsvWriter = require('./csv-writer');
const runGeocoder = require('./geocoder');
const { renderResults } = require('./util');

const parserResults = [];

// Runs all processes
const runParser = ({ inputSeparator, inputPath, outputPath }) => {
  console.log(colors.blue('Started parsing...'));
  const csvWriter = getCsvWriter(outputPath);

  fs.createReadStream(inputPath)
    .pipe(csvParser({ separator: inputSeparator }))
    .on('data', (data) => parserResults.push(data))
    .on('end', async () => {
      console.log(colors.magenta('Started geocoding...'));
      const records = await runGeocoder(parserResults);

      csvWriter.writeRecords(records)
        .then(() => {
          renderResults(parserResults, records);
        })
        .catch((e) => console.log(colors.red(`Error writing to file. ${e}`)));
    });
};

module.exports = runParser;
