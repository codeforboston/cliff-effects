import React from 'react';
import { mount } from 'enzyme';

import { CashFlowContainer } from '../../../forms/cashflow';

describe('<CashFlowContainer>', () => {
  it('matches snapshot', () => {
    const child = <span>Some content</span>;

    const validProps = {
      label:    'Rent',
      validRow: true,
      children: child,
    };
    expect(mount(<CashFlowContainer { ...validProps } />)).toMatchSnapshot();

    const invalidProps = {
      label:    'Rent',
      validRow: false,
      message:  'What did you enter!?',
      children: child,
    };
    expect(mount(<CashFlowContainer { ...invalidProps } />)).toMatchSnapshot();
  });
});
