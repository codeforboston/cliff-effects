import React from 'react';
import { mount } from 'enzyme';

import { Footer } from '../../components/Footer';
import { translations } from '../helpers';

describe('<Footer>', () => {
  it('matches snapshot', () => {
    expect(() => {
      mount(<Footer translations={ translations } />);
    }).not.toThrow();
  });
});
