// REACT COMPONENTS
import React from 'react';
import { Header } from 'semantic-ui-react';

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


var getBenefitData = function(client, moneyToCalculate) {

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
      toCalculate = moneyToCalculate;

  var defaultProps = {
    activeBenefits: toCalculate,
    dataToAddTo:    accumulated,
    clientToChange: clone,
    timeframe:      `current`,
  };

  // 1. Get current and future values
  var currentCalcData = defaultProps;
  applyAndPushBenefits(currentCalcData);
  var futureCalcData = { ...defaultProps, timeframe: `future` };
  applyAndPushBenefits(futureCalcData);
  // Now have: { income: [c, f], n: [c, f] }

  // 2. Get totals
  let count   = 0;
  for (let itemName of toCalculate) {
    let amounts = accumulated[ itemName ],
        curr    = amounts[ 0 ],
        futr    = amounts[ 1 ];

    if (itemName === `income`) {
      rsltCurrent.earned = curr;
      rsltFuture.earned  = futr;

    } else {
      rsltCurrent.benefits[ count ] = {
        label:  PROGRAM_CHART_VALUES[ itemName ].name,
        amount: curr,
      };
      rsltCurrent.benefitsTotal += curr;

      rsltFuture.benefits[ count ] = {
        label:  PROGRAM_CHART_VALUES[ itemName ].name,
        amount: futr,
      };
      rsltFuture.benefitsTotal += futr;

      count++;  // Doesn't count `income`
    }
  }  // end for income and all benefits
  rsltCurrent.total = rsltCurrent.earned + rsltCurrent.benefitsTotal;
  rsltFuture.total  = rsltFuture.earned  + rsltFuture.benefitsTotal;

  // 3. Get difference between totals, partly to
  // see if we need to get cliff info.
  result.diff  = rsltFuture.total - rsltCurrent.total;
  var diff     = result.diff;

  // 4. If implicit taxes > 100% (has dramatic cliff)
  if (diff < 0) {
    var nextTotal = null,
        lowest   = result.lowest,
        gain     = result.gain,
        income   = accumulated.income,
        currDiff = diff,
        prevDiff = diff;

    // 5. Find lowest point, if `future` isn't it already lowest
    while (currDiff <= prevDiff) {

      prevDiff = currDiff;

      nextTotal = totalLastItemsOfArraysInObject(accumulated);
      currDiff = nextTotal - rsltCurrent.total;

      // If not first time
      if (prevDiff !== diff) {
        lowest.total  = nextTotal;
        lowest.earned = income[ income.length - 1 ];
      }

      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);

    }  // end while each raise brings in less money

    // 6. Maybe that last raise was enough
    gain.total = nextTotal;

    // 7. Otherwise, try getting raises till the client is making more money than they are now
    while (gain.total <= rsltCurrent.total) {

      clone.future.earned += EARNED_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      // If has dramatic cliff, must have gain
      gain.total = totalLastItemsOfArraysInObject(accumulated);

    }  // end while making less money than now
    gain.earned = income[ income.length - 1 ];

  }  // end if hit dramatic cliff

  return result;
};  // End getBenefitData()


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
const BenefitText = function ({ client, snippets }) {

  var itemsToCalculate = [ `income` ];
  // Benefits, in order of appearance
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
    diff,     // #
    lowest,   // { total, earned, }
    gain,     // { total, earned, }
  } = data;

  var round$ = function (number) {
    return toMoneyStr(Math.round(number)).replace(`.00`, ``);
  };

  var resultDescriptor = ` each month than you were before.`;
  if (diff > 0) {
    resultDescriptor = ` more` + resultDescriptor;
  } else if (diff < 0) {
    resultDescriptor = ` less` + resultDescriptor;
  }

  var nowText = `Right now you earn ` +
    `$` + round$(current.earned) + ` a month ` +
    `and your benefits come out to `;
  var futureText = `If your household's pay changes to ` +
    `$` + round$(future.earned) + ` a month then `;

  // Loop through benefits to add each one to the texts
  var numBenefits = current.benefits.length;
  for (let benefiti = 0; benefiti < numBenefits; benefiti++) {

    let cBenefit = current.benefits[ benefiti ],
        fBenefit = future.benefits[ benefiti ];

    nowText    += `$` + round$(cBenefit.amount) + ` for ` + cBenefit.label;
    futureText += fBenefit.label + ` will change to $` + round$(fBenefit.amount) + ` a month`;

    // 'Beneft 1, Benefit 2, and Benefit 3'
    let bridgeText = ``;
    // If any except last or second to last
    if (benefiti < numBenefits - 2) {
      bridgeText += `, `;
    } else {
      bridgeText += ` `;  // space before 'and' or before followup text
    }
    // If second to last
    if (benefiti === numBenefits - 2) {
      bridgeText += `and `;
    }

    nowText += bridgeText;
    futureText += bridgeText;
  }  // end for every benefit index

  // Text after all benefits have been described.
  nowText += `each month. All together, our calculations guess you bring in ` +
             `$` + round$(current.total) + ` a month.`;
  futureText += `. That means that your total benefits will change from ` +
    `$` + round$(current.benefitsTotal) + ` a month to ` +
    `$` + round$(future.benefitsTotal) + ` a month. ` +
    `All together, you'll bring in ` +
    `$` + round$(future.total) + ` a month. `;

  // If total coming in changes at all, describe how
  var sumText = `That means you'll be bringing in `;
  if (diff > 0 || diff < 0) {
    sumText += `$` + round$(Math.abs(diff)) + resultDescriptor;
  } else {
    sumText += `the same as you were before.`
  }

  // If there was a cliff
  var endOfCliffText = null;
  if (gain.total !== undefined) {
    endOfCliffText = `If you can get to where you make ` +
      `$` + toMoneyStr(gain.earned) + ` a month, you'll be bringing in about` +
      `$` + round$(gain.total - current.total) + ` more each month all together.`;  // more/less
  }

  // If their money coming in isn't at its lowest point already
  var lowestText = null;
  if (lowest.total !== undefined) {
    lowestText = `At the very lowest dip, when you get paid ` +
      `$` + toMoneyStr(lowest.earned) + ` a month, you'll be bringing in ` +
      `$` + round$(Math.abs(lowest.total)) + ` a month less than you are now. It'll be ` +
      // to get positive number (I think second one is correct)
      `$` + round$(current.total - lowest.total) + ` less a month, ` +
      `but then it'll start getting better.`;
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
              <p>{ nowText }</p>
              <p>{ futureText }</p>
              <span />
            </div>

            <div>
              <Header>What could it add up to?</Header>
              <p>{ sumText }</p>
              <span />
            </div>
            
            {endOfCliffText === null ? (
              `After this, it's possible you'll keep bringing in more with each raise.`
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
