import React from 'react';
import { mount } from 'enzyme';
import { last } from 'lodash';

import { ControlledRadioYesNo } from '../../../forms/inputs';

const yesRadio = (control) => {
  return control.find('Radio[label="Yes"]');
};
const noRadio = (control) => {
  return control.find('Radio[label="No"]');
};
const selectYes = (control) => {
  return yesRadio(control).simulate('click');
};
const selectNo = (control) => {
  return noRadio(control).simulate('click');
};
const latestCall = (mockFn) => {
  return last(mockFn.mock.calls)[ 1 ];
};

describe('<ControlledRadioYesNo>', () => {
  let control;
  const update = jest.fn();
  const defaultProps = {
    labelText:         'Pie?',
    name:              'pie',
    value:             null,
    updateClientValue: update,
  };

  const buildControl = (props = {}) => {
    return (
      mount(<ControlledRadioYesNo
        { ...defaultProps }
        { ...props } />)
    );
  };

  beforeEach(() => {
    control = buildControl();
  });

  afterEach(() => {
    update.mockClear();
  });

  test('when value true, yes radio button is selected', () => {
    const control = buildControl({ value: true });
    expect(yesRadio(control).prop('checked')).toBe(true);
    expect(noRadio(control).prop('checked')).toBe(false);
  });

  test('when yes selected, calls update with value true', () => {
    selectYes(control);
    expect(latestCall(update)).toHaveProperty('value', true);
  });

  test('when no selected, calls update with value false', () => {
    selectNo(control);
    expect(latestCall(update)).toHaveProperty('value', false);
  });
});
