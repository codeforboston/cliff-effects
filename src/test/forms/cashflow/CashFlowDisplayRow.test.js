import React from 'react';
import { mount } from 'enzyme';

import { CashFlowDisplayRow } from '../../../forms/cashflow';

import createReducer from '../../../reducers';
import { setCashValue } from '../../../actions';

const reducer = createReducer();

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
    const state = reducer(
      undefined,
      setCashValue({
        time:  'current',
        name:  'potatoes',
        value: 15,
      })
    );

    const propsWithTimeState = {
      generic:   'potatoes',
      timeState: state.getIn([
        'client',
        'current', 
      ]),
      children: <span>More potatoes, huh?</span>,
    };
    expect(mount(<CashFlowDisplayRow { ...propsWithTimeState } />)).toMatchSnapshot();
  });
});
