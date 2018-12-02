import React from 'react';
import { mount } from 'enzyme';

import { Header } from '../../components/Header';
import { withRouter } from '../helpers';
import { translations } from '../helpers';

describe('<Header>', () => {
  it('renders', () => {
    expect(() => {
      return mount(withRouter(<Header translations={ translations } />));
    }).not.toThrow();
  });
});
