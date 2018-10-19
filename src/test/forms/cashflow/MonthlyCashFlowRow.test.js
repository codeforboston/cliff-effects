import React from 'react';
import { mount } from 'enzyme';

import { MonthlyCashFlowRow } from '../../../forms/cashflow';

describe('<MonthlyCashFlowRow>', () => {
  it('matches snapshot', () => {
    const props = {
      inputProps:        {},
      baseValue:         0,
      updateClientValue: jest.fn(),
      rowProps:          {},
    };
    expect(mount(<MonthlyCashFlowRow { ...props } />)).toMatchSnapshot();
  });
});
