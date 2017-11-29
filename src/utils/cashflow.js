/** For all income and general cash flow getters and calculators
* 
* @todo Add checks for properties with messages for mistakes
* @todo Deal with expiration dates
* @todo Prune values now understood to be non-standard
*/

// DATA
import { UNEARNED_INCOME_SOURCES, CHILD_CARE_EXPENSES } from '../data/state/massachusetts/name-cores';

// ==================================
// DEDUCTIONS
// ==================================
/**
* Calculates various expenses based on form input
* Everything is monthly
*/
var expenses = {};

/** Total child and adult dependent costs (does not include child
* support paid out). Dependent = child or disabled adult
* 
* @function
* @param {object} client
* @param {string} timeframe - can be either 'current' or 'future'.
* 
* @returns {number} Total dependent care expenses
*/
expenses.dependentCare = function ( client, timeframe ) {
  var child = sumCashflow( client, timeframe, CHILD_CARE_EXPENSES ),
      /** @todo ADULT_CARE_EXPENSES */
      adult = 0; 
  return child + adult;
};  // End expenses.dependentCare()


// ==================================
// STRAIGHT UP INCOME
// ==================================

/** @todo description
* Monthly
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const getGrossUnearnedIncomeMonthly = function ( client, timeframe ) {
  return sumCashflow( client, timeframe, UNEARNED_INCOME_SOURCES );
};  // End getGrossUnearnedIncomeMonthly()


/**
* Total monthly earned and unearned income with no deductions or
* exclusions.
* 
* @function
* @param {object} client
* @param {string} timeframe - can be either 'current' or 'future'.
* 
* @returns {number} total earned and unearned monthly
* income with no deductions or exclusions.
*/
const getSimpleGrossIncomeMonthly = function ( client, timeframe ) {
  var earned    = client[ timeframe ].earned,
      unearned  = getGrossUnearnedIncomeMonthly( client, timeframe );
	return earned + unearned;
};  // End getSimpleGrossIncomeMonthly()


// ==================================
// INCOME HELPERS
// ==================================

/** @todo description
* Monthly
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const sumCashflow = function ( client, timeframe, props ) {
  var sum = 0;
  for (let namei = 0; namei < props.length; namei++) {
    sum += toCashflow( client, timeframe, props[ namei ] );  // if that prop exists, add it
  };
  return sum;
};  // End sumCashflow()


/** @todo description
* Monthly
* 
* @todo Create and normalize client object instead.
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const toCashflow = function ( client, timeframe, prop ) {
  return client[ timeframe ][ prop ] || 0;
};  // End toCashflow()


export {
  expenses,
  getSimpleGrossIncomeMonthly, getGrossUnearnedIncomeMonthly,
  toCashflow, sumCashflow
};
