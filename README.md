# get-words

[![npm version](https://img.shields.io/npm/v/get-words.svg)](https://www.npmjs.com/package/get-words)

> Get English words from the text string. (Words in the genitive case or the contractions will be ignored.)

## Installation

```sh
npm install --save get-words
```

## Usage

```js
const getWords = require('get-words');

console.log(getWords('What’s the answer to the ultimate question of life, the universe, and everything?'));
// => [ 'the',
//   'answer',
//   'to',
//   'the',
//   'ultimate',
//   'question',
//   'of',
//   'life',
//   'the',
//   'universe',
//   'and',
//   'everything' ]
```

## License

MIT
