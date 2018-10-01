// REACT COMPONENTS
import React from 'react';
import { Header, Button } from 'semantic-ui-react';

// DATA
// Colors and text for parts of the chart
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';

// DATA MANIPULATION
import { cloneDeep } from 'lodash';
import { toMoneyStr } from '../../utils/prettifiers';

// BENEFIT LOGIC
import { applyAndPushBenefits } from '../../programs/applyAndPushBenefits';


var EARNED_MONTHLY_INCREMENT_AMOUNT = 50;  // About a 25 cent raise in monthly amount for 40hrs/week?


/** Rounds money values, turns them into money-formatted
 *     strings, then removes trailing '.00'
 *
 * @param {number} number Number to round and format
 * @returns {string}
 */
var round$ = function (number) {
  return toMoneyStr(Math.round(number)).replace(`.00`, ``);
};


/** Looks at each array in an object, gets the
 *     last element of each, then adds those up 
 *
 * @param {object} accumulated
 * @param {array} accumulated.n Array of numbers
 * 
 * @returns {number} Total of all last numbers
 */
var totalLastItemsOfArraysInObject = function (accumulated) {
  var total = 0;
  for (let arrayName in accumulated) {
    let array = accumulated[ arrayName ];
    total += array[ array.length - 1 ];
  }
  return total;
};

/** Returns values representing earned income and benefit
 *     amounts at the given index, as well as the sum of all
 *     those benefits and the sum of the earned income and
 *     those benefits.
 *
 * @param {array} keys Contains keys to use on `sourceObject`.
 * @param {object} sourceObject MUST CONTAIN `income` property!
 *     Contains `income` and benefit keys that each have an
 *     array of numerical values (which are meant to be money
 *     values right now).
 * @param {array} sourceObject.income Earned income values.
 * @param {int} Which item in each array should be used to
 *      accumulate values.
 *
 * @example
 * // In PROGRAM_CHART_VALUES.js
 * let PROGRAM_CHART_VALUES = {
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
 *  income:   [ 450, 500 ],
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
 * @note: Unfortunately, stll relies on an outside value -
 *     PROGRAM_CHART_VALUES.
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
var fillInMoneyValues = (keys, sourceObject, index) => {

  if (!Array.isArray(sourceObject.income)) {
    throw new TypeError(`The given resources object requires an 'income' property that is an array of numbers.`);
  }

  var moneyValues = {
    earned:        0,
    benefits:      [],  // [{ label, amount }]
    benefitsTotal: 0,
    total:         0,
  };

  // Item names can be `income` or benefit keys
  for (let itemKey of keys) {
    let amount = sourceObject[ itemKey ][ index ];

    if (itemKey === `income`) {
      moneyValues.earned = amount;
    } else {
      moneyValues.benefits.push({
        label:  PROGRAM_CHART_VALUES[ itemKey ].name,
        amount: amount,
      });
      // Add up all benefits (we're not including income)
      moneyValues.benefitsTotal += amount;
    }
  }  // ends for every item key name

  moneyValues.total = moneyValues.earned + moneyValues.benefitsTotal;

  return moneyValues;
};  // Ends fillInMoneyValues()


/** Uses benefit data getter and reformats it to
 *     a format useful for identifying cliffs.
 *
 * @todo: find all cliffs, not just the closest?
 * 
 * @param {object} client `client` data with
 *     both `current` and `future`.
 * @param {Array.<String>} resourceKeys List of...
 *     'programs'... in the order in which we eventually
 *     want to show them. It often also includes
 *     'income' as the first value, so it's not a list
 *     of 'benefit programs' per se.
 *
 * @example
 * // NOTE: an example with a lower dip hasn't been found yet
 * // This example uses the sample `client` data from row 3,
 * // column 'clientData' here:
 * // https://docs.google.com/spreadsheets/d/15LyR9yELAfcngj-c7vMdI630b6DwuuXV-dQEJDvU4gE/edit?usp=sharing
 * var items = [ 'income', 'section8', 'snap' ];
 * var data = getBenefitData(client, items);
 * console.log(data);
 * // {
 * //   current: {
 * //     benefits:[
 * //       { label: "Section 8 Housing", amount: 610 },
 * //       { label: "SNAP", amount: 49.93584000000004 },
 * //     ],
 * //     benefitsTotal: 659.9358400000001,
 * //     earned:        3398.1839999999997,
 * //     total:         4058.11984,
 * //   },
 * //   diff:   -43.873839999999745,
 * //   future: {
 * //     benefits: [
 * //       { label: "Section 8 Housing", amount: 607.402 }
 * //       { label: "SNAP", amount: 0 }
 * //     ],
 * //     benefitsTotal: 607.402,
 * //     earned:        3406.844,
 * //     total:         4014.246,
 * //   },
 * //   gain: { total: 4084.246, earned: 3506.844 },
 * // }
 *
 * @returns {object}
 */
var getBenefitData = function(client, resourceKeys) {

  var clone  = cloneDeep(client),
      // This is the data we need in the groupings we need it
      result = {
        current: null,  // current money values,
        future:  null,  // future money values,
        diff:    0,
        gain:    {},  // { total, earned, }
      },
      accumulated = {};

  // 1. Get current and future values
  var defaultProps = {
    activeBenefits: resourceKeys,
    dataToAddTo:    accumulated,
    clientToChange: clone,
    timeframe:      `current`,
  };
  var currentCalcData = defaultProps;
  applyAndPushBenefits(currentCalcData);
  var futureCalcData = { ...defaultProps, timeframe: `future` };
  applyAndPushBenefits(futureCalcData);
  // Now have: { income: [c, f], n: [c, f], ... }

  // 2. Get totals
  // Fill income values for both current and future income objects
  result.current = fillInMoneyValues(resourceKeys, accumulated, 0);
  result.future  = fillInMoneyValues(resourceKeys, accumulated, 1);
  var resultCurr  = result.current,
      resultFutr  = result.future;

  // 3. Get difference between totals, partly to
  // see if we need to get cliff info.
  result.diff = resultFutr.total - resultCurr.total;

  // 4. If implicit taxes > 100% (has dramatic cliff)
  let gainAmount = 0,
      income     = accumulated.income;
  if (result.diff <= 0) {
    // 5. The lowest point in their cliff is behind -
    // as is the nature of cliffs. Now try getting raises
    // till the client is once again making more money
    // than they are now
    while (gainAmount - resultCurr.total <= 0) {

      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      // If has dramatic cliff, must have gain
      gainAmount = totalLastItemsOfArraysInObject(accumulated);

    }  // ends while making less money than now
    result.gain.total  = gainAmount;
    result.gain.earned = income[ income.length - 1 ];

  }  // ends if hit dramatic cliff

  return result;
};  // Ends getBenefitData()


/** Plain text output of how benefits will be affected.
 *
 * @todo When implemented, add in the factor of total
 *     expenses. Some changes will have to happen to
 *     make the output more useful. If expenses are still
 *     covered, that should be pointed out, otherwise
 *     they should be told when their expenses will be
 *     covered again.
 * @todo Add link for how to find a case manager.
 * @todo Look even further forward and make sure there
 *     aren't more cliffs immediately after this round.
 * @todo When there's no cliff, look ahead to see if
 *     there will be one soon/later?
 *     'What more should I know?' section?
 * @todo Is there a program that has a very steep slope
 *     instead of a cliff? One where the losses grow over
 *     time for a while?
 */
const BenefitText = function ({ client, openFeedback, snippets }) {

  var resourceKeys = [ `income` ];
  // Benefits, in order of appearance
  // So can't wait till `.benefits` is an array of benefit names...
  if (client.current.hasSection8) {
    resourceKeys.push(`section8`);
  }
  if (client.current.hasSnap) {
    resourceKeys.push(`snap`);
  }


  // Really quick returns if other calcs not needed
  if (client.future.earned === client.current.earned) {
    return `There is no change in your household's pay, so there's no change in your benefits.`;
  }
  if (resourceKeys.length <= 1) {
    return `You're not getting any benefits, so there's nothing to calculate.`;
  }


  // Otherwise do some logic magic!
  var data = getBenefitData(client, resourceKeys);

  var {
    current,  // { earned, benefits: [{ label, amount }], benefitsTotal, total }
    future,   // same
    diff,
    gain,     // { total, earned, }
  } = data;

  // Localization-friendly description string for "What could happen?"
  var detailsNow =
  `Right now you earn $${toMoneyStr(current.earned)} a month ` +
  `and this tool says that your benefits all add up to about ` +
  `$${round$(current.benefitsTotal)}. All together, it says you ` +
  `bring in about $${round$(current.total)} a month.`;

  var detailsFuture =
  `If your household's pay changes to $${toMoneyStr(future.earned)} ` +
  `a month, this tool says your benefits might add up to about ` +
  `$${round$(future.benefitsTotal)} a month. ` +
  `This is how your benefits might change:`;

  // List of benefits html list items
  var benefitList = [];
  var numBenefits = current.benefits.length;
  for (let benefiti = 0; benefiti < numBenefits; benefiti++) {

    let cBenefit = current.benefits[ benefiti ],
        fBenefit = future.benefits[ benefiti ];

    benefitList.push(
      <li key = { cBenefit.label }>
        {
          `${cBenefit.label} might change from about ` +
          `$${round$(cBenefit.amount)} to about ` +
          `$${round$(fBenefit.amount)} a month.`
        }
      </li>
    );
  }  // ends for each benefit

  // Feedback button
  var disclaimer = ([
    <span key = { `pre-ask` }>
      { snippets.i_feedbackAsk }
    </span>,
    <Button
      compact
      key     = { `ask` }
      size    = { `small` }
      onClick = { openFeedback }>
      { snippets.i_submitFeedback }
    </Button>,
  ]);

  // Describe how totals change
  var posDiff    = round$(Math.abs(diff)),
      lessOrMore = ``;
  if (diff > 0) {
    lessOrMore = `That's $${posDiff} more than before.`;
  } else if (diff < 0) {
    lessOrMore = `That's $${posDiff} less than before.`;
  } else if (diff === 0) {
    lessOrMore = `That's the same as before`;
  }

  var summaryFuture = 
    `If this tool is right, you might bring in about ` +
    `$${round$(future.total)} a month. ${lessOrMore}`;

  // If there was a cliff, how much more will they have
  // to earn before they'll get more than they are now?
  var endOfCliffText = null;
  if (gain.total !== undefined) {
    endOfCliffText =
      `The tool says that if you can get to where your household makes about ` +
      `$${round$(gain.earned)} a month, you could bring in about ` +
      `$${round$(gain.total - current.total)} more each month all together.`;
  }

  return (
    <div>

      {/* For styling, make sure `<p>` isn't last child */}
      <div>
        <Header>What could happen?</Header>
        <p>{ detailsNow }</p>
        <p>{ detailsFuture }</p>
        <ul>
          { benefitList }
        </ul>
        <p>{ disclaimer }</p>
        <span />
      </div>

      <div>
        <Header>What could it add up to?</Header>
        <p>{ summaryFuture }</p>
        <span />
      </div>
      
      {endOfCliffText === null ? (
        `After this, the tool says you could keep bringing in more with each raise.`
      ) : (
        <div>
          <Header key = { `gain-header` }>When could things get better?</Header>
          <p key = { `gain-summary` }>{ endOfCliffText }</p>
          <span />
        </div>
      )}

      {diff <= 0 ? (
        <div>
          <hr />
          <p>If you're worried about this, please search for "social services" in your area to try to find a local case manager.</p>
        </div>
      ) : (
        null 
      )}
    </div>
  );
};  // Ends <BenefitText>


export {
  BenefitText,
  totalLastItemsOfArraysInObject,
  fillInMoneyValues,
  getBenefitData,  
};
