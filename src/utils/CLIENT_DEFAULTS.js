import { cloneDeep } from 'lodash';

/**
 * Default client values.
 * MUST ALWAYS BE VALID
 */
const CLIENT_DEFAULTS = {
	current: {
    // Current programs
    hasSnap:    false,
    hasHousing: false,
    // Household
    household:  [
      {
        // 'm' for member for easier transformation
        m_age:      30,  // INT
        m_role:     'head',  // 'head', 'spouse', 'member'
        m_disabled: false
      }
    ],
    // MONEY AMOUNTS
    // Income
    earnedIncome:     0,
    TAFDC:            0,
    SSI:              0,
    SSDI:             0,
    childSupportIn:   0,
    unemployment:     0,
    workersComp:      0,
    pension:          0,
    socialSecurity:   0,
    alimony:          0,
    otherIncome:      0,
    incomeExclusions: 0,
    // Expenses
    childDirectCare:                0,
    childBeforeAndAfterSchoolCare:  0,
    childTransportation:            0,
    childOtherCare:                 0,
    earnedBecauseOfChildCare: 0,  // Negative?
    childSupportPaidOut:            0,
    adultDirectCareCosts:           0,
    adultTransportationCosts:       0,
    adultOtherCareCosts:            0,
    disabledAssistance:             0,
    earnedBecauseOfAdultCare: 0,
    disabledMedicalCosts:           0,
    otherMedicalCosts:              0,
    /** @todo When client has section 8, switch this to 'housingVoucher' */
    shelter:            'homeless',  // 'homeless', 'homeowner', 'renter', 'housingVoucher'
    contractRent:       0,
    rentShare:          0,
    rent:               0,
    mortgage:           0,
    housingInsurance:   0,
    propertyTax:        0,
    climateControl:     false,
    nonHeatElectricity: false,
    phone:              false,
    fuelAssistance:     false,  // Input is 'yes', 'no'
    otherExpenses:      0
  },
  future: {},
  // userChanged: {}  // In state instead?
};

// I do not get lodash...
CLIENT_DEFAULTS.future = cloneDeep( CLIENT_DEFAULTS.current );


export { CLIENT_DEFAULTS };
