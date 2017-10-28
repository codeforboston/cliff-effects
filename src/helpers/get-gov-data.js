/** 
* Getting or calculating data values by leveraging common data patterns
* we've seen so far.
*/

/** Calculate appropriate bracket value (such as income limit) by number of
* relevant items (such as number of household members).
* 
* @example Using household size to get federal poverty income limit:
* var fedPovertyGuidelines = { 0: 0, 1: 1005, 2: 1353, eachAdditional: 600 };
* getLimitBySize( fedPovertyGuidelines, 1 );  // 1005
* getLimitBySize( fedPovertyGuidelines, 2 );  // 1353
* getLimitBySize( fedPovertyGuidelines, 3 );  // 1953
* 
* @function
* @param {object} data Data to use to get a bracket/limit value.
* @param {number} data.0 Never known to equal more than 0 so far.
* @param {number} data.1 (Or any int key) Value of bracket/limit that
* matches the number described by the key. For example, data.3 would be
* the income limit value for a household with three members.
* @param {number|function} data.eachAdditional Usually an amount to
* add for each person or item over the maximum hardcoded limits. Can be a
* function to calculate said amount based on number of extra items.
* @param {number} Number of items you have (for example, size of household).
* 
* @returns Data value calculated for the number of items, numItems, wanted.
*/
const getLimitBySize = function ( data, numItems ) {
  
  var limit     = null,
      maxGiven  = getMaxIntKey( data );

  if ( numItems <= maxGiven ) {

    limit = data[ numItems ];

  } else {

    var numExtra    = numItems - maxGiven,
        extraAmount = getExtraAmount( data, numExtra );
    limit = data[ maxGiven ] + extraAmount;

  }
  
  return limit;
};  // End getLimitBySize()


/** Deals with different value types for data.eachAdditional
* 
* @function
* @param {number} numExtra Number of extra items
* @param {number|function} eachAdditional Either a number value to add
* for each extra item or a function that will return that number.
* 
* @returns {number} The amount created by those extra items.
*/
var getExtraAmount = function ( data, numExtra ) {

  var extraAmount     = 0,
      eachAdditional  = data.eachAdditional;

  // Either allow additional amount to be calculated
  // or add a hard-coded amount.
  if ( typeof eachAdditional === 'function' ) {

    extraAmount = eachAdditional( data, numExtra );

  } else {  // Assumed either number or falsy

    /** @todo Future discussioin - flexibility vs. consistency */
    var overageRate = eachAdditional || 0;
    extraAmount = numExtra * overageRate;

  }

  return extraAmount;
};  // End getExtraAmount()


/** 
* Of the keys in an object that can be converted to integers,
* return the highest converted value.
*/
var getMaxIntKey = function ( data ) {
  var max = 0;
  for ( let key in data ) {

    var asInt = parseInt( key );
    if ( !isNaN(asInt) && asInt > max ) {
      max = asInt;
    }

  }
  return max;
};  // End getMaxIntKey()


export {
	getLimitBySize
};
