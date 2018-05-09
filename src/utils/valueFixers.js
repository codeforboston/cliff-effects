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

/** @todo Take regular bools out of here. */
const toBoolean = function ( value ) {
  if ( value === 'Yes' ) {
    return true;
  } else if ( value === 'No' ) {
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
  hasSection8:                    returnSame,
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
  climateControl:                 returnSame,
  nonHeatElectricity:             returnSame,
  phone:                          returnSame,
  fuelAssistance:                 toBoolean,

};  // end valueFixers


export { valueFixers, returnSame, stringToNumber, toBoolean };
