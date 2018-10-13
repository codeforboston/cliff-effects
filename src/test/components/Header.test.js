import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import Header from '../../components/Header';
import { withRouter } from '../helpers';

describe('<Header>', () => {
  it('renders', () => {
    expect(() => mount(withRouter(<Header />))).not.toThrow();
  });
});
