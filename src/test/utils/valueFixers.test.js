import { returnSame, toNumber, toBoolean } from '../../utils/valueFixers';


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

test('toNumber()', ()=>{

  let wrongStr = function () {
    toNumber('A');
  };

  expect(wrongStr).toThrow();
  expect(toNumber('1')).toBe(1);
  expect(toNumber('.2')).toBe(.2);
  expect(toNumber('2.2')).toBe(2.2);
});

test('toBoolean()', ()=>{

  expect(toBoolean('Yes')).toBeTruthy();
  expect(toBoolean('No')).toBeFalsy();
  expect(toBoolean(true)).toBeTruthy();
  expect(toBoolean(false)).toBeFalsy();
  expect(toBoolean('d')).toBeNull();
});
