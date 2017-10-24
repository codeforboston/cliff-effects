import { UNEARNED_INCOME_SOURCES, NET_INCOME_DEDUCTIONS, CHILD_CARE_EXPENSES } from '../../../data/state/massachusetts/name-cores';
import { toCashflow, sumCashflow, getSimpleGrossIncomeMonthly, getGrossUnearnedIncomeMonthly } from '../../../helpers/cashflow';
import { Result } from '../../../helpers/Result';
import { data } from '../../../helpers/snapData';
import { Big } from 'big.js';

const getSNAPBenefits = function ( client ) {
  var timeframe = 'current';

  // var missingProps = propsNeeded(client, requiredProps);

  // if (missingProps.length) {
  //   var details = 'Some required form fields have\'t been filled in yet.';
  //   var result = new Result({
  //     result: 'incomplete',
  //     details: 'Form incomplete',
  //     data: { missingProps: missingProps }
  //   });
  //   return result;
  // }

  var finalResult = null;
  var grossIncomeTestResult   = grossIncomeTestResult(client, timeframe);
  var netIncomeTestResult     = netIncomeTestResult(client, timeframe);
  var maxSnapAllotment        = maxSnapAllotment(client, timeframe);
  var thirtyPercentNetIncome  = thirtyPercentNetIncome(client, timeframe);

  if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {
    if (Big(maxSnapAllotment).minus(thirtyPercentNetIncome).toString() <= data.smallHouseholdMinimumGrant) {
      if (client[timeframe + 'HouseholdSize'] <= data.minHouseholdSize) {
        finalResult = data.smallHouseholdMinimumGrant;
      } else {
        finalResult = 0;
      }
    } else {
      finalResult = Math.ceil(Big(maxSnapAllotment).minus(thirtyPercentNetIncome));
    }
  } else {
    finalResult = 0;
  }
  
  return finalResult;
}; // End getSNAPBenefits()

// const monthlyAllotment = function(client, timeframe) {
//   var finalResult = null;
//   var grossIncomeTestResult = grossIncomeTestResult(client, timeframe);
//   var netIncomeTestResult = netIncomeTestResult(client, timeframe);
//   var maxSnapAllotment = maxSnapAllotment(client, timeframe);
//   var thirtyPercentNetIncome = thirtyPercentNetIncome(client, timeframe);

//   if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {
//     if (Big(maxSnapAllotment).minus(thirtyPercentNetIncome).toString() <= data.smallHouseholdMinimumGrant) {
//       if (client[timeframe + 'HouseholdSize'] <= data.minHouseholdSize) {
//         finalResult = data.smallHouseholdMinimumGrant;
//       } else {
//         finalResult = 0;
//       }
//     } else {
//       finalResult = Math.ceil(Big(maxSnapAllotment).minus(thirtyPercentNetIncome));
//       return finalResult;
//     }
//   } else {
//     finalResult = 0;
//     return finalResult;
//   }
// };

const requiredProps = [
  'currentDisabledOrElderlyMember',
  'futureEarnedIncomeMonthly',
  'currentTAFDCMonthly',
  'currentSSIMonthly',
  'currentSSDIMonthly',
  'currentChildSupportInMonthly',
  'currentUnemploymentMonthly',
  'currentWorkersCompMonthly',
  'currentPensionMonthly',
  'currentSocialSecurityMonthly',
  'currentAlimonyMonthly',
  'currentOtherIncomeMonthly',
  'currentHouseoldSize',
  'currentChildSupportPaidOutMonthly',
  'currentChildDirectCareCostsMonthly',
  'currentChildBeforeAndAfterSchoolCareCostsMonthly',
  'currentChildTransportationCostsMonthly',
  'currentChildOtherCareCostsMonthly',
  'currentAdultDirectCareCostsMonthly',
  'currentAdultTransportationCostsMonthly',
  'currentAdultOtherCareCostsMonthly',
  'currentDisabledMedicalCostsMonthly',
  'currentHomeless',
  'currentMortgageMonthly',
  'currentHousingInsuranceMonthly',
  'currentPropertyTaxMonthly',
  'currentPaidUtilities',
  'currentClimateControl',
  'currentNonHeatElectricity',
  'currentPhone',


  // 'currentHomeowner',
  /* All question marks in spreadsheet
  'currentIncomeExclusionsMonthly',
  'currentDisabledAssistanceMonthly',
  'currentOtherMedicalCostsMonthly',
  'currentRentShareMonthly',
  'currentContractRentMonthly',
  'currentRentMonthly'
  */
];

const getAllowance = function(client, timeframe, data, baseRate ) {
  if ( client[timeframe + 'HouseholdSize'] > 8  ) {
    return data[8] + (client[timeframe + 'HouseholdSize'] - 8) * baseRate;
  } else {
    return data[client[timeframe + 'HouseholdSize']];
  }
};

//GROSS INCOME TEST
const isDisabledOrElderlyMember = function (client, timeframe) {
  return client[timeframe + 'DisabledOrElderlyMember'];
};

const totalMonthlyGross = function (client, timeframe) {
  return parseFloat(Big(getSimpleGrossIncomeMonthly(client, timeframe)).minus(toCashflow(client, timeframe, 'ChildSupportPaidOut')).toString());
};

const povertyGrossIncomeLevel = function (client, timeframe ) {
  return getAllowance(client, timeframe, data.povertyGrossIncome, data.overNumberHouseholdRate);
};

const checkIncome = function (client, timeframe) {
  var totalMonthlyGross = totalMonthlyGross(client, timeframe);
  var povertyGrossIncomeLevel = povertyGrossIncomeLevel(client, timeframe);
  var isDisabledOrElderlyMember = isDisabledOrElderlyMember(client, timeframe);
  if ((totalMonthlyGross > povertyGrossIncomeLevel) && isDisabledOrElderlyMember) {
    return true;
  } else {
    return false;
  }
};

const isAssetTest = function(client, timeframe) {
  if (checkIncome(client, timeframe)) {
    return true; // Yes, "Yes, assets must be <=$3,250"
  } else {
    return false; //No
  }
};

const isNetIncomeTest = function(client, timeframe) {
  if (checkIncome(client, timeframe)) {
    return true;
  } else {
    return false;
  }
};

const grossIncomeTestResult = function (client, timeframe) {
  var totalMonthlyGross = totalMonthlyGross(client, timeframe);
  var povertyGrossIncomeLevel = povertyGrossIncomeLevel(client, timeframe);
  var isPassGrossIncomeTest = null;
  if ( isDisabledOrElderlyMember(client, timeframe) ) {
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
const standardDeduction = function (client, timeframe) {
  if (client[timeframe + 'HouseholdSize'] >= 6) {
    return data.standardDeduction[6];
  }
  return data.standardDeduction[client[timeframe + 'HouseholdSize']];
};

const earnedIncomeDeduction = function (client, timeframe) {
  var totalMonthlyEarnedGross = toCashflow(client, timeframe, 'EarnedIncome');
  return parseFloat( Big(totalMonthlyEarnedGross).times(data.percentOfGrossMonthlyEarnedIncome).toString() );
};

const medicalDeduction = function (client, timeframe) {
  var medicalDeduce = null;
  if (client[timeframe + 'DisabledOrElderlyMember'] === false) {
    return 0;
  } else {
    // include currentDisabledMedicalCostsMonthly,  currentOtherMedicalCostsMonthly ??
    var medicalExpenses = client[timeframe + 'DisabledAssistanceMonthly'];
    if ((medicalExpenses >= data.beginRangeMedicalExpensesThreshold) && (medicalExpenses <= data.endRangeMedicalExpensesThreshold)) {
      medicalDeduce = data.standardMedicalDeduction;
      return medicalDeduce;
    } else {
      if (medicalExpenses >= data.endRangeMedicalExpensesThreshold++) {
        medicalDeduce = parseFloat( Big(medicalExpenses).minus(data.beginRangeMedicalExpensesThreshold).toString() );
        return medicalDeduce;
      }
    }
  }
  return 0;
};

const dependentCareDeduction = function (client, timeframe) {
  //add ADULT_CARE_EXPENSES to name-cores.js ???
  const ADULT_CARE_EXPENSES = ['AdultDirectCareCosts', 'AdultTransportationCosts', 'AdultOtherCareCosts'];
  var totalDependentCare = parseFloat(Big(sumCashflow( client, timeframe, CHILD_CARE_EXPENSES )).plus(Big(sumCashflow( client, timeframe, ADULT_CARE_EXPENSES ))));

  return totalDependentCare;
};

const childPaymentDeduction = function (client, timeframe) {
    return toCashflow(client, timeframe, 'ChildSupportPaidOut');
};

const adjustedIncomeAfterDeduction = function (client, timeframe) {
  var totalMonthlyGross = totalMonthlyGross(client, timeframe)
  var standardDeduction = standardDeduction(client, timeframe);
  var earnedIncomeDeduction = earnedIncomeDeduction(client, timeframe);
  var medicalDeduction = medicalDeduction(client, timeframe);
  var dependentCareDeduction = dependentCareDeduction(client,timeframe);
  var totalDeduction = parseFloat( Big(totalMonthlyGross).minus(standardDeduction).minus(earnedIncomeDeduction).minus(medicalDeduction).minus(dependentCareDeduction).toString() );

  if ( totalDeduction < 0  ) {
    return 0;
  }
  return  totalDeduction;
};

// EXPENSE DEDUCTIONS
const isHomeless = function(client, timeframe ) {
  return client[timeframe + 'Homeless'];
};

const shelterDeduction = function(client, timeframe) {
  var shelterCost = null;
  if ( isHomeless(client, timeframe) ) {
    shelterCost = 0;
    return shelterCost;
  } else {
    shelterCost = parseFloat( Big(toCashflow(client, timeframe, 'Mortgage')).plus(toCashflow(client, timeframe, 'HousingInsurance')).plus(toCashflow(client, timeframe, 'PropertyTax')).toString() );
    return shelterCost;
  }
};

const utilityStatus = function(client, timeframe) {
  var utilityStatus = null;
  var isPayHeatingCooling = client[timeframe + 'ClimateControl'];
  var isPayElectricity = client[timeframe + 'NonHeatElectricity'];
  var isPayTelephone = client[timeframe + 'Phone'];
  if ( isPayHeatingCooling ) {
    utilityStatus = "Heating";
  } else if (isPayElectricity) {
    utilityStatus = "Non-heating";
  } else if (isPayTelephone) {
    utilityStatus = "Telephone";
  } else {
    utilityStatus = "Zero Utility Expense";
  }
  return utilityStatus;
};

const standardUtilityAllowance = function (client, timeframe) {
  var status = utilityStatus(client, timeframe);
  return data.standardUtilityAllowance[status];
};

const totalshelterCost = function (client, timeframe) {
  var shelterDeduction = shelterDeduction(client, timeframe);
  var standardUtilityAllowance = standardUtilityAllowance(client, timeframe);
  return parseFloat( Big(shelterDeduction).plus(standardUtilityAllowance).toString() );
};

const halfAdjustedIncome = function(client, timeframe ) {
  var adjustedIncomeAfterDeduction = adjustedIncomeAfterDeduction(client, timeframe);
    return parseFloat( Big(adjustedIncomeAfterDeduction).times(0.50).toString() );
};

const excessHalfAdjustedIncome = function(client, timeframe ) {
  var totalShelterDeduction = null;
  var totalshelterCost = totalshelterCost(client, timeframe);
  var halfAdjustedIncome = halfAdjustedIncome(client, timeframe);
  if ( parseFloat(Big(totalshelterCost).minus(halfAdjustedIncome).toString()) < 0   ) {
    totalShelterDeduction = 0;
  } else {
    totalShelterDeduction = parseFloat(Big(totalshelterCost).minus(halfAdjustedIncome).toString());
  }
  return totalShelterDeduction;
};

const shelterDeductionResult = function(client, timeframe ) {
    if ( isDisabledOrElderlyMember(client, timeframe) ) {
      return excessHalfAdjustedIncome(client, timeframe);
    } else {
      return Math.min(excessHalfAdjustedIncome(client, timeframe), data.standardShelterDeductionCap);
    }
};

const hasHomelessDeduction = function(client, timeframe ) {
    if ( isHomeless(client, timeframe) ) {
      return data.homelessDeduction;
    } else {
      return 0;
    }
};

// NET INCOME CALCULATION
const monthlyNetIncome = function(client, timeframe ) {
    var totalMonthlyEarnedGross = toCashflow(client, timeframe, 'EarnedIncome');
    var earnedIncomeDeduction = earnedIncomeDeduction(client, timeframe);
    var totalMonthlyUnearnedGross =  getGrossUnearnedIncomeMonthly(client, timeframe);
    var standardDeduction = standardDeduction(client, timeframe);
    var medicalDeduction = medicalDeduction(client, timeframe);
    var dependentCareDeduction = dependentCareDeduction(client,timeframe);
    var childPaymentDeduction = childPaymentDeduction(client, timeframe);
    var hasHomelessDeduction = hasHomelessDeduction(client, timeframe);
    var shelterDeductionResult = shelterDeductionResult(client, timeframe);

    return parseFloat(Big(totalMonthlyEarnedGross).minus(earnedIncomeDeduction).plus(totalMonthlyUnearnedGross).minus(standardDeduction).minus(medicalDeduction).minus(dependentCareDeduction).minus(childPaymentDeduction).minus(hasHomelessDeduction).minus(shelterDeductionResult).toString());
};

const maxTotalNetMonthlyIncome = function (client, timeframe) {
    var maxTotalNetIncome = null;
    //TODO: Logic different in website calculate; when (monthlyNetIncome < 0 ) = 0 while excel return a number
    if ( isNetIncomeTest(client, timeframe)===false ) {
      maxTotalNetIncome = "no limit";
      return maxTotalNetIncome;
    } else {
      return getAllowance(client, timeframe, data.maxAllowableMonthlyNetIncome, data.maxAllowableMonthlyNetIncomeRate);
    }
};

// NET INCOME TEST RESULT
const netIncomeTestResult = function(client, timeframe ) {
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
const thirtyPercentNetIncome = function(client, timeframe) {
  if ( Big(monthlyNetIncome(client, timeframe)).times(data.percentOfIncome) > 0 ) {
    return parseFloat(Big(monthlyNetIncome(client, timeframe)).times(data.percentOfIncome));
  }
  return 0;
};

const maxSnapAllotment = function (client, timeframe) {
  return getAllowance(client, timeframe, data.maxFoodStampAllotment, data.maxFoodStampAllotmentRate);
};

const bayStateCapCalculation = function (client, timeframe) {
  var totalMonthlyEarnedGross = toCashflow(client, timeframe, 'EarnedIncome');
  var unearnedMonthlyIncome = getGrossUnearnedIncomeMonthly(client, timeframe);
  var standardDeduction = standardDeduction(client, timeframe);
  var shelterDeduction = shelterDeduction(client, timeframe);
  var income = Big(unearnedMonthlyIncome).minus(standardDeduction).toString();
  var halfIncome = Big(income).div(2).toString();
  var maxFoodStamp = data.maxFoodStamp;
  var imputedShelterExpense = null;
  var standardUtilityAllowance = null;
  var totalShelterCost = null;
  var shelterDeduce = null;
  var adjustedIncome = null;
  var percentAdjustedIncome = null;

  if ( client[timeframe + 'DisabledOrElderlyMember'] && totalMonthlyEarnedGross === 0  && client[timeframe + 'HouseholdSize']===1 ) {
    (shelterDeduction >= 453)? imputedShelterExpense = 453: imputedShelterExpense = 223;
    standardUtilityAllowance = 634;
    totalShelterCost = Big(imputedShelterExpense).plus(standardUtilityAllowance).toString();
    shelterDeduce = Big(totalShelterCost).minus(halfIncome).toString();
    adjustedIncome = Big(income).minus(shelterDeduce).toString();

    if ( adjustedIncome > 0 ) {
      percentAdjustedIncome = Big(adjustedIncome).times(data.percentOfIncome);
    } else {
      percentAdjustedIncome = 0
    }

    if ( Big(maxFoodStamp).minus(percentAdjustedIncome) > 0 ) {
      return parseFloat(Big(maxFoodStamp).minus(percentAdjustedIncome));
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};


const propsNeeded = function (client, props) {

  var missingProps = [];

  for (let propi = 0; propi < props.length; propi++) {
    let key = props[propi];
    if (client[key] === undefined) {
      missingProps.push(key);
    }
  }

  return missingProps;
};

export { getSNAPBenefits };









//import { percentPovertyLevel,
//    percentStateMedianIncome } from '../../../helpers/helperFunctions';
//
//function getSnapEligibility(client) {
//    let percentPov = percentPovertyLevel(parseInt(client.annualIncome), client.householdSize);
//    if (client.annualIncome == 0 || percentPov < 70) {
//        return {result: 'good', details: 'All good!', benefitValue: 1000};
//    } else if ( percentPov > 70 && percentPov < 80) {
//        return {result: 'information', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is close to the 80% limit.`, benefitValue: 1000};
//    } else {
//        return {result: 'warning', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is above the 80% limit.`, benefitValue: 0};
//    }
//}
//
//export {getSnapEligibility};