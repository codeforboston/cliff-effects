/**
 * Set of validating functions for making sure
 * value are what they need to be. Just for
 * numbers right now.
 */



/** Tests if a string represents a positve decimal : #277 */

const isPositiveDecimal = function ( str ) {

	return !/[^0-9.]*|\..*\./.test(str);

};



/** Tests if a string represents a positive integer : #230*/

const isPositiveInteger = function ( str ) {

	return /^[0-9]*$/.test(str);


};


/** Tests if a string represents a positive float */

const isPositiveFloat = function ( str ) {

	return /^[0-9]*\.[0-9]*$/.test(str);


};


export {
  isPositiveInteger,
  isPositiveFloat,
  isPositiveDecimal
}
