import React from 'react';
import { mount } from 'enzyme';

import { MainMenu } from '../../components/MainMenu';
import { withRouter } from '../helpers';

describe('<MainMenu>', () => {
  it('renders', () => {
    expect(() => {
      return mount(withRouter(<MainMenu />));
    }).not.toThrow();
  });
});
