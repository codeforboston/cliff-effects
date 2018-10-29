import React from 'react';
import { mount } from 'enzyme';

import { CashFlowRow } from '../../../forms/cashflow';

describe('<CashFlowRow>', () => {
  it('matches snapshot', () => {
    const child = <span>Some content</span>;

    const validProps = {
      label:    'Rent',
      validRow: true,
      children: child,
    };
    expect(mount(<CashFlowRow { ...validProps } />)).toMatchSnapshot();

    const invalidProps = {
      label:    'Rent',
      validRow: false,
      message:  'What did you enter!?',
      children: child,
    };
    expect(mount(<CashFlowRow { ...invalidProps } />)).toMatchSnapshot();
  });
});
