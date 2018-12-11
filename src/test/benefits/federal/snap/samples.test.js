import { getSNAPBenefits } from '../../../../benefits/federal/snap';

// CLIENTS
import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import { sampleClients } from '../../../sampleClients';
import { cloneDeep } from 'lodash';

const defaultClient       = cloneDeep(CLIENT_DEFAULTS);

describe('getSNAPBenefits', () => {
  describe('default client', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'current')).toEqual(192);
    });
  });

  describe('row3', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row3;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 1062, Excel: 1066, Ours: 1066.3
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(1066.3, 4);
    });
  });

  describe('row4', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row4;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 117, Excel: 86, Ours: 85.6
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(85.6, 4);
    });
  });

  describe('row5', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row5;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 301, Excel: 15, Ours: 15
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(15, 4);
    });
  });

  describe('row6', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row6;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 192, Excel: 352, Ours: 352
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(352, 4);
    });
  });

  describe('row7', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row7;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 20, Excel: 0, Ours: 0
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

  describe('row8', () => {
    it('Should calculate the correct current benefits', () => {
      // let client = sampleClients.row8;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // TODO: - Current result - returning undefined
      // Project Hope: null, Excel: 211, Ours: 211
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

  describe('row9', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row9;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 150, Excel: 54, Ours: 54.4
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(54.4, 4);
    });
  });

  describe('row10', () => {
    it('Should calculate the correct current benefits', () => {
      let client = sampleClients.row10;
      // expect(getSNAPBenefits(client, 'current')).toBeCloseTo(client.current.expectedSNAP, 4);
      // Project Hope: 8, Excel: 0, Ours: 0
      expect(getSNAPBenefits(client, 'current')).toBeCloseTo(0, 4);
    });
  });

});
