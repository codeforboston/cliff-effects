
/**
* Calculates various deductions based on form input
* Everything is monthly
*/

/**
* @todo Add checks for properties with messages for mistakes
* @todo Deal with expiration dates
* @todo Does this return an instance of `Result`?
*/

/** 
* @todo add table to data: (@see §364.400(A) -
* look up table for standard deductions)
*/
var getStandardDeductions = function ( client ) {
};  // End getStandardDeductions()


/** 
* @todo add table to data: (@see §364.400(B) -
* percent amount times earned income)
*/
var getEarnedIncomeDeductions = function ( client ) {
};  // End getEarnedIncomeDeductions()


/** 
* @todo Find source of these amounts add add to data.
* Standard $155 deduction allowed if medical expenses are $35-$190/month.
* Actual amount minus $35' allowed if over $190/mo.
*/
var getMedicalDeductions = function ( client ) {
};  // End getMedicalDeductions()


/** Dependent = child or disabled adult
* Sum of:
* Direct Care Costs
* Before- and After-School Programs
* Transportation Costs
* Other
*/
var getDependentCareDeductions = function ( client ) {
};  // End getDependentCareDeductions()


/** Just child support. Here for consistency and validation */
var getChildSupportPaymentDeductions = function ( client ) {
	// For now, no checks or anything. Fragile, but gets the job done.
	return client.currentChildSupportOutMonthly || client.previousChildSupportOutMonthly || 0;
};  // End getChildSupportPaymentDeductions()


// or
// var getDeduction = {};
// getDeduction.medical = function ( client ) {};
// Use getDeduction[ 'medical' ]( client );
// After all, it's not that much to import...




export {
	getStandardDeductions, getEarnedIncomeDeductions,
	getMedicalDeductions, getDependentCareDeductions,
	getChildSupportPaymentDeductions
};
