import { getLimitBySize } from './get-gov-data.js';
import { federalPovertyGuidelines } from '../data/federal/federalPovertyGuidelines.js';
import { stateMedianIncome } from '../data/state/massachusetts/stateIncomeLevels.js';

function percentPovertyLevel(annualIncome, householdSize) {
  var monthlyLimit  = getLimitBySize( federalPovertyGuidelines, householdSize ),
      annualLimit   = monthlyLimit * 12,
      ratio         = annualIncome/annualLimit,
      percent       = 100 * ratio;

  return percent; 
}

// State median income calcs have been removed as they don't seem to be used
// by anything in here (and from documentation are only used to derive other
// HUD values). They're also limited to an 8 person household with no ability
// to calculate other variations. If you want to get info about them, look at
// https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#
// and https://www.huduser.gov/portal/datasets/il.html#2017_data

export {
  percentPovertyLevel
};
