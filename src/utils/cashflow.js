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
  OVER12_CARE_EXPENSES
} from '../data/massachusetts/name-cores';

// ==================================
// DEDUCTIONS
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
const getDependentCostsMonthly = function ( client ) {
  var props = UNDER13_CARE_EXPENSES.concat( OVER12_CARE_EXPENSES );
  return sumProps( client, props );
};  // End getDependentCostsMonthly()


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
const getGrossUnearnedIncomeMonthly = function ( client ) {
  return sumProps( client, UNEARNED_INCOME_SOURCES );
};  // End getGrossUnearnedIncomeMonthly()


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
const getSimpleGrossIncomeMonthly = function ( client ) {
  var earned    = client.earned,
      unearned  = getGrossUnearnedIncomeMonthly( client );
	return earned + unearned;
};  // End getSimpleGrossIncomeMonthly()


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
const sumProps = function ( obj, props ) {
  return sum( values(pick( obj, props )) );
};  // End sumProps()


export {
  getDependentCostsMonthly,
  getSimpleGrossIncomeMonthly,
  getGrossUnearnedIncomeMonthly,
  sumProps
};
