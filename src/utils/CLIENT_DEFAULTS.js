import { cloneDeep } from 'lodash';

/**
 * Default client values.
 * MUST ALWAYS BE VALID
 * 
 * Note: A 'positive number' money value can have more than
 *     two decimal places.
 * 
 * @namespace
 */
const CLIENT_DEFAULTS = {

  // @todo get this value from the app somewhere
  USState: `MA`, // Two-letter code denoting the state the client is in

  current: {
    // Current programs
    benefits:  [], // Benefit names (e.g. 'snap', 'section8')
    // Household
    household: [ // one or more member objects. 'm_' for 'member'
      {
        m_age:      30, // whole number
        m_role:     `head`, // 'head', 'spouse', 'member'
        m_disabled: false, // boolean
      }, 
    ],

    // Income
    earned:                        0, // positive number (can have more than two decimal places)
    TAFDC:                         0, // positive number
    SSI:                           0, // positive number
    SSDI:                          0, // positive number
    childSupportIn:                0, // positive number
    unemployment:                  0, // positive number
    workersComp:                   0, // positive number
    pension:                       0, // positive number
    socialSecurity:                0, // positive number
    alimony:                       0, // positive number
    otherIncome:                   0, // positive number
    // Expenses
    childDirectCare:               0, // positive number
    childBeforeAndAfterSchoolCare: 0, // positive number
    childTransportation:           0, // positive number
    childOtherCare:                0, // positive number
    earnedBecauseOfChildCare:      0, // positive number
    childSupportPaidOut:           0, // positive number
    adultDirectCare:               0, // positive number
    adultTransportation:           0, // positive number
    adultOtherCare:                0, // positive number
    disabledAssistance:            0, // positive number
    earnedBecauseOfAdultCare:      0, // positive number
    disabledMedical:               0, // positive number
    otherMedical:                  0, // positive number
    /** @todo Make housing expense values more robust. */
    housing:                       `homeless`, // 'homeless', 'homeowner', 'renter', 'voucher'
    contractRent:                  0, // positive number
    rentShare:                     0, // positive number
    rent:                          0, // positive number
    mortgage:                      0, // positive number
    housingInsurance:              0, // positive number
    propertyTax:                   0, // positive number
    climateControl:                false, // boolean
    nonHeatElectricity:            false, // boolean
    phone:                         false, // boolean
    fuelAssistance:                false, // boolean  Note: Input is 'yes', 'no', but should be being converted
    otherExpensesFood:             0, // postitive number
    otherExpensesUtilities:        0, // postitive number
    otherExpensesCable:            0, // postitive number
    otherExpensesMedical:          0, // postitive number
    otherExpensesTransport:        0, // postitive number
    otherExpensesCareProducts:     0, // postitive number
    otherExpensesClothes:          0, // postitive number
    otherExpensesPhone:            0, // postitive number
    otherExpensesEntertainment:    0, // postitive number
    otherExpensesOther:            0, // postitive number
    wantsToSeeOtherExpenses:       false, // boolean
  },

  // Note: A `future` value will default to the client's `current` value until a user changes it explicitly
  future: {}, // will be copy of `current`

};

CLIENT_DEFAULTS.future = cloneDeep(CLIENT_DEFAULTS.current);


export { CLIENT_DEFAULTS };
