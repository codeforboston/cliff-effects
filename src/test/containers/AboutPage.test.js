import React from 'react';
import { mount } from 'enzyme';

import { AboutPage } from '../../containers/AboutPage';
import { translations } from '../helpers';

describe('<AboutPage>', () => {
  it('renders', () => {
    expect(() => {
      return mount(<AboutPage translations={ translations } />);
    }).not.toThrow();
  });
});
