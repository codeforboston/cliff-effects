import React from 'react';
import { mount } from 'enzyme';

import { BetaWarning } from '../../components/BetaWarning';

describe('<BetaWarning>', () => {
  it('renders', () => {
    expect(() => {
      mount(<BetaWarning />);
    }).not.toThrow();
  });
});
