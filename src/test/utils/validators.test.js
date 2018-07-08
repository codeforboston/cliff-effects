import { isNonNegNumber, isNonNegWholeNumber } from '../../utils/validators';


test('isNonNegNumber()', () => {
  expect(isNonNegNumber('.05 * 10^3')).toBeFalsy();
  expect(isNonNegNumber('.5e3')).toBeFalsy();
  expect(isNonNegNumber('5 * 10^3')).toBeFalsy();
  expect(isNonNegNumber('5e3')).toBeFalsy();

  expect(isNonNegNumber('4.67')).toBeTruthy();
  expect(isNonNegNumber('.98')).toBeTruthy();
  expect(isNonNegNumber('0.333')).toBeTruthy();
  expect(isNonNegNumber('56.8')).toBeTruthy();
  expect(isNonNegNumber('6')).toBeTruthy();

  expect(isNonNegNumber('-4.67')).toBeFalsy();
  expect(isNonNegNumber('-.98')).toBeFalsy();
  expect(isNonNegNumber('-0.333')).toBeFalsy();
  expect(isNonNegNumber('-56.8')).toBeFalsy();
  expect(isNonNegNumber('-6')).toBeFalsy();

});

test('isNonNegWholeNumber()', () => {
  expect(isNonNegWholeNumber('.05 * 10^3')).toBeFalsy();
  expect(isNonNegWholeNumber('.5e3')).toBeFalsy();
  expect(isNonNegWholeNumber('5 * 10^3')).toBeFalsy();
  expect(isNonNegWholeNumber('5e3')).toBeFalsy();

  expect(isNonNegWholeNumber('5')).toBeTruthy();
  expect(isNonNegWholeNumber('-5')).toBeFalsy();

  expect(isNonNegWholeNumber('4.67')).toBeFalsy();
  expect(isNonNegWholeNumber('0.333')).toBeFalsy();
  expect(isNonNegWholeNumber('56.8')).toBeFalsy();
  expect(isNonNegWholeNumber('6.')).toBeFalsy();

  expect(isNonNegWholeNumber('-4.67')).toBeFalsy();
  expect(isNonNegWholeNumber('-0.333')).toBeFalsy();
  expect(isNonNegWholeNumber('-56.8')).toBeFalsy();
  expect(isNonNegWholeNumber('-6.')).toBeFalsy();

  expect(isNonNegWholeNumber('A')).toBeFalsy();
  expect(isNonNegWholeNumber('A.')).toBeFalsy();
  expect(isNonNegWholeNumber('AA')).toBeFalsy();
});
