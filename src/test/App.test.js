import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';

global.localStorage = {
  getItem: function (key) { return `false`; },
  // Returns `undefined` in console
  setItem: function (key, value) { return; },
};

it('renders without crashing', () => {
  shallow(<App />);
});
