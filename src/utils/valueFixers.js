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
  m_age: returnSame,
  m_role: returnSame,
  m_disabled: returnSame,
  // MONEY AMOUNTS
  // Income
  earnedIncome: returnSame,
  TAFDC: returnSame,
  SSI: returnSame,
  SSDI: returnSame,
  childSupportIn: returnSame,
  unemployment: returnSame,
  workersComp: returnSame,
  pension: returnSame,
  socialSecurity: returnSame,
  alimony: returnSame,
  otherIncome: returnSame,
  incomeExclusions: returnSame,
  // Expenses
  childDirectCare: returnSame,
  childBeforeAndAfterSchoolCare: returnSame,
  childTransportation: returnSame,
  childOtherCare: returnSame,
  incomeEarnedBecauseOfChildCare: returnSame,
  childSupportPaidOut: returnSame,
  adultDirectCareCosts: returnSame,
  adultTransportationCosts: returnSame,
  adultOtherCareCosts: returnSame,
  disabledAssistance: returnSame,
  earnedIncomeBecauseOfAdultCare: returnSame,
  disabledMedicalCosts: returnSame,
  otherMedicalCosts: returnSame,
  /** @todo When client has section 8, switch this to 'housingVoucher' */
  shelter: returnSame,
  contractRent: returnSame,
  rentShare: returnSame,
  rent: returnSame,
  mortgage: returnSame,
  housingInsurance: returnSame,
  propertyTax: returnSame,
  climateControl: returnSame,
  nonHeatElectricity: returnSame,
  phone: returnSame,
  fuelAssistance: returnSame,
  otherExpenses: returnSame,

};  // end valueFixers


export { valueFixers };
