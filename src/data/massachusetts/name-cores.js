/** Arrays of names which can act as a base off of which
* to build client property keys
* 
* @example var gross = client[ timeframe + base + 'Monthly' ];
*/

const UNEARNED_INCOME_SOURCES = [
  'TAFDC',
  'SSI',
  'SSDI',
  'childSupportIn',
  'unemployment',
  'workersComp',
  'pension',
  'socialSecurity',
  'alimony',
  'otherIncome', 
];

const UNDER13_CARE_EXPENSES = [
  'childDirectCare',
  'childBeforeAndAfterSchoolCare',
  'childTransportation',
  'childOtherCare',
];

const OVER12_CARE_EXPENSES = [
  'adultDirectCare',
  'adultTransportation',
  'adultOtherCare',
];

/** @todo Convert all to this later, but will have
 *    to generate new SNAP test cases because the
 *    strings they check against have the array
 *    elements in a different order.
 */
const UNDER13_NON_TRANSPORT_CARE = [
  `childDirectCare`,
  `childBeforeAndAfterSchoolCare`,
  `childOtherCare`,
];
const UNDER13_TRANSPORT      = [ `childTransportation` ];
// const UNDER13_CARE_EXPENSES = UNDER13_NON_TRANSPORT_CARE.concat(UNDER13_TRANSPORT);

const OVER12_NON_TRANSPORT_CARE = [
  `adultDirectCare`,
  `adultOtherCare`,
];
const OVER12_TRANSPORT      = [ `adultTransportation` ];
// const OVER12_CARE_EXPENSES = OVER12_NON_TRANSPORT_CARE.concat(OVER12_TRANSPORT);

const NON_TRANSPORT_DEPENDENT_COSTS = UNDER13_NON_TRANSPORT_CARE.concat(OVER12_NON_TRANSPORT_CARE);
const TRANSPORT_DEPENDENT_COSTS     = UNDER13_TRANSPORT.concat(OVER12_TRANSPORT);

const DISABLED_CARE         = [ `disabledAssistance` ];
const ALL_MEDICAL_EXPENSES  = [
  `disabledMedical`,
  `otherMedical`,
].concat(DISABLED_CARE);


export {
  UNEARNED_INCOME_SOURCES,
  UNDER13_CARE_EXPENSES,
  OVER12_CARE_EXPENSES,
  UNDER13_TRANSPORT,
  OVER12_TRANSPORT,
  TRANSPORT_DEPENDENT_COSTS,
  NON_TRANSPORT_DEPENDENT_COSTS,
  DISABLED_CARE,
  ALL_MEDICAL_EXPENSES,
};
