'use strict';

/**
 * Get word from the genitive case or contraction
 * @param {string} s
 */
const getWordFromContractions = (s = '') => {
  if (s.includes('\u2019')) {
    if (s === 'won’t') {
      return 'will';
    }
    // ’m ’s ’d ’re ’ve ’ll n’t
    return s.replace(/(\u2019(m|s|d|re|ve|ll))|(n\u2019t)/g, '');
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
 * \u002D => - (hyphen or minus sign)
 * \u2019 => ’ (typographic apostrophe or right single quotation mark)
 */
const getWords = (s, options = {}) => {
  const { keepContraction = false, breakCompoundWord = false } = options;
  // Split with “non-word elements” and hyphen, compound words will be broken up.
  if (breakCompoundWord) {
    const words = s.split(/[^a-zA-Z\u2019]/).filter(v => v.length > 0);
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
  return s.split(/[^a-zA-Z\u002D\u2019]/)
    .filter(v => v.length > 0)
    .map(v => {
      // Process words with a “-” prefix/suffix
      if (/(^\u002D)|(\u002D$)/.test(v)) {
        v = v.replace(/\u002D/g, '');
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
