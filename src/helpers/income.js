import { UNEARNED_INCOME_SOURCES } from '../data/state/massachusetts/name-cores';

/** For all income and general cash flow getters and calculators
* 
* @todo Add checks for properties with messages for mistakes
* @todo Deal with expiration dates
*/

// ==================================
// DEDUCTIONS
// ==================================
/**
* Calculates various deductions based on form input
* Everything is monthly
* or
* var getDeduction = {};
* getDeduction.medical = function ( client ) {};
* Example of use: getDeduction[ 'medical' ]( client );
*/
var deductions = {};

/** 
* @todo add table to data: (@see §364.400(A) -
* look up table for standard deductions)
*/
deductions.standard = function ( client ) {
};  // End deductions.standard()


/** 
* @todo add table to data: (@see §364.400(B) -
* percent amount times earned income)
*/
deductions.earnedIncome = function ( client ) {
};  // End deductions.earnedIncome()


/** 
* @todo Find source of these amounts add add to data.
* Standard $155 deduction allowed if medical expenses are $35-$190/month.
* Actual amount minus $35' allowed if over $190/mo.
*/
deductions.medical = function ( client ) {
};  // End deductions.medical()


/** Dependent = child or disabled adult
* Sum of:
* Direct Care Costs
* Before- and After-School Programs
* Transportation Costs
* Other
*/
deductions.dependentCare = function ( client ) {
};  // End deductions.dependentCare()


/** Just child support. Here for consistency and validation */
deductions.childSupportPayments = function ( client ) {
	// For now, no checks or anything. Fragile, but gets the job done.
	return client.currentChildSupportOutMonthly || client.previousChildSupportOutMonthly || 0;
};  // End deductions.childSupportPayments()


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
const getGrossUnearnedIncome = function ( client, timeframe ) {
  var cores = UNEARNED_INCOME_SOURCES,  // DO NOT ALTER THIS ARRAY
      sum   = 0;
  for (let namei = 0; namei < cores.length; namei++) {
    sum += client[ timeframe + cores[ namei ] + 'Monthly' ] || 0;  // if that prop exists, add it
  };
  return sum;
};  // End getGrossUnearnedIncome()

/**
* Calculates the gross monthly income based on client values
* This is the household gross monthly income.
* Derived from excel formulas from download made available here:
* {@link https://www.masslegalservices.org/content/online-snap-calculator}
* 
* @todo Add checks for properties with messages for mistakes
* @todo Does this return an instance of `Result`?
* 
* @function
* @todo @param
* `timeframe` can be either 'current' or 'previous'
* 
* @todo @returns
*/
const getGrossIncomeMonthly = function ( client, timeframe ) {
  /** @todo Add checks, validtators, and error messages */
  var earned    = client[ timeframe + 'EarnedIncomeMonthly' ],
      unearned  = getGrossUnearnedIncome( client, timeframe ),
      comingIn  = earned + unearned,
      /** @todo This document {@link https://www.masslegalservices.org/content/online-snap-calculator}
      * implies that there are deductions to be removed from income in order to calculate
      * gross income. Is that a mistake? Is that just for SNAP? */
      // total     = comingIn - deductions.childSupportPayments( client );
      total     = comingIn;
	return total;

};  // End getGrossIncomeMonthly()


export { deductions, getGrossIncomeMonthly, getGrossUnearnedIncome };
