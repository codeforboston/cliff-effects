import React from 'react';
import { mount } from 'enzyme';

import { CashFlowDisplayRow } from '../../../forms/cashflow';

describe('<CashFlowDisplayRow>', () => {
  it('matches snapshot', () => {
    // render using provided value
    const propsWithValue = {
      value:    12,
      generic:  'potatoes',
      children: <span>Why potatoes?</span>,
    };
    expect(mount(<CashFlowDisplayRow { ...propsWithValue } />)).toMatchSnapshot();

    // render using value in timeState
    const propsWithTimeState = {
      generic:   'potatoes',
      timeState: { potatoes: 15 },
      children:  <span>More potatoes, huh?</span>,
    };
    expect(mount(<CashFlowDisplayRow { ...propsWithTimeState } />)).toMatchSnapshot();
  });
});
