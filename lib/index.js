'use strict';

/**
 * Get word from the genitive case or contraction
 * @param {string} s
 */
const getWordFromContractions = (s = '') => {
  if (s.includes('’')) {
    // won’t
    if (/won’t/i.test(s)) {
      return 'will';
    }
    // can’t
    if (/can’t/i.test(s)) {
      return 'can';
    }
    // ’m ’s ’d ’re ’ve ’ll n’t (ain’t)
    return s.replace(/(’(m|s|d|re|ve|ll)$)|((ai)?n’t$)/ig, '');
  }
  return s;
};

/**
 * Get English words from the text string.
 * #NOTE: Abbreviations like “Ph.D.” will split up.
 *
 * @param {string} - The text string.
 * @return {string[]} - The word array.
 *
 * Remarks:
 * "-", "\u002D", hyphen or minus sign
 * "’", "\u2019", typographic apostrophe or right single quotation mark
 */
const getWords = (s, options = {}) => {
  const { keepContraction = false, breakCompoundWord = false } = options;
  // Split with “non-word elements” and hyphen, compound words will be broken up.
  if (breakCompoundWord) {
    const words = s.split(/[^A-Za-z’]/).filter(v => v.length > 0);
    if (keepContraction) {
      return words;
    }
    return words.map(v => {
        // Process words in the genitive case or contractions.
        return getWordFromContractions(v);
      })
      .filter(v => v.length > 0);
  }

  // Split with “non-word elements”, compound words will be retained.
  return s.split(/[^A-Za-z’-]/)
    .filter(v => v.length > 0)
    .map(v => {
      // Process words with a “-” prefix/suffix
      if (/(^-)|(-$)/.test(v)) {
        v = v.replace(/-/g, '');
      }

      if (keepContraction) {
        return v;
      }

      // Process words in the genitive case or contractions.
      return getWordFromContractions(v);
    })
    .filter(v => v.length > 0);
};

module.exports = getWords;
