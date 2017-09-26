
// DATA
// import { FMRS_MA_2018 } from '../../../data/state/massachusetts/2018/FMRS_MA_2018';
import { UNEARNED_INCOME_SOURCES } from '../../../data/state/massachusetts/name-cores';

// UTILITIES
import { toCashflow, sumCashflow, getGrossUnearnedIncomeMonthly } from '../../../helpers/cashflow';
import { sum } from '../../../helpers/math';

// TO RETURN
import { Result } from '../../../helpers/Result';


/**
* Properties client is required to have to get some kind
* of value back. I guess none really, since at the very
* start they won't have any properties...
*/
var subsidyRequiredProps = [
// Maybe old rent share and contract rent
// Maybe some kind of income and expenses?
];


/** Using old and new cash flow data, return new subsidy amount,
* include new rent share.
* 
* @function
* @since 09/2017
* 
* With Project Hopes's guidance, we're using old known values (as
* known as they can get) to derive new values.
* @see Deriving: {@link https://docs.google.com/document/d/1o1Tm0HioHeY4NcBSDcjSbXDOjmCAJdI47kG5Fyms0UI/edit#}.
* @see Definitions: {@link https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf}
* 
* @todo Find out how close to 0/change the benefit amount needs to be in
* order for the client to be warned.
*/
const getHousingBenefit = function ( client ) {
  /*
  * var diff = new min ttp - old min ttp;
  * var new rent share = old rent share + diff;
  * var new subsidy = contract rent - new rent share
  */
  var prev = 'previous';

  // Send it right back if it's missing input values
  var missingProps = propsNeeded( client, subsidyRequiredProps );
  if ( missingProps.length ) {
    // Until we have some reliable way of knowing the right names for the fields:
    var details = 'Some required form fields have\'t been filled in yet.';
    var result = new Result( { result: 'incomplete', details: 'Form incomplete', data: { missingProps: missingProps } } );
    return result;
  }

  var ttps        = getTTPs( client ),
      diff        = ttps.newTTP - ttps.oldTTP,
      newShare    = diff + toCashflow( client, prev, 'RentShare' ),
      contrRent   = toCashflow( client, prev, 'ContractRent' );

  // Don't pay more rent than the landlord is asking for
  var maxShare    = Math.min( contrRent, newShare ),
      newSubsidy  = contrRent - maxShare;

  var result = {
    result: 'good',
    details: 'All good!',
    benefitValue: newSubsidy,
    data: { newRentShare: maxShare }
  };

  /** @todo When to give a warning for Section 8? */
  if ( newSubsidy <= 500 ) {
    result.result   = 'information';
    result.details  = 'Your housing subsidy is getting low.';
  }

  var officialResult = new Result( result );

  return officialResult;
};  // End getHousingBenefit


/**
* @todo Function description
* 
* '#' refers to # item on form at Appendix B of http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf
* Is using raw monthly values or converting values to monthly amounts
*/
const getTTPs = function ( client ) {

  var oldNet = getNetIncome( client, 'previous' ),
      newNet = getNetIncome( client, 'current' );

  var oldAdj = getAdjustedIncome( client, 'previous', oldNet ),
      newAdj = getAdjustedIncome( client, 'current', newNet );

  /** @todo A placeholder till we know what to do with negative values */
  oldAdj = Math.max( 0, oldAdj );
  newAdj = Math.max( 0, newAdj );

  // #17, 30% of Adjusted Monthly Income
  var oldAdjToTest = oldAdj * 0.3,
      newAdjToTest = newAdj * 0.3,
      // #18, 10% of Monthly Income
      oldNetToTest = oldNet * 0.1,
      newNetToTest = newNet * 0.1;

  /** 
  * TTP = 'total tenant payment'. One place (pg 59) calls this min ttp
  * but another (Appendix B) calls it max. Second makes more sense.
  * Represents max rent share.
  * 
  * Note: welfare rent and PHA min rent are not known and so not
  * included in the test. MA may not have welfare rent and PHA min
  * can be waived.
  */
  var oldMaxTTP = Math.max( oldNetToTest, oldAdjToTest ),
      newMaxTTP = Math.max( newNetToTest, newAdjToTest ),
      ttps      = { oldTTP: oldMaxTTP, newTTP: newMaxTTP };

  return ttps;
};  // End getTTPs()


// =============================
// NET INCOME
// =============================

/**
* @todo Function description
*/
const getNetIncome = function ( client, timeframe ) {
  var unearned = getGrossUnearnedIncomeMonthly( client, timeframe ),
      gross    = unearned + toCashflow( client, timeframe, 'EarnedIncome' ),
      net      = gross - toCashflow( client, timeframe, 'IncomeExclusions' );
  return net;
};  // End getNetIncome()


// =============================
// ADJUSTED INCOME
// =============================
/** Properties for all child care expenses */
const childcareProps = [
  'ChildDirectCareCosts', 'ChildBeforeAndAfterSchoolCareCosts',
  'ChildTransportationCosts', 'ChildOtherCareCosts'
];

/**
* @todo Function description
* 
* This is only adjusted income as defined for the Section 8 program
* '#' refers to # item on form at Appendix B of http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf
* 'pg' refers to the written page number of https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf
* 
* Is using raw monthly values or converting values to monthly amounts
*/
const getAdjustedIncome = function ( client, timeframe, net ) {

  var time       = timeframe,
      allowances = [];

  // #4 & #5
  var depAllowanceAnnual  = (client[ time + 'NumberOfDependents'] || 0) * 480;
  allowances.push( depAllowanceAnnual/12 );
  // #6
  var childcare   = sumCashflow( client, time, childcareProps ),
      /** @todo Change to 'ChildCareIncome' */
      ccIncome    = toCashflow( client, time, 'EarnedIncomeBecauseOfChildCare' ),
      ccMin       = Math.min( childcare, ccIncome );
  allowances.push( ccMin );
  // #7 - 13
  var disAndMed = getDisabledAndMedicalAllowancesSum( client, timeframe, net )
  allowances.push( disAndMed );
  // #14
  /** @todo Fix 'current' + etc not existing while 'previous' + etc does */
  if ( client[ time + 'DisabledOrElderlyHeadOrSpouse' ] ) { allowances.push( 400/12 ); }

  var total = sum( allowances ),
      adj   = net - total;

  /** @todo What do we do if this is negative, e.g. dependent allowances are greater than income? */
  return adj;
};  // End getAdjustedIncome()


/**
* Medical allowance needs assistance allowance amounts
* '#' refers to # item on form at Appendix B of http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf
* 'pg' refers to the written page number of https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf
* Is using raw monthly values
*/
const getDisabledAndMedicalAllowancesSum = function ( client, timeframe, net ) {

  var time          = timeframe,
      netSubtractor = net * 0.03,
      asstAllowance = 0,
      medAllowance  = 0,
      altAllowance  = 0;

  // ----- Assistance Allowance #C, #7 - 11 ----- \\
  // pg 5-30 to 5-31
  /** @todo Change to 'DisabledAssistance' */
  var rawAssistance = toCashflow( client, time, 'DisabledAssistance' ),
      /** @todo Change to 'AssistanceIncome' */
      asstIncome    = toCashflow( client, time, 'EarnedIncomeBecauseOfAdultCare' ),
      asstRemainder = rawAssistance - netSubtractor;

  if ( asstRemainder >= 0 ) {
    asstAllowance = Math.min( asstRemainder, asstIncome );
  }

  // ----- Medical Allowance #D, #12 - 13 ----- \\
  /** Only keep going if there's a disabled/elderly head or spouse (or sole member) */
  if ( !client[ time + 'DisabledOrElderlyHeadOrSpouse' ] ) { return asstAllowance; }

  // pg 5-31 to 5-32
  var disOrElderlyMedical = toCashflow( client, time, 'DisabledOrElderlyMedical' ),
      // pg 5-31 says all medical expenses count for this household
      otherMedical        = toCashflow( client, time, 'RegularMedical' ),
      rawMedical          = disOrElderlyMedical + otherMedical;

  // Read all of pg 5-32 and 5-34 for the following conditional.
  // Jumps around because cases are overlapping.

  // pg 5-32 bottom (5-33 to 5-34 example falls in here)
  // Note: #13 forgets the '>=' part and just says '>'
  if ( asstRemainder >= 0 ) {
    medAllowance = rawMedical;
  // pg 5-33 middle /and/ pg 5-32 middle, above "special calcuations"
  // In both cases rawAssistance is >= 0.
  } else if ( rawAssistance >= 0 && asstRemainder < 0 ) {
    var sum = rawMedical + rawAssistance;
    altAllowance = Math.min( 0, sum - netSubtractor );
  }

  return altAllowance || (asstAllowance + medAllowance);
};  // End getDisabledAndMedicalAllowancesSum()


const propsNeeded = function ( client, props ) {

  /** @todo Accumulate a string instead */
  /** @todo Put in helpers/validators */
	var missingProps = [];

	for ( let propi = 0; propi < props.length; propi++ ) {
		let key = props[ propi ];
		if ( client[ key ] === undefined ) { missingProps.push( key ); }
	}

	return missingProps;
};  // End propsNeeded()


export {
  // getHousingEligibility,
  getHousingBenefit
};








// var eligibilityRequiredProps = [
//   'householdMonthlyAdjustedIncome',
//   'householdMonthlyGrossIncome',
//   'areaOfResidence',
//   'numberOfBedrooms'
// ];

// /** NOT READY FOR USE
// * Get eligibility for Section 8 Housing Choice Voucher.
// * 
// * Notes on citizenship: Details avaialble at
// * {@link https://www.law.cornell.edu/uscode/text/42/1436a#a}
// * 
// * @function
// * @since 09/2017
// * 
// * @see trello: https://trello.com/c/EIt2BCMQ/53-housing-choice-voucher-section-8-pseudocode-doc
// * @see docs: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854
// * @see docs: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854 (recommended by Kristin, Project Hope staff)
// * @see gathered info: https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=1209051854
// * @see codepen test: https://codepen.io/knod/pen/oeOpRz?editors=0010
// */
// var getHousingEligibility = function ( client ) {

//   // Send it right back if it's missing input values
//   var missingProps = propsNeeded( client, eligibilityRequiredProps );
//   if ( missingProps.length ) {
//     // Until we have some reliable way of knowing the right names for the fields:
//     var details = 'Some required form fields have\'t been filled in yet.';
//     var result = new Result( { result: 'incomplete', details: 'Form incomplete', data: { missingProps: missingProps } } );
//     return result;
//   }

//     // (24 CFR 5.611 https://www.ecfr.gov/cgi-bin/text-idx?SID=51891282d9b5314112b0b2462cb22681&mc=true&node=se24.1.5_1611&rgn=div8, https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf)
//     var adjusted  = (30/100) * client.householdMonthlyAdjustedIncome,
//     // (24CFR5.609 (linked from http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf) https://www.hudexchange.info/resources/documents/incomeresidentrentcalc.pdf)
//       gross     = 0.1 * client.householdMonthlyGrossIncome,
//   // welfare rent (Does MA have welfare rent? If so, how is it calculated?
//   // Does the client know the amount?)
//       welfareRent = client.welfareRent || 0,
//   // Possibly also the public housing agency's own minimum rent, which doesn't
//   // always exist, can be different amounts, and can sometimes we waived (pg 63 of 'Book')
//     PHAMinRent  = client.PHAMinRent || 0;

//   // TTP = total tenant payment
//     var minTTP = Math.max( adjusted, gross, welfareRent, PHAMinRent ),
//       estimatedRent = FMRS_MA_2018[ client.areaOfResidence ][ client.numberOfBedrooms ],
//   // The maximum amount a PHA (public housing agency) can give to client has a range
//   // of 90% to 110% depending on how it choose to do things.
//   // We're currently going to assume the minimum of that range. That is, we're going
//   // to assume a PHA with a standard that sets their maximum subsidy at 90%. In this
//   // way if we mislead the client, it'll at least be in a cautious direction. Maybe
//   // allow the client to override that value if they want.
//     maxSubsidyAllowedMin = estimatedRent * 0.9,
//   // Actual subsidy takes into account what the client can pay
//     subsidy = maxSubsidyAllowedMin - minTTP;

//   var result = subsidyResult( subsidy );

//   return result;
// };  // End getHousingEligibility


// const subsidyResult = function ( subsidyAmount ) {
//   /** @todo Include a warning somewhere about items
//   * that are uncertain. Also, maybe provide option to
//   * give even more detailed info, like that particular
//   * PHA's min rent amount, the PHA's percent for their
//   * standard, or just the PHA's flat subsidy amount for
//   * that apartment (before other things like minTTP are
//   * factored in). (This for all programs ideally. Of
//   * course this whole todo is a dream goal...)
//   */
//   var result = { result: 'good', details: 'All good!', benefitValue: Math.max( 0, Math.round( subsidyAmount ) ) };

//   if ( subsidyAmount <= 0 ) {
//     result.result   = 'information';
//     /** @todo Check accuracy of language used. */
//     result.details  = 'Your PHA must allow you the option of continuing in the HCV program for six more months. Without selecting to continue, you will be unenrolled.';
//   } else if ( subsidyAmount <= 50 ) {
//     result.result   = 'information';
//     /** @todo Give more specific message about which limit is getting hit. Not sure how to judge which limit is the one that's getting close, though. */
//     result.details  = 'Your income amount means your subsidy is close to $0. When it gets to $0 you might be unenrolled from the HCV program, but you should be able to choose an option to extend your enrollment.';
//   }

//   return result;
// };  // End subsidyResult()
