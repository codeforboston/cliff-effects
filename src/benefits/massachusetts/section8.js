
// DATA
import { UNDER13_CARE_EXPENSES } from '../../data/massachusetts/name-cores';

// UTILITIES
import { sum } from '../../utils/math';
import {
  sumProps,
  getGrossUnearnedIncomeMonthly,
} from '../../utils/cashflow';
import {
  getEveryMemberOfHousehold,
  isHeadOrSpouse,
  getDependentsOfHousehold,
  isDisabled,
} from '../../utils/getMembers';


/** Uses old and new cash flow data, return new subsidy amount,
 *     include new rent share. Can only be useful in predicting
 *     future subisdy amounts.
 *
 * @function
 * @since 09/2017
 *
 * With Project Hopes's guidance, we're using old known values (as
 *     known as they can get) to derive new values. Summary:
 * var diff = new min ttp - old min ttp;
 * var new rent share = old rent share + diff;
 * var new subsidy = contract rent - new rent share
 *
 * @see Deriving: {@link https://docs.google.com/document/d/1o1Tm0HioHeY4NcBSDcjSbXDOjmCAJdI47kG5Fyms0UI/edit#}.
 * @see Definitions: {@link https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf}
 */
const getSection8Benefit = function (client, timeframe) {
  /** @todo Just return number values */

  // Current subsidy MUST already be known in every case
  if (timeframe === `current`) {
    return client.current.contractRent - client.current.rentShare;
  }

  let ttps      = hlp.getTTPs(client),
      diff      = ttps.newTTP - ttps.oldTTP,
      newShare  = diff + client.current.rentShare,
      contrRent = client.current.contractRent;

  // Don't pay more rent than the landlord is asking for
  let maxShare   = Math.min(contrRent, newShare),
      newSubsidy = contrRent - maxShare;

  return newSubsidy;
};


const section8Helpers = {},
      hlp             = section8Helpers;

/** Returns total tenant payment (TTP). Uses raw monthly values or
 *     converts values to monthly amounts where gov tables give
 *     values in yearly amounts.
 *
 * TTP represents max rent share. Pg 59 calls this min ttp,
 *     but another (Appendix B) calls it max. The second
 *     makes more sense in context.
 *
 * Note: welfare rent and PHA min rent are not known and so not
 *     included. MA may not have welfare rent and PHA min can
 *     be waived.
 *
 * '#' refers to # item on form at Appendix B of 
 *     {@link http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf}
 */
hlp.getTTPs = function (client) {
  let oldNet = hlp.getNetIncome(client, `current`),
      newNet = hlp.getNetIncome(client, `future`);

  let oldAdj = hlp.getAdjustedIncome(client, `current`, oldNet),
      newAdj = hlp.getAdjustedIncome(client, `future`, newNet);

  /** @todo A placeholder till we know what to do with negative values */
  oldAdj = Math.max(0, oldAdj);
  newAdj = Math.max(0, newAdj);

  // #17, 30% of Adjusted Monthly Income
  let oldAdjToTest = oldAdj * 0.3,
      newAdjToTest = newAdj * 0.3,
      // #18, 10% of Monthly Income
      oldNetToTest = oldNet * 0.1,
      newNetToTest = newNet * 0.1;

  let oldMaxTTP = Math.max(oldNetToTest, oldAdjToTest),
      newMaxTTP = Math.max(newNetToTest, newAdjToTest),
      ttps      = { oldTTP: oldMaxTTP, newTTP: newMaxTTP };

  return ttps;
};


// =============================
// NET INCOME
// =============================

hlp.getNetIncome = function (client, timeframe) {
  let unearned = getGrossUnearnedIncomeMonthly(client[ timeframe ]),
      gross    = unearned + client[ timeframe ].earned;
  // net = gross - incomeExclusions, but income exclusions not accounted for for MVP
  return gross;
};


// =============================
// ADJUSTED INCOME
// =============================
/** This is only adjusted income as defined for the Section 8 program.
 *     Uses raw monthly values or converts values to monthly amounts
 *
 * '#' refers to # item on form at Appendix B of
 *     {@link http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf}
 * 'pg' refers to the written page number of ~{@link https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf}~
 *     which is gone, though @knod has what we believe to be a local copy.
 */
hlp.getAdjustedIncome = function (client, timeframe, net) {

  let time       = timeframe,  // shorter
      allowances = [];

  // @todo Move hard-coded numbers to data file
  // #4 & #5
  let depAllowanceAnnual = getDependentsOfHousehold(client[ time ]).length * 480;
  allowances.push(depAllowanceAnnual / 12);
  // #6
  let childcare       = sumProps(client[ time ], UNDER13_CARE_EXPENSES),
      childcareIncome = client[ time ].earnedBecauseOfChildCare,
      // @todo If student or looking for work, during those hours the expense isn't limited? 2007 Ch. 5 doc
      childcareMinimumAllowance = Math.min(childcare, childcareIncome);
  allowances.push(childcareMinimumAllowance);
  // #7 - 13
  let disabledAndMedicalAllowances = hlp.getDisabledAndMedicalAllowancesSum(client, time, net);
  allowances.push(disabledAndMedicalAllowances);
  // #14 (yes, they mean head or spouse here)
  // @todo Put number in hard-coded data tables
  if (hlp.hasDisabledOrElderlyHeadOrSpouse(client, time)) { 
    allowances.push(400 / 12); 
  }

  let total    = sum(allowances),
      adjusted = net - total;

  return Math.max(0, adjusted);
};


/** Returns medical allowance needs assistance allowance amounts.
 *     Uses raw monthly values.
 *
 * '#' refers to # item on form at Appendix B of
 *     {@link http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf}
 * 'pg' refers to the written page number of ~{@link https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf}~
 *     which is gone, though @knod has what we believe to be a local copy.
 */
hlp.getDisabledAndMedicalAllowancesSum = function (client, timeframe, net) {

  let time          = timeframe,  // shorter
      // @todo Put number in hard-coded data tables
      netSubtractor = net * 0.03;  // #8, #13

  // ----- Assistance Allowance #C, #7 - 11 ----- \\
  if (!hlp.hasAnyDisabledOrElderly(client, time)) { 
    return 0; 
  }
  // pg 5-30 to 5-31
  let handicapExpense     = client[ time ].disabledAssistance,  // #7
      assistanceRemainder = handicapExpense - netSubtractor,  // #9
      handicapAllowance   = hlp.getMinHandicapAllowance(client, time, assistanceRemainder);  // #10, #11

  // ----- Maybe Stop, #D ----- \\
  // Only keep going if there's a disabled/elderly head or spouse (or sole member)
  if (!hlp.hasDisabledOrElderlyHeadOrSpouse(client, time)) { 
    return handicapAllowance; 
  }

  // ----- Medical Allowance #12 - 13 ----- \\
  let medicalExpenses = hlp.getMedicalExpenses(client, time);
  // Read all of pg 5-32 and 5-34 for the following conditional.
  // Jumps around because cases are overlapping.
  let medicalAllowance = 0;
  // #13a, pg 5-32 bottom (5-33 to 5-34 example falls in here)
  // Note: #13 forgets the '>=' part and just says '>'
  if (assistanceRemainder >= 0) { 
    medicalAllowance = medicalExpenses; 
  }
  // #13b; pg 5-33 middle /and/ pg 5-32 middle, above "special calcuations"
  // In both cases handicapExpense is >= 0 and can be safely added.
  else {
    let sum          = medicalExpenses + handicapExpense;
    medicalAllowance = sum - netSubtractor;
  }

  let minimumMedicalAllowance = Math.max(0, medicalAllowance);
  return handicapAllowance + minimumMedicalAllowance;  // #15 contribution ( #11 + #13 )
};  // Ends hlp.getDisabledAndMedicalAllowancesSum()


hlp.getMinHandicapAllowance = function (client, time, assistanceRemainder) {
  let asstancetIncome          = client[ time ].earnedBecauseOfAdultCare, // #10
      handicapAllowance        = Math.min(assistanceRemainder, asstancetIncome),  // #11
      handicapAllowanceMinimum = Math.max(0, handicapAllowance);  // Don't get negative
  return handicapAllowanceMinimum;
};


hlp.getMedicalExpenses = function (client, time) {
  // ----- Medical Allowance #12 - 13 ----- \\
  // #12, pg 5-31 to 5-32
  let disabledOrElderlyMedicalExpenses = client[ time ].disabledMedical,
      // pg 5-31 says all medical expenses count for this household
      otherMedical        = client[ time ].otherMedical,
      medicalExpenses     = disabledOrElderlyMedicalExpenses + otherMedical;  // #12

  return medicalExpenses;
};

// @todo Put number in hard-coded data tables
hlp.isDisabledOrElderly = function (member) {
  return member.m_age >= 62 || isDisabled(member);
};


// Sure, we could combine these last two, but may be easier to test this way
hlp.hasAnyDisabledOrElderly = function (client, timeframe) {
  let numMatches = getEveryMemberOfHousehold(client[ timeframe ], hlp.isDisabledOrElderly).length;
  return numMatches > 0;
};


hlp.hasDisabledOrElderlyHeadOrSpouse = function (client, timeframe) {

  let comboTest = function (member) {
    return hlp.isDisabledOrElderly(member) && isHeadOrSpouse(member);
  };
  let numMatches = getEveryMemberOfHousehold(client[ timeframe ], comboTest).length;

  return numMatches > 0;

};


export {
  getSection8Benefit,
  section8Helpers,
};
