/** Data tables for MA SNAP calculations.
 *
 * RESOURCES:
 * Derived from {@link https://www.masslegalservices.org/content/online-snap-calculator}
 * {@link http://www.mass.gov/eohhs/consumer/basic-needs/financial/program-eligibility-charts-and-tables.html}
 * {@link http://www.mass.gov/eohhs/gov/departments/dta/program-eligibility-charts-and-tables.html}
 * Standard deductions: {@link http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-400.pdf}
 * Utility allowance categories: {@link http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-945.pdf}
 * Net income limits: {@link http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-970.pdf}
 * SNAP allowance maximums: {@link http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-980-hh-1-10.pdf}
 *
 * @namespace
 */
const SNAPData = {
  // Code-style note: Properties have to use quotes

  // in monthly values, because that is what 106 CMR 364.400 leads to: http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-400.pdf
  STANDARD_DEDUCTIONS:          { 0: 0, 1: 160, 2: 160, 3: 160, 4: 170, 5: 199, 6: 228, 'eachAdditional': 0 },
  PERCENT_GROSS_MONTHLY_EARNED: 0.20,
  STANDARD_MEDICAL_DEDUCTION:   155,
  MIN_MEDICAL_EXPENSES:         35,
  MAX_MEDICAL_EXPENSES:         190,
  // in monthly values, original source: http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-945.pdf
  UTILITY_COST_BRACKETS:        { 'Heating': 636, 'Non-heating': 392, 'Zero Utility Expenses': 0, 'Telephone': 45 },
  SHELTER_DEDUCTION_CAP:        535,
  HOMELESS_DEDUCTION:           143,
  // in monthly values, original source: http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-970.pdf
  NET_INCOME_LIMITS:            { 0: 0, 1: 1005, 2: 1354, 3: 1702, 4: 2050, 5: 2399, 6: 2747, 7: 3095, 8: 3444, 'eachAdditional': 349 },
  // in monthly values, original source: http://www.mass.gov/eohhs/docs/dta/eligibility-charts/c-snap-364-980-hh-1-10.pdf
  SNAP_LIMITS:                  { 0: 0, 1: 192, 2: 352, 3: 504, 4: 640, 5: 760, 6: 913, 7: 1009, 8: 1153, 'eachAdditional': 144 },
  // Was this used for Bay State CAP?
  // maxFoodStamp: 194,
  PERCENT_OF_NET:               0.30,
  SMALL_HOUSEHOLD_SIZE:         2,
  SMALL_HOUSEHOLD_MIN_GRANT:    15,
};
// @todo: Make class for 'money amount by number of items'-type object


export { SNAPData };
