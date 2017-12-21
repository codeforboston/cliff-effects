import {isPositiveNumber, isPositiveWholeNumber} from '../../utils/validators'

test('isPositiveNumber()', () => {


      expect(isPositiveNumber("4.67")).toBeTruthy();
      expect(isPositiveNumber('.98')).toBeTruthy();
      expect(isPositiveNumber("0.333")).toBeTruthy();
      expect(isPositiveNumber("56.8")).toBeTruthy();
      expect(isPositiveNumber("6")).toBeTruthy();

});

test('isPositiveWholeNumber()', () => {
  expect(isPositiveWholeNumber('5')).toBeTruthy();

  expect(isPositiveWholeNumber("4.67")).toBeFalsy();
  expect(isPositiveWholeNumber("0.333")).toBeFalsy();
  expect(isPositiveWholeNumber("56.8")).toBeFalsy();
  expect(isPositiveWholeNumber("6.")).toBeFalsy();

  expect(isPositiveWholeNumber("A")).toBeFalsy();
  expect(isPositiveWholeNumber("A.")).toBeFalsy();
  expect(isPositiveWholeNumber("AA")).toBeFalsy();
});
