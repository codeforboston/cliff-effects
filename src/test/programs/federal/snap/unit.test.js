import { SNAPhelpers } from '../../../../programs/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import { cloneDeep } from 'lodash';


// ==================
// HELPERS
// ==================
var addNumMembers = function ( num, household ) {
  while ( num > 0 ) {
    household.push({ m_age: 30, m_role: "member", m_disabled: false });
    num -= 1;
  }
  return household;
};  // End addNumMembers


// ==================
// TESTS
// ==================

const defaultClient   = cloneDeep( CLIENT_DEFAULTS );
const defaultCurrent  = defaultClient.current;

describe('SNAPhelpers', () => {

  // `SNAPhelpers.householdSize()`
  describe('`.householdSize( timeClient )` given a time-restricted client object should get household size of', () => {
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
  describe('`.isElderlyOrDisabled( member )` given', () => {

    describe('a head of household', () => {
      let head;
      beforeEach(() => { head = { m_age: 30, m_role: 'head', m_disabled: false } });

      it('that is not disabled and under 60 should return false', () => {
        expect(SNAPhelpers.isElderlyOrDisabled( head )).toBe(false);
      });
      it('that is disabled should return true', () => {
        head.m_disabled = true;
        expect(SNAPhelpers.isElderlyOrDisabled( head )).toBe(true);
      });
      it('that is 60 should return true', () => {
        head.m_age = 60;
        expect(SNAPhelpers.isElderlyOrDisabled( head )).toBe(true);
      });
    });

    describe('a spouse', () => {
      let spouse;
      beforeEach(() => { spouse = { m_age: 30, m_role: 'spouse', m_disabled: false } });

      it('that is not disabled and under 60 should return false', () => {
        expect(SNAPhelpers.isElderlyOrDisabled( spouse )).toBe(false);
      });
      it('that is disabled should return true', () => {
        spouse.m_disabled = true;
        expect(SNAPhelpers.isElderlyOrDisabled( spouse )).toBe(true);
      });
      it('that is 60 should return true', () => {
        spouse.m_age = 60;
        expect(SNAPhelpers.isElderlyOrDisabled( spouse )).toBe(true);
      });
    });

    describe('a member', () => {
      let member;
      beforeEach(() => { member = { m_age: 30, m_role: 'member', m_disabled: false }; });

      it('that is not disabled and under 60 should return false', () => {
        expect(SNAPhelpers.isElderlyOrDisabled( member )).toBe(false);
      });
      it('that is disabled should return true', () => {
        member.m_disabled = true;
        expect(SNAPhelpers.isElderlyOrDisabled( member )).toBe(true);
      });
      it('that is 60 should return true', () => {
        member.m_age = 60;
        expect(SNAPhelpers.isElderlyOrDisabled( member )).toBe(true);
      });
    });
  });


  // `SNAPhelpers.hasDisabledOrElderlyMember()`
  describe('`.isElderlyOrDisabled( household )` given a client with a household containing', () => {

    let current;
    beforeEach(() => { current = cloneDeep( defaultCurrent ); });

    describe('a head of household', () => {
      it('that is not disabled and under 60 should return false', () => {
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(false);
      });
      it('that is disabled should return true', () => {
        current.household[0].m_disabled = true;
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
      it('that is 60 should return true', () => {
        current.household[0].m_age = 60;
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
    });
    describe('a spouse', () => {
      it('that is not disabled and under 60 should return false', () => {
        current.household.push({ m_age: 30, m_role: 'spouse', m_disabled: false });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(false);
      });
      it('that is disabled should return true', () => {
        current.household.push({ m_age: 30, m_role: 'spouse', m_disabled: true });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
      it('that is 60 should return true', () => {
        current.household.push({ m_age: 60, m_role: 'spouse', m_disabled: false });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
    });
    describe('a member', () => {
      it('that is not disabled and under 60 should return false', () => {
        current.household.push({ m_age: 30, m_role: 'member', m_disabled: false });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(false);
      });
      it('that is disabled should return true', () => {
        current.household.push({ m_age: 30, m_role: 'member', m_disabled: true });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
      it('that is 60 should return true', () => {
        current.household.push({ m_age: 60, m_role: 'member', m_disabled: false });
        expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(true);
      });
    });
  });


  // `SNAPhelpers.isDependentOver12()`
  describe('`.isDependentOver12( member )` given', () => {

  });


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
