/** For different kinds of math operations we need, some unconventional */

const sum = function ( vals ) {
  var total = 0;
  for (let vali = 0; vali < vals.length; vali++) {
    total += vals[ vali ];
  };
  return total;
};


const roundMoney = function ( val ) {
  // Only round values for display. In actual calculations and
  // storage objects, keep things exact. Also, this doesn't restrict
  // to two decimal places. Do that in the input's attributes.
  return ( Math.round(val * 100) / 100 ); // val = '' returns 0
};  // End roundMoney()

/**
* Turns a value into a float, limits it in between min and max, and
* makes sure to return a number (not NaN).
* 
* @todo Testing required
*/
const limit = function ( initialVal, minMax ) {

  /** @todo Add trailing 0's somewhere */
  var min = minMax.min,
      max = minMax.max;

  var raw   = parseFloat( initialVal ),
      value = raw;
  if ( typeof min === 'number' && !isNaN(min) ) { value = Math.max( min, raw ); }
  if ( typeof max === 'number' && !isNaN(max) ) { value = Math.min( max, raw ); }

  if ( isNaN( value ) ) { value = 0; }

  return value;
};  // End limit()


var toMonthlyAmount = {};

toMonthlyAmount.weekly = function ( evnt, weeklyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthlyRaw  = weeklyVal * 4.33,
      monthly     = toMonthlyAmount[ 'monthly' ]( evnt, monthlyRaw );
  return monthly;

};  // End toMonthlyAmount.weekly()


toMonthlyAmount.monthly = function ( evnt, monthlyVal ) {
  // Monthly is used for a lot of things and is the one we want to store
  var monthlyInBounds = limit( monthlyVal, { min: 0 } );
  return monthlyInBounds;

};  // End toMonthlyAmount.monthly()


toMonthlyAmount.yearly = function ( evnt, yearlyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthlyRaw  = ( yearlyVal / 12 ),
      monthly     = toMonthlyAmount[ 'monthly' ]( evnt, monthlyRaw );
  return monthly;

};  // End toMonthlyAmount.yearly()


export { sum, roundMoney, limit, toMonthlyAmount };
