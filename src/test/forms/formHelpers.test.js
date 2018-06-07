import React from 'react';
import { shallow } from 'enzyme';

import { ManagedNumberField } from '../../forms/formHelpers';

test('ManagedNumberField should match snapshot', () => {
  const wrapper = shallow(
    <ManagedNumberField
      format={ jest.fn() }
      value={ 0 } />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should set focused state to true on focus', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ jest.fn() }
      value={ value } />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value }}, undefined);
  expect(wrapper.state('focused')).toBe(true);
});

test('should blank focusedVal state before focus if current value of FormInput is 0', () => {
  const inputValue = 0;
  const wrapper = shallow(
    <ManagedNumberField
      format={ jest.fn() }
      value={ 0 } />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value: inputValue }}, undefined);
  expect(wrapper.state('focusedVal')).toBe('');
});

test('should set focused state to false on blur', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ jest.fn() }
      onBlur={ jest.fn() }
      value={ value } />
  );
  wrapper.setState({ focused: true });
  wrapper.find('FormInput').simulate('blur', {});
  expect(wrapper.state('focused')).toBe(false);
});
