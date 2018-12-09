/** @module */

// REACT COMPONENTS
import React from 'react';
import {
  Header,
  Button,
} from 'semantic-ui-react';

// DATA
// Colors and text for parts of the chart
import { BENEFIT_CHART_VALUES } from './BENEFIT_CHART_VALUES';

// DATA MANIPULATION
import { cloneDeep } from 'lodash';
import { toMoneyStr } from '../../utils/prettifiers';

// BENEFIT LOGIC
import { applyAndPushBenefits } from '../../benefits/applyAndPushBenefits';


const EARNED_MONTHLY_INCREMENT_AMOUNT = 50;  // About a 25 cent raise in monthly amount for 40hrs/week?


/** Rounds money values, turns them into money-formatted
 *     strings, then removes trailing '.00'
 *
 * @param {number} number Number to round and format
 * @returns {string}
 */
let round$ = function (number) {
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
let totalLastItemsOfArraysInObject = function (accumulated) {
  let total = 0;
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
 * @param {object} sourceObject MUST CONTAIN `earned` property!
 *     Contains `earned` and benefit keys that each have an
 *     array of numerical values (which are meant to be money
 *     values right now).
 * @param {array} sourceObject.earned Earned income values.
 * @param {int} Which item in each array should be used to
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
let fillInMoneyValues = (keys, sourceObject, index) => {

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
 *     'earned' as the first value, so it's not a list
 *     of 'benefit programs' per se.
 *
 * @example
 * // NOTE: an example with a lower dip hasn't been found yet
 * // This example uses the sample `client` data from row 3,
 * // column 'clientData' here:
 * // https://docs.google.com/spreadsheets/d/15LyR9yELAfcngj-c7vMdI630b6DwuuXV-dQEJDvU4gE/edit?usp=sharing
 * var items = [ 'earned', 'section8', 'snap' ];
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
let getBenefitData = function(client, resourceKeys) {

  let clone  = cloneDeep(client),
      // This is the data we need in the groupings we need it
      result = {
        current:  null,  // current money values,
        future:   null,  // future money values,
        diff:     0,
        recovery: {},  // { total, earned, }
      },
      accumulated = {};

  // 1. Get current and future values
  let defaultProps = {
    activeBenefits: resourceKeys,
    dataToAddTo:    accumulated,
    clientToChange: clone,
    timeframe:      `current`,
  };

  let currentCalcData = defaultProps;
  applyAndPushBenefits(currentCalcData);
  let futureCalcData = { ...defaultProps, timeframe: `future` };
  applyAndPushBenefits(futureCalcData);
  // Now have: { earned: [c, f], n: [c, f], ... }

  // 2. Get totals
  // Fill earned values for both current and future earned objects
  result.current = fillInMoneyValues(resourceKeys, accumulated, 0);
  result.future  = fillInMoneyValues(resourceKeys, accumulated, 1);
  let resultCurr = result.current,
      resultFutr = result.future;

  // 3. Get difference between totals, partly to
  // see if we need to get cliff info.
  result.diff = resultFutr.total - resultCurr.total;

  // 4. If implicit taxes > 100% (has dramatic cliff)
  let recoveryAmount = 0,
      earned         = accumulated.earned;
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
    result.recovery.earned = earned[ earned.length - 1 ];

  }  // ends if hit dramatic cliff (implicit taxes > 100%)

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
const Summary = function ({ client, openFeedback, translations }) {

  const resourceKeys = [
    `earned`,
    ...client.current.benefits,
  ];

  // Really quick returns if other calcs not needed
  if (resourceKeys.length <= 1) {
    return translations.i_noBenefitsChosen;
  }
  if (client.future.earned === client.current.earned) {
    return translations.i_noFutureChange;
  }


  // Otherwise do some logic magic!
  let data = getBenefitData(client, resourceKeys);

  let {
    current,  // { earned, benefits: [{ label, amount }], benefitsTotal, total }
    future,   // same
    diff,
    recovery, // { total, earned, }
  } = data;

  // ==================  
  // WARNING: WHITESPACE IS VERY IMPORTANT HERE. Read about JSX whitespace.
  // ==================
  // Hmm, don't like having `<p>`s up here. Page structure not clear in return value.

  // `<span>`s to avoid repeating React keys

  // "What could happen?"
  let detailsNow = (
    <p>
      <span>{translations.i_nowEarn} {translations.i_beforeMoneyWithTime}{toMoneyStr(current.earned)} {translations.i_eachTimeInterval}</span>
      <span>{` `} {translations.i_nowBenefitsTotalIs} {translations.i_beforeMoneyWithTime}{round$(current.benefitsTotal)}{translations.i_period}</span>
      <span>{` `} {translations.i_nowTotalIs} {translations.i_beforeMoneyWithTime}{round$(current.total)} {translations.i_eachTimeInterval}{translations.i_period}</span>
    </p>
  );

  let detailsFuture = (
    <p>
      <span>{translations.i_newEarn} {translations.i_beforeMoneyWithTime}{toMoneyStr(future.earned)} {translations.i_eachTimeInterval}</span>
      <span>{` `} {translations.i_newBenefitsTotalIs} {translations.i_beforeMoneyWithTime}{round$(future.benefitsTotal)} {translations.i_eachTimeInterval}{translations.i_period}</span>
      <span>{` `} {translations.i_newBenefitDetailsIntro}</span>
    </p>
  );

  // List of benefits html list items
  let benefitList = [];
  let numBenefits = current.benefits.length;
  for (let benefiti = 0; benefiti < numBenefits; benefiti++) {

    let cBenefit = current.benefits[ benefiti ],
        fBenefit = future.benefits[ benefiti ];

    benefitList.push(
      <li key={ cBenefit.label }>
        <span>{cBenefit.label} {translations.i_from} {translations.i_beforeMoneyWithTime}{round$(cBenefit.amount)}</span>
        <span>{` `} {translations.i_to} {translations.i_beforeMoneyWithTime}{round$(fBenefit.amount)} {translations.i_eachTimeInterval}{translations.i_period}</span>
      </li>
    );
  }  // ends for each benefit

  // Ask for feedback
  // Stays put when printing. A take-home hint
  // that the tool is still a prototype
  let feedbackAsk = (
    <p>
      <span key={ `pre-ask` }>{ translations.i_feedbackAsk }</span>
      <Button
        compact
        key     = { `ask` }
        size    = { `small` }
        onClick = { openFeedback }>
        { translations.i_submitFeedback }
      </Button>
    </p>
  );

  // Describe how totals change
  let posDiff    = round$(Math.abs(diff)),
      lessOrMore = ``;
  if (diff > 0) {
    lessOrMore = <span>{translations.i_resultIs} {translations.i_beforeMoneyWithTime}{posDiff} {translations.i_moreThan}</span>;
  } else if (diff < 0) {
    lessOrMore = <span>{translations.i_resultIs} {translations.i_beforeMoneyWithTime}{posDiff} {translations.i_lessThan}</span>;
  } else if (diff === 0) {
    lessOrMore = <span>{translations.i_resultIs} {translations.i_sameAs}</span>;
  }

  let summaryFuture = (
    <p>{translations.i_newTotalIs} {translations.i_beforeMoneyWithTime}{round$(future.total)} {translations.i_eachTimeInterval}{translations.i_period} {lessOrMore}</p>
  );

  let endOfCliffContent = translations.i_noCliff;
  // If there was a cliff, how much more will they have
  // to earn before they'll get more than they are now?
  if (recovery.total !== undefined) {
    endOfCliffContent = (
      <div>
        <div className={ `text-result-section` }>
          <Header>{translations.i_cliffEndHeader}</Header>
          <p>
            <span>{translations.i_ifGetTo} {translations.i_beforeMoneyWithTime}{round$(recovery.earned)} {translations.i_eachTimeInterval}</span>
            <span>{` `} {translations.i_willGet} {translations.i_beforeMoneyWithTime}{round$(recovery.total - current.total)}</span>
            <span>{` `} {translations.i_moreIn}</span>
          </p>
        </div>

        <hr />
        <p>{translations.i_findHelp}</p>
      </div>
    );
  }  // ends if there's a cliff end

  const print = function () {
    window.print();
  };

  return (
    <div>

      <div className={ `text-result-section` }>
        <Header>{translations.i_detailsHeader}</Header>
        { detailsNow }
        { detailsFuture }
        <ul>
          { benefitList }
        </ul>
        { feedbackAsk }
      </div>

      <div className={ `text-result-section` }>
        <Header>{translations.i_summaryHeader}</Header>
        { summaryFuture }
      </div>
      
      { endOfCliffContent }

      <div className={ `print-row` } >
        <Button
          className = { `print` }
          color     = { `teal` }
          onClick   = { print }>
          { translations.i_printButton }
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
