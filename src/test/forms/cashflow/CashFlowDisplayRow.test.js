import React from 'react';
import { mount } from 'enzyme';

import { CashFlowDisplayRow } from '../../../forms/cashflow';

describe('<CashFlowDisplayRow>', () => {
  it('renders using provided value', () => {
    const propsWithValue = {
      value:    12,
      generic:  'potatoes',
      children: <span>Why potatoes?</span>,
    };
    expect(mount(<CashFlowDisplayRow { ...propsWithValue } />)).toMatchSnapshot();
  });

  it('renders using value in timeState', () => {
    const propsWithTimeState = {
      generic:   'potatoes',
      timeState: { potatoes: 15 },
      children:  <span>More potatoes, huh?</span>,
    };
    expect(mount(<CashFlowDisplayRow { ...propsWithTimeState } />)).toMatchSnapshot();
  });
});
