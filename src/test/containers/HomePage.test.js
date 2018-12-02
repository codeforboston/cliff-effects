import React from 'react';
import { mount } from 'enzyme';

import { HomePage } from '../../containers/HomePage';
import { withRouter } from '../helpers';

describe('<HomePage>', () => {
  it('matches snapshot', () => {
    expect(mount(withRouter(<HomePage />))).toMatchSnapshot();
  });
});
