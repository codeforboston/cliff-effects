import { getYearlyLimitBySize } from './get-gov-data.js';
import { federalPovertyGuidelines } from '../data/federal/federalPovertyGuidelines.js';

function percentPovertyLevel(annualIncome, householdSize) {
  var annualLimit   = getYearlyLimitBySize( federalPovertyGuidelines, householdSize ),
      ratio         = annualIncome/annualLimit,
      percent       = 100 * ratio;

  return percent; 
}

// State median income calcs should been removed as they only seem to be used
// by Mass Health and their source hasn't been found. Actual 'state median income
// limits' values seem, from linked documentation, to only be used to derive HUD
// values). In documentation, they're also limited to an 8 person household with no
// ability to calculate other variations. If you want to get info about them, look at
// https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#
// and https://www.huduser.gov/portal/datasets/il.html#2017_data
function percentStateMedianIncome(annualIncome, householdSize) {
  var smi = new Map();
  smi.set(1,56668);
  smi.set(2,74105);
  smi.set(3,91542);
  smi.set(4,108978);
  smi.set(5,126415);
  smi.set(6,143852);
  smi.set(7,147120);
  smi.set(8,150390);

  return (100*(annualIncome)/(smi.get(householdSize))); 
}


export {
  percentPovertyLevel, percentStateMedianIncome
};
