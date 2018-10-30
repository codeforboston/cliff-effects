import React from 'react';
import { mount } from 'enzyme';
import { last } from 'lodash';

import { ControlledRadioYesNo } from '../../../forms/inputs';

const yesRadio = (wrapper) => {
  return wrapper.find('Radio[label="Yes"]');
};
const noRadio = (wrapper) => {
  return wrapper.find('Radio[label="No"]');
};
const selectYes = (wrapper) => {
  wrapper.instance().handleChange({}, { value: 'Yes' });
  wrapper.update();
};
const selectNo = (wrapper) => {
  wrapper.instance().handleChange({}, { value: 'No' });
  wrapper.update();
};
const latestCall = (mockFn) => {
  return last(mockFn.mock.calls)[ 1 ];
};

describe('<ControlledRadioYesNo>', () => {
  const update = jest.fn();
  const defaultProps = {
    labelText: 'Pie?',
    name:      'pie',
    checked:   true,
    onChange:  update,
  };

  const buildWrapper = (props = {}) => {
    return mount(
      <ControlledRadioYesNo
        { ...defaultProps }
        { ...props } />
    );
  };

  afterEach(() => {
    update.mockClear();
  });

  test('when checked, yes radio button is selected', () => {
    const wrapper = buildWrapper({ checked: true });
    expect(yesRadio(wrapper).prop('checked')).toBe(true);
    expect(noRadio(wrapper).prop('checked')).toBe(false);
  });

  test('when not checked, no radio button is selected', () => {
    const wrapper = buildWrapper({ checked: false });
    expect(yesRadio(wrapper).prop('checked')).toBe(false);
    expect(noRadio(wrapper).prop('checked')).toBe(true);
  });

  test('when yes selected, calls update with value true', () => {
    const wrapper = buildWrapper();
    selectYes(wrapper);
    expect(latestCall(update)).toHaveProperty('value', true);
  });

  test('when no selected, calls update with value false', () => {
    const wrapper = buildWrapper();
    selectNo(wrapper);
    expect(latestCall(update)).toHaveProperty('value', false);
  });
});
