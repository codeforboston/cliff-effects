/**
 * Functions for making client values into values
 *     that users will see.
 * @module
 */

// @todo Reduce duplication in money calculation and formatting
const toMoneyStr = function (decimal) {
  return (decimal).toFixed(2);
};


export { toMoneyStr };
