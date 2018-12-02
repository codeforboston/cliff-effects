/**
 * Set of validating functions for making sure
 * value are what they need to be. Just for
 * numbers right now.
 * @module
 */

/** Returns true if a string only contains characters for a nonnegative number */
const hasOnlyNonNegNumberChars = function (str) {
  return /^[0-9.]*$/.test(str);
};

/** Returns true if a string only contains characters for a nonnegative whole number */
const hasOnlyNonNegWholeNumberChars = function (str) {
  return /^[0-9]*$/.test(str);
};

/** Returns true if a string represents a positve number (integer or float) */
const isNonNegNumber = function (str) {
  // Should this only be valid if it has <= 2 decimal places?
  return str !== '' && !/[^0-9.]|\..*\./.test(str);
};


/** Returns true if a string represents a positive integer */
const isNonNegWholeNumber = function (str) {
  // @todo Change name to 'isWholeNumber'.
  return str !== '' && /^[0-9]*$/.test(str);
};

/** Returns true if numberOrString represents a valid number or an
 *     error with a useful message about why it wasn't one.
 * Note: Using testing the string like `isNonNegNumber()` doesn't tell
 *     us a lot about what's wrong with the given argument.
 * 
 * @param {number|string} numberOrString Either a number or a
 *     string that can turn into an expected number
 * @returns {number}
 */
const isNumberlike = function (numberOrString) {
  
  let type = typeof numberOrString;

  // In case it's `null` or something, which can be turned into 0, but shouldn't be a number.
  if (type !== `number` && type !== `string`) {
    return new TypeError(`Expected 'numberOrString' to be a number or string, not a ${type}`);
  }

  // Yes, we could convert to a number here, but then our error
  // message couldn't be as useful.

  if (type === `number`) {
    return true;
  }

  if (numberOrString === ``) {
    return new Error(`Expected 'numberOrString' to be a number or string that can be converted to a number, not an empty string.`);
  }

  // Don't use `parseFloat`. It allows letters.
  let number = Number(numberOrString);
  // In case it's a string with letters instead of just numbers
  // This doesn't stop cases like 3e5 or something, but this function
  // isn't meant to guard against that currently.
  if (!isNaN(number)) {
    return true;
  } else {
    return new TypeError(`Expected 'numberOrString' to be a number or string that can be converted to a number and it was ${numberOrString}.`);
  }

};  // Ends isNumberlike()


export {
  hasOnlyNonNegNumberChars,
  hasOnlyNonNegWholeNumberChars,
  isNonNegNumber,
  isNonNegWholeNumber,
  isNumberlike,
};
