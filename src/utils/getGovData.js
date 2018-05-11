/** 
* Getting or calculating data values by leveraging common data patterns
* we've seen so far.
*/


/** Calculate appropriate MONTHLY bracket/limit value (such as income limit)
* by number of relevant items (such as number of household members). This
* function is needed because the math for these calculation needs to be
* consistent.
* 
* @see Math observed at {link http://www.mass.gov/eohhs/docs/masshealth/deskguides/fpl-deskguide.pdf}
* @see More notes on data at {link https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#}
* 
* IF YOUR DATA HAS MONTHLY VALUES AND WANT A MONTHLY LIMIT VALUE, USE
* `getYearlyLimitBySize()` INSTEAD.
* 
* @example Using household size to get federal poverty income limit:
* var fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 16240, eachAdditional: 4180 };
* getMonthlyLimitBySize( fedPovertyGuidelines, 1 );  // 1005
* getMonthlyLimitBySize( fedPovertyGuidelines, 2 );  // 1354
* getMonthlyLimitBySize( fedPovertyGuidelines, 3 );  // 1702
* 
* @function
* @param {object} data Annual data to use to get a bracket/limit value.
* @param {number} data.0 Never known to equal more than 0 so far.
* @param {number} data.1 (Or any int key) Value of bracket/limit that
* matches the number described by the key. For example, data.3 would be
* the income limit value for a household with three members.
* @param {number|function} data.eachAdditional Usually an amount to
* add for each person or item over the maximum hardcoded limits. Can be a
* function to calculate said amount based on number of extra items.
* @param {number} numItems Number of items (for example, household size).
* @param {number} [percent] Multiplies limit. You'd pass in 100% as `100`.
* 
* @returns Data value for num items, divided by 12 to get monthly value.
*/
var getMonthlyLimitBySize = function (data, numItems, percent) {
  var yearly  = getYearlyLimitBySize(data, numItems, percent),
    monthly = Math.ceil(yearly / 12);
  return monthly;
};  // End getMonthlyLimitBySize()


/** Calculate appropriate ANNUAL/YEARLY bracket/limit value (such as income
* limit) by number of relevant items (such as number of household members).
* 
* Uses all the same values as `getMonthlyLimitBySize`, but no dividing
* happens.
* 
* IF YOUR DATA HAS MONTHLY VALUES AND WANT A MONTHLY LIMIT VALUE, USE
* THIS FUNCTION WITH YOUR DATA
* 
* @see Math observed at {link http://www.mass.gov/eohhs/docs/masshealth/deskguides/fpl-deskguide.pdf}
* @see More notes on data at {link https://docs.google.com/document/d/1DRNm1TLP31s_yDdsH8IDoRV7_KjjJ46NyAaZOgLoQmY/edit#}
* 
* @example Using household size to get federal poverty income limit:
* var fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 16240, eachAdditional: 4180 };
* getYearlyLimitBySize( fedPovertyGuidelines, 1 );  // 12060
* getYearlyLimitBySize( fedPovertyGuidelines, 2 );  // 16240
* getYearlyLimitBySize( fedPovertyGuidelines, 3 );  // 20420
* 
* @function
* @param {object} data Data to use to get a bracket/limit value.
* @param {number} data.0 Never known to equal more than 0 so far.
* @param {number} data.1 (Or any int key) Value of bracket/limit that
* matches the number described by the key. For example, data.3 would be
* the income limit value for a household with three members.
* @param {number|function} data.eachAdditional Usually an amount to
* add for each person or item over the maximum hardcoded limits. Can be a
* function to calculate said amount based on number of extra items.
* @param {number} numItems Number of items (for example, household size).
* @param {number} [percent] Multiplies limit. You'd pass in 100% as `100`.
* 
* @returns Data value calculated for the number of items, numItems, wanted.
*/
const getYearlyLimitBySize = function (data, numItems, percent) {
  
  var safePerc  = percent || 100,
    limit     = null,
    maxGiven  = getMaxIntKey(data);

  if (numItems <= maxGiven) {

    limit = data[ numItems ];

  } else {

    var numExtra    = numItems - maxGiven,
      extraAmount = getExtraAmount(data, numExtra);
    limit = data[ maxGiven ] + extraAmount;

  }
  
  return Math.ceil(limit * (safePerc / 100));
};  // End getYearlyLimitBySize()


/** Deals with different value types for data.eachAdditional
* 
* @function
* @param {number} numExtra Number of extra items
* @param {number|function} eachAdditional Either a number value to add
* for each extra item or a function that will return that number.
* 
* @returns {number} The amount created by those extra items.
*/
var getExtraAmount = function (data, numExtra) {

  var extraAmount     = 0,
    eachAdditional  = data.eachAdditional;

  // Either allow additional amount to be calculated
  // or add a hard-coded amount.
  if (typeof eachAdditional === 'function') {

    extraAmount = eachAdditional(data, numExtra);

  } else {  // Assumed either number or falsy

    /** @todo Future discussioin - flexibility vs. consistency */
    var overageRate = eachAdditional || 0;
    extraAmount = numExtra * overageRate;

  }

  return extraAmount;
};  // End getExtraAmount()


/** 
* Of the keys in an object that can be converted to integers,
* return the highest converted value.
*/
var getMaxIntKey = function (data) {
  var max = 0;
  for (let key in data) {

    var asInt = parseInt(key, 10);
    if (!isNaN(asInt) && asInt > max) {
      max = asInt;
    }

  }
  return max;
};  // End getMaxIntKey()


export {
  getMonthlyLimitBySize,
  getYearlyLimitBySize,
};
