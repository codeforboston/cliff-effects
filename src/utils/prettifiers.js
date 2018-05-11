/**
 * Functions for making client values into values
 *     that users will see.
 */

/** @todo Put code from #226 in here */
const toMoneyStr = function (decimal) {
  return (decimal).toFixed(2);
};


export {
  toMoneyStr,
};
