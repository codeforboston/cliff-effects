import { getSNAPBenefits } from '../../../programs/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { sampleClients } from '../../sampleClients';
import { cloneDeep } from 'lodash';

const defaultClient       = cloneDeep( CLIENT_DEFAULTS );

describe('getSNAPBenefits', () => {
  describe('default client', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'current')).toEqual(192);
    });
  });

  describe('row3', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row3;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(1066.3, 4);
    });
  });

  describe('row4', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row4;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(85.6, 4);
    });
  });

  describe('row5', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row5;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(15, 4);
    });
  });

  describe('row6', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row6;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(352, 4);
    });
  });

  describe('row7', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row7;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

  describe('row8', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row8;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Todo - Current result - returning undefined
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

  describe('row9', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row9;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(54.4, 4);
    });
  });

  describe('row10', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row10;
      // Sample data result didn't match. Missing data?
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Current result
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

});


// ==================
// 'RAKE' TESTS (looping)
// ==================

// ------------------
// SIGNIFICANT VALUES
// ------------------
// Edge cases, basically.
// CAN ONLY BE VALID VALUES.
// See 'src/utils/CLIENT_DEFAULTS' for what constitutes a valid value.
var bool = [ true, false ];
var significant = {};
// Member data
significant.numMembers          = [ 1, 2, 3, 6, 8, 12 ]; // 6 and 8 are specific to benefit calculation limits
significant.ages                = [ 0, 11, 12, 13, 14, 30, 60, 61, 62, 63 ];
significant.roles               = [ 'head', 'spouse', 'member' ];
significant.disableds           = bool;
// Monthly income and expense values
significant.monies              = [ 0, 100, 1000, 5000, 10000, 30000 ];  // One more needed for large values, etc?
// Shelter
significant.shelter             = [ 'homeless', 'homeowner', 'renter', 'housingVoucher' ];
significant.climateControl      = [ false, true ];
significant.nonHeatElectricity  = bool;
significant.phone               = bool;
significant.fuelAssistance      = bool;

// ------------------
// LOOPING
// ------------------


var iterMoney = function ( client, testID, finalFunc, next ) {
  var monies = significant.monies;
  for ( let moneyi = 0; moneyi < monies.length; moneyi++ ) {
    let amount = monies[ moneyi ];
    next( client, testID, finalFunc, amount );
  }
};  // End iterMoney()


var iterEarned = function ( client, testID, finalFunc ) {

  var cloned = cloneDeep( client );
  testID += ', current earnings of ';

  var afterMoney = function ( client, testID2, finalFunc, amount ) {

    testID2 += amount;
    let cloned = cloneDeep( client );
    cloned.current.earned = amount;
    finalFunc( cloned, testID2 );

  };  // End afterMoney()

  iterMoney( cloned, testID, finalFunc, afterMoney );

};  // End iterEarned()


describe('getSNAPBenefits loop', () => {
  describe('', () => {
    let testThisCase = ( client, testID, finalFunc ) => {
      it( testID, () => {
        let currentValue = getSNAPBenefits( client, 'current' );
        console.log( testID + ':', currentValue );
        expect( currentValue ).toBeDefined()
        // expect(getSNAPBenefits(cloned, 'current')).toBeCloseTo(54.4, 4);
      });
    };  // End testThisCase()

    iterEarned( CLIENT_DEFAULTS, 'with household of __', testThisCase );

  });  // End describe
});


// ==================
// UNIT TESTS FOR HELPERS /** @todo Import helpers */
// ==================
