/**
 * Functions for making client values into values
 *     that users will see.
 */

const toMoneyStr = function (decimal) {
  return (decimal).toFixed(2);
};


export { toMoneyStr };
