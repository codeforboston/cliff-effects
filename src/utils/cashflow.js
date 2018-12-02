/** For all income and general cash flow getters and calculators
* 
* @todo Add checks for properties with messages for mistakes
* @todo Deal with expiration dates
*/

// LOGIC
import { sum, pick, values } from 'lodash';

// DATA
import {
  UNEARNED_INCOME_SOURCES,
  UNDER13_CARE_EXPENSES,
  OVER12_CARE_EXPENSES,
  ALL_MEDICAL_EXPENSES,
  NON_TRANSPORT_DEPENDENT_COSTS,
  TRANSPORT_DEPENDENT_COSTS,
  HOMEOWNER_COSTS,
} from '../data/massachusetts/name-cores';

// ==================================
// DEPENDENTS
// ==================================
/** 
 * Total MONTHLY dependent costs, including for those under and over
 *     the age of 13 (does not include child support paid out).
 *     Dependent = child or disabled adult
 * 
 * @function
 * @param {object} client - `current` or `future` property of client data
 * 
 * @returns {number} - Total dependent care expenses
 */
const getDependentCostsMonthly = function (client) {
  let props = UNDER13_CARE_EXPENSES.concat(OVER12_CARE_EXPENSES);
  return sumProps(client, props);
};


/**
 * Client's total MONTHLY costs for dependents under 13
 *     (does not include child support paid out).
 * 
 * @function
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getUnder13Expenses = function (client) {
  return sumProps(client, UNDER13_CARE_EXPENSES);
};


const getOver12Expenses = function (client) {
  return sumProps(client, OVER12_CARE_EXPENSES);
};


const getMedicalExpenses = function (client) {
  return sumProps(client, ALL_MEDICAL_EXPENSES);
};


const getNonTransportCareCosts = function (client) {
  return sumProps(client, NON_TRANSPORT_DEPENDENT_COSTS);
};


const getTransportDependentCosts = function (client) {
  return sumProps(client, TRANSPORT_DEPENDENT_COSTS);
};


// ==================================
// OTHER EXPENSES
// ==================================
const getHousingCosts = function (client) {
  let housing = client.housing;
  if (housing === `homeless`) {
    return 0;
  } else if (housing === `voucher`) {
    return client.rentShare;
  } else if (housing === `renter`) {
    return client.rent;
  } else if (housing === `homeowner`) {
    return sumProps(client, HOMEOWNER_COSTS);
  }
};


// ==================================
// STRAIGHT UP INCOME
// ==================================

/** 
 * Gets sum of all unearned monthly income of given client.
 * 
 * @function
 * @param {object} client - `current` or `future` property of client data
 * 
 * @returns {number}
 */
const getGrossUnearnedIncomeMonthly = function (client) {
  return sumProps(client, UNEARNED_INCOME_SOURCES);
};


/**
 * Total monthly earned and unearned income with no deductions or
 *     exclusions.
 * 
 * @function
 * @param {object} client - `current` or `future` property of client data
 * 
 * @returns {number} - Total earned and unearned monthly
 *     income with no deductions or exclusions.
 */
const getSimpleGrossIncomeMonthly = function (client) {
  let earned   = client.earned,
      unearned = getGrossUnearnedIncomeMonthly(client);
  return earned + unearned;
};


// ==================================
// INCOME HELPERS
// ==================================

/** 
 * Returns the sum of the requested properties of of a given object
 * 
 * @function
 * @param {object} obj - Has the properties named in `props` with number values.
 * @param {array} props - The names of some properties in `obj` with number values.
 * 
 * @returns {number}
 */
const sumProps = function (obj, props) {
  return sum(values(pick(obj, props)));
};


export {
  getDependentCostsMonthly,
  getUnder13Expenses,
  getOver12Expenses,
  getMedicalExpenses,
  getNonTransportCareCosts,
  getTransportDependentCosts,
  getHousingCosts,
  getSimpleGrossIncomeMonthly,
  getGrossUnearnedIncomeMonthly,
  sumProps,
};
