/** Set of validating functions for making sure values are what
 *     they need to be. Just for numbers right now.
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
  // @todo Change name to 'isWholeNumber'? Whole numbers aren't negaive, right?
  return str !== '' && /^[0-9]*$/.test(str);
};


export {
  hasOnlyNonNegNumberChars,
  hasOnlyNonNegWholeNumberChars,
  isNonNegNumber,
  isNonNegWholeNumber,
};
