// REACT COMPONENTS
import React from 'react';
import { Header } from 'semantic-ui-react';

// CUSTOM
import { renderIfTrue } from '../../components/renderIfTrue';

// DATA MANIPULATION
import { cloneDeep } from 'lodash';
import { toMoneyStr } from '../../utils/prettifiers';

// BENEFIT LOGIC
import { getSNAPBenefits } from '../../programs/federal/snap';
import { getSection8Benefit } from '../../programs/massachusetts/section8';


var INCREMENT_AMOUNT = 50;  // About a 25 cent raise in monthly amount for 40hrs/week?


var getBenefits = function (clientToMutate) {

  var clone   = clientToMutate,
      current = clone.current;

  var sec8Current = 0,
      sec8Future  = 0,
      SNAPCurrent = 0,
      SNAPFuture  = 0;

  if (current.hasSection8) {
    sec8Current = Math.round(getSection8Benefit(clone, 'current'));
    sec8Future  = Math.round(getSection8Benefit(clone, 'future'));
    // Mutate clone for correct SNAP values
    clone.future.rentShare = (clone.future.contractRent - sec8Future);
  }

  if (current.hasSnap) {
    SNAPCurrent = Math.round(getSNAPBenefits(clone, 'current'));
    SNAPFuture  = Math.round(getSNAPBenefits(clone, 'future'));
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


var getIncrementData = function (clientToMutate) {

  var clone   = clientToMutate,
      current = clone.current,
      {
        snap,
        section8,
      } = getBenefits(clone);

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


var getBenefitData = function (client) {

  var clone         = cloneDeep(client),
      incrementData = getIncrementData(clone),  // needs better name
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
    clone.future.earned += INCREMENT_AMOUNT;
    dataIter = getIncrementData(clone);
  }

  // (If you're at your lowest currently, don't
  // bother with the warning about the lowest dip.)

  // Try getting raises till the client is making money again
  while (dataIter.totalDiff < 0) {
    clone.future.earned += INCREMENT_AMOUNT;
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
  var data = getBenefitData(client);

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

  var resultDescriptor = ` each month than you were before.`;
  if (totalDiff > 0) {
    resultDescriptor = ` more` + resultDescriptor;
  } else if (totalDiff < 0) {
    resultDescriptor = ` less` + resultDescriptor;
  }

  var nowText = `Right now you earn ` +
    `$` + toMoneyStr(currentEarned) + ` a month ` +
    `and your benefits come out to ` +
    `$` + toMoneyStr(sec8Current) + ` for Section 8 ` +
    `and ` +
    `$` + toMoneyStr(snapCurrent) + ` for SNAP ` +
    `each month. All together, you're bringing in ` +
    `$` + toMoneyStr(totalCurrent) + ` a month.`;

  var futureText = `If your family's income changes to ` +
    `$` + toMoneyStr(futureEarned) + ` a month then ` +
    `Section 8 will change to ` +
    `$` + toMoneyStr(sec8Future) + ` a month ` +
    `and ` +
    `SNAP will change to ` +
    `$` + toMoneyStr(snapFuture) + ` a month. ` +
    `That means that your total benefits will change from ` +
    `$` + toMoneyStr(totalBenefitCurrent) + ` a month to ` +
    `$` + toMoneyStr(totalBenefitFuture) + ` a month. ` +
    `All together, you'll bring in ` +
    `$` + toMoneyStr(totalFuture) + ` a month. `;

  var sumText = ``;
  if (totalDiff > 0 || totalDiff < 0) {
    sumText = `That means you'll be bringing in ` +
      `$` + toMoneyStr(Math.abs(totalDiff)) + resultDescriptor;
  }

  var endOfCliffText = ``;
  if (totalDiff <= 0) {
    endOfCliffText = `If you can get to where you make ` +
      `$` + toMoneyStr(earnedAtGain) + ` a month, ` +
      `you'll be bringing in ` +
      `$` + toMoneyStr(gain) + ` each month all together.`;
  }

  var lowestText = ``;
  if (typeof lossAtLowest === `number`) {
    lowestText = `At the very lowest dip, when you get paid ` +
      `$` + toMoneyStr(earnedAtLowest) + ` a month, ` +
      `you'll be bringing in ` +
      `$` + toMoneyStr(lossAtLowest) + ` a month less than you are now. It'll be ` +
      `$` + toMoneyStr(totalCurrent - lossAtLowest) + ` a month, but then it'll start getting better.`;
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
