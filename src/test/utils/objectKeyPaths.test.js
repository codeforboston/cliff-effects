import { getKeyPathsArray, getKeyPathStrings } from '../../utils/objectKeyPaths';

describe('getKeyPathsArray()', () => {
  test('prop w/ string value should return key only', () => {
    expect(getKeyPathsArray({ a: '' })).toEqual([ [ 'a' ] ]);
  });

  test('prop w/ numeric value should return key only', () => {
    expect(getKeyPathsArray({ a: 0 })).toEqual([ [ 'a' ] ]);
  });

  test('prop w/ array value should return key only', () => {
    const obj = {
      a: [
        '',
        {},
        [],
      ],
    };
    const result = [ [ 'a' ] ];
    expect(getKeyPathsArray(obj)).toEqual(result);
  });

  test('prop w/ empty object should return empty array', () => {
    expect(getKeyPathsArray({})).toEqual([]);
  });

  test('prop w/ object value should return array of key arrays', () => {
    expect(getKeyPathsArray({ a: { b: '' }})).toEqual([
      [ 'a' ],
      [
        'a',
        'b',
      ],
    ]);
  });

  test('prop w/ version should have version removed when stripVersions flag is set', () => {
    expect(getKeyPathsArray({ a_v1: '' }, true)).toEqual([ [ 'a' ] ]);
    expect(getKeyPathsArray({ a: { b_v1: '' }}, true)).toEqual([
      [ 'a' ],
      [
        'a',
        'b',
      ],
    ]);
  });

  test('prop w/ version containing decimal should not be removed when stripVersions flag is set', () => {
    expect(getKeyPathsArray({ 'a_v1.0': '' }, true)).toEqual([ [ 'a_v1.0' ] ]);
    expect(getKeyPathsArray({ a: { 'b_v1.0': '' }}, true)).toEqual([
      [ 'a' ],
      [
        'a',
        'b_v1.0',
      ],
    ]);
  });

});

describe('getKeyPathStrings()', () => {
  test('keys array containing single key should return string with that key.', () => {
    expect(getKeyPathStrings([ [ 'a' ] ])).toEqual([ 'a' ]);
  });

  test('keys array with multiple keys should return string of keys delimited by `.`', () => {
    expect(getKeyPathStrings([
      [
        'a',
        'b',
      ],
    ])).toEqual([ 'a.b' ]);
  });

  test('string delimited by `.` should be returned for each keys array', () => {
    expect(getKeyPathStrings([
      [ 'a' ],
      [
        'a',
        'b',
      ],
    ])).toEqual([
      'a',
      'a.b',
    ]);
  });
});
