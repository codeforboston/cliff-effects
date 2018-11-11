import React from 'react';
import { fromJS } from 'immutable';
import { mount, shallow } from 'enzyme';

import { CashFlowInputsRow } from '../../../forms/cashflow';


const monthlyVal = 200,
      propName   = `clientProp`,
      // Without 'input', just the id selector finds 4 items. Why is that?
      idBase     = `input#` + propName + `_`;

test('CashFlowInputsRow should render', () => {
  expect(() => {
    mount(
      <CashFlowInputsRow
        generic={ propName }
        timeState={ fromJS({ [ propName ]: 0 }) }
        setValue={ () => {} } >
        label
      </CashFlowInputsRow>
    );
  }).not.toThrow();
});

test(`Second ManagedNumberField child should have value of timeState[ 'clientProp' ]`, () =>  {
  const wrapper = mount(
    <CashFlowInputsRow
      generic={ propName }
      timeState={ fromJS({ [ propName ]: monthlyVal }) }
      setValue={ () => {} }>
        label
    </CashFlowInputsRow>
  );
  const monthlyMNF = wrapper.find(idBase + `monthly`).closest(`ManagedNumberField`);
  expect(monthlyMNF.prop(`value`)).toBe(monthlyVal);
});

test('First ManagedNumberField child should have weekly value', () => {
  const wrapper = mount(
    <CashFlowInputsRow
      generic={ propName }
      timeState={ fromJS({ [ propName ]: monthlyVal }) }
      setValue={ () => {} }>
        label
    </CashFlowInputsRow>
  );
  const weeklyMNF = wrapper.find(idBase + `weekly`).closest(`ManagedNumberField`);
  expect(weeklyMNF.prop(`value`)).toBeCloseTo(monthlyVal / (4 + 1 / 3));
});

test('Third ManagedNumberField child should have yearly value', () => {
  const wrapper = mount(
    <CashFlowInputsRow
      generic={ propName }
      timeState={ fromJS({ [ propName ]: monthlyVal }) }
      setValue={ () => {} }>
        label
    </CashFlowInputsRow>
  );
  const yearlyInput = wrapper.find(idBase + `yearly`).closest(`ManagedNumberField`);
  expect(yearlyInput.prop(`value`)).toBeCloseTo(monthlyVal * 12);
});

test('setValue gets called correctly when each value is changed', () => {
  const mockSetClientProperty = jest.fn();
  const wrapper = shallow(
    <CashFlowInputsRow
      generic={ propName }
      timeState={ fromJS({ [ propName ]: monthlyVal }) }
      setValue={ mockSetClientProperty }>
        label
    </CashFlowInputsRow>
  );

  const multipliers = [
    4 + 1 / 3,
    1,
    1 / 12,
  ];

  for (var i = 0; i < 3; i++) {
    // ManagedNumberField
    const MNF = wrapper.childAt(i).shallow();
    const newValue = (i + 1) * 10;
    const evnt = { target: MNF };
    MNF.prop('onChange')(evnt, { value: newValue });

    expect(mockSetClientProperty.mock.calls).toHaveLength(i + 1);
    expect(mockSetClientProperty.mock.calls[ i ][ 0 ].name).toBe(propName) ;
    expect(mockSetClientProperty.mock.calls[ i ][ 0 ].value).toBeCloseTo(newValue * multipliers[ i ]);
  }
});
