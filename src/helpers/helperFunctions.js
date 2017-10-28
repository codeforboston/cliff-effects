import { getLimitBySize } from './get-gov-data.js';
import { federalPovertyGuidelines } from '../data/federal/federalPovertyGuidelines.js';

function percentPovertyLevel(annualIncome, householdSize) {
  var monthlyLimit  = getLimitBySize( federalPovertyGuidelines, householdSize ),
      annualLimit   = monthlyLimit * 12,
      ratio         = annualIncome/annualLimit,
      percent       = 100 * ratio;

  return percent; 
}

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
