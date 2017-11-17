
// DATA
import { CHILD_CARE_EXPENSES } from '../../../data/state/massachusetts/name-cores';

// UTILITIES
import { sum } from '../../../utils/math';
import { Result } from '../../../utils/Result';
import {
  toCashflow,
  sumCashflow,
  getGrossUnearnedIncomeMonthly
} from '../../../utils/cashflow';


/**
* Properties `client` object is required to have to get a valid
* result. This doesn't mean the user filled in all the data, just
* that the object passed into here contains everything needed in the
* form that it's needed.
* 
* @todo Discuss what should be required, if anything (many of these can
* just be assumed to be 0 so that no errors will occur).
*/
// var subsidyRequiredProps = [ 'RentShare', 'ContractRent' ];

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
  var curr = 'current';

  var ttps        = getTTPs( client ),
      diff        = ttps.newTTP - ttps.oldTTP,
      newShare    = diff + toCashflow( client, curr, 'RentShare' ),
      contrRent   = toCashflow( client, curr, 'ContractRent' );

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

  var oldNet = getNetIncome( client, 'current' ),
      newNet = getNetIncome( client, 'future' );

  var oldAdj = getAdjustedIncome( client, 'current', oldNet ),
      newAdj = getAdjustedIncome( client, 'future', newNet );

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
/**
* @todo Function description
* 
* This is only adjusted income as defined for the Section 8 program
* '#' refers to # item on form at Appendix B of http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf
* 'pg' refers to the written page number of https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf (gone)
* 
* Is using raw monthly values or converting values to monthly amounts
*/
const getAdjustedIncome = function ( client, timeframe, net ) {

  var time       = timeframe,
      allowances = [];

  // #4 & #5
  var depAllowanceAnnual = getNumberOfDependents( client, timeframe ) * 480;
  allowances.push( depAllowanceAnnual/12 );
  // #6
  var childcare   = sumCashflow( client, time, CHILD_CARE_EXPENSES ),
      ccIncome    = toCashflow( client, time, 'EarnedIncomeBecauseOfChildCare' ),
      /** @todo If student or looking for work, during those hours the expense isn't limited? 2007 Ch. 5 doc */
      ccMin       = Math.min( childcare, ccIncome );
  allowances.push( ccMin );
  // #7 - 13
  var disAndMed = getDisabledAndMedicalAllowancesSum( client, timeframe, net )
  allowances.push( disAndMed );
  // #14 (yes, they mean head or spouse here)
  if ( hasDsbOrEldHeadOrSpouse( client, timeframe ) ) { allowances.push( 400/12 ); }

  var total = sum( allowances ),
      adj   = net - total;
  /** @todo Implement probable solution for bug */
  // adj = Math.max( 0, adj );

  return adj;
};  // End getAdjustedIncome()


/**
* Medical allowance needs assistance allowance amounts
* '#' refers to # item on form at Appendix B of http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf
* 'pg' refers to the written page number of https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf (gone)
* Is using raw monthly values
*/
const getDisabledAndMedicalAllowancesSum = function ( client, timeframe, net ) {

  var time          = timeframe,
      netSubtractor = net * 0.03;  // #8, #13

  // ----- Assistance Allowance #C, #7 - 11 ----- \\
  if ( !hasDsbOrEldMember( client, timeframe ) ) { return 0; }

  // pg 5-30 to 5-31
  var handcpExpense  = toCashflow( client, time, 'DisabledAssistance' ),  // #7
      asstSubtracted = handcpExpense - netSubtractor,  // #9
      asstIncome     = toCashflow( client, time, 'EarnedIncomeBecauseOfAdultCare' ), // #10
      hcapAllowance  = Math.min( asstSubtracted, asstIncome ),  // #11
      hcapMin        = Math.max( 0, hcapAllowance );  // Don't get negative

  // ----- Maybe Stop #D ----- \\
  /** Only keep going if there's a disabled/elderly head or spouse (or sole member) */
  if ( !hasDsbOrEldHeadOrSpouse( client, timeframe ) ) { return hcapMin; }


  // ----- Medical Allowance #12 - 13 ----- \\
  // #12, pg 5-31 to 5-32
  var disOrElderlyMedical = toCashflow( client, time, 'DisabledOrElderlyMedical' ),
      // pg 5-31 says all medical expenses count for this household
      otherMedical        = toCashflow( client, time, 'RegularMedical' ),
      medicalExpenses     = disOrElderlyMedical + otherMedical;  // #12

  // Read all of pg 5-32 and 5-34 for the following conditional.
  // Jumps around because cases are overlapping.

  var medAllowance = 0;
  // #13a, pg 5-32 bottom (5-33 to 5-34 example falls in here)
  // Note: #13 forgets the '>=' part and just says '>'
  if ( asstSubtracted >= 0 ) {
    medAllowance = medicalExpenses;

  // #13b
  // pg 5-33 middle /and/ pg 5-32 middle, above "special calcuations"
  // In both cases handcpExpense is >= 0 and can be safely aded.
  } else {
    var sum = medicalExpenses + handcpExpense;
    medAllowance = sum - netSubtractor;
  }

  var medMin = Math.max( 0, medAllowance );

  // #15 contribution ( #11 + #13 )
  return hcapMin + medMin;
};  // End getDisabledAndMedicalAllowancesSum()


const numMembersPass = function ( client, timeframe, memberTest ) {

  var num       = 0,
      household = client[ timeframe + 'Household' ];

  for ( let memi = 0; memi < household.length; memi++ ) {

    let member = household[ memi ];
    if ( memberTest( member ) ) {
      num++;
    }

  }

  return num;
};  // End numMembersPass()


const isDependent = function ( member ) {
  return member.age <= 18 || member.disabled;
};  // End isDependent()


const isDisabledOrElderly = function ( member ) {
  return member.age >= 62 || member.disabled;
};  // End isDependent()


const isHeadOrSpouse = function ( member ) {
  return member.role === 'head' || member.role === 'spouse';
};  // End isHeadOrSpouse()


const getNumberOfDependents = function ( client, timeframe ) {
  var deps = numMembersPass( client, timeframe, isDependent )
  return deps;
};  // End getNumberOfDependents()


// Sure, we could combine these last two, but is it worth it?
const hasDsbOrEldMember = function ( client, timeframe ) {
  var numMatches = numMembersPass( client, timeframe, isDisabledOrElderly );
  return numMatches > 0;
};  // End hasDsbOrEldMember()


const hasDsbOrEldHeadOrSpouse = function ( client, timeframe ) {

  var comboTest = function ( member ) {
    return isDisabledOrElderly( member ) && isHeadOrSpouse( member );
  };
  var numMatches = numMembersPass( client, timeframe, comboTest );

  return numMatches > 0;

};  // End hasDsbOrEldHeadOrSpouse()


export {
  getHousingBenefit
};
