
/**
* Calculates the gross monthly income based on client values
* This is the household gross monthly income.
* Derived from excel formulas from download made available here:
* {@link https://www.masslegalservices.org/content/online-snap-calculator}
*/

/**
* @todo Add checks for properties with messages for mistakes
* @todo Does this return an instance of `Result`?
*/

import { getChildSupportPaymentDeductions } from './deductions';

/**
* `timeframe` can be either 'current' or 'previous'
*/
var grossMonthlyIncome = function ( client, timeframe ) {
  // No checks, quick and dirty for now

  // possibly `getGrossIncomeMonthly( client )` or have a `.grossIncomeMonthly`
  // property on client.
  var earned    = client[ timeframe + 'EarnedIncomeMonthly' ],
      unearned  = client[ timeframe + 'UnearnedIncomeMonthly' ],
      comingIn  = earned + unearned,
      total     = comingIn - getChildSupportPaymentDeductions( client );

	return total;

};  // End grossMonthlyIncome()



export { grossMonthlyIncome };
