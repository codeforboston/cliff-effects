/**
 * Set of validating functions for making sure
 * value are what they need to be. Just for
 * numbers right now.
 */


/** Returns true if a string represents a positve number (integer or float) */
const isPositiveNumber = function ( str ) {
  return !/[^0-9.]|\..*\./.test(str);
};


/** Returns true if a string represents a positive integer */
const isPositiveWholeNumber = function ( str ) {
  return /^[0-9]*$/.test(str);
};


export {
  isPositiveNumber,
  isPositiveWholeNumber
}
