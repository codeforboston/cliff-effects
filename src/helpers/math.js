/** For different kinds of math operations we need, some unconventional */

var roundMoney = function ( val ) {
  // Only round values for display. In actual calculations and
  // storage objects, keep things exact. Also, this doesn't restrict
  // to two decimal places. Do that in the input's attributes.
  return ( Math.round(val * 100) / 100 ); // val = '' returns 0
};  // End roundMoney()


var limit = function ( initialVal, minMax ) {

  /** @todo Add trailing 0's somewhere */
  var min = minMax.min,
      max = minMax.max;

  var raw   = parseFloat( initialVal ),
      value = null;
  if ( typeof min === 'number' && !isNaN(min) ) { value = Math.max( min, raw ); }
  if ( typeof max === 'number' && !isNaN(max) ) { value = Math.min( max, raw ); }

  if ( isNaN( value ) ) { value = 0; }

  return value;
};  // End limit()


export { roundMoney, limit };
