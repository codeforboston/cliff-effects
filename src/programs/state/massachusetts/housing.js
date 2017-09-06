import { FMRS_MA_2018 } from '../../../data/state/massachusetts/2018/FMRS_MA_2018';
import { Result } from '../../../helpers/Result';

/** Get maximum benefit/subsidy amount for client from Section 8 Project-Based
* Voucher program. Please allow the client to put in their own subsidy amount
* if needed since custom amounts are totally a thing that happen (like the PHA
* requesting a standard that is higher than 110%). An accurate amount is important
* when calculating eligibility/amounts from other benefit programs.
* Once you're enrolled in the program, which our interface is
* currently assuming to be the case, you stay in it. There are
* reasons that you leave it, but we have to discuss with the
* case managers what they want to do about those. They're weird.
* There will be extra info if subsidy amount is $0, though.
* 
* @function
* @since 09/2017
* 
* @see trello: https://trello.com/c/EIt2BCMQ/53-housing-choice-voucher-section-8-pseudocode-doc
* @see docs: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854
* @see docs: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854 (recommended by Kristin, Project Hope staff)
* @see gathered info: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854
* @see codepen test: https://codepen.io/knod/pen/oeOpRz?editors=0010
* 
* @todo Find out how close to 0 the benefit amount needs
* to be in order for the client to be warned.
*/
var getHousingEligibility = function ( client ) {
	/** @todo Maybe allow client to put in a custom rent amount, but
	* should be warned that this amount may not be accurate either
	* because in some cases calculations and estimates have to be made
	* for essential utilitie allowances if utilities aren't included in
	* the rent amount. Maybe a custom subsidy amount would be better?
	*/

	// Send it right back if it's missing input values
	var props = propsNeeded( client )
	if ( props.length ) {

		// var details = 'Not enough information. These fields need to be filled in: ';
		// for (let propi = 0; propi < props.length; propi++) {
		// 	let prop = props[ propi ];
		// 	details += prop;
		// 	if ( propi < props.length - 1 ) { details += ', '; }
		// 	else { details += '.'; }
		// };

		// Until we have some reliable way of knowing the right names for the fields:
		var details = 'Some required form fields have\'t been filled in yet.';

		var result = new Result( { result: 'information', details: details } );

		return result;
	}

	// Not sure about this part
    if ( typeof client.customRentSubsidyAmount === 'number' ) {
    	return subsidyResult( client.customRentSubsidyAmount );
    }

    // (24 CFR 5.611 https://www.ecfr.gov/cgi-bin/text-idx?SID=51891282d9b5314112b0b2462cb22681&mc=true&node=se24.1.5_1611&rgn=div8, https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf)
    var adjusted 	= (30/100) * client.householdMonthlyAdjustedIncome,
    // (24CFR5.609 (linked from http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf) https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf)
    	gross 		= 0.1 * client.householdMonthlyGrossIncome,
	// welfare rent (Does MA have welfare rent? If so, how is it calculated?
	// Does the client know the amount?)
    	welfareRent = client.welfareRent || 0,
	// Possibly also the public housing agency's own minimum rent, which doesn't
	// always exist, can be different amounts, and can sometimes we waived (pg 63 of 'Book')
		PHAMinRent 	= client.PHAMinRent || 0;

	// TTP = total tenant payment
    var minTTP = Math.max( adjusted, gross, welfareRent, PHAMinRent ),
    	estimatedRent = FMRS_MA_2018[ client.areaOfResidence ][ client.numberOfBedrooms ],
	// The maximum amount a PHA (public housing agency) can give to client has a range
	// of 90% to 110% depending on how it choose to do things.
	// We're currently going to assume the minimum of that range. That is, we're going
	// to assume a PHA with a standard that sets their maximum subsidy at 90%. In this
	// way if we mislead the client, it'll at least be in a cautious direction. Maybe
	// allow the client to override that value if they want.
		maxSubsidyAllowedMin = estimatedRent * 0.9,
	// Actual subsidy takes into account what the client can pay
		subsidy = maxSubsidyAllowedMin - minTTP;

	var result = subsidyResult( subsidy );

	return result;
}


var subsidyResult = function ( subsidyAmount ) {
	/** @todo Include a warning somewhere about items
	* that are uncertain. Also, maybe provide option to
	* give even more detailed info, like that particular
	* PHA's min rent amount, the PHA's percent for their
	* standard, or just the PHA's flat subsidy amount for
	* that apartment (before other things like minTTP are
	* factored in). (This for all programs ideally. Of
	* course this whole todo is a dream goal...)
	*/
	var result = { result: 'good', details: 'All good!', benefitValue: Math.max( 0, Math.round( subsidyAmount ) ) };

	if ( subsidyAmount <= 0 ) {
		result.result 	= 'information';
		/** @todo Check accuracy of language used. */
		result.details 	= 'Your PHA must allow you the option of continuing in the HCV program for six more months. Without selecting to continue, you will be unenrolled.';
	} else if ( subsidyAmount <= 50 ) {
		result.result 	= 'information';
		/** @todo Give more specific message about which limit is getting hit. Not sure how to judge which limit is the one that's getting close, though. */
		result.details 	= 'Your income amount means your subsidy is close to $0. When it gets to $0 you might be unenrolled from the HCV program, but you should be able to choose an option to extend your enrollment.';
  }

	return result;
};  // End subsidyResult()


var requiredProps = [
	'householdMonthlyAdjustedIncome',
	'householdMonthlyGrossIncome',
	'areaOfResidence',
	'numberOfBedrooms'
];


var propsNeeded = function ( client ) {

	var missingProps = [];

	for ( let propi = 0; propi < requiredProps.length; propi++ ) {
		let key = requiredProps[ propi ];
		if ( client[ key ] === undefined ) { missingProps.push( key ); }
	}

	return missingProps;
};  // End propsNeeded()


export { getHousingEligibility };
