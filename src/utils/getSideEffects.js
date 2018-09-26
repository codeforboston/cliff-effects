/** Deals with client values that are dependent
 *     on other client values. All side effect
 *     functions return objects to be added to
 *     new state.
 */


const empty = function () {
  return {};
};


const earnedBecauseOfChildCare = function (clientPartial) {
  var sum = (
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
};  // end sideEffects


const getSideEffects = function (clientPartial, itemID) {
  var func = sideEffects[ itemID ] || empty;
  return func(clientPartial);
};  // End getSideEffects();


export {
  sideEffects,
  empty,
  earnedBecauseOfChildCare,
  earnedBecauseOfAdultCare,
  getSideEffects,
};
