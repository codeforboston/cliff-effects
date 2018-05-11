// DATA
import { UNDER13_CARE_EXPENSES, OVER12_CARE_EXPENSES } from '../../data/massachusetts/name-cores';
import { SNAPData } from '../../data/federal/2017/SNAPData';
import { federalPovertyGuidelines } from '../../data/federal/federalPovertyGuidelines';

// LOGIC/UTILITIES
import {
  sumProps,
  getGrossUnearnedIncomeMonthly,
} from '../../utils/cashflow';
import {
  getYearlyLimitBySize,
  getMonthlyLimitBySize,
} from '../../utils/getGovData';
import {
  getEveryMemberOfHousehold,
  getEveryMember,
  getDependentsOfHousehold,
  isDisabled,
  isUnder13,
  getUnder13OfHousehold,
} from '../../utils/getMembers';


/** Based on https://www.masslegalservices.org/SNAPCalculator */
const getSNAPBenefits = function (client, timeframe) {

  client = client[ timeframe ];

  var finalResult = 0,
    grossIncomeTestResult   = hlp.getGrossIncomeTestResult(client),
    netIncomeTestResult     = hlp.getNetIncomeTestResult(client),
    maxSnapAllotment        = getYearlyLimitBySize(SNAPData.SNAP_LIMITS, hlp.householdSize(client)),
    thirtyPercentNetIncome  = hlp.monthlyNetIncome(client) * SNAPData.PERCENT_OF_NET,
    maxClientAllotment      = Math.max(0, maxSnapAllotment - thirtyPercentNetIncome);

  if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {

    if (maxClientAllotment <= SNAPData.SMALL_HOUSEHOLD_MIN_GRANT) {
      if (hlp.householdSize(client) <= SNAPData.SMALL_HOUSEHOLD_SIZE) {
        finalResult = SNAPData.SMALL_HOUSEHOLD_MIN_GRANT;
      }

    } else {
      finalResult = maxClientAllotment;
    }

  }

  return finalResult;
}; // End getSNAPBenefits()


// ======================
// BENEFIT HELPER FUNCTIONS
var SNAPhelpers = {},
  hlp         = SNAPhelpers;


// ======================
// HOUSEHOLD/HOUSEHOLD MEMBERS
hlp.householdSize = function (client) {
  return client.household.length;
};

hlp.isElderlyOrDisabled = function (member) {
  return member.m_age >= 60 || isDisabled(member);
};

hlp.hasDisabledOrElderlyMember = function (client) {
  return getEveryMemberOfHousehold(client, hlp.isElderlyOrDisabled).length > 0;
};

hlp.hasDependentsOver12 = function (client) {
  var isOver12 = function (member) { return !isUnder13(member); };
  var members = getEveryMember(getDependentsOfHousehold(client), isOver12);
  return members.length > 0;
};


// ======================
//GROSS INCOME
hlp.getAdjustedGross = function (client) {
  var raw = client.earned + getGrossUnearnedIncomeMonthly(client) - client.childSupportPaidOut;
  return Math.max(0, raw);
};

hlp.getPovertyGrossIncomeLevel = function (client) {
  return getMonthlyLimitBySize(federalPovertyGuidelines, hlp.householdSize(client), 200);
};

hlp.getGrossIncomeTestResult = function (client) {
  var adjustedGross           = hlp.getAdjustedGross(client),
    povertyGrossIncomeLevel = hlp.getPovertyGrossIncomeLevel(client),
    isPassGrossIncomeTest   = null;
  if (hlp.hasDisabledOrElderlyMember(client)) {
    isPassGrossIncomeTest = true;
  } else {
    /** @todo must double checked in the documentation.
     *     Two different results in both excel calculator
     *     and website calculator */
    // minor difference "<" in website calculator logic on line 469.
    if (adjustedGross <= povertyGrossIncomeLevel) {
      isPassGrossIncomeTest = true;
    } else {
      isPassGrossIncomeTest = false;
    }
  }
  return isPassGrossIncomeTest;
};


// ======================
// SHELTER
hlp.isHomeless = function(client) {
  // Worth abstracting, used a few places and may change
  return client.shelter === 'homeless';
};

/** @todo: What about housing voucher? */
hlp.getNonUtilityCosts = function(client) {
  var shelterCost = null;

  if (hlp.isHomeless(client)) {
    shelterCost = 0;
  } else if (client.shelter === 'homeowner') {
    shelterCost = client.mortgage + client.housingInsurance + client.propertyTax;
  } else if (client.shelter === 'renter') {
    shelterCost = client.rent;
  } else if (client.shelter === 'voucher') {
    shelterCost = client.rentShare;
  }

  return shelterCost;
};

hlp.getUtilityCostByBracket = function (client) {

  if (hlp.isHomeless(client)){
    return 0;

  } else {
    
    var utilityCategory = null;

    if (client.climateControl || client.fuelAssistance) {
      utilityCategory = 'Heating';
    } else if (client.nonHeatElectricity) {
      utilityCategory = 'Non-heating';
    } else if (client.phone) {
      utilityCategory = 'Telephone';
    } else {
      utilityCategory = 'Zero Utility Expenses';
    }

    return SNAPData.UTILITY_COST_BRACKETS[ utilityCategory ];
  }
};

hlp.getTotalshelterCost = function (client) {

  var shelterCosts = hlp.getNonUtilityCosts(client),
    utilityCosts = hlp.getUtilityCostByBracket(client);

  return shelterCosts + utilityCosts;
};


// ======================
// INCOME DEDUCTIONS
hlp.getStandardDeduction = function (client) {
  return getYearlyLimitBySize(SNAPData.STANDARD_DEDUCTIONS, hlp.householdSize(client));
};

hlp.getEarnedIncomeDeduction = function (client) {
  var totalMonthlyEarned = client.earned;
  return totalMonthlyEarned * SNAPData.PERCENT_GROSS_MONTHLY_EARNED;
};

hlp.getMedicalDeduction = function (client) {
  var medicalDeduce = 0;

  if (hlp.hasDisabledOrElderlyMember(client) === true) {
    /** @todo Add disabledAssistance too. Also, otherMedical? */
    var medicalExpenses = client.disabledMedical;
    if ((medicalExpenses >= SNAPData.MIN_MEDICAL_EXPENSES) && (medicalExpenses <= SNAPData.MAX_MEDICAL_EXPENSES)) {
      medicalDeduce = SNAPData.STANDARD_MEDICAL_DEDUCTION;

    } else if (medicalExpenses >= SNAPData.MAX_MEDICAL_EXPENSES + 1) {
      medicalDeduce = medicalExpenses - SNAPData.MIN_MEDICAL_EXPENSES;

    }
  }  // end if has disabled or elderly

  return medicalDeduce;
};

hlp.getDependentCareDeduction = function (client) {

  var dependentCare = 0;

  /** @todo Adopt https://github.com/codeforboston/cliff-effects/issues/264
   *     model for all these 'kinds' of 'if' situations. If possible. */
  if (getUnder13OfHousehold(client).length > 0) {
    dependentCare += sumProps(client, UNDER13_CARE_EXPENSES);
  }

  /** May want to test this the same way as Expenses step does. More consistent? */
  if (hlp.hasDependentsOver12(client)) {
    dependentCare += sumProps(client, OVER12_CARE_EXPENSES);
  }

  return dependentCare;
};

hlp.getHalfAdjustedIncome = function(client) {
  return hlp.getAdjustedNotGrossIncome(client) * 0.50;
};

hlp.getRawShelterDeduction = function(client) {
  var totalShelterCost    = hlp.getTotalshelterCost(client),
    halfAdjustedIncome  = hlp.getHalfAdjustedIncome(client),
    rawShelterDeduction = totalShelterCost - halfAdjustedIncome;

  return Math.max(0, rawShelterDeduction);
};

hlp.getShelterDeduction = function(client) {

  var rawDeduction = hlp.getRawShelterDeduction(client);

  if (hlp.hasDisabledOrElderlyMember(client)) {
    return rawDeduction;
  } else {
    return Math.min(rawDeduction, SNAPData.SHELTER_DEDUCTION_CAP);
  }

};

hlp.getHomelessDeduction = function(client) {
  if (hlp.isHomeless(client)) { return SNAPData.HOMELESS_DEDUCTION; }
  else { return 0; }
};


// ======================
// NET INCOME
hlp.getAdjustedNotGrossIncome = function (client) {
  var adjustedGross           = hlp.getAdjustedGross(client),
    standardDeduction       = hlp.getStandardDeduction(client),
    earnedIncomeDeduction   = hlp.getEarnedIncomeDeduction(client),
    medicalDeduction        = hlp.getMedicalDeduction(client),
    dependentCareDeduction  = hlp.getDependentCareDeduction(client);

  var adjustedIncome = adjustedGross - standardDeduction - earnedIncomeDeduction - medicalDeduction - dependentCareDeduction;
  return Math.max(0, adjustedIncome);
};

hlp.monthlyNetIncome = function(client) {
  var adjustedIncome        = hlp.getAdjustedNotGrossIncome(client),
    hasHomelessDeduction  = hlp.getHomelessDeduction(client),
    shelterDeduction      = hlp.getShelterDeduction(client),
    extraDeductions       = hasHomelessDeduction + shelterDeduction;

  var afterDeductions = adjustedIncome - extraDeductions;

  return Math.max(0, afterDeductions);
};

hlp.getMaxNetIncome = function (client) {
  //TODO: Logic different in website calculate; when (hlp.monthlyNetIncome < 0 ) = 0 while excel return a number
  var adjustedGross           = hlp.getAdjustedGross(client),
    povertyGrossIncomeLevel = hlp.getPovertyGrossIncomeLevel(client),
    disabledOrElderlyMember = hlp.hasDisabledOrElderlyMember(client);
  
  if ((adjustedGross <= povertyGrossIncomeLevel) || !disabledOrElderlyMember) {
    return 'no limit';
  } else {
    return getYearlyLimitBySize(SNAPData.NET_INCOME_LIMITS, hlp.householdSize(client));
  }
};

// NET INCOME TEST RESULT
hlp.getNetIncomeTestResult = function(client) {

  var maxNetIncome = hlp.getMaxNetIncome(client);

  if (maxNetIncome === 'no limit') {
    return true;
  } else if (hlp.monthlyNetIncome(client) < maxNetIncome) {
    return true;
  } else {
    return false;
  }

};

/** NOTE: Bay State CAP not included as this prototype only deals with
 *     changes in earned income */

export { getSNAPBenefits, SNAPhelpers };
