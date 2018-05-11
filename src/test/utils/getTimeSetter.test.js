import { getTimeSetter } from '../../utils/getTimeSetter';

describe('getTimeSetter', () => {
  var data = {
  };

  const fakeCallback = function (evnt, data) {};

  var returnedFunc = getTimeSetter('current', fakeCallback);
  returnedFunc({
  }, data);

  it('does return a function', () => {
    expect(typeof(returnedFunc) === 'function').toBe(true);
  });

  it('adds time property to data', () => {
    expect(data.hasOwnProperty('time')).toBe(true);
  });

  it('is data set correctly', () => {
    expect(data.time).toBe('current');
  });

});
