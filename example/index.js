const fs = require('fs');
const path = require('path');
const getWords = require('../');

const input = path.join(__dirname, 'input');
const output = path.join(__dirname, 'output');
const files = fs.readdirSync(input);
const ignoredFileName = [
  '.DS_Store'
];
const fileNames = files.filter(fileName => !ignoredFileName.includes(fileName));

const inputFileNames = [];
const outputFileNames = [];
fileNames.forEach(fileName => {
  inputFileNames.push(path.join(input, fileName));
  outputFileNames.push(path.join(output, fileName));
})

const promises = inputFileNames.map((inputFileName, index) => {
  return new Promise((resolve, reject) => {
    fs.readFile(inputFileName, 'utf8', (err, data) => {
      if (err) throw err;
      const words = getWords(data);
      const text = words.join('\n');
      fs.writeFile(outputFileNames[index], text, 'utf8', (err) => {
        if (err) throw err;
        resolve(fileNames[index]);
      });
    });
  });
});

Promise.all(promises).then((values) => {
  console.log(`${values.join(', ')} has been saved!`);
  process.exit();
});
