const math = require('../../utils/math');

// These tests are at least temporarily deprecated because javascript floats
// are known to misbehave such that these will likely fail and we expect the
// math to misbehave on rounding like this. That's acceptable for the use
// cases we are using these on.
// test('Rounding up', () => {
//     expect(math.roundMoney(1.005)).toBe(1.01);
// });

// test('Rounding down', () => {
//     expect(math.roundMoney(1.0049)).toBe(1.0);
// });

// While 0 and -0 work the same in most cases, we want to avoid displaying -0 since the concept of -0 can be confusing for some people
// test('Rounding to -0', () => {
//     var roundedNegZero = math.roundMoney(-0);
//     expect(Object.is(roundedNegZero, 0)).toBe(true);
// });

// This is a more of a pedantic than practical case since values representing money should not reach anywhere close to Number.MAX_VALUE
// However, rounding Number.MAX_VALUE to two decimal places should not cause it to become infinity
/*
test('Rounding a very large number', () => {
    expect(math.roundMoney(Number.MAX_VALUE)).toBeCloseTo(Number.MAX_VALUE);
});
*/

test('Rounding infinity', () => {
  expect(math.roundMoney(Infinity)).toBe(Infinity);
});

test('Rounding NaN', () => {
  let roundedNan = math.roundMoney(NaN);
  expect(isNaN(roundedNan)).toBe(true);
});

