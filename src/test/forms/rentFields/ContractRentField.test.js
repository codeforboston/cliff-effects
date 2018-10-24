import React from 'react';
import { mount } from 'enzyme';
import { defaultsDeep } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { ContractRentField } from '../../../forms/rentFields';

const buildField = (values = {}) => {
  const props = {
    timeState:         defaultsDeep({}, values, CLIENT_DEFAULTS.current),
    updateClientValue: jest.fn(),
  };
  return mount(<ContractRentField { ...props } />);
};

describe('ContractRentField.storeValidator()', () => {
  it('when input valid, sets state to valid', () => {
    const field = buildField({ rentShare: 0 });
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(1);
    field.update();
    expect(field.state()).toEqual({ valid: true, message: null });
  });

  it('when input negative, sets state to invalid', () => {
    const field = buildField();
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(-1);
    field.update();
    expect(field.state()).toEqual({ valid: false, message: null });
  });

  it('when contract rent less than rent share, sets state to invalid', () => {
    const field = buildField({ rentShare: 2 });
    expect(field.state()).toEqual({ valid: true, message: null });

    field.instance().storeValidator(1);
    field.update();
    expect(field.state()).toEqual({ valid: false, message: expect.any(String) });
  });
});

describe('ContractRentField.onBlur', () => {
  it('resets state', () => {
    const field = buildField();
    field.setState({ valid: false, message: 'Not the default value' });

    field.instance().onBlur();
    field.update();
    expect(field.state()).toEqual({ valid: true, message: null });
  });
});
