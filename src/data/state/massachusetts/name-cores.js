/** Arrays of names which can act as a base off of which
* to build client property keys
* 
* @example var gross = client[ timeframe + base + 'Monthly' ];
*/

const UNEARNED_INCOME_SOURCES = [
  'TAFDC', 'SSI', 'SSDI', 'ChildSupportIn', 'Unemployment',
  'WorkersComp', 'Pension', 'SocialSecurity', 'Alimony', 'OtherIncome'
];

const NET_INCOME_DEDUCTIONS = [
	'Standard', 'EarnedIncome', 'Medical', 'DependentCare',
	'AllowableChildSupport', 'AllowableHomelessExpenses', 'ExcessShelterExpense'
];

const CHILD_CARE_EXPENSES = [
	'ChildDirectCareCosts', 'ChildBeforeAndAfterSchoolCareCosts',
	'ChildTransportationCosts', 'ChildOtherCareCosts'
];

export {
	UNEARNED_INCOME_SOURCES, NET_INCOME_DEDUCTIONS,
	CHILD_CARE_EXPENSES
}
