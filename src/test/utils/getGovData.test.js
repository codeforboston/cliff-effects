const getgovdata = require('../../utils/getGovData');
/** Test set up
*/
const undefinedString = 'undefined';
const stringString = 'string';

/* Function used for testing yearlylimit function based on passed parameters
** Parameters:
**    testname - test name
**    pguidelines, ptestname, pitems, ppercent - parameters for yearly function being tested.
**      if ppercent equals string "undefined", no value will be pssed for percent to yeqrlylimit function
**    expected - expected return value from yearly function.  
*/
const testYearlyLimit = function (testname, pguidelines, pitems, ppercent, expected) {
  test (testname + ' items: ' + pitems + ' / percent: ' + ppercent + ' / expected: ' + expected, () => 
  {
    if (typeof(ppercent) === stringString && ppercent === undefinedString){ 
      expect(getgovdata.getLimitBySize(pguidelines, pitems)).toBe(expected);
    }
    else {
      expect(getgovdata.getLimitBySize(pguidelines, pitems, ppercent)).toBe(expected);   
    }
  }); 
};  
/** End testYearlyLimit **/

/* Test function for testing use of functions by yearlylimit function */
const testAdditionalFunction = function (data, extraAmount) {
  return 100 * extraAmount;
};

// ************** Main body ************** /
let fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 16240, eachAdditional: 4180 };

testYearlyLimit ('1. Default percent test',         fedPovertyGuidelines, 1, undefinedString,12060);
testYearlyLimit ('2. Default percent test',         fedPovertyGuidelines, 2, undefinedString,16240);
testYearlyLimit ('3. Test when percent=200 doubles',fedPovertyGuidelines, 2, 200,        32480);
testYearlyLimit ('4. Test when percent=50 halves',  fedPovertyGuidelines, 2, 50,         8120);
testYearlyLimit ('5. Test with items out of range', fedPovertyGuidelines, 5, undefinedString,16240 + 3 * 4180);

fedPovertyGuidelines = { 0: 0, 1: 12060, 2: 20000, eachAdditional: testAdditionalFunction };
testYearlyLimit ('6. Test of function for each additional',fedPovertyGuidelines, 5, undefinedString,20000 + 3 * 100);

/** ******** ERROR CONDITIONS THAT DO NOT NEED TO BE CHECKED ********
* Negative numbers for int key
* Negative number for percent
* 0 number for percent
* Very low percent (< 5, for example .5 or 2)
* Skipped values in int key (1: 10000, 3: 111000)
* Do we need to check any kind of rounding
*/

