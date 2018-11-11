/*
 * Sample client data for testing
 * https://docs.google.com/spreadsheets/d/1iFBM6LUQGfKp7a3jjTuHDl3JjHgVUNy1LrS-jkyxHHI/edit?usp=sharing
 */

/** Which columns represent which properties
const CLIENT_ROW_N = {

  // Property Name                | Column      | Value             | Notes

  current: {
    // Current programs
    []                              COL-T,COL-Y   array of strings    Values are identifiers for programs, e.g. 'snap', 'section8'
                                                                      For now, 'Public Housing' or 'MRVP' counts for section 8
    // Household
    household:  [                   COL-G         one or more         Distribution unclear
      {                             -----                             'head' of household should always be first
        m_age:                      -----         whole number
        m_role:                     -----         'head', 'spouse', 'member'
        m_disabled:                 COL-AM        boolean
      },
    ],
    // Income
    earned:                         COL-I         positive number
    TAFDC:                          COL-J         positive number
    SSI:                            COL-K         positive number
    SSDI:                           COL-L         positive number
    childSupportIn:                 COL-N         positive number
    unemployment:                   -----         positive number
    workersComp:                    COL-O         positive number
    pension:                        -----         positive number
    socialSecurity:                 COL-P         positive number
    alimony:                        -----         positive number
    otherIncome:                    COL-Q         positive number
    // Expenses
    childDirectCare:                -----         positive number
    childBeforeAndAfterSchoolCare:  -----         positive number
    childTransportation:            -----         positive number
    childOtherCare:                 -----         positive number
    earnedBecauseOfChildCare:       -----         positive number
    childSupportPaidOut:            -----         positive number
    adultDirectCare:                -----         positive number
    adultTransportation:            -----         positive number
    adultOtherCare:                 -----         positive number
    disabledAssistance:             -----         positive number
    earnedBecauseOfAdultCare:       -----         positive number
    disabledMedical:                -----         positive number
    otherMedical:                   -----         positive number
    housing:                        COL-X         'homeless', 'homeowner', 'renter', 'housingVoucher'
    contractRent:                   -----         positive number
    rentShare:                      -----         positive number
    rent:                           COL-AA        positive number
    mortgage:                       -----         positive number
    housingInsurance:               -----         positive number
    propertyTax:                    -----         positive number
    climateControl:                 -----         boolean
    nonHeatElectricity:             -----         boolean
    phone:                          -----         boolean
    fuelAssistance:                 -----         boolean
    // Values to test, to 'expect'
    expectedSNAP:                   COL-U         number or null
    // This should always be given a value of null for now
    expectedSection8:               -----         number or null      no category/column, nummber or null (not sure what 'public housing' means)
  },
};
*/


/** No benefits for row 2. Why did they include this in their sample data table? */
// const CLIENT_ROW_2 = {
//   current: {
//     // Current programs
//     benefits: [],
//     // Household
//     household:  [{
//         m_age:                      66,
//         m_role:                     'head',
//         m_disabled:                 false
//     }],
//     // Income
//     earned:                         0,
//     TAFDC:                          0,
//     SSI:                            0,
//     SSDI:                           0,
//     childSupportIn:                 0,
//     unemployment:                   0,
//     workersComp:                    0,
//     pension:                        0,
//     socialSecurity:                 0,
//     alimony:                        0,
//     otherIncome:                    0,
//     // Expenses
//     childDirectCare:                0,
//     childBeforeAndAfterSchoolCare:  0,
//     childTransportation:            0,
//     childOtherCare:                 0,
//     earnedBecauseOfChildCare:       0,
//     childSupportPaidOut:            0,
//     adultDirectCare:                0,
//     adultTransportation:            0,
//     adultOtherCare:                 0,
//     disabledAssistance:             0,
//     earnedBecauseOfAdultCare:       0,
//     disabledMedical:                0,
//     otherMedical:                   0,
//     /** @todo When client has section 8, switch this to 'housingVoucher' */
//     /** @todo Make housing expense values more robust. */
//     housing:                        'homeless',
//     contractRent:                   0,
//     rentShare:                      0,
//     rent:                           0,
//     mortgage:                       0,
//     housingInsurance:               0,
//     propertyTax:                    0,
//     climateControl:                 false,
//     nonHeatElectricity:             false,
//     phone:                          false,
//     fuelAssistance:                 false,
//     // Values to test, to 'expect'
//     expectedSNAP:                  1062,
//     expectedSection8:              null  // null (yes, public housing)
//   },
// };

const CLIENT_ROW_3 = {
  current: {
    // Current programs
    // Public Housing (but NOT Section 8)
    benefits:  [ 'snap' ],
    // Household
    household: [
      {
        m_age:      2,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      7,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      9,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      11,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      12,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      15,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      16,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      18,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      39,
        m_role:     'head',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        0,
    TAFDC:                         997,
    SSI:                           0,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'renter',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          200,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  1062,
    expectedSection8:              null,  // (yes, public housing)
  },
};

const CLIENT_ROW_4 = {
  current: {
    // Current programs
    benefits: [
      'snap',
      'section8',
    ],
    // Household
    household: [
      {
        m_age:      60,
        m_role:     'head',  // deduced from age distribution
        m_disabled: true,  // though not certain which member has disability and how many
      },
      {
        m_age:      14,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        0,
    TAFDC:                         0,
    SSI:                           1048,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'housingVoucher',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          395,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  117,
    expectedSection8:              null,  // null (yes, public housing)
  },
};

const CLIENT_ROW_5 = {
  current: {
    // Current programs
    benefits:  [ 'snap' ],
    // Household
    household: [
      {
        m_age:      32,
        m_role:     'head',
        m_disabled: false,
      },
      {
        m_age:      3,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        2080.00,
    TAFDC:                         0,
    SSI:                           0,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'renting',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          0,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  301,
    expectedSection8:              null,
  },
};

const CLIENT_ROW_6 = {
  current: {
    // Current programs
    benefits:  [ 'snap' ],
    // Household
    household: [
      {
        m_age:      28,
        m_role:     'head',
        m_disabled: false,
      },
      {
        m_age:      0,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        0,
    TAFDC:                         239,
    SSI:                           0,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'homeless',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          0,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  192,
    expectedSection8:              null,  // "Yes - Public Housing"
  },
};

const CLIENT_ROW_7 = {
  current: {
    // Current programs
    // Public Housing (but NOT Section 8)
    benefits:  [ 'snap' ],
    // Household
    household: [
      {
        m_age:      2,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      6,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      40,
        m_role:     'head',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        2700,
    TAFDC:                         0,
    SSI:                           55,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'renter',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          1212,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  20,
    expectedSection8:              null,  // "Yes - Public Housing but NOT Section 8"
  },
};

const CLIENT_ROW_8 = {
  current: {
    // Current programs
    benefits:  [ 'section8' ],
    // Household
    household: [
      {
        m_age:      57,
        m_role:     'head',  // deduced from age distribution
        m_disabled: false,  // boolean though not certain which member has disability and how many
      },
      {
        m_age:      35,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      3,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      3,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        2000,
    TAFDC:                         0,
    SSI:                           0,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'housingVoucher',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          0,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  null,
    expectedSection8:              null,  // None given
  },
};

const CLIENT_ROW_9 = {
  current: {
    // Current programs
    benefits: [
      'snap',
      'section8',
    ],
    // Household
    // 'm_' for 'member'
    household: [
      {
        m_age:      27,
        m_role:     'head',  // deduced from age distribution
        m_disabled: true,             // COL-AM boolean 
      },
      {
        m_age:      3,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        0,
    TAFDC:                         0,
    SSI:                           1152,
    SSDI:                          0,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'housingVoucher',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          240,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  150,
    expectedSection8:              null,  // None given
  },
};

const CLIENT_ROW_10 = {
  current: {
    // Current programs
    benefits: [
      'snap',
      'section8',
    ],
    // Household
    household: [
      {
        m_age:      37,
        m_role:     'head',
        m_disabled: true,
      },
      {
        m_age:      9,
        m_role:     'member',
        m_disabled: false,
      },
      {
        m_age:      8,
        m_role:     'member',
        m_disabled: false,
      },
    ],
    // Income
    earned:                        798,
    TAFDC:                         0,
    SSI:                           1806,
    SSDI:                          588,
    childSupportIn:                0,
    unemployment:                  0,
    workersComp:                   0,
    pension:                       0,
    socialSecurity:                0,
    alimony:                       0,
    otherIncome:                   0,
    // Expenses
    childDirectCare:               0,
    childBeforeAndAfterSchoolCare: 0,
    childTransportation:           0,
    childOtherCare:                0,
    earnedBecauseOfChildCare:      0,
    childSupportPaidOut:           0,
    adultDirectCare:               0,
    adultTransportation:           0,
    adultOtherCare:                0,
    disabledAssistance:            0,
    earnedBecauseOfAdultCare:      0,
    disabledMedical:               0,
    otherMedical:                  0,
    housing:                       'housingVoucher',
    contractRent:                  0,
    rentShare:                     0,
    rent:                          910,
    mortgage:                      0,
    housingInsurance:              0,
    propertyTax:                   0,
    climateControl:                false,
    nonHeatElectricity:            false,
    phone:                         false,
    fuelAssistance:                false,
    // Values to test, to 'expect'
    expectedSNAP:                  8,
    expectedSection8:              null,  // None given
  },
};

/** No benefits for row 11. Why did they include this in their sample data table? */
// const CLIENT_ROW_11 = {
//   current: {
//     // Current programs
//     benefits:                       [],
//     // Household
//     household:  [
//       {
//         m_age:                      57,
//         m_role:                     'head',
//         m_disabled:                 false
//       },
//       {
//         m_age:                      50,
//         m_role:                     'member',
//         m_disabled:                 false
//       },
//       {
//         m_age:                      15,
//         m_role:                     'member',
//         m_disabled:                 false
//       }
//     ],
//     // Income
//     earned:                         0,
//     TAFDC:                          0,
//     SSI:                            0,
//     SSDI:                           0,
//     childSupportIn:                 0,
//     unemployment:                   310,
//     workersComp:                    0,
//     pension:                        0,
//     socialSecurity:                 0,
//     alimony:                        0,
//     otherIncome:                    0,
//     // Expenses
//     childDirectCare:                0,
//     childBeforeAndAfterSchoolCare:  0,
//     childTransportation:            0,
//     childOtherCare:                 0,
//     earnedBecauseOfChildCare:       0,
//     childSupportPaidOut:            0,
//     adultDirectCare:                0,
//     adultTransportation:            0,
//     adultOtherCare:                 0,
//     disabledAssistance:             0,
//     earnedBecauseOfAdultCare:       0,
//     disabledMedical:                0,
//     otherMedical:                   0,
//     housing:                        'renter',
//     contractRent:                   0,
//     rentShare:                      0,
//     rent:                           0,
//     mortgage:                       0,
//     housingInsurance:               0,
//     propertyTax:                    0,
//     climateControl:                 false,
//     nonHeatElectricity:             false,
//     phone:                          false,
//     fuelAssistance:                 false,
//    // Values to test, to 'expect'
//     expectedSNAP:                  null,
//     expectedSection8:              null  // "Yes - Public Housing"
//   },
// };


const sampleClients = {
  // CLIENT_ROW_2,  // No SNAP or Section 8
  row3:  CLIENT_ROW_3,
  row4:  CLIENT_ROW_4,
  row5:  CLIENT_ROW_5,
  row6:  CLIENT_ROW_6,
  row7:  CLIENT_ROW_7,
  row8:  CLIENT_ROW_8,
  row9:  CLIENT_ROW_9,
  row10: CLIENT_ROW_10,
  // CLIENT_ROW_11  // No SNAP or Section 8
};

export { sampleClients };
