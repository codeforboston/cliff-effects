import React from 'react';
import { shallow } from 'enzyme';

import App from '../components/App';

global.localStorage = {
  getItem: function (key) { return `false`; },
  // Returns `undefined` in console
  setItem: function (key, value) { return; },
};

const NO_OP = () => {};

it('renders without crashing', () => {
  shallow(
    <App
      setLanguage={ NO_OP }
      setUSState={ NO_OP } />
  );
});
