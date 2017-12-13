import { getSNAPBenefits } from '../../../programs/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { cloneDeep } from 'lodash';

const defaultClient       = cloneDeep( CLIENT_DEFAULTS );
const variant1            = cloneDeep( CLIENT_DEFAULTS );
variant1.current.hasSnap  = true;
variant1.current.household.push( {"m_age":30,"m_role":"head","m_disabled":false} );
variant1.current.household.push( {"m_age":30,"m_role":"spouse","m_disabled":false} );
variant1.current.household.push( {"m_age":12,"m_role":"member","m_disabled":false} );
variant1.current.earned   = 2165;
variant1.current.shelter  = "renter";
variant1.current.rent     = 600;
variant1.future           = cloneDeep( variant1.current );

describe('getSNAPBenefits', () => {
  describe('default client', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'current')).toEqual(192);
    });
    
    it('Should calculate the correct future benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'future')).toEqual(192);
    });
  });
  describe('variant 1', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(variant1, 'current')).toBeCloseTo(32.4, 4);
    });
    
    it('Should calculate the correct future benefits', () => {
      expect(getSNAPBenefits(variant1, 'future')).toBeCloseTo(32.4, 4);
    });
  });
});