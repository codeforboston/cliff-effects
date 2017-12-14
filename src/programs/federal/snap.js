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
  var grossIncomeTestResult   = hlp.getGrossIncomeTestResult( client );
  var netIncomeTestResult     = hlp.getNetIncomeTestResult( client );
  var maxSnapAllotment        = getYearlyLimitBySize( SNAPData.SNAP_LIMITS, hlp.householdSize( client ) );
  var thirtyPercentNetIncome  = hlp.monthlyNetIncome(client) * SNAPData.PERCENT_OF_NET;
  var maxClientAllotment      = maxSnapAllotment - thirtyPercentNetIncome;

  if (grossIncomeTestResult === true &&  netIncomeTestResult === true) {

    if ( maxClientAllotment <= SNAPData.SMALL_HOUSEHOLD_MIN_GRANT ) {
      if ( hlp.householdSize( client ) <= SNAPData.SMALL_HOUSEHOLD_SIZE) {
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



var SNAPhelpers = {},
    hlp         = SNAPhelpers;

//GROSS INCOME TEST
hlp.isElderlyOrDisabled = function ( member ) {
  return member.age >= 60 || isDisabled( member );
};

hlp.hasDisabledOrElderlyMember = function (client) {
  return getEveryMemberOfHousehold( client, hlp.isElderlyOrDisabled ).length > 0;
};

hlp.getTotalMonthlyGross = function (client) {
  return client.earned + getGrossUnearnedIncomeMonthly(client) - client.childSupportPaidOut;
};

hlp.getPovertyGrossIncomeLevel = function (client ) {
  return getMonthlyLimitBySize(federalPovertyGuidelines, hlp.householdSize( client ), 200);
};

hlp.getGrossIncomeTestResult = function (client) {
  var totalMonthlyGross = hlp.getTotalMonthlyGross(client);
  var povertyGrossIncomeLevel = hlp.getPovertyGrossIncomeLevel(client);
  var isPassGrossIncomeTest = null;
  if ( hlp.hasDisabledOrElderlyMember(client) ) {
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
hlp.getStandardDeduction = function (client) {
  return getYearlyLimitBySize(SNAPData.STANDARD_DEDUCTIONS, hlp.householdSize( client ));
};

hlp.getEarnedIncomeDeduction = function (client) {
  var totalMonthlyEarnedGross = client.earned;
  return totalMonthlyEarnedGross * SNAPData.PERCENT_GROSS_MONTHLY_EARNED;
};

hlp.getMedicalDeduction = function (client) {
  var medicalDeduce = null;
  if ( hlp.hasDisabledOrElderlyMember(client) === false ) {
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

hlp.isDependentOver12 = function ( member ) {
  return (!isUnder13( member ) && member.age <= 18) || isDisabled( member );
};

hlp.getDependentCareDeduction = function (client) {

  var childCare = 0, adultCare = 0;

  /** @todo Adopt https://github.com/codeforboston/cliff-effects/issues/264
   *     model for all these 'kinds' of 'if' situations. If possible. */
  if ( getUnder13OfHousehold( client ).length > 0 ) {
    childCare = sumProps( client, UNDER13_CARE_EXPENSES );
  }

  if ( getEveryMemberOfHousehold( client, hlp.isDependentOver12 ).length > 0 ) {
    adultCare = sumProps( client, OVER12_CARE_EXPENSES );
  }

  var totalDependentCare = childCare + adultCare;

  return totalDependentCare;
};

hlp.getChildPaymentDeduction = function (client) {
  return client.childSupportPaidOut;
};

hlp.getAdjustedIncome = function (client) {
  var totalMonthlyGross = hlp.getTotalMonthlyGross(client)
  var standardDeduction = hlp.getStandardDeduction(client);
  var earnedIncomeDeduction = hlp.getEarnedIncomeDeduction(client);
  var medicalDeduction = hlp.getMedicalDeduction(client);
  var dependentCareDeduction = hlp.getDependentCareDeduction(client);

  var adjustedIncome = totalMonthlyGross - standardDeduction - earnedIncomeDeduction - medicalDeduction - dependentCareDeduction;
  return Math.max( 0, adjustedIncome );
};

// EXPENSE DEDUCTIONS
hlp.isHomeless = function(client ) {
  // Worth abstracting, used a few places and may change
  return client.shelter === 'homeless';
};

/** @todo: What about housing voucer? */
hlp.getShelterDeduction = function(client) {
  var shelterCost = null;
  var isHomeowner = client.shelter === 'homeowner';

  if ( hlp.isHomeless(client) ) {
    shelterCost = 0;
  } else if(isHomeowner) {
    shelterCost = client.mortgage + client.housingInsurance + client.propertyTax;
  }
  else {
    shelterCost = client.rent;
  }

  return shelterCost;
};

hlp.getStandardUtilityAllowance = function (client) {

  if( hlp.isHomeless(client) ){
    return 0;

  } else {
    
    var utilityCategory = null;

    if ( client.climateControl || client.hasFuelAssistance ) {
      utilityCategory = "Heating";
    } else if ( client.nonHeatElectricity ) {
      utilityCategory = "Non-heating";
    } else if ( client.phone ) {
      utilityCategory = "Telephone";
    } else {
      utilityCategory = "Zero Utility Expenses";
    }

    return SNAPData.UTILITY_DEDUCTIONS[ utilityCategory ];
  }
};

hlp.getTotalshelterCost = function (client) {
  var shelterDeduction = hlp.getShelterDeduction(client);
  var utilityDeductions = hlp.getStandardUtilityAllowance(client);

  return shelterDeduction + utilityDeductions;
};

hlp.getHalfAdjustedIncome = function(client) {
  return hlp.getAdjustedIncome(client) * 0.50;
};

hlp.excessHalfAdjustedIncome = function(client) {
  var totalShelterDeduction = null;
  var totalshelterCost = hlp.getTotalshelterCost(client);
  var halfAdjustedIncome = hlp.getHalfAdjustedIncome(client);
  if ( totalshelterCost - halfAdjustedIncome < 0   ) {
    totalShelterDeduction = 0;
  } else {
    totalShelterDeduction = totalshelterCost - halfAdjustedIncome;
  }
  return totalShelterDeduction;
};

hlp.getShelterDeductionResult = function(client) {

  var adjustedIncome = hlp.excessHalfAdjustedIncome(client)

  if ( hlp.hasDisabledOrElderlyMember(client) ) {
    return adjustedIncome;
  } else {
    return Math.min( adjustedIncome, SNAPData.SHELTER_DEDUCTION_CAP );
  }

};

hlp.getHomelessDeduction = function(client) {
    if ( hlp.isHomeless(client) ) { return SNAPData.HOMELESS_DEDUCTION; }
    else { return 0; }
};

// NET INCOME CALCULATION
hlp.monthlyNetIncome = function(client) {
  // May be able to leverage 'getAdjusted...'
    var totalMonthlyEarnedGross = client.earned;
    var earnedIncomeDeduction = hlp.getEarnedIncomeDeduction(client);
    var totalMonthlyUnearnedGross =  getGrossUnearnedIncomeMonthly(client);
    var standardDeduction = hlp.getStandardDeduction(client);
    var medicalDeduction = hlp.getMedicalDeduction(client);
    var dependentCareDeduction = hlp.getDependentCareDeduction(client);
    var childPaymentDeduction = hlp.getChildPaymentDeduction(client);
    var hasHomelessDeduction = hlp.getHomelessDeduction(client);
    var shelterDeductionResult = hlp.getShelterDeductionResult(client);

    var totalIncome     = totalMonthlyEarnedGross + totalMonthlyUnearnedGross;
    var totalDeductions = earnedIncomeDeduction + standardDeduction + medicalDeduction
                        + hasHomelessDeduction + shelterDeductionResult
                        + dependentCareDeduction + childPaymentDeduction;
    var afterDeductions = totalIncome - totalDeductions;

    return Math.max( 0, afterDeductions );
};

hlp.getMaxNetIncome = function (client) {
  //TODO: Logic different in website calculate; when (hlp.monthlyNetIncome < 0 ) = 0 while excel return a number
  var totalMonthlyGross       = hlp.getTotalMonthlyGross(client),
      povertyGrossIncomeLevel = hlp.getPovertyGrossIncomeLevel(client),
      disabledOrElderlyMember = hlp.hasDisabledOrElderlyMember(client);
  
  if ( (totalMonthlyGross <= povertyGrossIncomeLevel) || !disabledOrElderlyMember ) {
    return "no limit";
  } else {
    return getYearlyLimitBySize(SNAPData.NET_INCOME_LIMITS, hlp.householdSize( client ));
  }
};

// NET INCOME TEST RESULT
hlp.getNetIncomeTestResult = function(client ) {

  var maxNetIncome = hlp.getMaxNetIncome(client)

  if ( maxNetIncome === "no limit" ) {
    return true;
  } else if ( hlp.monthlyNetIncome(client) < maxNetIncome ) {
    return true;
  } else {
    return false;
  }

};

hlp.householdSize = function ( client ) {
  return client.household.length;
};

// Bay State CAP not included as this prototype only deals with
// changes in earned income

export { getSNAPBenefits, SNAPhelpers };
