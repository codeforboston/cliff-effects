import { SNAPhelpers } from '../../../../programs/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import { cloneDeep } from 'lodash';

const defaultClient   = cloneDeep( CLIENT_DEFAULTS );
const defaultCurrent  = defaultClient.current;

var addNumMembers = function ( num, household ) {
  while ( num > 0 ) {
    household.push({ age: 30, role: "member", disabled: false });
    num -= 1;
  }
  return household;
};  // End addNumMembers

describe('SNAPhelpers given a timed client object', () => {

  // `SNAPhelpers.householdSize()`
  describe('should get household size of', () => {
    it('1', () => {
      expect(SNAPhelpers.householdSize( defaultCurrent, 'current' )).toEqual(1);
    });
    it('5', () => {
      let current = cloneDeep( defaultCurrent );
      addNumMembers( 4, current.household );
      expect(SNAPhelpers.householdSize( current, 'current' )).toEqual(5);
    });
    it('15', () => {
      let current = cloneDeep( defaultCurrent );
      addNumMembers( 14, current.household );
      expect(SNAPhelpers.householdSize( current, 'current' )).toEqual(15);
    });
  });

  // `SNAPhelpers.isElderlyOrDisabled()`
  // `SNAPhelpers.hasDisabledOrElderlyMember()`
  // `SNAPhelpers.isDependentOver12()`
  // `SNAPhelpers.getChildSupportPaid()`
  // `SNAPhelpers.getAdjustedGross()`
  // `SNAPhelpers.getPovertyGrossIncomeLevel()`
  // `SNAPhelpers.getGrossIncomeTestResult()`
  // `SNAPhelpers.isHomeless()`
  // `SNAPhelpers.getNonUtilityCosts()`
  // `SNAPhelpers.getUtilityCostByBracket()`
  // `SNAPhelpers.getTotalshelterCost()`
  // `SNAPhelpers.getStandardDeduction()`
  // `SNAPhelpers.getEarnedIncomeDeduction()`
  // `SNAPhelpers.getMedicalDeduction()`
  // `SNAPhelpers.getDependentCareDeduction()`
  // `SNAPhelpers.getHalfAdjustedIncome()`
  // `SNAPhelpers.getRawShelterDeduction()`
  // `SNAPhelpers.getShelterDeduction()`
  // `SNAPhelpers.getHomelessDeduction()`
  // `SNAPhelpers.getAdjustedNotGrossIncome()`
  // `SNAPhelpers.monthlyNetIncome()`
  // `SNAPhelpers.getMaxNetIncome()`
  // `SNAPhelpers.getNetIncomeTestResult()`

});
