import React from 'react';
import { mount } from 'enzyme';

import { AttentionArrow } from '../../../forms/formHelpers';

describe('<AttentionArrow>', () => {
  it('renders', () => {
    expect(() => {
      mount(<AttentionArrow />);
    }).not.toThrow();
  });
});
