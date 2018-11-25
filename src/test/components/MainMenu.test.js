import React from 'react';
import { mount } from 'enzyme';

import { MainMenu } from '../../components/MainMenu';
import { withRouter } from '../helpers';
import { translations } from '../helpers';

describe('<MainMenu>', () => {
  it('renders', () => {
    expect(() => {
      return mount(withRouter(<MainMenu translations={ translations } />));
    }).not.toThrow();
  });
});
