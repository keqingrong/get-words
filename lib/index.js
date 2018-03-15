'use strict';

/**
 * Get English words from the text string.
 * @param {string} - The text string.
 * @return {string[]} - The word array.
 *
 * Remarks:
 * \u002D => - (hyphen or minus sign)
 * \u2019 => ’ (typographic apostrophe or right single quotation mark)
 */
const getWords = (s) => {
  // Split with “non-word elements”, compound words will be retained.
  // #NOTE: Abbreviations like “Ph.D.” will split up.
  return s.split(/[^a-zA-Z\u002D\u2019]/)
    .filter(v => {
      return (
        v.length > 0 &&
        // Ignore words in the genitive case or contractions
        // like “Charlotte’s Web”, “I’m”.
        (/\u2019+/.test(v) === false) &&
         // Ignore words starting with “-”.
        (/^\u002D+/.test(v) === false)
      );
    });
};

module.exports = getWords;
