/**
 * Transformers for transforming client
 * values into valid values.
 * @module
 */

import { isNumberlike } from './validators';


const returnSame = function (newVal, state) {
  return newVal;
};


const toBoolean = function (value) {
  if (value === `Yes`) {
    return true;
  } else if (value === `No`) {
    return false;
  } else if (typeof(value) === `boolean`) {
    return value;
  } else {
    return null;
  }
};

/** Given a number or a string representing a number, returns
 *     a number. Needs both because it's used in setting valid
 *     client values. Cash values will come in as numbers because
 *     they have to be converted to monthly values. Other number
 *     values, like age, will still be strings.
 *
 * @param {number|string} numberOrString
 * @returns {number}
 */
const toNumber = function (numberOrString) {

  let trueOrError = isNumberlike(numberOrString);

  if (trueOrError instanceof Error) {
    throw (trueOrError);
  }

  return Number(numberOrString);
};


/** For every client property and nested property. */
const valueFixers = {
  // Current programs
  benefits:                      returnSame,
  // Household
  household:                     returnSame,
  m_age:                         returnSame,  // to positive int (validate in component?)
  m_role:                        returnSame,
  m_disabled:                    returnSame,
  // MONEY AMOUNTS
  // Income
  earned:                        toNumber,
  TAFDC:                         toNumber,
  SSI:                           toNumber,
  SSDI:                          toNumber,
  childSupportIn:                toNumber,
  unemployment:                  toNumber,
  workersComp:                   toNumber,
  pension:                       toNumber,
  socialSecurity:                toNumber,
  alimony:                       toNumber,
  otherIncome:                   toNumber,
  incomeExclusions:              toNumber,
  // Expenses
  childDirectCare:               toNumber,
  childBeforeAndAfterSchoolCare: toNumber,
  childTransportation:           toNumber,
  childOtherCare:                toNumber,
  earnedBecauseOfChildCare:      toNumber,
  childSupportPaidOut:           toNumber,
  adultDirectCare:               toNumber,
  adultTransportation:           toNumber,
  adultOtherCare:                toNumber,
  disabledAssistance:            toNumber,
  earnedBecauseOfAdultCare:      toNumber,
  disabledMedical:               toNumber,
  otherMedical:                  toNumber,
  // @todo When client has section 8, switch this to 'housingVoucher'
  housing:                       returnSame,
  contractRent:                  toNumber,
  rentShare:                     toNumber,
  rent:                          toNumber,
  mortgage:                      toNumber,
  housingInsurance:              toNumber,
  propertyTax:                   toNumber,
  climateControl:                returnSame,
  nonHeatElectricity:            returnSame,
  phone:                         returnSame,
  fuelAssistance:                toBoolean,
  otherExpensesFood:             toNumber,
  otherExpensesUtilities:        toNumber,
  otherExpensesCable:            toNumber,
  otherExpensesMedical:          toNumber,
  otherExpensesTransport:        toNumber,
  otherExpensesCareProducts:     toNumber,
  otherExpensesClothes:          toNumber,
  otherExpensesPhone:            toNumber,
  otherExpensesEntertainment:    toNumber,
  otherExpensesOther:            toNumber,
  wantsToSeeOtherExpenses:       toBoolean,

};  // end valueFixers


export {
  valueFixers,
  returnSame,
  toNumber,
  toBoolean,
};
