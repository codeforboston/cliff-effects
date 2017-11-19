const data = {
  //in monthly values, because that is what 106 CMR 364.400 lead to.  original source: http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-400.pdf
  STANDARD_DEDUCTION: { 0: 0, 1: 160, 2: 160, 3: 160, 4: 170, 5: 199, 6: 228, 'eachAdditional': 0 },
  PERCENT_OF_GROSS_MONTHLY_EARNED_INCOME: 0.20,
  STANDARD_MEDICAL_DEDUCTION: 155,
  BEGIN_RANGE_MEDICAL_EXPENSES_THRESHOLD: 35,
  END_RANGE_MEDICAL_EXPENSES_THRESHOLD: 190,
  //in monthly values, original source : http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-945.pdf
  STANDARD_UTILITY_ALLOWANCE: { 'Heating': 636, 'Non-heating': 392, 'Zero Utility Expenses': 0, 'Telephone': 45 },
  STANDARD_SHELTER_DEDUCTION_CAP: 535,
  HOMELESS_DEDUCTION: 143,
  //in monthly values, original source : http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-970.pdf
  MAX_ALLOWABLE_MONTHLY_NET_INCOME : { 0: 0, 1: 1005, 2: 1354, 3: 1702, 4: 2050, 5: 2399, 6: 2747, 7: 3095, 8: 3444, 'eachAdditional': 349 },
  //in monthly values, original source : http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-980-hh-1-10.pdf
  MAX_FOOD_STAMP_ALLOTMENT: { 0: 0, 1: 192, 2: 352, 3: 504, 4: 640, 5: 760, 6: 913, 7: 1009, 8: 1153, 'eachAdditional': 144},
  MAX_FOOD_STAMP: 194,
  PERCENT_OF_INCOME: 0.30,
  MIN_HOUSEHOLD_SIZE: 2,
  SMALL_HOUSEHOLD_MINIMUM_GRANT: 15
};

export { data };

// http://www.mass.gov/eohhs/consumer/basic-needs/financial/program-eligibility-charts-and-tables.html
// http://www.mass.gov/eohhs/gov/departments/dta/program-eligibility-charts-and-tables.html
