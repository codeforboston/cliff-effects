
/** 
* All benefit programs' return value should be an instance of
* this class.
* 
* @todo Implement `.expirationDate` or some interface for that so we can
* keep track of when data needs to be updated. We can create some kind of
* flag or alert in here.
* @todo Figure out how to access this jsdoc definition externally.
* 
* @external
* 
* @class
* @param {object} trial - Data to try out/validate
* @param {string} trial.result - 'good', 'warning', or 'bad' are the proposed
* three values, but right now they're 'good', 'information', and 'warning'
* @param {string} trial.details - Explanation of results that will be seen
* by the user. Examples: 'All good!', 'Because your income is x% above some
* value, your benefit amount could go down soon.'
* @param {object} trial.data - This is an object that can contain any
* other information needed. The code using your `.data` will have to know
* what to expect in there.
*/
class Result {

  constructor ( trial ) {

    var result = this;

    var errorMessage = checkTypes( trial );

    if ( errorMessage.length > 0 ) {
      /** @see Look at the second line of your error stack to see where
      * this came from */
      throw new Error( errorMessage )
    }

    result.result       = trial.result;
    /** @todo Should be allowed to be `undefined` or 'null'? */
    result.details      = trial.details;
    /** @property {Object} result.data - Not required */
    result.data       = trial.data;
    // /** @todo Make this required and validate that it's a Date object.
    // * Possibly handle alert/flag for expired data. */
    // result.expirationDate  = trial.expirationDate;

  }  // End constructor()

};  // End Result class


// ========================================
// =========================================
// VALIDATION
// ========================================
// ========================================

/** 
* @todo Add function description
*/
var checkTypes = function ( data ) {

  /** @todo Is there a way to lop through to do this? I attempted
  * it with a 'types' object to check types, but type tests aren't
  * enough. For example, `expirationDate` needs to be tested for
  * `instanceof Date`. */
  var invalid = [],
    result  = data[ 'result' ],
    details = data[ 'details' ];  // Should this be allowed to be undefined?
    // , date   = data[ 'expirationDate' ];

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
  //  if ( !( date instanceof Date ) ) {
  //    invalid.push( 'The value of `expirationDate` was not an instance of `Date`.' );
  //  }
  // }

  var error = invalid.join( ' ' );  // empty array returns a string

  return error;
}


/** 
* @todo Add function description
*/
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
