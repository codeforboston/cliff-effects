/** Deals with client values that are dependent
 *     on other client values. All side effect
 *     functions return objects to be added to
 *     new state.
 */

// @todo US State specific?

const empty = function () {
  return {};
};


const earnedBecauseOfChildCare = function (clientPartial) {
  let sum = (
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

const earnedBecauseOfAdultCare = function (clientPartial) {
  if (clientPartial.disabledAssistance === 0) {
    return { earnedBecauseOfAdultCare: 0 };
  } else {
    return {};
  }
};


const sideEffects = {
  // Expenses
  childDirectCare:               earnedBecauseOfChildCare,
  childBeforeAndAfterSchoolCare: earnedBecauseOfChildCare,
  childTransportation:           earnedBecauseOfChildCare,
  childOtherCare:                earnedBecauseOfChildCare,
  disabledAssistance:            earnedBecauseOfAdultCare,
};


const getSideEffects = function (clientPartial, itemID) {
  let func = sideEffects[ itemID ] || empty;
  return func(clientPartial);
};


export {
  sideEffects,
  empty,
  earnedBecauseOfChildCare,
  earnedBecauseOfAdultCare,
  getSideEffects,
};
