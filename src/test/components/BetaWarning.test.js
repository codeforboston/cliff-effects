import React from 'react';
import { mount } from 'enzyme';

import { BetaWarning } from '../../components/BetaWarning';

describe('<BetaWarning>', () => {
  it('matches snapshot', () => {
    expect(mount(<BetaWarning />)).toMatchSnapshot();
  });
});
