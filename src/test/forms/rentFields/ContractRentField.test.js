import React from 'react';
import { mount } from 'enzyme';

import { ContractRentField } from '../../../forms/rentFields';

import createReducer from '../../../reducers';
import { setCashValue } from '../../../actions';

const reducer = createReducer();

const buildField = (state) => {
  const props = {
    timeState: state.getIn([
      'client',
      'current',
    ]),
    updateClientValue: function() {},
  };
  return mount(<ContractRentField { ...props } />);
};

describe('ContractRentField.storeValidator()', () => {
  it('when input valid, sets state to valid', () => {
    const state = reducer(
      undefined,
      setCashValue({
        time:  'current',
        name:  'rentShare',
        value: 0,
      })
    );

    const field = buildField(state);
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(1);
    field.update();
    expect(field.state()).toEqual({ valid: true, message: null });
  });

  it('when input negative, sets state to invalid', () => {
    const state = reducer(
      undefined,
      {}
    );

    const field = buildField(state);
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(-1);
    field.update();
    expect(field.state()).toEqual({ valid: false, message: null });
  });

  it('when contract rent less than rent share, sets state to invalid', () => {
    const state = reducer(
      undefined,
      setCashValue({
        time:  'current',
        name:  'rentShare',
        value: 2,
      })
    );

    const field = buildField(state);
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(1);
    field.update();
    expect(field.state()).toEqual({ valid: false, message: expect.any(String) });
  });
});

describe('ContractRentField.onBlur', () => {
  it('resets state', () => {
    const state = reducer(
      undefined,
      {}
    );

    const field = buildField(state);
    field.setState({ valid: false, message: 'Not the default value' });

    field.instance().onBlur();
    field.update();
    expect(field.state()).toEqual({ valid: true, message: null });
  });
});
