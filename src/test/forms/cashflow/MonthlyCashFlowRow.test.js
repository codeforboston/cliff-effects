import React from 'react';
import { mount } from 'enzyme';

import { MonthlyCashFlowRow } from '../../../forms/cashflow';

describe('<MonthlyCashFlowRow>', () => {
  it('renders', () => {
    const props = {
      inputProps:        {},
      baseValue:         0,
      updateClientValue: jest.fn(),
      rowProps:          {},
    };
    expect(() => {
      mount(<MonthlyCashFlowRow { ...props } />);
    }).not.toThrow();
  });
});
