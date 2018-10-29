import React from 'react';
import { mount } from 'enzyme';

import { CashFlowContainer } from '../../../forms/cashflow';

describe('<CashFlowContainer>', () => {
  const defaultProps = {
    label:    'Rent',
    children: <span>Some content</span>,
  };

  it('renders with no message', () => {
    const validProps = {
      ...defaultProps,
      validRow: true,
    };
    expect(mount(<CashFlowContainer { ...validProps } />)).toMatchSnapshot();
  });

  it('renders with message', () => {
    const invalidProps = {
      ...defaultProps,
      validRow: false,
      message:  'What did you enter!?',
    };
    expect(mount(<CashFlowContainer { ...invalidProps } />)).toMatchSnapshot();
  });
});
