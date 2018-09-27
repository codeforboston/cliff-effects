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

/** Looks at each array in an object, gets the
 *     last index of each, then adds those up 
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

/** Mutates `objectToFill` to add benefit values in
 * the format that we need them.
 *
 * @param {array} keys Contains keys to use on `sourceObject`.
 * @param {object} sourceObject Contains benefit keys that
 *      all have an array of numerical values (which are
 *      meant to be money values right now).
 * @param {int} Which item in each array should be used to
 *      accumulate values.
 * @param {objectToFill} Will be mutated. See example.
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
 *  benefit1: [ 80, 30 ],
 *  benefit2: [ 40, 10 ],
 * };
 * 
 * let index = 1;
 * 
 * let summaryData = {};
 * 
 * fillInMoneyValues(keys, accumulated, index, summaryData);
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
 * @returns {undefined}
 */
var fillInMoneyValues = (keys, sourceObject, index, objectToFill) => {
  // Item names can be `income` or benefit keys
  for (let itemi = 0; itemi < keys.length; itemi++) {
    let itemKey = keys[ itemi ],
        amount  = sourceObject[ itemKey ][ index ];

    if (itemKey === `income`) {
      objectToFill.earned = amount;
    } else {
      objectToFill.benefits.push({
        label:  PROGRAM_CHART_VALUES[ itemKey ].name,
        amount: amount,
      });
      // Add up all benefits (we're not including income)
      objectToFill.benefitsTotal += amount;
    }
  }  // end for every item key name

  objectToFill.total = objectToFill.earned + objectToFill.benefitsTotal;

  return;
};  // End fillInMoneyValues()


var getBenefitData = function(client, itemsToCalculate) {

  /**
  result = {}
  get current data - {benefit: [c],}
  get future data - {benefit: [c, f],}
  result.c, result.f
  get all calcs
  if diff with current < 0
    get lowest/gain data:
    get next data - {benefit: [c, f, i1],}
    get all calcs
    if diff with current > 0, pop i1, done (f is lowest = fL)
      get next data - {benefit: [c, f, i1, i2],}
      if calcs with i1 > calcs with i2, pop i1, repeat
      if calcs with i2 < calcs with i1, pop i2, done (i1 is lowest = iL)
      result.l = iL
    while diff with current < 0
      get next data - {benefit: [c, f, iL, i1],}
      if calcs with i1 < 0, pop i1, repeat
  result.g = i1
  result: {c, f, iL?, iG?} + diff info for c and f
  */

  /* TEXT NEEDS
  now:
    earned and [benefitName, benefitAmount] and total all
  future:
    earned and [benefitName, benefitAmount] and total all
  diff:
    totalComingInDiff (totalFuture - totalCurrent)
  cliff:
    lowest in, earning then
    gain in, earning then
  */
  var clone  = cloneDeep(client),
      // This is the data we need in the groupings we need it
      result = {
        current: {
          earned:        0,
          benefits:      [],  // [{ label, amount }]
          benefitsTotal: 0,
          total:         0,
        },
        future: {
          earned:        0,
          benefits:      [],  // [{ label, amount }]
          benefitsTotal: 0,
          total:         0,
        },
        diff:   0,
        lowest: {},  // { total, earned, }
        gain:   {},  // { total, earned, }
      },
      rsltCurrent = result.current,
      rsltFuture  = result.future,
      accumulated = {},
      toCalculate = itemsToCalculate;

  // 1. Get current and future values
  var defaultProps = {
    activeBenefits: toCalculate,
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
  fillInMoneyValues(toCalculate, accumulated, 0, rsltCurrent);
  fillInMoneyValues(toCalculate, accumulated, 1, rsltFuture);

  // 3. Get difference between totals, partly to
  // see if we need to get cliff info.
  var diff    = rsltFuture.total - rsltCurrent.total;
  result.diff = diff;

  // 4. If implicit taxes > 100% (has dramatic cliff)
  if (diff < 0) {
    let nextTotal = null,
        lowest   = result.lowest,
        gain     = result.gain,
        income   = accumulated.income,
        currDiff = diff,
        prevDiff = diff;

    // 5. Find lowest point, if `future` isn't it already lowest
    while (currDiff <= prevDiff) {

      prevDiff  = currDiff;

      // Add up what we last accumulated
      nextTotal = totalLastItemsOfArraysInObject(accumulated);
      currDiff  = nextTotal - rsltCurrent.total;

      // If not first time and not an upturn
      if (currDiff < prevDiff) {
        lowest.total  = nextTotal;
        lowest.earned = income[ income.length - 1 ];
      }

      // Loop again and accumulate
      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);

    }  // ends while each raise brings in less money

    // 6. Maybe that last raise was enough
    gain.total = nextTotal;

    // 7. Otherwise, try getting raises till the client is making more money than they are now
    while (gain.total <= rsltCurrent.total) {

      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      // If has dramatic cliff, must have gain
      gain.total = totalLastItemsOfArraysInObject(accumulated);

    }  // ends while making less money than now
    gain.earned = income[ income.length - 1 ];

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
 */
const BenefitText = function ({ client, openFeedback, snippets }) {

  var itemsToCalculate = [ `income` ];
  // Benefits, in order of appearance
  // So can't wait till `.benefits` is an array of benefit names...
  if (client.current.hasSection8) {
    itemsToCalculate.push(`section8`);
  }
  if (client.current.hasSnap) {
    itemsToCalculate.push(`snap`);
  }

  var data = getBenefitData(client, itemsToCalculate);

  var {
    current,  // { earned, benefits: [{ label, amount }], benefitsTotal, total }
    future,   // same
    diff,
    lowest,   // { total, earned, }
    gain,     // { total, earned, }
  } = data;

  var round$ = function (number) {
    return toMoneyStr(Math.round(number)).replace(`.00`, ``);
  };

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

  // List of benefits list items
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
  }

  var summaryFuture = 
    `All added up, you might bring in about ` +
    `$${round$(future.total)} a month.`;

  // Feedback button
  var disclaimer = ([
    <span key = { `pre-ask` }>
      { snippets.i_warningMessage }
    </span>,
    <Button
      compact
      key     = { `ask` }
      size    = { `small` }
      onClick = { openFeedback }>
      { snippets.i_submitFeedback }
    </Button>,
  ]);

  var resultDescriptor = ` each month than you were before.`;
  if (diff > 0) {
    resultDescriptor = ` more` + resultDescriptor;
  } else if (diff < 0) {
    resultDescriptor = ` less` + resultDescriptor;
  }

  // If total coming in changes at all, describe how
  var sumText = `If this tool is right, you would be bringing in `;
  if (diff > 0 || diff < 0) {
    sumText += `$` + round$(Math.abs(future.total - current.total)) + resultDescriptor;
  } else {
    sumText += `the same as you were before.`;
  }

  // If there was a cliff
  var endOfCliffText = null;
  if (gain.total !== undefined) {
    endOfCliffText = `The tool says that if you can get to where you make ` +
      `$` + toMoneyStr(gain.earned) + ` a month, could bring in about ` +
      `$` + round$(gain.total - current.total) + ` more each month all together.`;  // more/less
  }

  // If their money coming in isn't at its lowest point already
  var lowestText = null;
  if (lowest.total !== undefined) {
    lowestText = `At the very lowest dip, when you get paid ` +
      `$` + toMoneyStr(lowest.earned) + ` a month, this tool says you would bring in ` +
      `$` + round$(Math.abs(lowest.total)) + ` a month less than you are now. It could be ` +
      // to get positive number (I think second one is correct)
      `$` + round$(current.total - lowest.total) + ` less a month, ` +
      `but then it could start getting better.`;
  }

  return (
    <div>
      {future.earned === current.earned ? (
        <div>
          <p>{ `There is no change in your household's pay, so there's no change in your benefits.` }</p>
        </div>
      ) : (
        itemsToCalculate.length === 1 ? (
          <p>{ `You're not getting any benefits, so there's nothing to calculate.` }</p>
        ) : (
          <div>

            {/* For styling, make sure `<p>` isn't last child */}
            <div>
              <Header>What could happen?</Header>
              <p>{ detailsNow } { disclaimer }</p>
              <p>{ detailsFuture }</p>
              <ul>
                { benefitList }
              </ul>
              <p>{ summaryFuture }</p>
              <span />
            </div>

            <div>
              <Header>What could it add up to?</Header>
              <p>{ sumText }</p>
              <span />
            </div>
            
            {endOfCliffText === null ? (
              `After this, this tool says you could keep bringing in more with each raise.`
            ) : (
              <div>
                <Header key = { `1` }>When could things get better?</Header>
                <p key = { `2` }>{ endOfCliffText }</p>
                <span />
              </div>
            )}

            {lowestText === null ? (
              null
            ) : (
              <div>
                <Header key = { `1` }>What more should I know?</Header>
                <p key = { `2` }>{ lowestText }</p>
                <span />
              </div>
            )}

            {diff <= 0 ? (
              <div>
                <hr />
                <p>If you're worried about this, please talk to a local social worker.</p>
              </div>
            ) : (
              null 
            )}
          </div>
        )
      )}

    </div>
  );
};


export { BenefitText };
