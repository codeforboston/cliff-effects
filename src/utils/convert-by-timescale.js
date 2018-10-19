/** Convert (usually money) amounts between weekly, monthly, and yearly amounts.
 * @module
 */

/** Returns `amount` converted from whatever 'time interval' it was before
 *     to a yearly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {'weekly'|'monthly'|'yearly'} startTimeInterval - time interval of the original
 *     value.
 */
var toYearlyFrom = function (amount, startTimeInterval) {
  
  var converted = amount;

  if (startTimeInterval === 'weekly') {
    converted = amount * 52;
  } else if (startTimeInterval === 'monthly') {
    converted = amount * 12;
  } else if (startTimeInterval === 'yearly') {
    // do nothing
  }

  return converted;
};  // End toYearlyFrom()


/** Returns `amount` converted from whatever 'time interval' it was before
 *     to a monthly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {'weekly'|'monthly'|'yearly'} startTimeInterval - time interval of the original
 *     value.
 */
var toMonthlyFrom = function (amount, startTimeInterval) {
  
  var converted = amount;

  if (startTimeInterval === 'weekly') {
    converted = amount * (4 + (1 / 3));
  } else if (startTimeInterval === 'monthly') {
    // do nothing
  } else if (startTimeInterval === 'yearly') {
    converted = amount / 12;
  }

  return converted;
};  // End toMonthlyFrom()


/** Returns `amount` converted from whatever 'time interval' it was before
 *     to a weekly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {'weekly'|'monthly'|'yearly'} startTimeInterval - time interval of the original
 *     value.
 */
var toWeeklyFrom = function (amount, startTimeInterval) {
  
  var converted = amount;

  if (startTimeInterval === 'weekly') {
    // do nothing
  } else if (startTimeInterval === 'monthly') {
    converted = amount / (4 + (1 / 3));
  } else if (startTimeInterval === 'yearly') {
    converted = amount * 52;
  }

  return converted;
};  // End toWeeklyFrom()

/** Multiplication to do for each type of time interval conversion. */
var timescaleMultipliers = {};

timescaleMultipliers.fromYearly = {
  'Weekly':  1 / 12 / (4 + 1 / 3),
  'Monthly': 1 / 12,
  'Yearly':  1,
};

timescaleMultipliers.fromMonthly = {
  'Weekly':  1 / (4 + 1 / 3),
  'Monthly': 1,
  'Yearly':  12,
};

timescaleMultipliers.fromWeekly = {
  'Weekly':  1,
  'Monthly': (4 + 1 / 3),
  'Yearly':  52,
};


export {
  toYearlyFrom,
  toMonthlyFrom,
  toWeeklyFrom,
  timescaleMultipliers,
};
