/** For different kinds of math operations we need, some unconventional
 * @module
 */

const sum = function (vals) {
  let total = 0;
  for (let vali = 0; vali < vals.length; vali++) {
    total += vals[ vali ];
  };
  return total;
};


const roundMoney = function (val) {
  // Only round values for display. In actual calculations and
  // storage objects, keep things exact. Also, this doesn't restrict
  // to two decimal places. Do that in the input's attributes.
  return (Math.round(val * 100) / 100); // val = '' returns 0
};


/** This is how we've seen it done in MA tables
 *
 * @see Math was observed at {link http://www.mass.gov/eohhs/docs/masshealth/deskguides/fpl-deskguide.pdf}
 * @see More notes on data at {link https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#}
 * @todo Implement US State specific rounding? Benefit program-specific?
 */
const moneyToWholeNum = function (val) {
  return Math.ceil(val);
};


/**
 * Turns a value into a float, limits it in between min and max, and
 *     makes sure to return a number (not NaN).
 */
const limit = function (initialVal, minMax) {

  // @todo Add trailing 0's somewhere
  let min = minMax.min,
      max = minMax.max;

  let raw   = parseFloat(initialVal),
      value = raw;

  if (typeof min === `number` && !isNaN(min)) {
    value = Math.max(min, raw);
  }

  if (typeof max === `number` && !isNaN(max)) {
    value = Math.min(max, raw);
  }

  if (isNaN(value)) {
    value = 0;
  }

  return value;
};


let toMonthlyAmount = {};

/** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */
toMonthlyAmount.weekly = function (evnt, weeklyVal) {

  let monthlyRaw = weeklyVal * (4 + 1 / 3),
      monthly    = toMonthlyAmount.monthly(evnt, monthlyRaw);
  return monthly;

};


toMonthlyAmount.monthly = function (evnt, monthlyVal) {
  // Monthly is used for a lot of things and is the one we want to store
  let monthlyInBounds = limit(monthlyVal, { min: 0 });
  return monthlyInBounds;

};


/** For what we used to guide the math of what counts as a month,
 *     @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9}
 */
toMonthlyAmount.yearly = function (evnt, yearlyVal) {

  let monthlyRaw = (yearlyVal / 12),
      monthly    = toMonthlyAmount.monthly(evnt, monthlyRaw);
  return monthly;

};


export {
  sum,
  roundMoney,
  moneyToWholeNum,
  limit,
  toMonthlyAmount,
};
