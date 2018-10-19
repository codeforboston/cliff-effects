import React from 'react';
import { mount } from 'enzyme';

import { AttentionArrow } from '../../../forms/formHelpers';

describe('<AttentionArrow>', () => {
  it('matches snapshot', () => {
    expect(mount(<AttentionArrow />)).toMatchSnapshot();
  });
});
