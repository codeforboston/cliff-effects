// DATA
import { UNDER13_CARE_EXPENSES, OVER12_CARE_EXPENSES } from '../../data/massachusetts/name-cores';
import { SNAPData } from '../../data/federal/2017/SNAPData';
import { federalPovertyGuidelines } from '../../data/federal/federalPovertyGuidelines';

// LOGIC/UTILITIES
import {
  sumProps,
  getGrossUnearnedIncomeMonthly,
} from '../../utils/cashflow';
import { getLimitBySize } from '../../utils/getGovData';
import { toMonthlyFrom } from '../../utils/convert-by-timescale';
import {
  getEveryMemberOfHousehold,
  getDependentMembers,
  isDisabled,
  getYoungerThan,
  getOlderThan,
} from '../../utils/getMembers';


/** Based on https://www.masslegalservices.org/SNAPCalculator */
const getSNAPBenefits = function (client, timeframe) {

  client = client[ timeframe ];

  var finalResult = 0,
      householdSize           = hlp.getHouseholdSize(client),
      grossIncomeTestResult   = hlp.passesGrossIncomeTest(client),
      netIncomeTestResult     = hlp.passesNetIncomeTest(client),
      maxSnapAllotment        = getLimitBySize(SNAPData.SNAP_LIMITS, householdSize),
      percentageOfNetIncome   = hlp.getNetIncome(client) * SNAPData.PERCENT_OF_NET,
      maxClientAllotment      = Math.max(0, maxSnapAllotment - percentageOfNetIncome);

  if (grossIncomeTestResult === true && netIncomeTestResult === true) {

    if (maxClientAllotment <= SNAPData.SMALL_HOUSEHOLD_MIN_GRANT) {
      if (householdSize <= SNAPData.SMALL_HOUSEHOLD_SIZE) {
        finalResult = SNAPData.SMALL_HOUSEHOLD_MIN_GRANT;
      }

    } else {
      finalResult = maxClientAllotment;
    }

  }

  return finalResult;
}; // End getSNAPBenefits()


// ESTABLISH OBJECT FOR BENEFIT HELPERS
var SNAPhelpers = {},
    hlp         = SNAPhelpers;


// Used in 5 other functions
hlp.getHouseholdSize = function (client) {
  return client.household.length;
};


// Used in 1 other function, main function
/** Abstraction for use in main function.
 * 
 * @todo must double checked in the documentation.
 *     Website uses `<` for comparison, excel sheet
 *     uses `<=` when comparing adjusted gross to
 *     poverty limit. */
hlp.passesGrossIncomeTest = function (client) {
  var adjustedGross    = hlp.getAdjustedGross(client),
      grossIncomeLimit = hlp.getGrossIncomeLimit(client),
      passes           = null;
  if (hlp.hasDisabledOrElderlyMember(client)) {
    passes = true;
  } else {
    // `<` in web calculator vs excel sheet `<=`.
    if (adjustedGross <= grossIncomeLimit) {
      passes = true;
    } else {
      passes = false;
    }
  }
  return passes;
};


// Used in 1 other function, but won't be created multiple times
hlp.isElderlyOrDisabled = function (member) {
  return member.m_age >= 60 || isDisabled(member);
};

// Used in 4 other functions
hlp.hasDisabledOrElderlyMember = function (client) {
  return getEveryMemberOfHousehold(client, hlp.isElderlyOrDisabled).length > 0;
};


// ======================
//GROSS INCOME

// Used in 3 other functions
hlp.getAdjustedGross = function (client) {
  var raw = client.earned + getGrossUnearnedIncomeMonthly(client) - client.childSupportPaidOut;
  return Math.max(0, raw);
};

// Used in 2 other functions
hlp.getGrossIncomeLimit = function (client) {
  var data      = federalPovertyGuidelines,
      numPeople = hlp.getHouseholdSize(client),
      // Data is given in yearly amounts
      limit     = getLimitBySize(data, numPeople, 200),
      // Needs to be gov money rounded?
      monthly   = toMonthlyFrom(limit, 'yearly');
  return monthly;
};


// Used in 3 other functions
hlp.isHomeless = function(client) {
  // Worth abstracting, used a few places and may change
  return client.housing === 'homeless';
};


// ======================
// INCOME DEDUCTIONS

// Used in 1 other function. Easier unit tests
hlp.getStandardDeduction = function (client) {
  return getLimitBySize(SNAPData.STANDARD_DEDUCTIONS, hlp.getHouseholdSize(client));
};

// Used in 1 other function. Easier unit tests
hlp.getEarnedIncomeDeduction = function (client) {
  var totalMonthlyEarned = client.earned;
  return totalMonthlyEarned * SNAPData.PERCENT_GROSS_MONTHLY_EARNED;
};

// Used in 1 other function. Easier unit tests
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

// Used in 1 other function. Easier unit tests
hlp.getDependentCareDeduction = function (client) {

  var dependentCare = 0;

  /** @todo Adopt https://github.com/codeforboston/cliff-effects/issues/264
   *     model for all these 'kinds' of 'if' situations. If possible. */
  if (getYoungerThan(client, 13).length > 0) {
    dependentCare += sumProps(client, UNDER13_CARE_EXPENSES);
  }

  var membersOver12    = getOlderThan(client, 12),
      dependentsOver12 = getDependentMembers(membersOver12);
  /** May want to test this the same way as Expenses step does. More consistent? */
  if (dependentsOver12.length > 0) {
    dependentCare += sumProps(client, OVER12_CARE_EXPENSES);
  }

  return dependentCare;
};


// ======================
// NET INCOME

// Used in 2 functions
hlp.getAdjustedGrossMinusDeductions = function (client) {
  var adjustedGross           = hlp.getAdjustedGross(client),
      standardDeduction       = hlp.getStandardDeduction(client),
      earnedIncomeDeduction   = hlp.getEarnedIncomeDeduction(client),
      medicalDeduction        = hlp.getMedicalDeduction(client),
      dependentCareDeduction  = hlp.getDependentCareDeduction(client);

  var adjustedIncome = adjustedGross - standardDeduction - earnedIncomeDeduction - medicalDeduction - dependentCareDeduction;
  return Math.max(0, adjustedIncome);
};


// Used in 2 functions
hlp.getNetIncome = function(client) {
  var adjustedIncome    = hlp.getAdjustedGrossMinusDeductions(client),
      // These two functions make unit testing much easier
      homelessDeduction = hlp.getHomelessDeduction(client),
      shelterDeduction  = hlp.getShelterDeduction(client);
  var extraDeductions   = homelessDeduction + shelterDeduction,
      afterDeductions   = adjustedIncome - extraDeductions;

  return Math.max(0, afterDeductions);
};

// Used by 1 function, but makes unit testing much easier
// @todo Do they still get this deduction, even if they're homeless?
hlp.getShelterDeduction = function(client) {

  var rawDeduction = hlp.getRawHousingDeduction(client);

  if (hlp.hasDisabledOrElderlyMember(client)) {
    return rawDeduction;
  } else {
    return Math.min(rawDeduction, SNAPData.SHELTER_DEDUCTION_CAP);
  }

};

// Used by 1 function, but makes unit testing much easier
hlp.getRawHousingDeduction = function(client) {
  var housingCosts        = hlp.getNonUtilityShelterCosts(client),
      utilityCosts        = hlp.getUtilityCostByBracket(client),
      totalHousingCost    = housingCosts + utilityCosts,
      halfAdjustedIncome  = hlp.getAdjustedGrossMinusDeductions(client) * 0.50,
      rawHousingDeduction = totalHousingCost - halfAdjustedIncome;

  return Math.max(0, rawHousingDeduction);
};

/** @todo: What about housing voucher? */
hlp.getNonUtilityShelterCosts = function(client) {
  var housingCost = null;

  if (hlp.isHomeless(client)) {
    housingCost = 0;
  } else if (client.housing === 'homeowner') {
    housingCost = client.mortgage + client.housingInsurance + client.propertyTax;
  } else if (client.housing === 'renter') {
    housingCost = client.rent;
  } else if (client.housing === 'voucher') {
    housingCost = client.rentShare;
  }

  return housingCost;
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

// This functions make unit testing much easier
hlp.getHomelessDeduction = function(client) {
  if (hlp.isHomeless(client)) { 
    return SNAPData.HOMELESS_DEDUCTION; 
  }
  else { 
    return 0; 
  }
};


hlp.getMaxNetIncome = function (client) {
  //TODO: Logic different in website calculator vs. excel sheet used for this logic
  var adjustedGross           = hlp.getAdjustedGross(client),
      grossIncomeLimit        = hlp.getGrossIncomeLimit(client),
      disabledOrElderlyMember = hlp.hasDisabledOrElderlyMember(client);
  
  if ((adjustedGross <= grossIncomeLimit) || !disabledOrElderlyMember) {
    return 'no limit';
  } else {
    return getLimitBySize(SNAPData.NET_INCOME_LIMITS, hlp.getHouseholdSize(client));
  }
};

// NET INCOME TEST RESULT
hlp.passesNetIncomeTest = function(client) {
  var maxNetIncome = hlp.getMaxNetIncome(client);

  if (maxNetIncome === 'no limit') {
    return true;
  } else if (hlp.getNetIncome(client) < maxNetIncome) {
    return true;
  } else {
    return false;
  }

};

/** NOTE: Bay State CAP not included as this prototype only deals with
 *     changes in earned income */

export { getSNAPBenefits, SNAPhelpers };
