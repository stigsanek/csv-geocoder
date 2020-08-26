const path = require('path');
const runParser = require('./modules/csv-parser');

// Paths config
const file = {
  input: path.resolve(__dirname, 'csv/input.csv'),
  output: path.resolve(__dirname, 'csv/otput.csv')
};

runParser({
  inputSeparator: ',', // set separator symbol
  inputPath: file.input,
  outputPath: file.output
});


