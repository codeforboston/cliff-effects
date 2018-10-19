/** Calculating and returning the right data table value by
 *     leveraging common data patterns we've seen so far.
 * @module
 */

import { moneyToWholeNum } from './math';

/** Calculate appropriate bracket/limit value (such as income
 *     limit) by number of relevant items (such as number of
 *     household members).
 * @function
 * 
 * ===============================================================
 *
 * WARNING: Be aware of what time scale (weekly, monthly or yearly) that
 *     your data uses so that you can convert to the right values.
 *
 * ===============================================================
 * 
 * @param {object} dataTable Object/data table to examine to get the
 *     bracket/limit value. Almost an array, having keys that are
 *     mostly ints.
 * @param {number} dataTable.n Key name would be a number to match up with
 *     a data table 'column'. For example, dataTable.3 could you the income
 *     limit value for a household with 3 members.
 * @param {number|function} dataTable.eachAdditional A column that's often
 *     in data tables. Usually an amount to add for each person or item
 *     over a maximum hard-coded limit to the other data table values.
 *     If getting that value is more complicated, it can be a function
 *     to calculate said amount based on number of extra items.
 * @param {number} numItems Number of items (for example, household size).
 * @param {number} [percent] Multiplies the result before sending it back.
 *     You'd pass in 100% as `100`.
 * 
 * @returns {number}
 * 
 * @example
 * var fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 16240,
 *    eachAdditional: 4180 };
 * getLimitBySize( fedPovertyGuidelines, 1 );  // 12060
 * getLimitBySize( fedPovertyGuidelines, 2 );  // 16240
 * getLimitBySize( fedPovertyGuidelines, 3 );  // 20420
 */
const getLimitBySize = function (dataTable, numItems, percent) {
  
  var safePercent    = percent || 100,
      limit          = null,
      maxBeforeExtra = getMaxIntKey(dataTable);

  // If we haven't gone over the maximum hard-coded number of items
  if (numItems <= maxBeforeExtra) {

    limit = dataTable[ numItems ];

  // If there are no number columns left on the table, see if there's
  // a way to handle amounts over the hard-coded last number of items
  // amount
  } else {

    var numExtra    = numItems - maxBeforeExtra,
        extraAmount = getExtraAmount(dataTable, numExtra);
    limit = dataTable[ maxBeforeExtra ] + extraAmount;

  }
  
  // The right kind of math as observed in MA dataTable tables
  return moneyToWholeNum(limit * (safePercent / 100));
};  // End getLimitBySize()


/** Returns the additional amount to add based on the number of extra
 *     items (e.g. household members).
 * @function
 *
 * @todo Are there tables in which there's a hard-coded amount
 *     that isn't supposed to be multiplied by the number of extra
 *     items?
 *
 * @param {object} dataTable Whole table is needed because sometimes
 *     dataTable.eachAdditional uses values in the table for its calcs.
 * @param {number|function} dataTable.eachAdditional Either a number
 *     value to add for each extra item or a function that will
 *     calculate that number.
 * @param {number} numExtra Number of extra items (for example,
 *     household members).
 * 
 * @returns {number}
 */
var getExtraAmount = function (dataTable, numExtra) {

  var extraAmount     = 0,
      eachAdditional  = dataTable.eachAdditional || function () {
        return 0;
      };

  // Either calculate extra amount based on number of extra items...
  if (typeof eachAdditional === 'function') {

    extraAmount = eachAdditional(dataTable, numExtra);

  // ...or multiply a hard-coded amount.
  } else {

    var overageRate = eachAdditional;
    extraAmount     = numExtra * overageRate;

  }

  return extraAmount;
};  // End getExtraAmount()


/** Of the keys in an object that can be converted to integers,
* return the highest value.
*/
var getMaxIntKey = function (data) {
  var max = 0;
  for (let key in data) {

    var asInt = parseInt(key, 10);
    if (!isNaN(asInt) && asInt > max) {
      max = asInt;
    }

  }
  return max;
};  // End getMaxIntKey()


export {
  getLimitBySize,
  getExtraAmount,
  getMaxIntKey,
};
