
/**
* Calculates the gross monthly income based on client values
* This is the household gross monthly income.
* Derived from excel formulas from download made available here:
* {@link https://www.masslegalservices.org/content/online-snap-calculator}
*/

var grossMonthlyIncome = function ( client ) {
	var comingIn = client.earnedIncomeMonthly + client.unearnedIncomeMonthly,
		  total 	 = comingIn - client.childSupportPaidOut
	return comingIn - client.childSupportPaidOut;
};  // End grossMonthlyIncome()



export { grossMonthlyIncome };
