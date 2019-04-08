/** Deals with client values that are dependent
 *     on other client values. All side effect
 *     functions return objects to be added to
 *     new state.
 */

// @todo US State specific?

const empty = function () {
  return {};
};


// Only changes future values
const applyRaise = function (client, timeframe) {
  // Never change current value based on raise
  if (timeframe === `current`) {
    return {};
  }

  let newStateProps = { earned: client.current.earned + client.future.raise };
  return newStateProps;
};


const earnedBecauseOfChildCare = function (client, timeframe) {
  let clientPartial = client[ timeframe ],
      sum = (
        clientPartial.childDirectCare +
        clientPartial.childBeforeAndAfterSchoolCare +
        clientPartial.childTransportation +
        clientPartial.childOtherCare
      );

  if (sum === 0) {
    return { earnedBecauseOfChildCare: 0 };
  } else {
    return {};
  }
};

const earnedBecauseOfAdultCare = function (client, timeframe) {
  let clientPartial = client[ timeframe ];
  if (clientPartial.disabledAssistance === 0) {
    return { earnedBecauseOfAdultCare: 0 };
  } else {
    return {};
  }
};


const sideEffects = {
  // Income
  raise:                         applyRaise,
  // Expenses
  childDirectCare:               earnedBecauseOfChildCare,
  childBeforeAndAfterSchoolCare: earnedBecauseOfChildCare,
  childTransportation:           earnedBecauseOfChildCare,
  childOtherCare:                earnedBecauseOfChildCare,
  disabledAssistance:            earnedBecauseOfAdultCare,
};


const getSideEffects = function (client, timeframe, itemID) {
  let func = sideEffects[ itemID ] || empty;
  return func(client, timeframe);
};


export {
  sideEffects,
  empty,
  applyRaise,
  earnedBecauseOfChildCare,
  earnedBecauseOfAdultCare,
  getSideEffects,
};
