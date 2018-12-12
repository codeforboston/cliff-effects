import { getSection8Benefit, section8Helpers } from '../../../benefits/massachusetts/section8';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { sampleClients } from '../../sampleClients';
import { cloneDeep } from 'lodash';

// ==================
// TESTS
// ==================

const defaultClient   = cloneDeep(CLIENT_DEFAULTS);
const defaultCurrent  = defaultClient.current;

// `getSection8Benefit()`
describe('getSection8Benefit', () => {
  it('should return housing benefit when given a timeframed client', () => {
    sampleClients.row3.future = cloneDeep(sampleClients.row3.current);
    expect(getSection8Benefit(sampleClients.row3, 'current')).toEqual(0);
  });
});

describe('section8Helpers', () => {

  // `section8Helpers.getTTPs()`
  describe('`.getTTPs()`', () => {
    it('should return TTPs', () => {
      sampleClients.row3.future = cloneDeep(sampleClients.row3.current);
      let temp1 = section8Helpers.getTTPs(sampleClients.row3);
      expect(temp1.newTTP).toEqual(203.1);
      expect(temp1.newTTP).toEqual(203.1);
    });
  });

  // `section8Helpers.getNetIncome()`
  describe('`.getNetIncome`', () => {
    it('should return net income', () => {
      expect(section8Helpers.getNetIncome(sampleClients.row7, 'current')).toEqual(2755);
    });
  });
  // `section8Helpers.getAdjustedIncome()`
  describe('`.getAdjustedIncome`', () => {
    it('should return adjusted income if no member is elderly or disabled', () => {
      let net = section8Helpers.getNetIncome(sampleClients.row3, 'current');
      expect(section8Helpers.getAdjustedIncome(sampleClients.row3, 'current', net)).toEqual(677);
    });

    it('should return adjusted income with additional allowances if a member is elderly or disabled', () => {
      let net = section8Helpers.getNetIncome(sampleClients.row4, 'current');
      expect(section8Helpers.getAdjustedIncome(sampleClients.row4, 'current', net)).toEqual(974 + 2 / 3);
    });
  });

  // `section8Helpers.getDisabledAndMedicalAllowancesSum()`
  describe('`.getDisabledAndMedicalAllowancesSum( timeClient )`', () => {
    beforeEach(() => {
      defaultClient[ 'current' ].household[ 0 ].m_disabled = true;
      defaultClient[ 'current' ].household[ 0 ].m_age = 62;
    });

    it('should return 0 if there is no disabled or elderly member', () => {
      let net = section8Helpers.getNetIncome(sampleClients.row3, 'current');
      expect(section8Helpers.getDisabledAndMedicalAllowancesSum(sampleClients.row3, 'current', net)).toEqual(0);
    });

    it('should return hcapMin if the head or spouse in not disabled or elderly', () => {

      let net = section8Helpers.getNetIncome(sampleClients.row8, 'current');
      let assSubstracted = sampleClients.row8[ 'current' ].disabledAssistance - net * 0.03;
      let hcapAllowance = Math.min(assSubstracted, sampleClients.row8[ 'current' ].earnedBecauseOfAdultCare);
      let hcapMin = Math.max(0, hcapAllowance);
      expect(section8Helpers.getDisabledAndMedicalAllowancesSum(sampleClients.row8, 'current', net)).toEqual(hcapMin);
    });

    it('should return zero if the net income is 100/3 times the handicap expense', () => {
      let net = defaultClient[ 'current' ].disabledAssistance * 100 / 3;
      expect(section8Helpers.getDisabledAndMedicalAllowancesSum(defaultClient, 'current', net)).toEqual(0);
    });
  });

  // `section8Helpers.getMinHandicapAllowance()`
  describe('`.getMinHandicapAllowance( timeClient )`', () => {
    it('should return the minimum handicap allowance', () => {
      let net = section8Helpers.getNetIncome(sampleClients.row8, 'current');
      let assistanceRemainder = sampleClients.row8[ 'current' ].disabledAssistance - net * 0.03;
      expect(section8Helpers.getMinHandicapAllowance(sampleClients.row8, 'current', assistanceRemainder)).toEqual(0);
    });
  });

  // `section8Helpers.getMedicalExpenses()`
  describe('`.getMedicalExpenses( timeClient )`', () => {
    it('should return the medical expenses', () => {
      expect(section8Helpers.getMedicalExpenses(sampleClients.row3, 'current')).toEqual(0);
    });
  });

  // `section8Helpers.isDisabledOrElderly()`
  describe('`.isDisabledOrElderly( timeClient )` given a time-restricted client object with', () => {
    let current;
    beforeEach(() => {
      defaultClient[ 'current' ].household[ 0 ].m_disabled = true;
      defaultClient[ 'current' ].household[ 0 ].m_age = 62;
      current = cloneDeep(defaultCurrent);
    });

    it('no disabled or elderly member should return false', () => {
      expect(section8Helpers.isDisabledOrElderly(sampleClients.row4.current.household[ 1 ])).toEqual(false);
    });

    it('a disabled member but no elderly member should return true', () => {
      expect(section8Helpers.isDisabledOrElderly(sampleClients.row4.current.household[ 0 ])).toEqual(true);
    });

    it('no disabled member but an elderly member should return true', () => {
      current.household[ 0 ].m_disabled = false;
      expect(section8Helpers.isDisabledOrElderly(current.household[ 0 ])).toEqual(true);
    });

    it('a disabled and an elderly member should return true', () => {
      expect(section8Helpers.isDisabledOrElderly(current.household[ 0 ])).toEqual(true);
    });

    // `section8Helpers.hasAnyDisabledOrElderly()`

    describe('`.hasAnyDisabledOrElderly` given a disabled and elderly member', () => {
      it('should return true', () => {
        expect(section8Helpers.hasAnyDisabledOrElderly(defaultClient, 'current')).toEqual(true);
      });
    });

    // `section8Helpers.hasDisabledOrElderlyHeadOrSpouse()`

    describe('`.hasDisabledOrElderlyHeadOrSpouse` given a disabled and elderly head', () => {
      it('should return true', () => {
        expect(section8Helpers.hasDisabledOrElderlyHeadOrSpouse(defaultClient, 'current')).toEqual(true);
      });
    });

  });

});
