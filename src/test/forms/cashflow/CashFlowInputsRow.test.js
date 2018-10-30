import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { CashFlowInputsRow } from '../../../forms/cashflow';

test('CashFlowInputsRow should match snapshot', () => {
  const wrapper = shallow(
    <CashFlowInputsRow
      generic="name"
      timeState={ fromJS({ name: 0 }) }
      setValue={ () => {} } >
      label
    </CashFlowInputsRow>
  );
  expect(wrapper).toMatchSnapshot();
});

test('Second ManagedNumberField child should have value of timeState[ generic ]', () => {
  const monthlyVal = 200.0;
  const wrapper = shallow(
    <CashFlowInputsRow
      generic="name"
      timeState={ fromJS({ name: monthlyVal }) }
      setValue={ () => {} } />
  );
  const monthlyInput = wrapper.childAt(1);
  expect(monthlyInput.prop('value')).toBe(monthlyVal);
});

test('First ManagedNumberField child should have weekly value', () => {
  const monthlyVal = 200.0;
  const wrapper = shallow(
    <CashFlowInputsRow
      generic="name"
      timeState={ fromJS({ name: monthlyVal }) }
      setValue={ () => {} } />
  );
  const weeklyInput = wrapper.childAt(0);
  expect(weeklyInput.prop('value')).toBeCloseTo(monthlyVal / (4 + 1 / 3));
});

test('Third ManagedNumberField child should have yearly value', () => {
  const monthlyVal = 200.0;
  const wrapper = shallow(
    <CashFlowInputsRow
      generic="name"
      timeState={ fromJS({ name: monthlyVal }) }
      setValue={ () => {} } />
  );
  const yearlyInput = wrapper.childAt(2);
  expect(yearlyInput.prop('value')).toBeCloseTo(monthlyVal * 12);
});

test('setValue gets called correctly when each value is changed', () => {
  const mockSetClientProperty = jest.fn();
  const wrapper = shallow(
    <CashFlowInputsRow
      generic="name"
      timeState={ fromJS({ name: 200.0 }) }
      setValue={ mockSetClientProperty } />
  );

  const multipliers = [
    4 + 1 / 3,
    1,
    1 / 12,
  ];

  for (var i = 0; i < 3; i++) {
    // `input` is an actual `<input>` node
    const input = wrapper.childAt(i).shallow();
    const newValue = (i + 1) * 10;
    const evnt = { target: input };
    input.prop('onChange')(evnt, { value: newValue });

    expect(mockSetClientProperty.mock.calls).toHaveLength(i + 1);
    expect(mockSetClientProperty.mock.calls[ i ][ 0 ].name).toBe('name');
    expect(mockSetClientProperty.mock.calls[ i ][ 0 ].value).toBeCloseTo(newValue * multipliers[ i ]);
  }
});
