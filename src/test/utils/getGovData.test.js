const getgovdata = require('../../utils/getGovData');
/** Test set up
*/
var fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 16240, eachAdditional: 4180 };

/** Test name: Percent defaults to 100 for getYearlyLimitBySize (Items=1)
** Expected result = 12060 (corresponds to guideline for 1)
*/
test('1. Percent defaults to 100 for getYearlyLimitBySize (Items=1)', () => {
     expect(getgovdata.getYearlyLimitBySize( fedPovertyGuidelines, 1 )).toBe(12060);
 });


/** Test name: When items=2 and percent=100, getYearlyLimt returns guideline for 2
* Expected result = 16240 (corresponds to guideline for 2)
*/
test('2. When items=2 and percent=100, getYearlyLimt returns guideline for 2', () => {
     expect(getgovdata.getYearlyLimitBySize( fedPovertyGuidelines, 2 )).toBe(16240);
 });


/**
** Test name: When Items=2, percent=200, getYearlyLimit returns double value of guideline for 2
* Expected result = 16240*200% = 32480 (corresponds to twice guideline for 2)
*/
test('3. When Items=2, percent=200, getYearlyLimit returns double value of guideline for 2', () => {
     expect(getgovdata.getYearlyLimitBySize( fedPovertyGuidelines, 2, 200 )).toBe(32480);
 });


/**
** Test name: When Items=2, percent=50, getYearlyLimit returns half value of guideline for 2
* Expected result = 16240 * 50% =8120 (corresponds to 1/2 guideline for 2)
/
test('4. Get Yearly Limit, Items=2, percent=50', () => {
     expect(getgovdata.getYearlyLimitBySize( fedPovertyGuidelines, 1,50 )).toBe(8120);
 });

/**
** Test name: When items=5 (max+3), percent=default, returns guideline for 2 plus 3*additional amoun t
* getYearlyLimitBySize( fedPovertyGuidelines, 5 );  // 16240+3*4180 = 16240+12540 = 28780
*/
test('Get Yearly Limit, Items=2, percent=default', () => {
     expect(getgovdata.getYearlyLimitBySize( fedPovertyGuidelines, 5 )).toBe(28780);
 });

/** ******** ERROR CONDITIONS THAT DO NOT NEED TO BE CHECKED ********
* Negative numbers for int key
* Negative number for percent
* 0 number for percent
* Very low percent (< 5, for example .5 or 2)
* Skipped values in int key (1: 10000, 3: 111000)
* Do we need to check any kind of rounding
*/

