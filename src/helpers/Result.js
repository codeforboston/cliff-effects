
class Result {

	constructor ( desired ) {

		var result = this;

		var errorMessage = checkTypes( desired );

		if ( errorMessage.length > 0 ) {
			/** @see Look at the second line of your error stack to see where this came from */
			throw new Error( errorMessage )
		}

		/** @todo change prop name to 'result' */
		result.result 			= desired.result;
		/** @todo change prop name to 'message'? */
		result.details 			= desired.details;
		// /** @todo Make this required and validate that it's a Date object. */
		// result.expirationDate 	= desired.expirationDate;
		/** @property {Object} result.data - Not required */
		result.data 			= desired.data;

	}  // End constructor()

};  // End Result class


// ========================================
// =========================================
// VALIDATION
// ========================================
// ========================================
var checkTypes = function ( data ) {

	/** @todo Is there a way to lop through to do this? I attempted
	* it with a 'types' object to check types, but type tests aren't
	* enough. For example, `expirationDate` needs to be tested for
	* `instanceof Date`. */
	var invalid = [],
		result 	= data[ 'result' ],
		details = data[ 'details' ];//,
		// date 	= data[ 'expirationDate' ];

	if ( typeof pushUndefined( 'result', result, invalid ) !== 'string' ) {
		if ( typeof result !== 'string' ) {
			invalid.push( 'The value of `result` was type of ' + (typeof result) + ' instead of "string".' );
		}
	}

	if ( typeof pushUndefined( 'details', details, invalid ) !== 'string' ) {
		if ( typeof details !== 'string' ) {
			invalid.push( 'The value of `details` was type of ' + (typeof details) + ' instead of "string".' );
		}
	}

	// if ( typeof pushUndefined( 'expirationDate', date, invalid ) !== 'string' ) {
	// 	if ( !( date instanceof Date ) ) {
	// 		invalid.push( 'The value of `expirationDate` was not an instance of `Date`.' );
	// 	}
	// }

	var error = invalid.join( ' ' );  // empty array returns a string

	return error;
}


var pushUndefined = function ( key, val, invalidArray ) {

	var error = null
	if ( val === undefined ) {
		error = 'The value of `' + key + '` is not allowed to be `undefined`.'
		invalidArray.push( error );
	}

	return error;
};  // End pushUndefined()



// ========================================
// ========================================
// EXPORTS
// ========================================
// ========================================
export { Result }
