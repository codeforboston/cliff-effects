/** Functions to add up and/or return client props values for
 *     commonly used money categories.
 * @module
 */
// @todo Add checks for properties with messages for mistakes

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

/** Adds up MONTHLY dependent costs, including for those under and over
 *     the age of 13. **Does not include child support paid out.**
 *     Dependent = child or disabled adult.
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number} - Total dependent care expenses
 */
const getDependentCostsMonthly = function (client) {
  var props = UNDER13_CARE_EXPENSES.concat(OVER12_CARE_EXPENSES);
  return sumProps(client, props);
};  // End getDependentCostsMonthly()


/** Adds up MONTHLY costs for dependents under 13.
 *     **Does not include child support paid out.**
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getUnder13Expenses = function (client) {
  return sumProps(client, UNDER13_CARE_EXPENSES);
};  // End getUnder13Expenses()


/** Adds up MONTHLY costs for dependents over 13.
 *     **Does not include child support paid out.**
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getOver12Expenses = function (client) {
  return sumProps(client, OVER12_CARE_EXPENSES);
};  // End getOver13Expenses()


/** Adds up MONTHLY costs for medical expenses.
 * @function
 *
 * @todo Validate what items count as medical expenses.
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getMedicalExpenses = function (client) {
  return sumProps(client, ALL_MEDICAL_EXPENSES);
};  // End getMedicalExpenses()


/** Adds up MONTHLY NON-transportation costs for all dependents.
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getNonTransportCareCosts = function (client) {
  return sumProps(client, NON_TRANSPORT_DEPENDENT_COSTS);
};  // End getNonTransportationCareCosts()


/** Adds up MONTHLY transportation costs for all dependents.
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getTransportDependentCosts = function (client) {
  return sumProps(client, TRANSPORT_DEPENDENT_COSTS);
};  // End getTransportDependentCosts()


// ==================================
// OTHER EXPENSES
// ==================================

/** Returns MONTHLY housing costs depending on the kind of housing
 *     the client has.
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getHousingCosts = function (client) {
  var housing = client.housing;
  if (housing === `homeless`) {
    return 0;
  } else if (housing === `voucher`) {
    return client.rentShare;
  } else if (housing === `renter`) {
    return client.rent;
  } else if (housing === `homeowner`) {
    return sumProps(client, HOMEOWNER_COSTS);
  }
};  // End getHousingCosts()


// ==================================
// STRAIGHT UP INCOME
// ==================================

/** Adds up all the types of unearned MONTHLY income.
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getGrossUnearnedIncomeMonthly = function (client) {
  return sumProps(client, UNEARNED_INCOME_SOURCES);
};  // End getGrossUnearnedIncomeMonthly()


/** Adds up monthly earned and unearned income with no deductions or
 *     exclusions (which tend to be specific to each program).
 * @function
 *
 * @param {object} client - `current` or `future` property of client data
 * @returns {number}
 */
const getSimpleGrossIncomeMonthly = function (client) {
  var earned    = client.earned,
      unearned  = getGrossUnearnedIncomeMonthly(client);
  return earned + unearned;
};  // End getSimpleGrossIncomeMonthly()


// ==================================
// INCOME HELPERS
// ==================================

/** Returns the sum of the requested list of properties of of a given object.
 * @function
 *
 * @param {object} obj - Has the properties named in `props`. Each one's value must be a number.
 * @param {array} props - The names of some properties in `obj` with number values.
 * 
 * @returns {number}
 */
const sumProps = function (obj, props) {
  // @todo Explore how to run a check on the value of each prop
  // to give an error or warning if the value is not a number.
  return sum(values(pick(obj, props)));
};  // End sumProps()


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
