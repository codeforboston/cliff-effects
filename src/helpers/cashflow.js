/** For all income and general cash flow getters and calculators
* 
* @todo Add checks for properties with messages for mistakes
* @todo Deal with expiration dates
* @todo Prune values now understood to be non-standard
*/

// DATA
import { UNEARNED_INCOME_SOURCES } from '../data/state/massachusetts/name-cores';

// ==================================
// DEDUCTIONS
// ==================================
/**
* Calculates various deductions based on form input
* Everything is monthly
* or
* var getDeduction = {};
* getDeduction.medical = function ( client, timeframe ) {};
* Example of use: getDeduction[ 'medical' ]( client, timeframe );
*/
var deductions = {};

/** 
* @todo add table to data: (@see §364.400(A) -
* look up table for standard deductions)
*/
deductions.standard = function ( client, timeframe ) {
};  // End deductions.standard()


/** 
* @todo add table to data: (@see §364.400(B) -
* percent amount times earned income)
*/
deductions.earnedIncome = function ( client, timeframe ) {
};  // End deductions.earnedIncome()


/** 
* @todo Find source of these amounts add add to data.
* Standard $155 deduction allowed if medical expenses are $35-$190/month.
* Actual amount minus $35' allowed if over $190/mo.
*/
deductions.medical = function ( client, timeframe ) {
};  // End deductions.medical()


/** Dependent = child or disabled adult
* Sum of:
* Direct Care Costs
* Before- and After-School Programs
* Transportation Costs
* Other
*/
deductions.dependentCare = function ( client, timeframe ) {
  return client[ timeframe + 'ChildSupportPaidOutMonthly' ];
};  // End deductions.dependentCare()


/** @todo description
* Monthly
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
deductions.handicappedAssistance = function ( client, timeframe ) {
};  // End deductions.handicappedAssistance()


/** Just child support. Here for consistency and validation */
deductions.childSupportPayments = function ( client, timeframe ) {
	// For now, no checks or anything. Fragile, but gets the job done.
	return client.futureChildSupportOutMonthly || client.currentChildSupportOutMonthly || 0;
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
const getGrossUnearnedIncomeMonthly = function ( client, timeframe ) {
  return sumCashflow( client, timeframe, UNEARNED_INCOME_SOURCES );
};  // End getGrossUnearnedIncomeMonthly()


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
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const toCashflow = function ( client, timeframe, prop ) {
  return client[ timeframe + prop + 'Monthly' ] || 0;
};  // End toCashflow()


/**
* NON-FUNCTIONAL - different programs calculate gross income
* differently.
* 
* Previous Description:
* Calculates the gross monthly income based on client values
* This is the household gross monthly income.
* Derived from excel formulas from download made available here:
* {@link https://www.masslegalservices.org/content/online-snap-calculator}.
* From 2006 ~~Another source, implying something else:
* {@link https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf}~~
* 
* @todo Add checks for properties with messages for mistakes
* @todo Does this return an instance of `Result`?
* 
* @function
* @todo @param
* `timeframe` can be either 'current' or 'future'
* 
* @todo @returns
*/
const getSimpleGrossIncomeMonthly = function ( client, timeframe ) {
  /** @todo Add checks, validtators, and error messages */
  /** @todo Include info like "only count up to $480/12 of what full time students make" */
  var earned    = client[ timeframe + 'EarnedIncomeMonthly' ],
      unearned  = getGrossUnearnedIncomeMonthly( client, timeframe ),
      comingIn  = earned + unearned,

      /** @todd Store this at some point */
      // client[ timeframe + 'GrossIncomeMonthly' ] = total;

      /** @todo This document {@link https://www.masslegalservices.org/content/online-snap-calculator}
      * implies that there are deductions to be removed from income in order to calculate
      * gross income. Is that a mistake? Is that just for SNAP? */
      // total     = comingIn - deductions.childSupportPayments( client, timeframe );

      total     = comingIn;
	return total;

};  // End getSimpleGrossIncomeMonthly()


// from 2006 ~~Source: https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf~~
const getEarnedIncomeDisregardMonthly = function ( client, timeframe ) {
  // Annual
  // Ask Kristin if this is something she wants to include in the prototype
  // Ask Kristin if disability stuff is desired in the prototype
  return 0;
};  // End getEarnedIncomeDisregardMonthly()


// from 2006 ~~Source: https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf~~
// NON FUNCTIONAL - This is actually just for Section 8
const getAllowancesMonthly = function ( client, timeframe ) {
  // Calculations need annual amounts

  // or use the function?
  var yearlyGross = client[ timeframe + 'GrossIncomeMonthly' ] * 12;


  /** @todo Find source of data for monetary amounts and store as data */
  var sum = 0;  // Allowances
  /** 24CFR5.611(a) */
  sum += 480 * client[ timeframe + 'NumOfDependents' ] || 0;
  // head, spouse, or sole member is >=62 or is handicapped/disabled. ONLY ONE DEDUCTION PER FAMILY/HOUSEHOLD PER YEAR
  if ( client[ timeframe + 'HasDisabledOrElderly' ] ) { sum += 400; }

  // ---- Child care ---- \\
  /** @todo Already gathered from depedant care? That's for disabled or elderly members too, though...
  * @todo Validate in input that it's not more than earned income.
  * @todo Can't be expenses paid for/reimbursed by other programs. */
  var childcare     = (client[ timeframe + 'ReasonableChildCareExpensesMonthly' ] * 12) || 0,
      childcareWork = (client[ timeframe + 'earnedIncomeBecauseOfChildcare' ] * 12) || 0;
  sum += Math.min( childcareWork, childcare );

  // ---- Adult care ---- \\
  /** @todo Only non-reimbursed
  * @todo Non-medical? */
  var nonElderlyDisabledCare = (client[ timeframe + 'NonElderlyDisabledExpenseMonthly' ] * 12) || 0,
      eldDisWork             = (client[ timeframe + 'earnedIncomeBecauseOfAdultCare' ] * 12) || 0;
  nonElderlyDisabledCare = Math.min( eldDisWork, nonElderlyDisabledCare );
  /** @todo Only non-reimbursed
  * @todo Don't include stuff from the current amount? How are we supposed to collect this data */
  var elderlyOrDisabledMedical = (client[ timeframe + 'ElderlyOrDisabledMedicalMonthly' ] * 12) || 0;

  var elderlyOrDisabledTotal      = nonElderlyDisabledCare + elderlyOrDisabledMedical,
      minElderlyOrDisabled        = elderlyOrDisabledTotal - (yearlyGross * 0.03),
      exceedingElderlyOrDisabled  = Math.max( 0, minElderlyOrDisabled );
  sum += exceedingElderlyOrDisabled;

  return sum;
};  // End getAllowancesMonthly()

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// const getNetIncomeMonthly = function ( client, timeframe ) {};  // End getNetIncomeMonthly()


// Adjusted gross?
// from 2006 ~~Source: https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf~~
const getAdjustedIncomeMonthly = function ( client, timeframe ) {

  // or use the function?
  var yearlyGross = client[ timeframe + 'GrossIncomeMonthly' ],
      allowances  = getAllowancesMonthly( client, timeframe ),
      disregard   = getEarnedIncomeDisregardMonthly( client, timeframe ),
      prelim      = yearlyGross - ( allowances + disregard ),
      adjusted    = Math.max( 0, prelim );

  return adjusted;
}


export {
  deductions, getSimpleGrossIncomeMonthly,
  getGrossUnearnedIncomeMonthly, getAdjustedIncomeMonthly,
  toCashflow, sumCashflow
};
