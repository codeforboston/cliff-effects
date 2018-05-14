/**
 * Convert (usually money) amounts between weekly, monthly, and yearly amounts.
 */

/** Returns `amount` converted from whatever 'timescale' it was before
 *     to a yearly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {string} startTimescale - timescale of the original
 *     value. Can be 'weekly', 'monthly', or 'yearly'.
 */
var toYearlyFrom = function (amount, startTimescale) {
  
  var converted = amount;

  if (startTimescale === 'weekly') {
    converted = amount * 52;
  } else if (startTimescale === 'monthly') {
    converted = amount * 12;
  } else if (startTimescale === 'yearly') {
    // do nothing
  }

  return converted;
};  // End toYearlyFrom()


/** Returns `amount` converted from whatever 'timescale' it was before
 *     to a monthly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {string} startTimescale - timescale of the original
 *     value. Can be 'weekly', 'monthly', or 'yearly'.
 */
var toMonthlyFrom = function (amount, startTimescale) {
  
  var converted = amount;

  if (startTimescale === 'weekly') {
    converted = amount * (4 + (1 / 3));
  } else if (startTimescale === 'monthly') {
    // do nothing
  } else if (startTimescale === 'yearly') {
    converted = amount / 12;
  }

  return converted;
};  // End toMonthlyFrom()


/** Returns `amount` converted from whatever 'timescale' it was before
 *     to a weekly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {string} startTimescale - timescale of the original
 *     value. Can be 'weekly', 'monthly', or 'yearly'.
 */
var toWeeklyFrom = function (amount, startTimescale) {
  
  var converted = amount;

  if (startTimescale === 'weekly') {
    // do nothing
  } else if (startTimescale === 'monthly') {
    converted = amount / (4 + (1 / 3));
  } else if (startTimescale === 'yearly') {
    converted = amount * 52;
  }

  return converted;
};  // End toWeeklyFrom()


export {
  toYearlyFrom,
  toMonthlyFrom,
  toWeeklyFrom,
};
