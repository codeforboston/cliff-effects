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
 * Unfortunately, stll relies on an outside value -
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
 * //   recovery: { total: 4084.246, earned: 3506.844 },
 * // }
 *
 * @returns {object}
 */
var getBenefitData = function(client, resourceKeys) {

  var clone  = cloneDeep(client),
      // This is the data we need in the groupings we need it
      result = {
        current:  null,  // current money values,
        future:   null,  // future money values,
        diff:     0,
        recovery: {},  // { total, earned, }
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
  let recoveryAmount = 0,
      income         = accumulated.income;
  if (result.diff <= 0) {
    // 5. The lowest point in their cliff is behind -
    // as is the nature of cliffs. Now try getting raises
    // till the client is making more money than they are now
    while (recoveryAmount - resultCurr.total <= 0) {

      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      // If has dramatic cliff, must have recovery
      recoveryAmount = totalLastItemsOfArraysInObject(accumulated);

    }  // ends while making less money than now
    result.recovery.total  = recoveryAmount;
    result.recovery.earned = income[ income.length - 1 ];

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
const Summary = function ({ client, openFeedback, snippets }) {

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
  if (resourceKeys.length <= 1) {
    return snippets.i_noBenefitsChosen;
  }
  if (client.future.earned === client.current.earned) {
    return snippets.i_noFutureChange;
  }


  // Otherwise do some logic magic!
  var data = getBenefitData(client, resourceKeys);

  var {
    current,  // { earned, benefits: [{ label, amount }], benefitsTotal, total }
    future,   // same
    diff,
    recovery, // { total, earned, }
  } = data;

  var sn = snippets;

  // ==================  
  // WARNING: WHITESPACE IS VERY IMPORTANT HERE. Read about JSX whitespace.
  // ==================
  // Hmm, don't like having `<p>`s up here. Page structure not clear in return value.

  // "What could happen?"
  var detailsNow = (
    <p>
      {sn.i_nowEarn} {sn.i_beforeMoney}{toMoneyStr(current.earned)} {sn.i_eachTimeInterval}
      {` `} {sn.i_nowBenefitsTotalIs} {sn.i_beforeMoney}{round$(current.benefitsTotal)}{sn.i_period}
      {` `} {sn.i_nowTotalIs} {sn.i_beforeMoney}{round$(current.total)} {sn.i_eachTimeInterval}{sn.i_period}
    </p>
  );

  var detailsFuture = (
    <p>
      {sn.i_newEarn} {sn.i_beforeMoney}{toMoneyStr(future.earned)} {sn.i_eachTimeInterval}
      {` `} {sn.i_newBenefitsTotalIs} {sn.i_beforeMoney}{round$(future.benefitsTotal)} {sn.i_eachTimeInterval}{sn.i_period}
      {` `} {sn.i_newBenefitDetailsIntro}
    </p>
  );

  // List of benefits html list items
  var benefitList = [];
  var numBenefits = current.benefits.length;
  for (let benefiti = 0; benefiti < numBenefits; benefiti++) {

    let cBenefit = current.benefits[ benefiti ],
        fBenefit = future.benefits[ benefiti ];

    benefitList.push(
      <li key = { cBenefit.label }>
        {cBenefit.label} {sn.i_from} {sn.i_beforeMoney}{round$(cBenefit.amount)}
        {` `} {sn.i_to} {sn.i_beforeMoney}{round$(fBenefit.amount)} {sn.i_eachTimeInterval}{sn.i_period}
      </li>
    );
  }  // ends for each benefit

  // Ask for feedback
  // Stays put when printing. A take-home hint
  // that the tool is still a prototype
  var feedbackAsk = (
    <p>
      <span key = { `pre-ask` }>
        { snippets.i_feedbackAsk }
      </span>
      <Button
        compact
        key     = { `ask` }
        size    = { `small` }
        onClick = { openFeedback }>
        { snippets.i_submitFeedback }
      </Button>
    </p>
  );

  // Describe how totals change
  var posDiff    = round$(Math.abs(diff)),
      lessOrMore = ``;
  if (diff > 0) {
    lessOrMore = <span>{sn.i_resultIs} {sn.i_beforeMoney}{posDiff} {sn.i_moreThan}</span>;
  } else if (diff < 0) {
    lessOrMore = <span>{sn.i_resultIs} {sn.i_beforeMoney}{posDiff} {sn.i_lessThan}</span>;
  } else if (diff === 0) {
    lessOrMore = <span>{sn.i_resultIs} {sn.i_sameAs}</span>;
  }

  var summaryFuture = (
    <p>{sn.i_newTotalIs} {sn.i_beforeMoney}{round$(future.total)} {sn.i_eachTimeInterval}{sn.i_period} {lessOrMore}</p>
  );

  var endOfCliffContent = sn.i_noCliff;
  // If there was a cliff, how much more will they have
  // to earn before they'll get more than they are now?
  if (recovery.total !== undefined) {
    endOfCliffContent = (
      <div>
        <div className = { `text-result-section` }>
          <Header>{sn.i_cliffEndHeader}</Header>
          <p>
            {sn.i_ifGetTo} {sn.i_beforeMoney}{round$(recovery.earned)} {sn.i_eachTimeInterval}
            {` `} {sn.i_willGet} {sn.i_beforeMoney}{round$(recovery.total - current.total)}
            {` `} {sn.i_moreIn}
          </p>
        </div>

        <hr />
        <p>{sn.i_findHelp}</p>
      </div>
    );
  }  // ends if there's a cliff end

  const print = function () {
    window.print();
  };

  return (
    <div>

      <div className = { `text-result-section` }>
        <Header>{sn.i_detailsHeader}</Header>
        { detailsNow }
        { detailsFuture }
        <ul>
          { benefitList }
        </ul>
        { feedbackAsk }
      </div>

      <div className = { `text-result-section` }>
        <Header>{sn.i_summaryHeader}</Header>
        { summaryFuture }
      </div>
      
      { endOfCliffContent }

      <div className={ `print-row` } >
        <Button
          className = { `print` }
          color     = { `teal` }
          onClick   = { print }>
          { sn.i_printButton }
        </Button>
      </div>

    </div>
  );
};  // Ends <Summary>


export {
  Summary,
  totalLastItemsOfArraysInObject,
  fillInMoneyValues,
  getBenefitData,  
};
