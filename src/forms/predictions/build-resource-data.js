/** Functions used to rearrange resource data into useful formats
 * @module
 */

import { BENEFIT_CHART_VALUES } from './BENEFIT_CHART_VALUES';

/** Returns values representing earned income and benefit
 *     amounts at the given index, as well as the sum of all
 *     those benefits and the sum of the earned income and
 *     those benefits.
 *
 * @param {array} keys Contains keys to use on `sourceObject`.
 * @param {object} sourceObject MUST CONTAIN `earned` property!
 *     Contains `earned` and benefit keys that each have an
 *     array of numerical values (which are meant to be money
 *     values right now).
 * @param {array} sourceObject.earned Earned income values.
 * @param {int} index Which item in each array should be used to
 *      accumulate values.
 *
 * @example
 * // In BENEFIT_CHART_VALUES.js
 * let BENEFIT_CHART_VALUES = {
 *  benefit1: { name: "B1" },
 *  benefit2: { name: "B2" },
 * };
 * 
 * // In here
 * let keys = [
 *  'benefit1',
 *  'benefit2',
 * ];
 *
 * let accumulated = {
 *  earned:   [ 450, 500 ],
 *  benefit1: [ 80, 30 ],
 *  benefit2: [ 40, 10 ],
 * };
 * 
 * let index = 1;
 * 
 * var summaryData = fillInMoneyValues(keys, accumulated, index);
 * 
 * console.log(summaryData);
 * // {
 * //   earned: 500,
 * //   benefits: [
 * //     { label: "B1", amount: 30 },
 * //     { label: "B2", amount: 10 }
 * //   ],
 * //   benefitsTotal: 40,
 * //   total: 540,
 * // }
 * 
 * Unfortunately, stll relies on an outside value -
 *     BENEFIT_CHART_VALUES.
 * 
 * @typedef {object} benefit
 * @property {string} label Name to be displayed for the benefit
 * @property {number} amount Value of the benefit/subsidy
 *
 * @typedef {object} moneyValues
 * @property {number} earned Amount earned at a given index
 * @property {array.<benefit>} benefits
 * @property {number} benefitsTotal Sum of all benefit values at
 *     the given index
 * @property {number} total Sum of earned income and all benefits
 *     at the given index
 * 
 * @returns {object} moneyValues
 */
let benefitArrayDataToSingleData = (keys, sourceObject, index) => {

  if (!Array.isArray(sourceObject.earned)) {
    throw new TypeError(`The given resources object requires an 'earned' property that is an array of numbers.`);
  }

  let moneyValues = {
    earned:        0,
    benefits:      [],  // [{ label, amount }]
    benefitsTotal: 0,
    total:         0,
  };

  // Item names can be `earned` or benefit keys
  for (let itemKey of keys) {
    let amount = sourceObject[ itemKey ][ index ];

    if (itemKey === `earned`) {
      moneyValues.earned = amount;
    } else {
      moneyValues.benefits.push({
        label:  BENEFIT_CHART_VALUES[ itemKey ].name,
        amount: amount,
      });
      // Add up all benefits (we're not including earned income)
      moneyValues.benefitsTotal += amount;
    }
  }  // ends for every item key name

  moneyValues.total = moneyValues.earned + moneyValues.benefitsTotal;

  return moneyValues;
};  // Ends benefitArrayDataToSingleData()


export { benefitArrayDataToSingleData };
