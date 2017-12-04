/**
 * Transformers for transforming client
 * values into valid values.
 */

/**
 * Reused Functionality
 */
const returnSame = function ( newVal, state ) {
  return newVal;
};

const toBoolean = function ( value ) {
  if ( value === 'yes' ) {
    return true;
  } else if ( value === 'no' ) {
    return false;
  } else if ( typeof( value ) === 'boolean' ) {
    return value;
  } else {
    return null;
  }
};

const stringToNumber = function ( str ) {
  return Number( str );
};

/**
 * For every client property and
 * nested property.
 */
const valueFixers = {
  // Current programs
  hasSnap:                        returnSame,
  hasHousing:                     returnSame,
  // Household
  household:                      returnSame,
  m_age:                          returnSame,  // to positive int (validate in component?)
  m_role:                         returnSame,
  m_disabled:                     returnSame,
  // MONEY AMOUNTS
  // Income
  /** @todo All incomes need transformation */
  earned:                         stringToNumber,
  TAFDC:                          stringToNumber,
  SSI:                            stringToNumber,
  SSDI:                           stringToNumber,
  childSupportIn:                 stringToNumber,
  unemployment:                   stringToNumber,
  workersComp:                    stringToNumber,
  pension:                        stringToNumber,
  socialSecurity:                 stringToNumber,
  alimony:                        stringToNumber,
  otherIncome:                    stringToNumber,
  incomeExclusions:               stringToNumber,
  // Expenses
  childDirectCare:                stringToNumber,
  childBeforeAndAfterSchoolCare:  stringToNumber,
  childTransportation:            stringToNumber,
  childOtherCare:                 stringToNumber,
  earnedBecauseOfChildCare:       stringToNumber,
  childSupportPaidOut:            stringToNumber,
  adultDirectCare:                stringToNumber,
  adultTransportation:            stringToNumber,
  adultOtherCare:                 stringToNumber,
  disabledAssistance:             stringToNumber,
  earnedBecauseOfAdultCare:       stringToNumber,
  disabledMedical:                stringToNumber,
  otherMedical:                   stringToNumber,
  /** @todo When client has section 8, switch this to 'housingVoucher' */
  shelter:                        returnSame,
  contractRent:                   stringToNumber,
  rentShare:                      stringToNumber,
  rent:                           stringToNumber,
  mortgage:                       stringToNumber,
  housingInsurance:               stringToNumber,
  propertyTax:                    stringToNumber,
  hasClimateControl:              returnSame,
  nonHeatElectricity:             returnSame,
  phone:                          returnSame,
  hasFuelAssistance:              toBoolean,
  otherExpenses:                  stringToNumber,

};  // end valueFixers


export { valueFixers, returnSame, stringToNumber, toBoolean };
