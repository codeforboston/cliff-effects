import { SNAPhelpers } from '../../../../programs/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import * as cashflow from '../../../../utils/cashflow';
import * as getGovData from '../../../../utils/getGovData';
import { UNEARNED_INCOME_SOURCES } from '../../../../data/massachusetts/name-cores';
import { cloneDeep } from 'lodash';

// HELPERS
import { SNAPData } from '../../../../data/federal/2017/SNAPData';


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

  /** @todo Rake tests - Still need to test differet household
   *     sizes. */
  // `SNAPhelpers.householdSize()`
  describe('`.householdSize( timeClient )` given a time-restricted client object should get household size of', () => {
    it('1', () => {
      expect(SNAPhelpers.householdSize( defaultCurrent )).toEqual(1);
    });
    it('5', () => {
      let current = cloneDeep( defaultCurrent );
      addNumMembers( 4, current.household );
      expect(SNAPhelpers.householdSize( current )).toEqual(5);
    });
    it('15', () => {
      let current = cloneDeep( defaultCurrent );
      addNumMembers( 14, current.household );
      expect(SNAPhelpers.householdSize( current )).toEqual(15);
    });
  });


  /** @todo Rake tests - Probably still need to test elderly
   *     and disabled separately - important in other ways. */
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
    describe('a regular member', () => {
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


  /** @todo Rake tests - Same. */
  // `SNAPhelpers.hasDisabledOrElderlyMember()`
  describe('`.hasDisabledOrElderlyMember( timeClient )` given a time-constrained client with a household containing', () => {
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
    /** Note: In SNAP a 'disabled' family is one where /any/ member
     *     is disabled, not just head or spouse, unlike Section 8. */
    describe('a regular member', () => {
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


  /** @todo Rake tests - No need to include head and spouse
   *     that would otherwise be dependent by age. */
  // `SNAPhelpers.hasDependentsOver12()`
  describe('`.hasDependentsOver12( timeClient )` given a time-constrained client with a household containing', () => {
    let current;
    beforeEach(() => { current = cloneDeep( defaultCurrent ); });

    describe('a head of household', () => {

      it('that is not disabled or under 18 should return false', () => {
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 13 should return false', () => {
        current.household[0].m_age = 12;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 18 should return false', () => {
        current.household[0].m_age = 13;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is disabled should return false', () => {
        current.household[0].m_disabled = true;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
    });

    describe('a spouse', () => {

      beforeEach(() => { current.household[1] = { m_age: 30, m_role: 'spouse', m_disabled: false }; });

      it('that is not disabled or under 18 should return false', () => {
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 13 should return false', () => {
        current.household[1].m_age = 12;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 18 should return false', () => {
        current.household[1].m_age = 13;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is disabled should return false', () => {
        current.household[1].m_disabled = true;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
    });

    describe('a regular member', () => {

      beforeEach(() => { current.household[1] = { m_age: 30, m_role: 'member', m_disabled: false }; });

      it('that is not disabled or under 18 should return false', () => {
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 13 should return false', () => {
        current.household[1].m_age = 12;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(false);
      });
      it('that is under 18 should return true', () => {
        current.household[1].m_age = 13;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(true);
      });
      it('that is disabled should return true', () => {
        current.household[1].m_disabled = true;
        expect(SNAPhelpers.hasDependentsOver12( current )).toBe(true);
      });
    });
  });


  // `SNAPhelpers.getAdjustedGross()`
  describe('`.getAdjustedGross( timeClient )` given a time-restricted client object', () => {
    const grossUnearnedIncome = 1;
    let current, mock;

    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
      current.childSupportPaidOut = 100;
      mock = jest.spyOn(cashflow, 'getGrossUnearnedIncomeMonthly');
      mock.mockImplementation(() => grossUnearnedIncome);
    });
    afterEach(() => {
      mock.mockRestore();
    });

    it('with positive raw adjusted gross income, should return that income', () => {
      current.earned = 1000;
      const income = current.earned + grossUnearnedIncome - current.childSupportPaidOut;
      expect(income).toBeGreaterThan(0);
      expect(SNAPhelpers.getAdjustedGross( current )).toEqual(income);
    });

    it('with negative raw adjusted gross income, should return zero', () => {
      current.earned = 0;
      const income = current.earned + grossUnearnedIncome - current.childSupportPaidOut;
      expect(income).toBeLessThan(0);
      expect(SNAPhelpers.getAdjustedGross( current )).toEqual(0);
    });
  });


  // `SNAPhelpers.getPovertyGrossIncomeLevel()`
  test('`getPovertyGrossIncomeLevel( timeClient )', () => {
    const current = cloneDeep( defaultCurrent );
    const mock = jest.spyOn(getGovData, 'getMonthlyLimitBySize');

    const federalPovertyGuidelines = expect.any(Object);
    const numMembers = current.household.length;

    SNAPhelpers.getPovertyGrossIncomeLevel( current );
    expect(mock).toBeCalledWith(federalPovertyGuidelines, numMembers, 200);
    mock.mockRestore();
  });


  // `SNAPhelpers.getGrossIncomeTestResult()`
  describe('`.getGrossIncomeTestResult( timeClient )` given a time-restricted client object', () => {
    let current;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
    });

    it('that has an elderly or disabled dependent, should return true', () => {
      current.household.push({ m_age: 65, m_disabled: true, m_role: 'member' });
      expect(SNAPhelpers.getGrossIncomeTestResult( current )).toBe(true);
    });

    it('that has adjusted gross income under the poverty level, should return true', () => {
      current.earned = 0;
      expect(SNAPhelpers.getGrossIncomeTestResult( current )).toBe(true);
    });

    it('that has adjusted gross income above the poverty level, should return false', () => {
      current.earned = 100000;
      expect(SNAPhelpers.getGrossIncomeTestResult( current )).toBe(false);
    });
  });


  /** @todo `.isHomeless()` should probably be an abstracted
   *     shelter getter.  */
  // `SNAPhelpers.isHomeless()`
  describe('`.isHomeless( timeClient )` given a time-restricted client object', () => {
    let current;
    beforeEach(() => { current = cloneDeep( defaultCurrent ); });

    it('that is "homeless", shoud return true', () => {
      current.shelter = "homeless";
      expect(SNAPhelpers.isHomeless( current )).toBe(true);
    });
    it('that is a "renter", should return false', () => {
      current.shelter = 'renter';
      expect(SNAPhelpers.isHomeless( current )).toBe(false);
    });
    it('that is a "voucher", should return false', () => {
      current.shelter = 'voucher';
      expect(SNAPhelpers.isHomeless( current )).toBe(false);
    });
    it('that is a "homeowner", should return false', () => {
      current.shelter = 'homeowner';
      expect(SNAPhelpers.isHomeless( current )).toBe(false);
    });
  });

  /** @todo Rake tests - No need to include tests containg,
   *     e.g., mortage and rent at the same time */
  /** @todo Rake tests - Not sure if we still need variations
   *     in both contractRent and rentShare the same times */
  // `SNAPhelpers.getNonUtilityCosts()`
  describe('`.getNonUtilityCosts( timeClient )` given a time-restricted client object', () => {
    let current;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
      current.mortgage          = 1;
      current.housingInsurance  = 10;
      current.propertyTax       = 100;
      current.rent              = 1000;
      current.contractRent      = 10000;
      current.rentShare         = 100000;
    });

    it('that is "homeless", shoud return 0', () => {
      current.shelter = "homeless";
      expect(SNAPhelpers.getNonUtilityCosts( current )).toEqual(0);
    });
    it('that is a "homeowner", should return only the sum of mortgage, housing insurance, and property taxes', () => {
      current.shelter = 'homeowner';
      expect(SNAPhelpers.getNonUtilityCosts( current )).toEqual(111);
    });
    it('that is a "renter", should return only the rent amount', () => {
      current.shelter = 'renter';
      expect(SNAPhelpers.getNonUtilityCosts( current )).toEqual(1000);
    });
    it('that is a "voucher", should return only the rent share (esp. not contract rent)', () => {
      current.shelter = 'voucher';
      expect(SNAPhelpers.getNonUtilityCosts( current )).toEqual(100000);
    });
    /** @todo Should a wrong shelter value to `.getNonUtilityCosts()` throw an error? */
    it('that is not an allowed value, should return null', () => {
      current.shelter = 'wrong';
      expect(SNAPhelpers.getNonUtilityCosts( current )).toBe(null);
    });
  });


  /** @todo Rake tests - we can just have one at a time, no
   *     need for combos */
  // `SNAPhelpers.getUtilityCostByBracket()`
  describe('`.getUtilityCostByBracket( timeClient )` given a time-restricted client object', () => {

    let climate = SNAPData.UTILITY_COST_BRACKETS[ "Heating" ],
        fuel    = SNAPData.UTILITY_COST_BRACKETS[ "Heating" ],
        electric= SNAPData.UTILITY_COST_BRACKETS[ "Non-heating" ],
        phone   = SNAPData.UTILITY_COST_BRACKETS[ "Telephone" ],
        none    = SNAPData.UTILITY_COST_BRACKETS[ "Zero Utility Expenses" ];

    let current;
    beforeEach(() => {
      current         = cloneDeep( defaultCurrent );
      current.shelter = 'renter';
    });

    it('that is "homeless", shoud return 0', () => {
      let special = cloneDeep( defaultCurrent );  // Already homeless
      special.climateControl      = true;
      special.fuelAssistance      = true;
      special.nonHeatElectricity  = true;
      special.phone               = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(0);
    });
    it('that has just climate control it should return the climate control amount', () => {
      current.climateControl      = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(climate);
    });
    it('that has just fuel assistance it should return the climate control amount', () => {
      current.fuelAssistance      = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(climate);
    });
    it('that has just electricity it should return the electricity amount', () => {
      current.nonHeatElectricity  = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(electric);
    });
    it('that has just phone it should return the phone amount', () => {
      current.phone               = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(phone);
    });
    it('that has all types of utilities it should return the climate control amount', () => {
      current.climateControl      = true;
      current.fuelAssistance      = true;
      current.nonHeatElectricity  = true;
      current.phone               = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(climate);
    });
    it('that has fuel assistance and other non-climate utiliites it should return the climate control amount', () => {
      current.fuelAssistance      = true;
      current.nonHeatElectricity  = true;
      current.phone               = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(climate);
    });
    it('that has electricity and phone it should return the electricity amount', () => {
      current.nonHeatElectricity  = true;
      current.phone               = true;
      expect(SNAPhelpers.getUtilityCostByBracket( current )).toEqual(electric);
    });
  });


  // May not need to be tested considering tests for utilities and
  // other expenses. This one just adds those two.
  // `SNAPhelpers.getTotalshelterCost()`


  /** @todo Rake tests - test a household with > 6 members */
  // `SNAPhelpers.getStandardDeduction()`
  // STANDARD_DEDUCTIONS: { 0: 0, 1: 160, 2: 160, 3: 160, 4: 170, 5: 199, 6: 228, 'eachAdditional': 0 }
  describe('`.getStandardDeduction( timeClient )` given a time-restricted client object with a household size of', () => {
    let current;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
    });

    let one = 160,
        six = 228;
    it('1 should return amount equal to STANDARD_DEDUCTIONS bracket 1', () => {
      expect(SNAPhelpers.getStandardDeduction( defaultCurrent )).toEqual(one);
    });
    it('6 should return amount equal to STANDARD_DEDUCTIONS bracket 6', () => {
      addNumMembers( 5, current.household );
      expect(SNAPhelpers.getStandardDeduction( current )).toEqual(six);
    });
    it('8 should return the same amount as a six-member household', () => {
      let current = cloneDeep( defaultCurrent );
      addNumMembers( 14, current.household );
      expect(SNAPhelpers.getStandardDeduction( current )).toEqual(six);
    });
  });


  // Not sure if this test is at all useful
  // `SNAPhelpers.getEarnedIncomeDeduction()`
  // PERCENT_GROSS_MONTHLY_EARNED: 0.20
  describe('`.getEarnedIncomeDeduction( timeClient )` given a time-restricted client object with an earned income of', () => {
    let current;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
    });

    it('0 should return 0 * .2', () => {
      expect(SNAPhelpers.getEarnedIncomeDeduction( defaultCurrent )).toEqual(0);
    });
    it('100 should return  100 * .2', () => {
      current.earned = 100
      expect(SNAPhelpers.getEarnedIncomeDeduction( current )).toEqual(20);
    });
    it('10000 should return  10000 * .2', () => {
      current.earned = 10000
      expect(SNAPhelpers.getEarnedIncomeDeduction( current )).toEqual(2000);
    });
  });


  /** Note: May be a good idea to abstract some of these to take
   *     SNAP data as arguments. */
  /** Note: May change to include disabled assistance and regular
   *     member medical in medical expenses - our info for this is
   *     in question. @todo Abstract getting medical expenses. */
  // `SNAPhelpers.getMedicalDeduction()`
  // STANDARD_MEDICAL_DEDUCTION: 155, MIN_MEDICAL_EXPENSES: 35,
  // MAX_MEDICAL_EXPENSES: 190,
  describe('`.getMedicalDeduction( timeClient )` given a time-restricted client object with', () => {
    let current;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
      current.household[0].m_disabled = true;
    });

    it('no disabled member should return 0', () => {
      current.household[0].m_disabled = false;
      expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(0);
    });

    describe('a disabled member and', () => {
      it('0 medical expenses should return 0', () => {
        current.disabledMedical = 0;
        expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(0);
      });
      it('medical expenses under the minimum should return 0', () => {
        current.disabledMedical = 34;
        expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(0);
      });

      describe('medical expenses between the minimum and maximum inclusive', () => {
        it('(min) should return the standard deduction', () => {
          current.disabledMedical = 35;
          expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(155);
        });
        it('(max) should return the standard deduction', () => {
          current.disabledMedical = 190;
          expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(155);
        });
        it('(between) should return the standard deduction', () => {
          current.disabledMedical = 100;
          expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(155);
        });
      });

      it('medical expenses over the maximum should return expenses minus minimum', () => {
        current.disabledMedical = 200;
        expect(SNAPhelpers.getMedicalDeduction( current )).toEqual(200 - 35);
      });
    });
  });


  // `SNAPhelpers.getDependentCareDeduction()`
  // `SNAPhelpers.getHalfAdjustedIncome()`
  // `SNAPhelpers.getRawShelterDeduction()`
  // `SNAPhelpers.getShelterDeduction()`
  // `SNAPhelpers.getHomelessDeduction()`
  // `SNAPhelpers.getAdjustedNotGrossIncome()`
  // `SNAPhelpers.monthlyNetIncome()`


  // `SNAPhelpers.getMaxNetIncome()`
  describe('`.getMaxNetIncome( timeClient )` given a time-restricted client object with', () => {
    let current, getPovertyGrossIncomeLevel;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
      getPovertyGrossIncomeLevel = jest.spyOn(SNAPhelpers, 'getPovertyGrossIncomeLevel');
    });
    afterEach(() => {
      getPovertyGrossIncomeLevel.mockRestore();
    })

    it('that has income below the poverty line, it should return \'no limit\'', () => {
      getPovertyGrossIncomeLevel.mockImplementation(() => Number.POSITIVE_INFINITY);
      expect(SNAPhelpers.getMaxNetIncome( current )).toEqual('no limit');
    });

    it('that has no elderly or disabled members, it should return \'no limit\'', () => {
      getPovertyGrossIncomeLevel.mockImplementation(() => Number.NEGATIVE_INFINITY);
      expect(SNAPhelpers.hasDisabledOrElderlyMember( current )).toBe(false);
      expect(SNAPhelpers.getMaxNetIncome( current )).toEqual('no limit');
    });

    it('returns the yearly limit', () => {
      getPovertyGrossIncomeLevel.mockImplementation(() => Number.NEGATIVE_INFINITY);
      current.household.push({ m_age: 65, m_disabled: true, m_role: 'member' });

      const getYearlyLimitBySize = jest.spyOn(getGovData, 'getYearlyLimitBySize');
      const yearlyLimit = 12;
      getYearlyLimitBySize.mockImplementation(() => yearlyLimit);

      const snapData = expect.any(Object);
      const numMembers = current.household.length;

      expect(SNAPhelpers.getMaxNetIncome( current )).toEqual(yearlyLimit);
      expect(getYearlyLimitBySize).toBeCalledWith(snapData, numMembers);

      getYearlyLimitBySize.mockRestore();
    });
  });


  // `SNAPhelpers.getNetIncomeTestResult()`
  describe('`.getNetIncomeTestResult( timeClient )` given a time-restricted client object with', () => {
    let current, getMaxNetIncome;
    beforeEach(() => {
      current = cloneDeep( defaultCurrent );
      getMaxNetIncome = jest.spyOn(SNAPhelpers, 'getMaxNetIncome');
    });
    afterEach(() => {
      getMaxNetIncome.mockRestore();
    });

    it('that has no limit on net income, should return true', () => {
      getMaxNetIncome.mockImplementation(() => 'no limit');
      expect(SNAPhelpers.getNetIncomeTestResult( current )).toBe(true);
    });

    it('that has net income below monthly limit, should return true', () => {
      getMaxNetIncome.mockImplementation(() => Number.POSITIVE_INFINITY);
      expect(SNAPhelpers.getNetIncomeTestResult( current )).toBe(true);
    });

    it('that has net income above monthly limit, should return false', () => {
      getMaxNetIncome.mockImplementation(() => Number.NEGATIVE_INFINITY);
      expect(SNAPhelpers.getNetIncomeTestResult( current )).toBe(false);
    });
  });

});
