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
//   if ( value === 'yes' ) {
//     return true;
//   } else if ( value === 'no' ) {
//     return false;
//   } else if ( typeof( value ) === 'boolean' ) {
//     return value;
//   } else {
//     return null;
//   }
};

// const stringToNumber = function ( str ) {
//   return Number( str );
// };

/**
 * For every client property and
 * nested property.
 */
const valueFixers = {
  // Current programs
  hasSnap: returnSame,
  hasHousing: returnSame,
  // Household
  household: returnSame,
  m_age: returnSame,  // to positive int
  m_role: returnSame,
  m_disabled: returnSame,
  // MONEY AMOUNTS
  // Income
  /** @todo All incomes need transformation */
  earned: returnSame,  // to money
  TAFDC: returnSame,  // to money
  SSI: returnSame,  // to money
  SSDI: returnSame,  // to money
  childSupportIn: returnSame,  // to money
  unemployment: returnSame,  // to money
  workersComp: returnSame,  // to money
  pension: returnSame,  // to money
  socialSecurity: returnSame,  // to money
  alimony: returnSame,  // to money
  otherIncome: returnSame,  // to money
  incomeExclusions: returnSame,  // to money
  // Expenses
  childDirectCare: returnSame,  // to money
  childBeforeAndAfterSchoolCare: returnSame,  // to money
  childTransportation: returnSame,  // to money
  childOtherCare: returnSame,  // to money
  incomeEarnedBecauseOfChildCare: returnSame,  // to money
  childSupportPaidOut: returnSame,  // to money
  adultDirectCare: returnSame,  // to money
  adultTransportation: returnSame,  // to money
  adultOtherCare: returnSame,  // to money
  disabledAssistance: returnSame,  // to money
  earnedBecauseOfAdultCare: returnSame,  // to money
  disabledMedical: returnSame,  // to money
  otherMedical: returnSame,  // to money
  /** @todo When client has section 8, switch this to 'housingVoucher' */
  shelter: returnSame,
  contractRent: returnSame,  // money
  rentShare: returnSame,  // money
  rent: returnSame,  // to money
  mortgage: returnSame,  // to money
  housingInsurance: returnSame,  // to money
  propertyTax: returnSame,  // to money
  hasClimateControl: returnSame,
  nonHeatElectricity: returnSame,
  phone: returnSame,
  hasFuelAssistance: returnSame,  // to bool
  otherExpenses: returnSame,  // money

};  // end valueFixers


export { valueFixers };
