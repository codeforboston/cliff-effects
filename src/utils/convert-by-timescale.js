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
let toYearlyFrom = function (amount, startTimescale) {
  
  let converted = amount;

  if (startTimescale === `weekly`) {
    converted = amount * 52;
  } else if (startTimescale === `monthly`) {
    converted = amount * 12;
  } else if (startTimescale === `yearly`) {
    // do nothing
  }

  return converted;
};


/** Returns `amount` converted from whatever 'timescale' it was before
 *     to a monthly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {string} startTimescale - timescale of the original
 *     value. Can be 'weekly', 'monthly', or 'yearly'.
 */
let toMonthlyFrom = function (amount, startTimescale) {
  
  let converted = amount;

  if (startTimescale === `weekly`) {
    converted = amount * (4 + (1 / 3));
  } else if (startTimescale === `monthly`) {
    // do nothing
  } else if (startTimescale === `yearly`) {
    converted = amount / 12;
  }

  return converted;
};


/** Returns `amount` converted from whatever 'timescale' it was before
 *     to a weekly amount
 *
 * @param {number} amount - numeric value to be converted
 * @param {string} startTimescale - timescale of the original
 *     value. Can be 'weekly', 'monthly', or 'yearly'.
 */
let toWeeklyFrom = function (amount, startTimescale) {
  
  let converted = amount;

  if (startTimescale === `weekly`) {
    // do nothing
  } else if (startTimescale === `monthly`) {
    converted = amount / (4 + (1 / 3));
  } else if (startTimescale === `yearly`) {
    converted = amount * 52;
  }

  return converted;
};

let timescaleMultipliers = {};

timescaleMultipliers.fromYearly = {
  Weekly:  1 / 12 / (4 + 1 / 3),
  Monthly: 1 / 12,
  Yearly:  1,
};

timescaleMultipliers.fromMonthly = {
  Weekly:  1 / (4 + 1 / 3),
  Monthly: 1,
  Yearly:  12,
};

timescaleMultipliers.fromWeekly = {
  Weekly:  1,
  Monthly: (4 + 1 / 3),
  Yearly:  52,
};


export {
  toYearlyFrom,
  toMonthlyFrom,
  toWeeklyFrom,
  timescaleMultipliers,
};
