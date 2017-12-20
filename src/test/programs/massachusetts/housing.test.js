import { section8Helpers } from '../../../programs/massachusetts/housing'

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { cloneDeep } from 'lodash';

// ==================
// TESTS
// ==================

const defaultClient   = cloneDeep( CLIENT_DEFAULTS );
const defaultCurrent  = defaultClient.current;

describe('section8Helpers', () => {

  // `section8Helpers.getTTPs()`
  // `section8Helpers.getNetIncome()`
  // `section8Helpers.getAdjustedIncome()`
  // `section8Helpers.getDisabledAndMedicalAllowancesSum()`
  describe('`.getDisabledAndMedicalAllowancesSum( timeClient )`', () => {
    beforeEach(() => {
      defaultClient["current"].household[0].m_disabled = true
      defaultClient["current"].household[0].m_age = 62
    })

  })

  // `section8Helpers.isDisabledOrElderly()`
  describe('`.isDisabledOrElderly( timeClient )` given a time-restricted clinet object with', () => {
    let current;
    beforeEach(() => {
      defaultClient["current"].household[0].m_disabled = true
      defaultClient["current"].household[0].m_age = 62
      current = cloneDeep( defaultCurrent );
    });

    it('no disabled or elderly member should return false', () => {
      current.household[0].m_disabled = false;
      current.household[0].m_age = 61;
      expect(section8Helpers.isDisabledOrElderly( current.household[0] )).toEqual(false)
    });

    it('a disabled member but no elderly member should return true', () => {
      current.household[0].m_age = 61;
      expect(section8Helpers.isDisabledOrElderly( current.household[0] )).toEqual(true)
    });

    it('no disabled member but an elderly member should return true', () => {
      current.household[0].m_disabled = false;
      expect(section8Helpers.isDisabledOrElderly( current.household[0] )).toEqual(true)
    });

    it('a disabled and an elderly member should return true', () => {
      expect(section8Helpers.isDisabledOrElderly( current.household[0] )).toEqual(true)
    });

    // `section8Helpers.hasAnyDsbOrElderly()`

    describe('`.hasAnyDsbOrElderly` given a disabled and elderly member', () => {
      it('should be greater than zero', () => {
        expect(section8Helpers.hasAnyDsbOrElderly( defaultClient, "current")).toEqual(true)
      });
    });

    // `section8Helpers.hasDsbOrEldHeadOrSpouse()`

    describe('`.hasDsbOrEldHeadOrSpouse` given a disabled and elderly head', () => {
      it('should be greater than zero', () => {
        expect(section8Helpers.hasDsbOrEldHeadOrSpouse( defaultClient, "current")).toEqual(true)
      });
    });

  });

})
