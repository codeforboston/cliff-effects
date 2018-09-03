import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

global.localStorage = {};

it('renders without crashing', () => {
  shallow(<App />);
});
