// DATA
import { CHILD_CARE_EXPENSES, ADULT_CARE_EXPENSES } from '../../data/state/massachusetts/name-cores';
import { SNAPData } from '../../data/federal/2017/SNAPData';
import { federalPovertyGuidelines } from '../../data/federal/federalPovertyGuidelines';

// LOGIC/UTILITIES
import { Result } from '../../utils/Result';
import {
  toCashflow,
  sumCashflow,
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
const getSNAPBenefits = function ( client ) {
  var timeframe = 'current';

  var finalResult = null;
  var grossIncomeTestResult   = getGrossIncomeTestResult(client, timeframe);
  var netIncomeTestResult     = getNetIncomeTestResult(client, timeframe);
  var maxSnapAllotment        = getMaxSnapAllotment(client, timeframe);
  var thirtyPercentNetIncome  = getThirtyPercentNetIncome(client, timeframe);
  var maxClientAllotment      = maxSnapAllotment - thirtyPercentNetIncome;

  if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {

    if ( maxClientAllotment <= SNAPData.SMALL_HOUSEHOLD_MIN_GRANT ) {
      if ( householdSize( client, timeframe ) <= SNAPData.SMALL_HOUSEHOLD_SIZE) {
        finalResult = SNAPData.SMALL_HOUSEHOLD_MIN_GRANT;
      } else {
        finalResult = 0;
      }

    } else {
      finalResult = maxClientAllotment;
    }
  } else {
    finalResult = 0;
  }

  var result = new Result({
      result: 'good',
      details: 'IT IS AWESOME!!!',
      benefitValue: finalResult
    });
  return result;
}; // End getSNAPBenefits()

//GROSS INCOME TEST
const isElderlyOrDisabled = function ( member ) {
  return member.age >= 60 || isDisabled( member );
};

const hasDisabledOrElderlyMember = function (client, timeframe) {
  return getEveryMemberOfHousehold( client, timeframe, isElderlyOrDisabled ).length > 0;
};

const getTotalMonthlyGross = function (client, timeframe) {
  return toCashflow(client, 'future', 'EarnedIncome') + getGrossUnearnedIncomeMonthly(client, timeframe) - toCashflow(client, timeframe, 'ChildSupportPaidOut');
};

const getPovertyGrossIncomeLevel = function (client, timeframe ) {
  return getMonthlyLimitBySize(federalPovertyGuidelines, householdSize( client, timeframe ), 200);
};

const checkIncome = function (client, timeframe) {
  var totalMonthlyGross = getTotalMonthlyGross(client, timeframe);
  var povertyGrossIncomeLevel = getPovertyGrossIncomeLevel(client, timeframe);
  var isDisabledOrElderlyMember = hasDisabledOrElderlyMember(client, timeframe);
  if ((totalMonthlyGross > povertyGrossIncomeLevel) && isDisabledOrElderlyMember) {
    return true;
  } else {
    return false;
  }
};

const isNetIncomeTest = function(client, timeframe) {
  if (checkIncome(client, timeframe)) {
    return true;
  } else {
    return false;
  }
};

const getGrossIncomeTestResult = function (client, timeframe) {
  var totalMonthlyGross = getTotalMonthlyGross(client, timeframe);
  var povertyGrossIncomeLevel = getPovertyGrossIncomeLevel(client, timeframe);
  var isPassGrossIncomeTest = null;
  if ( hasDisabledOrElderlyMember(client, timeframe) ) {
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
const getStandardDeduction = function (client, timeframe) {
  return getYearlyLimitBySize(SNAPData.STANDARD_DEDUCTIONS, householdSize( client, timeframe ));
};

const getEarnedIncomeDeduction = function (client, timeframe) {
  var totalMonthlyEarnedGross = toCashflow(client, 'future', 'EarnedIncome');
  return totalMonthlyEarnedGross * SNAPData.PERCENT_GROSS_MONTHLY_EARNED;
};

const getMedicalDeduction = function (client, timeframe) {
  var medicalDeduce = null;
  if ( hasDisabledOrElderlyMember(client, timeframe) === false ) {
    return 0;
  } else {
    // include currentDisabledMedicalCostsMonthly,  currentOtherMedicalCostsMonthly ??
    var medicalExpenses = client[timeframe + 'DisabledMedicalCostsMonthly'];
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

const getDependentCareDeduction = function (client, timeframe) {

  var childCare = 0, adultCare = 0;

  if ( getUnder13OfHousehold( client, timeframe ).length > 0 ) {
    childCare = sumCashflow( client, timeframe, CHILD_CARE_EXPENSES );
  }

  if ( getEveryMemberOfHousehold( client, timeframe, isDependentOver12 ).length > 0 ) {
    adultCare = sumCashflow( client, timeframe, ADULT_CARE_EXPENSES );
  }

  var totalDependentCare = childCare + adultCare;

  return totalDependentCare;
};

const getChildPaymentDeduction = function (client, timeframe) {
  return toCashflow(client, timeframe, 'ChildSupportPaidOut');
};

const getAdjustedIncomeAfterDeduction = function (client, timeframe) {
  var totalMonthlyGross = getTotalMonthlyGross(client, timeframe)
  var standardDeduction = getStandardDeduction(client, timeframe);
  var earnedIncomeDeduction = getEarnedIncomeDeduction(client, timeframe);
  var medicalDeduction = getMedicalDeduction(client, timeframe);
  var dependentCareDeduction = getDependentCareDeduction(client,timeframe);

  var adjustedIncome = totalMonthlyGross - standardDeduction - earnedIncomeDeduction - medicalDeduction - dependentCareDeduction;
  return Math.max( 0, adjustedIncome );
};

// EXPENSE DEDUCTIONS
const isHomeless = function(client, timeframe ) {
  return client[timeframe + 'Shelter' === 'homeless'];
};

const getShelterDeduction = function(client, timeframe) {
  var shelterCost = null;
  var isHomeowner = client[timeframe + 'Shelter'] === 'homeowner';

  if ( isHomeless(client, timeframe) ) {
    shelterCost = 0;
  } else if(isHomeowner) {
    shelterCost = toCashflow(client, timeframe, 'Mortgage') + toCashflow(client, timeframe, 'HousingInsurance') + toCashflow(client, timeframe, 'PropertyTax');
  }
  else {
    shelterCost = toCashflow(client, timeframe, 'Rent');
  }

  return shelterCost;
};

const utilityStatus = function(client, timeframe) {
  var paidUtilityCategory = null;
  var isPayHeatingCooling = client[timeframe + 'ClimateControl'] || client[timeframe + 'HasFuelAssistance'];
  var isPayElectricity = client[timeframe + 'NonHeatElectricity'];
  var isPayTelephone = client[timeframe + 'Phone'];
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

const getStandardUtilityAllowance = function (client, timeframe) {
  if(isHomeless(client, timeframe)){
    return 0;
  }else{
    var paidUtilityCategory = utilityStatus(client, timeframe);
    return SNAPData.UTILITY_DEDUCTIONS[paidUtilityCategory];
  }
};

const getTotalshelterCost = function (client, timeframe) {
  var shelterDeduction = getShelterDeduction(client, timeframe);
  var utilityDeductions = getStandardUtilityAllowance(client, timeframe);

  return shelterDeduction + utilityDeductions;
};

const getHalfAdjustedIncome = function(client, timeframe ) {
  var adjustedIncomeAfterDeduction = getAdjustedIncomeAfterDeduction(client, timeframe);
  return adjustedIncomeAfterDeduction * 0.50;
};

const excessHalfAdjustedIncome = function(client, timeframe ) {
  var totalShelterDeduction = null;
  var totalshelterCost = getTotalshelterCost(client, timeframe);
  var halfAdjustedIncome = getHalfAdjustedIncome(client, timeframe);
  if ( totalshelterCost - halfAdjustedIncome < 0   ) {
    totalShelterDeduction = 0;
  } else {
    totalShelterDeduction = totalshelterCost - halfAdjustedIncome;
  }
  return totalShelterDeduction;
};

const getShelterDeductionResult = function(client, timeframe ) {
    if ( hasDisabledOrElderlyMember(client, timeframe) ) {
      return excessHalfAdjustedIncome(client, timeframe);
    } else {
      return Math.min(excessHalfAdjustedIncome(client, timeframe), SNAPData.SHELTER_DEDUCTION_CAP);
    }
};

const getHomelessDeduction = function(client, timeframe ) {
    if ( isHomeless(client, timeframe) ) {
      return SNAPData.HOMELESS_DEDUCTION;
    } else {
      return 0;
    }
};

// NET INCOME CALCULATION
const monthlyNetIncome = function(client, timeframe ) {
    var totalMonthlyEarnedGross = toCashflow(client, 'future', 'EarnedIncome');
    var earnedIncomeDeduction = getEarnedIncomeDeduction(client, timeframe);
    var totalMonthlyUnearnedGross =  getGrossUnearnedIncomeMonthly(client, timeframe);
    var standardDeduction = getStandardDeduction(client, timeframe);
    var medicalDeduction = getMedicalDeduction(client, timeframe);
    var dependentCareDeduction = getDependentCareDeduction(client,timeframe);
    var childPaymentDeduction = getChildPaymentDeduction(client, timeframe);
    var hasHomelessDeduction = getHomelessDeduction(client, timeframe);
    var shelterDeductionResult = getShelterDeductionResult(client, timeframe);

    var totalIncome     = totalMonthlyEarnedGross + totalMonthlyUnearnedGross;
    var totalDeductions = earnedIncomeDeduction + standardDeduction + medicalDeduction
                        + hasHomelessDeduction + shelterDeductionResult
                        + dependentCareDeduction + childPaymentDeduction;
    var afterDeductions = totalIncome - totalDeductions;

    return Math.max( 0, afterDeductions );
};

const maxTotalNetMonthlyIncome = function (client, timeframe) {
    var maxTotalNetIncome = null;
    //TODO: Logic different in website calculate; when (monthlyNetIncome < 0 ) = 0 while excel return a number
    if ( isNetIncomeTest(client, timeframe)===false ) {
      maxTotalNetIncome = "no limit";
      return maxTotalNetIncome;
    } else {
      return getYearlyLimitBySize(SNAPData.NET_INCOME_LIMITS, householdSize( client, timeframe ));
    }
};

// NET INCOME TEST RESULT
const getNetIncomeTestResult = function(client, timeframe ) {
  if ( maxTotalNetMonthlyIncome(client, timeframe) === "no limit" ) {
      return true;
    } else if ( monthlyNetIncome(client, timeframe) < maxTotalNetMonthlyIncome(client, timeframe) ) {
      return true;
    }
    else {
      return false;
    }
};

// FINAL DETERMINATION
const getThirtyPercentNetIncome = function(client, timeframe) {
  if ( monthlyNetIncome(client, timeframe) * SNAPData.PERCENT_OF_NET > 0 ) {
    return monthlyNetIncome(client, timeframe) * SNAPData.PERCENT_OF_NET;
  }
  return 0;
};

const getMaxSnapAllotment = function (client, timeframe) {
  return getYearlyLimitBySize( SNAPData.SNAP_LIMITS, householdSize( client, timeframe ) );
};

const householdSize = function ( client, timeframe ) {
  return client[ timeframe ].household.length;
};

// Bay State CAP not included as this prototype only deals with
// changes in earned income


export { getSNAPBenefits };
