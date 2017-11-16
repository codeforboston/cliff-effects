/** Arrays of names which can act as a base off of which
* to build client property keys
* 
* @example var gross = client[ timeframe + base + 'Monthly' ];
*/

const UNEARNED_INCOME_SOURCES = [
  'TAFDC', 'SSI', 'SSDI', 'ChildSupportIn', 'Unemployment',
  'WorkersComp', 'Pension', 'SocialSecurity', 'Alimony', 'OtherIncome'
];

const CHILD_CARE_EXPENSES = [
	'ChildDirectCareCosts', 'ChildBeforeAndAfterSchoolCareCosts',
	'ChildTransportationCosts', 'ChildOtherCareCosts'
];

const ADULT_CARE_EXPENSES = [
	'AdultDirectCareCosts', 'AdultTransportationCosts',
	'AdultOtherCareCosts'
];

export {
	UNEARNED_INCOME_SOURCES,
	CHILD_CARE_EXPENSES,
	ADULT_CARE_EXPENSES
}
