/** Arrays of names which can act as a base off of which
* to build client property keys
* 
* @example var gross = client[ timeframe + base + 'Monthly' ];
*/

const UNEARNED_INCOME_SOURCES = [
  'TAFDC', 'SSI', 'SSDI', 'childSupportIn', 'unemployment',
  'workersComp', 'pension', 'socialSecurity', 'alimony', 'otherIncome'
];

const CHILD_CARE_EXPENSES = [
	'childDirectCare', 'childBeforeAndAfterSchoolCare',
	'childTransportation', 'childOtherCare'
];

const ADULT_CARE_EXPENSES = [
	'adultDirectCare', 'adultTransportation',
	'adultOtherCare'
];

export {
	UNEARNED_INCOME_SOURCES,
	CHILD_CARE_EXPENSES,
	ADULT_CARE_EXPENSES
}
