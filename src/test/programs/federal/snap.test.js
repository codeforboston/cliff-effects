import { getSNAPBenefits } from '../../../programs/federal/snap';


const defaultClient = {"current":{"hasSnap":false,"hasHousing":false,"household":[{"m_age":30,"m_role":"head","m_disabled":false}],"earned":0,"TAFDC":0,"SSI":0,"SSDI":0,"childSupportIn":0,"unemployment":0,"workersComp":0,"pension":0,"socialSecurity":0,"alimony":0,"otherIncome":0,"incomeExclusions":0,"childDirectCare":0,"childBeforeAndAfterSchoolCare":0,"childTransportation":0,"childOtherCare":0,"earnedBecauseOfChildCare":0,"childSupportPaidOut":0,"adultDirectCare":0,"adultTransportation":0,"adultOtherCare":0,"disabledAssistance":0,"earnedBecauseOfAdultCare":0,"disabledMedical":0,"otherMedical":0,"shelter":"homeless","contractRent":0,"rentShare":0,"rent":0,"mortgage":0,"housingInsurance":0,"propertyTax":0,"climateControl":false,"nonHeatElectricity":false,"phone":false,"fuelAssistance":false,"otherExpenses":0},"future":{"hasSnap":false,"hasHousing":false,"household":[{"m_age":30,"m_role":"head","m_disabled":false}],"earned":0,"TAFDC":0,"SSI":0,"SSDI":0,"childSupportIn":0,"unemployment":0,"workersComp":0,"pension":0,"socialSecurity":0,"alimony":0,"otherIncome":0,"incomeExclusions":0,"childDirectCare":0,"childBeforeAndAfterSchoolCare":0,"childTransportation":0,"childOtherCare":0,"earnedBecauseOfChildCare":0,"childSupportPaidOut":0,"adultDirectCare":0,"adultTransportation":0,"adultOtherCare":0,"disabledAssistance":0,"earnedBecauseOfAdultCare":0,"disabledMedical":0,"otherMedical":0,"shelter":"homeless","contractRent":0,"rentShare":0,"rent":0,"mortgage":0,"housingInsurance":0,"propertyTax":0,"climateControl":false,"nonHeatElectricity":false,"phone":false,"fuelAssistance":false,"otherExpenses":0}};
const client1 = {"current":{"hasSnap":true,"hasHousing":false,"household":[{"m_age":30,"m_role":"head","m_disabled":false,"index":0},{"m_age":30,"m_role":"spouse","m_disabled":false,"index":1},{"m_age":"12","m_role":"member","m_disabled":false,"index":2}],"earned":2165,"TAFDC":0,"SSI":0,"SSDI":0,"childSupportIn":0,"unemployment":0,"workersComp":0,"pension":0,"socialSecurity":0,"alimony":0,"otherIncome":0,"incomeExclusions":0,"childDirectCare":0,"childBeforeAndAfterSchoolCare":0,"childTransportation":0,"childOtherCare":0,"earnedBecauseOfChildCare":0,"childSupportPaidOut":0,"adultDirectCare":0,"adultTransportation":0,"adultOtherCare":0,"disabledAssistance":0,"earnedBecauseOfAdultCare":0,"disabledMedical":0,"otherMedical":0,"shelter":"renter","contractRent":0,"rentShare":0,"rent":600,"mortgage":0,"housingInsurance":0,"propertyTax":0,"climateControl":false,"nonHeatElectricity":false,"phone":false,"fuelAssistance":false,"otherExpenses":0},"future":{"hasSnap":true,"hasHousing":false,"household":[{"m_age":30,"m_role":"head","m_disabled":false,"index":0},{"m_age":30,"m_role":"spouse","m_disabled":false,"index":1},{"m_age":"12","m_role":"member","m_disabled":false,"index":2}],"earned":2165,"TAFDC":0,"SSI":0,"SSDI":0,"childSupportIn":0,"unemployment":0,"workersComp":0,"pension":0,"socialSecurity":0,"alimony":0,"otherIncome":0,"incomeExclusions":0,"childDirectCare":0,"childBeforeAndAfterSchoolCare":0,"childTransportation":0,"childOtherCare":0,"earnedBecauseOfChildCare":0,"childSupportPaidOut":0,"adultDirectCare":0,"adultTransportation":0,"adultOtherCare":0,"disabledAssistance":0,"earnedBecauseOfAdultCare":0,"disabledMedical":0,"otherMedical":0,"shelter":"renter","contractRent":0,"rentShare":0,"rent":600,"mortgage":0,"housingInsurance":0,"propertyTax":0,"climateControl":false,"nonHeatElectricity":false,"phone":false,"fuelAssistance":false,"otherExpenses":0}};

describe('getSNAPBenefits', () => {
  describe('default client', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'current')).toEqual(192);
    });
    
    it('Should calculate the correct future benefits', () => {
      expect(getSNAPBenefits(defaultClient, 'future')).toEqual(192);
    });
  });
  describe('client 1', () => {
    it('Should calculate the correct current benefits', () => {
      expect(getSNAPBenefits(client1, 'current')).toBeCloseTo(32.4, 4);
    });
    
    it('Should calculate the correct future benefits', () => {
      expect(getSNAPBenefits(client1, 'future')).toBeCloseTo(32.4, 4);
    });
  });
});