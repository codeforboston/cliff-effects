/**
 * Set of validating functions for making sure
 * value are what they need to be. Just for
 * numbers right now.
 */


/** Returns true if a string represents a positve number (integer or float) */
// Should this only be valid if it has <= 2 decimal places?
const isPositiveNumber = function (str) {
  return str !== '' && !/[^0-9.]|\..*\./.test(str);
};


/** Returns true if a string represents a positive integer */
/** @todo Change name to 'isWholeNumber'. */
const isPositiveWholeNumber = function (str) {
  return str !== '' && /^[0-9]*$/.test(str);
};


export {
  isPositiveNumber,
  isPositiveWholeNumber,
};
