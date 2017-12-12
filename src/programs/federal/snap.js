// DATA
import { UNDER13_CARE_EXPENSES, OVER12_CARE_EXPENSES } from '../../data/massachusetts/name-cores';
import { SNAPData } from '../../data/federal/2017/SNAPData';
import { federalPovertyGuidelines } from '../../data/federal/federalPovertyGuidelines';

// LOGIC/UTILITIES
import {
  sumProps,
  getGrossUnearnedIncomeMonthly
} from '../../utils/cashflow';
import {
  getYearlyLimitBySize,
  getMonthlyLimitBySize
} from '../../utils/getGovData';
import {
  getEveryMemberOfHousehold,
  isDisabled,
  isUnder13,
  getUnder13OfHousehold
} from '../../utils/getMembers';


/** Based on https://www.masslegalservices.org/SNAPCalculator */
const getSNAPBenefits = function ( client, timeframe ) {

  client = client[ timeframe ];

  var finalResult = 0;
  var grossIncomeTestResult   = getGrossIncomeTestResult( client );
  var netIncomeTestResult     = getNetIncomeTestResult( client );
  var maxSnapAllotment        = getMaxSnapAllotment( client );
  var thirtyPercentNetIncome  = getThirtyPercentNetIncome( client );
  var maxClientAllotment      = maxSnapAllotment - thirtyPercentNetIncome;

  if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {

    if ( maxClientAllotment <= SNAPData.SMALL_HOUSEHOLD_MIN_GRANT ) {
      if ( householdSize( client ) <= SNAPData.SMALL_HOUSEHOLD_SIZE) {
        finalResult = SNAPData.SMALL_HOUSEHOLD_MIN_GRANT;
      } else {
        finalResult = 0;
      }

    } else {
      finalResult = maxClientAllotment;
    }

  }

  return finalResult;
}; // End getSNAPBenefits()

//GROSS INCOME TEST
const isElderlyOrDisabled = function ( member ) {
  return member.age >= 60 || isDisabled( member );
};

const hasDisabledOrElderlyMember = function (client) {
  return getEveryMemberOfHousehold( client, isElderlyOrDisabled ).length > 0;
};

const getTotalMonthlyGross = function (client) {
  return client.earned + getGrossUnearnedIncomeMonthly(client) - client.childSupportPaidOut;
};

const getPovertyGrossIncomeLevel = function (client ) {
  return getMonthlyLimitBySize(federalPovertyGuidelines, householdSize( client ), 200);
};

const checkIncome = function (client) {
  var totalMonthlyGross = getTotalMonthlyGross(client);
  var povertyGrossIncomeLevel = getPovertyGrossIncomeLevel(client);
  var isDisabledOrElderlyMember = hasDisabledOrElderlyMember(client);
  if ((totalMonthlyGross > povertyGrossIncomeLevel) && isDisabledOrElderlyMember) {
    return true;
  } else {
    return false;
  }
};

const isNetIncomeTest = function(client) {
  if (checkIncome(client)) {
    return true;
  } else {
    return false;
  }
};

const getGrossIncomeTestResult = function (client) {
  var totalMonthlyGross = getTotalMonthlyGross(client);
  var povertyGrossIncomeLevel = getPovertyGrossIncomeLevel(client);
  var isPassGrossIncomeTest = null;
  if ( hasDisabledOrElderlyMember(client) ) {
    isPassGrossIncomeTest = true;
  } else {
    // TODO: must double checked in the documentation. Two different results in both excel calculator and website calculator
    // minor difference "<" in website calculator logic on line 469.
    if ( totalMonthlyGross <= povertyGrossIncomeLevel ) {
      isPassGrossIncomeTest = true;
    } else {
      isPassGrossIncomeTest = false;
    }
  }
  return isPassGrossIncomeTest;
};

// INCOME DEDUCTIONS
const getStandardDeduction = function (client) {
  return getYearlyLimitBySize(SNAPData.STANDARD_DEDUCTIONS, householdSize( client ));
};

const getEarnedIncomeDeduction = function (client) {
  var totalMonthlyEarnedGross = client.earned;
  return totalMonthlyEarnedGross * SNAPData.PERCENT_GROSS_MONTHLY_EARNED;
};

const getMedicalDeduction = function (client) {
  var medicalDeduce = null;
  if ( hasDisabledOrElderlyMember(client) === false ) {
    return 0;
  } else {
    // include disabledMedical, otherMedical, disabledAssistance ?? 
    var medicalExpenses = client.disabledMedical;
    /** @todo: Add disabled assistance too */
    if ((medicalExpenses >= SNAPData.MIN_MEDICAL_EXPENSES) && (medicalExpenses <= SNAPData.MAX_MEDICAL_EXPENSES)) {
      medicalDeduce = SNAPData.STANDARD_MEDICAL_DEDUCTION;
      return medicalDeduce;
    } else {
      if (medicalExpenses >= SNAPData.MAX_MEDICAL_EXPENSES++) {
        medicalDeduce = medicalExpenses - SNAPData.MIN_MEDICAL_EXPENSES;
        return medicalDeduce;
      }
    }
  }
  return 0;
};

const isDependentOver12 = function ( member ) {
  return (!isUnder13( member ) && member.age <= 18) || isDisabled( member );
};

const getDependentCareDeduction = function (client) {

  var childCare = 0, adultCare = 0;

  /** @todo Adopt https://github.com/codeforboston/cliff-effects/issues/264
   *     model for all these 'kinds' of 'if' situations. If possible. */
  if ( getUnder13OfHousehold( client ).length > 0 ) {
    childCare = sumProps( client, UNDER13_CARE_EXPENSES );
  }

  if ( getEveryMemberOfHousehold( client, isDependentOver12 ).length > 0 ) {
    adultCare = sumProps( client, OVER12_CARE_EXPENSES );
  }

  var totalDependentCare = childCare + adultCare;

  return totalDependentCare;
};

const getChildPaymentDeduction = function (client) {
  return client.childSupportPaidOut;
};

const getAdjustedIncomeAfterDeduction = function (client) {
  var totalMonthlyGross = getTotalMonthlyGross(client)
  var standardDeduction = getStandardDeduction(client);
  var earnedIncomeDeduction = getEarnedIncomeDeduction(client);
  var medicalDeduction = getMedicalDeduction(client);
  var dependentCareDeduction = getDependentCareDeduction(client);

  var adjustedIncome = totalMonthlyGross - standardDeduction - earnedIncomeDeduction - medicalDeduction - dependentCareDeduction;
  return Math.max( 0, adjustedIncome );
};

// EXPENSE DEDUCTIONS
const isHomeless = function(client ) {
  return client.shelter === 'homeless';
};

/** @todo: What about housing voucer? */
const getShelterDeduction = function(client) {
  var shelterCost = null;
  var isHomeowner = client.shelter === 'homeowner';

  if ( isHomeless(client) ) {
    shelterCost = 0;
  } else if(isHomeowner) {
    shelterCost = client.mortgage + client.housingInsurance + client.propertyTax;
  }
  else {
    shelterCost = client.rent;
  }

  return shelterCost;
};

const utilityStatus = function(client) {
  var paidUtilityCategory = null;
  var isPayHeatingCooling = client.climateControl || client.hasFuelAssistance;
  var isPayElectricity = client.nonHeatElectricity;
  var isPayTelephone = client.phone;
  if ( isPayHeatingCooling ) {
    paidUtilityCategory = "Heating";
  } else if (isPayElectricity) {
    paidUtilityCategory = "Non-heating";
  } else if (isPayTelephone) {
    paidUtilityCategory = "Telephone";
  } else {
    paidUtilityCategory = "Zero Utility Expenses";
  }
  return paidUtilityCategory;
};

const getStandardUtilityAllowance = function (client) {
  if(isHomeless(client)){
    return 0;
  }else{
    var paidUtilityCategory = utilityStatus(client);
    return SNAPData.UTILITY_DEDUCTIONS[paidUtilityCategory];
  }
};

const getTotalshelterCost = function (client) {
  var shelterDeduction = getShelterDeduction(client);
  var utilityDeductions = getStandardUtilityAllowance(client);

  return shelterDeduction + utilityDeductions;
};

const getHalfAdjustedIncome = function(client) {
  var adjustedIncomeAfterDeduction = getAdjustedIncomeAfterDeduction(client);
  return adjustedIncomeAfterDeduction * 0.50;
};

const excessHalfAdjustedIncome = function(client) {
  var totalShelterDeduction = null;
  var totalshelterCost = getTotalshelterCost(client);
  var halfAdjustedIncome = getHalfAdjustedIncome(client);
  if ( totalshelterCost - halfAdjustedIncome < 0   ) {
    totalShelterDeduction = 0;
  } else {
    totalShelterDeduction = totalshelterCost - halfAdjustedIncome;
  }
  return totalShelterDeduction;
};

const getShelterDeductionResult = function(client) {
    if ( hasDisabledOrElderlyMember(client) ) {
      return excessHalfAdjustedIncome(client);
    } else {
      return Math.min(excessHalfAdjustedIncome(client), SNAPData.SHELTER_DEDUCTION_CAP);
    }
};

const getHomelessDeduction = function(client) {
    if ( isHomeless(client) ) {
      return SNAPData.HOMELESS_DEDUCTION;
    } else {
      return 0;
    }
};

// NET INCOME CALCULATION
const monthlyNetIncome = function(client) {
    var totalMonthlyEarnedGross = client.earned;
    var earnedIncomeDeduction = getEarnedIncomeDeduction(client);
    var totalMonthlyUnearnedGross =  getGrossUnearnedIncomeMonthly(client);
    var standardDeduction = getStandardDeduction(client);
    var medicalDeduction = getMedicalDeduction(client);
    var dependentCareDeduction = getDependentCareDeduction(client);
    var childPaymentDeduction = getChildPaymentDeduction(client);
    var hasHomelessDeduction = getHomelessDeduction(client);
    var shelterDeductionResult = getShelterDeductionResult(client);

    var totalIncome     = totalMonthlyEarnedGross + totalMonthlyUnearnedGross;
    var totalDeductions = earnedIncomeDeduction + standardDeduction + medicalDeduction
                        + hasHomelessDeduction + shelterDeductionResult
                        + dependentCareDeduction + childPaymentDeduction;
    var afterDeductions = totalIncome - totalDeductions;

    return Math.max( 0, afterDeductions );
};

const maxTotalNetMonthlyIncome = function (client) {
    var maxTotalNetIncome = null;
    //TODO: Logic different in website calculate; when (monthlyNetIncome < 0 ) = 0 while excel return a number
    if ( isNetIncomeTest(client)===false ) {
      maxTotalNetIncome = "no limit";
      return maxTotalNetIncome;
    } else {
      return getYearlyLimitBySize(SNAPData.NET_INCOME_LIMITS, householdSize( client ));
    }
};

// NET INCOME TEST RESULT
const getNetIncomeTestResult = function(client ) {
  if ( maxTotalNetMonthlyIncome(client) === "no limit" ) {
      return true;
    } else if ( monthlyNetIncome(client) < maxTotalNetMonthlyIncome(client) ) {
      return true;
    }
    else {
      return false;
    }
};

// FINAL DETERMINATION
const getThirtyPercentNetIncome = function(client) {
  if ( monthlyNetIncome(client) * SNAPData.PERCENT_OF_NET > 0 ) {
    return monthlyNetIncome(client) * SNAPData.PERCENT_OF_NET;
  }
  return 0;
};

const getMaxSnapAllotment = function (client) {
  return getYearlyLimitBySize( SNAPData.SNAP_LIMITS, householdSize( client ) );
};

const householdSize = function ( client ) {
  return client.household.length;
};

// Bay State CAP not included as this prototype only deals with
// changes in earned income

export { getSNAPBenefits };
