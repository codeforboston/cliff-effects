import { returnSame, stringToNumber, toBoolean } from '../../utils/valueFixers';


test('returnSame()', ()=>{

  expect(returnSame(1)).toBe(1);
  expect(returnSame('A')).toBe('A');
  expect(returnSame([
    2,
    3,
    4, 
  ])).toEqual([
    2,
    3,
    4, 
  ]);
});

test('stringToNumber()', ()=>{

  let wrongStr = function () {
    stringToNumber('A');
  };

  expect(wrongStr).toThrow();
  expect(stringToNumber('1')).toBe(1);
  expect(stringToNumber('.2')).toBe(.2);
  expect(stringToNumber('2.2')).toBe(2.2);
});

test('toBoolean()', ()=>{

  expect(toBoolean('Yes')).toBeTruthy();
  expect(toBoolean('No')).toBeFalsy();
  expect(toBoolean(true)).toBeTruthy();
  expect(toBoolean(false)).toBeFalsy();
  expect(toBoolean('d')).toBeNull();
});
