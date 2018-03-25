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
      const hasTypographicApostrophe = /\u2019/.test(data);
      const str = hasTypographicApostrophe ? data : data.replace(/\u0027/g, '\u2019');
      const words = getWords(str)
        .filter(w => w.length > 2)
        .map(w => w.toLowerCase())
        .sort((a, b) => a.localeCompare(b))
        .filter((element, index, array) => array.indexOf(element) === index);
      const text = words.join('\n');
      fs.writeFile(outputFileNames[index], text, {
        encoding: 'utf8',
        flag: 'w'
      }, (err) => {
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
