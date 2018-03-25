# get-words

[![npm version](https://img.shields.io/npm/v/get-words.svg)](https://www.npmjs.com/package/get-words)

> Get English words from the text string.

## Installation

```sh
npm install --save get-words
```

## Usage

```js
const getWords = require('get-words');

getWords('You’re my best friend.');
// => [ 'You', 'my', 'best', 'friend' ]

// Keep the word in the genitive case or contraction
getWords('You’re my best friend.', { keepContraction: true });
// => [ 'You’re', 'my', 'best', 'friend' ]

getWords('The food was first-class');
// => [ 'The', 'food', 'was', 'first-class' ]

// Split up the compound word
getWords('The food was first-class', { breakCompoundWord: true });
// => [ 'The', 'food', 'was', 'first', 'class' ]
```

## API

### getWords(s, [options])

- `s` **string**: the text string. Required.
- `options` **object**: Optional.
- `options.keepContraction` **boolean**: Whether to keep the word in genitive case/contraction or not. (default: `false`).
- `options.breakCompoundWord` **boolean**: Whether to split up the compound word or not. (default: `false`).

## License

MIT
