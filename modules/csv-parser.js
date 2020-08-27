const fs = require('fs');
const colors = require('colors/safe');

const csvParser = require('csv-parser');
const getCsvWriter = require('./csv-writer');
const runGeocoder = require('./geocoder');

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
          if (records.length > 0) {
            console.log(colors.green(`Successfully processed: ${records.length}`));
            console.log(colors.red(`Handled with error: ${parserResults.length - records.length}`));
          }
        })
        .catch((e) => console.log(colors.red(`Error writing to file. ${e}`)));
    });
};

module.exports = runParser;
