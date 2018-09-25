// REACT COMPONENTS
import React from 'react';
import { Header } from 'semantic-ui-react';

// CUSTOM
import { renderIfTrue } from '../../components/renderIfTrue';

// DATA
// Colors and text for parts of the chart
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';

// DATA MANIPULATION
import { cloneDeep } from 'lodash';
import { toMoneyStr } from '../../utils/prettifiers';

// BENEFIT LOGIC
import { getSNAPBenefits } from '../../programs/federal/snap';
import { getSection8Benefit } from '../../programs/massachusetts/section8';
import { applyAndPushBenefits } from '../../programs/applyAndPushBenefits';


var INCOME_MONTHLY_INCREMENT_AMOUNT = 50;  // About a 25 cent raise in monthly amount for 40hrs/week?


var getBenefits = function (clientToMutate) {

  var clone   = clientToMutate,
      current = clone.current;

  var sec8Current = 0,
      sec8Future  = 0,
      SNAPCurrent = 0,
      SNAPFuture  = 0;

  if (current.hasSection8) {
    sec8Current = getSection8Benefit(clone, 'current');
    sec8Future  = getSection8Benefit(clone, 'future');
    // Mutate clone for correct SNAP values
    clone.future.rentShare = (clone.future.contractRent - sec8Future);
  }

  if (current.hasSnap) {
    SNAPCurrent = getSNAPBenefits(clone, 'current');
    SNAPFuture  = getSNAPBenefits(clone, 'future');
  }

  var result = {
    section8: {
      current: sec8Current,
      future:  sec8Future,
    },
    snap: {
      current: SNAPCurrent,
      future:  SNAPFuture,
    },
  };

  return result;
};  // End getBenefits()


var getIncrementData = function (clientToMutate, toCalculate, accumulated) {

  var clone    = clientToMutate,  // shorter name
      current  = clone.current,
      {
        snap,
        section8,
      } = getBenefits(clone);

  // var futureCalcData = {
  //   toCalculate: toCalculate,
  //   dataToAddTo:    accumulated,
  //   clientToChange: clone,
  //   timeframe:      `future`,
  // };
  // applyAndPushBenefits (futureCalcData);

  var totalBenefitCurrent = section8.current + snap.current,
      totalBenefitFuture  = section8.future + snap.future,
      totalCurrent        = totalBenefitCurrent + current.earned,
      totalFuture         = totalBenefitFuture + clone.future.earned,
      totalDiff           = totalFuture - totalCurrent;

  var all = {
    currentEarned:       current.earned,
    futureEarned:        clone.future.earned,
    sec8Current:         section8.current,
    sec8Future:          section8.future,
    snapCurrent:         snap.current,
    snapFuture:          snap.future,
    totalBenefitCurrent: totalBenefitCurrent,
    totalBenefitFuture:  totalBenefitFuture,
    totalCurrent:        totalCurrent,
    totalFuture:         totalFuture,
    totalDiff:           totalDiff,
  };

  return all;
};  // End getIncrementData()


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


var getBenefitData2 = function(client) {

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
      // This is the data we need in the
      // groupings we need it
      result = {
        current: {
          income:        0,
          benefits:      [],  // [{ label, amount }]
          benefitsTotal: 0,
          total:         0,
        },
        future: {
          income:        0,
          benefits:      [],  // [{ label, amount }]
          benefitsTotal: 0,
          total:         0,
        },
        diff:   0,
        // `null` until defined for later test!
        lowest: null,  // { total, earned, }
        gain:   null,  // { total, earned, }
      },
      rsltCurrent = result.current,
      rsltFuture  = result.future,
      accumulated = {},
      toCalculate = [ `income` ];

  // Benefits, in order of appearance
  if (clone.current.hasSection8) {
    toCalculate.push(`section8`);
  }

  if (clone.current.hasSnap) {
    toCalculate.push(`snap`);
  }

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
      rsltCurrent.income = curr;
      rsltFuture.income  = futr;

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
  }
  rsltCurrent.total = rsltCurrent.income + rsltCurrent.benefitsTotal;
  rsltFuture.total  = rsltFuture.income  + rsltFuture.benefitsTotal;

  // 3. Get difference between totals, partly to
  // see if we need to get cliff info.
  result.diff  = rsltFuture.total - rsltCurrent.total;
  var diff = result.diff,
      // Really, has implicit taxes > 100%, which
      // isn't the same as a cliff.
      hasCliff = diff < 0;

  // Only done if there's a cliff
  if (hasCliff) {
    var low      = result.lowest = {},
        gain     = result.gain   = {},
        currDiff = diff,
        prevDiff = diff;
    // 4. Find lowest point, if `future` isn't it already
    while (currDiff <= prevDiff) {

      prevDiff = currDiff;

      clone.future.earned += INCOME_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      let newTotal = totalLastItemsOfArraysInObject(accumulated);
      
      currDiff   = newTotal - rsltCurrent.total;
      low.total  = newTotal;
      low.earned = accumulated.income[ accumulated.income.length - 1 ];
    }
    // 5. Try getting raises till the client is making more money than they are now
    while (currDiff <= 0) {

      clone.future.earned += INCOME_MONTHLY_INCREMENT_AMOUNT;
      applyAndPushBenefits(futureCalcData);
      let newTotal = totalLastItemsOfArraysInObject(accumulated);

      currDiff    = newTotal - rsltCurrent.total;
      gain.total  = newTotal;
      gain.earned = accumulated.income[ accumulated.income.length - 1 ];
    }
  }

  return result;
};  // End getBenefitData2()


var getBenefitData = function (client) {
  // Old
  var clone  = cloneDeep(client),
      toCalculate = [ `income` ];

  // Benefits, in order of appearance
  if (clone.current.hasSection8) {
    toCalculate.push(`section8`);
  }

  if (clone.current.hasSnap) {
    toCalculate.push(`snap`);
  } 

  var incrementData = getIncrementData(clone, toCalculate),  // needs better name
      dataIter      = cloneDeep(incrementData),
      //   lossAtLowest,
      //   earnedAtLowest,
      //   gain,  // Must be >= 0
      //   earnedAtGain,
      cliff         = {},
      prevLowest    = 0;

  // As long as the loss is bigger now than it was
  // with the previous pay raise
  while (dataIter.totalDiff <= prevLowest) {

    // Record the new lowest amount
    prevLowest = dataIter.totalDiff;
    if (prevLowest !== incrementData.totalDiff) {
      // Total money loss at lowest point in the future (positive number eventually)
      cliff.lossAtLowest = prevLowest * -1;
      cliff.earnedAtLowest = dataIter.futureEarned;
    }

    // Try getting more of a raise
    clone.future.earned += INCOME_MONTHLY_INCREMENT_AMOUNT;
    dataIter = getIncrementData(clone);
  }

  // (If you're at your lowest currently, don't
  // bother with the warning about the lowest dip.)

  // Try getting raises till the client is making money again
  while (dataIter.totalDiff < 0) {
    clone.future.earned += INCOME_MONTHLY_INCREMENT_AMOUNT;
    dataIter = getIncrementData(clone);
  }

  cliff.gain         = dataIter.totalDiff;
  cliff.earnedAtGain = dataIter.futureEarned;

  return { ...incrementData, cliff: cliff };

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

  var data  = getBenefitData(client);
  var data2 = getBenefitData2(client);

  var {
    currentEarned,
    futureEarned,
    sec8Current,
    sec8Future,
    snapCurrent,
    snapFuture,
    totalBenefitCurrent,
    totalBenefitFuture,
    totalCurrent,
    totalFuture,
    totalDiff,
    cliff,
  } = data;

  var {
    lossAtLowest,
    earnedAtLowest,
    gain,
    earnedAtGain,
  } = cliff;

  var currentD = data2.current,
      futureD  = data2.future,
      gain2    = data2.gain,
      {
        diff,
        lowest,
      } = data2;


  // result = {
  //   current: {
  //     income:        0,
  //     benefits:      [],  // [{ label, amount }]
  //     benefitsTotal: 0,
  //     total:         0,
  //   },
  //   future: {
  //     income:        0,
  //     benefits:      [],  // [{ label, amount }]
  //     benefitsTotal: 0,
  //     total:         0,
  //   },
  //   diff:   0,
  //   // `null` until defined for later test!
  //   lowest: null,  // { total, earned, }
  //   gain:   null,  // { total, earned, }
  // },

  var resultDescriptor = ` each month than you were before.`;
  console.log(totalDiff, diff);
  // if (totalDiff > 0) {
  if (totalDiff > 0 && diff > 0) {
    resultDescriptor = ` more` + resultDescriptor;
  // } else if (totalDiff < 0) {
  // if (totalDiff > 0 && diff > 0) {
  } else if (totalDiff < 0 && diff < 0) {
    resultDescriptor = ` less` + resultDescriptor;
  }

  var nowText = `Right now you earn ` +
    `$` + toMoneyStr(currentEarned) + ` (` + currentD.income + `) a month ` +
    `and your benefits come out to ` +
    `$` + toMoneyStr(sec8Current) + ` (` + currentD.benefits[ 0 ].label + currentD.benefits[ 0 ].amount + `) for Section 8 ` +
    `and ` +
    `$` + toMoneyStr(snapCurrent) + ` (` + currentD.benefits[ 1 ].label + currentD.benefits[ 1 ].amount + `) for SNAP ` +
    `each month. All together, you're bringing in ` +
    `$` + toMoneyStr(totalCurrent) + ` (` + currentD.total + `) a month.`;

  var futureText = `If your family's income changes to ` +
    `$` + toMoneyStr(futureEarned) + ` (` + futureD.income + `) a month then ` +
    `Section 8 will change to ` +
    `$` + toMoneyStr(sec8Future) + ` (` + futureD.benefits[ 0 ].label + futureD.benefits[ 0 ].amount + `) a month ` +
    `and ` +
    `SNAP will change to ` +
    `$` + toMoneyStr(snapFuture) + ` (` + futureD.benefits[ 1 ].label + futureD.benefits[ 1 ].amount + `) a month. ` +
    `That means that your total benefits will change from ` +
    `$` + toMoneyStr(totalBenefitCurrent) + ` (` + currentD.benefitsTotal + `) a month to ` +
    `$` + toMoneyStr(totalBenefitFuture) + ` (` + futureD.benefitsTotal + `) a month. ` +
    `All together, you'll bring in ` +
    `$` + toMoneyStr(totalFuture) + ` (` + futureD.total + `) a month. `;

  var sumText = ``;
  if ((totalDiff > 0 || totalDiff < 0) && (diff > 0 || diff < 0)) {
    sumText = `That means you'll be bringing in ` +
      `$` + toMoneyStr(Math.abs(totalDiff)) + ` (` + diff + `)` + resultDescriptor;
  }

  var endOfCliffText = ``;
  if (totalDiff <= 0 &&  diff <= 0) {
    endOfCliffText = `If you can get to where you make ` +
      `$` + toMoneyStr(earnedAtGain) + ` (` + gain2.earned + `) a month, ` +
      `you'll be bringing in ` +
      `$` + toMoneyStr(gain) + ` (` + toMoneyStr(gain2.total - currentD.total) + `) more each month all together.`;  // more/less
  }

  var lowestText = ``;
  if (typeof lossAtLowest === `number`) {
    lowestText = `At the very lowest dip, when you get paid ` +
      `$` + toMoneyStr(earnedAtLowest) + ` (` + lowest.earned + `) a month, ` +
      `you'll be bringing in ` +
      `$` + toMoneyStr(lossAtLowest) + ` (` + Math.abs(lowest.total) + `) a month less than you are now. It'll be ` +
      // to get positive number (I think second one is correct)
      `$` + toMoneyStr(totalCurrent - lossAtLowest) + ` (` + toMoneyStr(currentD.total - lowest.total) + `) less a month, but then it'll start getting better.`;
  }

  return (
    <div>
      {renderIfTrue (futureEarned === currentEarned,
        <div>
          <p>{ `There is no change in your income, so there's no change in your benefits.` }</p>
        </div>
      )}

      {renderIfTrue (futureEarned !== currentEarned,
        <div>

          <Header>What could happen?</Header>
          <p>{ nowText }</p>
          <p>{ futureText }</p>

          <Header>What could it add up to?</Header>
          <p>{ sumText }</p>

          {renderIfTrue(totalDiff <= 0,
            <div>
              <Header>When could things get better?</Header>
              <p>{ endOfCliffText }</p>
            </div>
          )}

          {renderIfTrue(typeof lossAtLowest === `number`,
            <div>
              <Header>What more should I know?</Header>
              <p>{ lowestText }</p>
            </div>
          )}

          {renderIfTrue(totalDiff <= 0,
            <div>
              <br />
              <p>If you're worried about this, please talk to a local case manager.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export { BenefitText };
