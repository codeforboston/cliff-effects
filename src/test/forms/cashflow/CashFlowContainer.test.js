import React from 'react';
import { mount } from 'enzyme';

import { CashFlowRow } from '../../../forms/cashflow';

describe('<CashFlowRow>', () => {
  const defaultProps = {
    label:    'Rent',
    children: <span>Some content</span>,
  };

  it('renders with no message', () => {
    const validProps = {
      ...defaultProps,
      validRow: true,
    };
    expect(mount(<CashFlowRow { ...validProps } />)).toMatchSnapshot();
  });

  it('renders with message', () => {
    const invalidProps = {
      ...defaultProps,
      validRow: false,
      message:  'What did you enter!?',
    };
    expect(mount(<CashFlowRow { ...invalidProps } />)).toMatchSnapshot();
  });
});
