/** For different kinds of math operations we need, some unconventional
 * @module
 */

// @todo We probably don't need this one... lodash...
const sum = function (vals) {
  var total = 0;
  for (let vali = 0; vali < vals.length; vali++) {
    total += vals[ vali ];
  };
  return total;
};

/** A consistent way to round to money values throughout the app
 *
 * @todo Find goverment documentation on standard way to round
 *     money values.
 */
const roundMoney = function (val) {
  // Only round values for display. In actual calculations and
  // storage objects, keep things exact. Also, this doesn't restrict
  // to two decimal places. Do that in the input's attributes.
  return (Math.round(val * 100) / 100); // val = '' returns 0
};  // End roundMoney()


/** This is how we've seen it done in MA tables
 *
 * @see Math was observed at {link http://www.mass.gov/eohhs/docs/masshealth/deskguides/fpl-deskguide.pdf}
 * @see More notes on data at {link https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#}
 */
const moneyToWholeNum = function (val) {
  return Math.ceil(val);
};


/**
 * Turns a value into a float, limits it in between min and max, and
 *     makes sure to return a number (not NaN).
 */
const limit = function (initialVal, minMax) {
  // tested?

  // @todo Add trailing 0's somewhere
  var min = minMax.min,
      max = minMax.max;

  var raw   = parseFloat(initialVal),
      value = raw;

  if (typeof min === 'number' && !isNaN(min)) {
    value = Math.max(min, raw);
  }

  if (typeof max === 'number' && !isNaN(max)) {
    value = Math.min(max, raw);
  }

  if (isNaN(value)) {
    value = 0;
  }

  return value;
};  // End limit()


var toMonthlyAmount = {};

// @todo Use ./convert-by-timescale.js instead?

/** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */
toMonthlyAmount.weekly = function (evnt, weeklyVal) {

  var monthlyRaw  = weeklyVal * (4 + 1 / 3),
      monthly     = toMonthlyAmount[ 'monthly' ](evnt, monthlyRaw);
  return monthly;

};  // End toMonthlyAmount.weekly()

toMonthlyAmount.monthly = function (evnt, monthlyVal) {
  // Monthly is used for a lot of things and is the one we want to store
  var monthlyInBounds = limit(monthlyVal, { min: 0 });
  return monthlyInBounds;

};  // End toMonthlyAmount.monthly()

/** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */
toMonthlyAmount.yearly = function (evnt, yearlyVal) {

  var monthlyRaw  = (yearlyVal / 12),
      monthly     = toMonthlyAmount[ 'monthly' ](evnt, monthlyRaw);
  return monthly;

};  // End toMonthlyAmount.yearly()


export {
  sum,
  roundMoney,
  moneyToWholeNum,
  limit,
  toMonthlyAmount,
};
