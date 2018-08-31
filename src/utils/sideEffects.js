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
  // Current programs
  hasSnap:                       empty,
  hasSection8:                   empty,
  // Household
  household:                     empty,
  m_age:                         empty,  // to positive int (validate in component?)
  m_role:                        empty,
  m_disabled:                    empty,
  // MONEY AMOUNTS
  // Income
  /** @todo All incomes need transformation */
  earned:                        empty,
  TAFDC:                         empty,
  SSI:                           empty,
  SSDI:                          empty,
  childSupportIn:                empty,
  unemployment:                  empty,
  workersComp:                   empty,
  pension:                       empty,
  socialSecurity:                empty,
  alimony:                       empty,
  otherIncome:                   empty,
  incomeExclusions:              empty,
  // Expenses
  childDirectCare:               earnedBecauseOfChildCare,
  childBeforeAndAfterSchoolCare: earnedBecauseOfChildCare,
  childTransportation:           earnedBecauseOfChildCare,
  childOtherCare:                earnedBecauseOfChildCare,
  earnedBecauseOfChildCare:      empty,
  childSupportPaidOut:           empty,
  adultDirectCare:               empty,
  adultTransportation:           empty,
  adultOtherCare:                empty,
  disabledAssistance:            earnedBecauseOfAdultCare,
  earnedBecauseOfAdultCare:      empty,
  disabledMedical:               empty,
  otherMedical:                  empty,
  /** @todo When client has section 8, switch this to 'housingVoucher' */
  housing:                       empty,
  contractRent:                  empty,
  rentShare:                     empty,
  rent:                          empty,
  mortgage:                      empty,
  housingInsurance:              empty,
  propertyTax:                   empty,
  climateControl:                empty,
  nonHeatElectricity:            empty,
  phone:                         empty,
  fuelAssistance:                empty,
  otherExpensesFood:             empty,
  otherExpensesUtilities:        empty,
  otherExpensesCable:            empty,
  otherExpensesMedical:          empty,
  otherExpensesTransport:        empty,
  otherExpensesCareProducts:     empty,
  otherExpensesClothes:          empty,
  otherExpensesPhone:            empty,
  otherExpensesEntertainment:    empty,
  otherExpensesOther:            empty,
  wantsToSeeOtherExpenses:       empty,

};  // end valueFixers


export { sideEffects };
