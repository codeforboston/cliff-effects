import React from 'react';
import { shallow } from 'enzyme';

import { ManagedNumberField } from '../../forms/formHelpers';

test('ManagedNumberField should match snapshot', () => {
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ 0 } />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should set focused state to true on focus if current value of FormInput is positive number', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ value } />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value }});
  expect(wrapper.state('focused')).toBe(true);
});

test('should set focused state to true on focus if current value of FormInput is 0', () => {
  const value = 0;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ value } />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value }});
  expect(wrapper.state('focused')).toBe(true);
});

test('should blank focusedVal state before focus if current value of FormInput is 0', () => {
  const inputValue = 0;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ 0 } />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value: inputValue }});
  expect(wrapper.state('focusedVal')).toBe('');
});

test('should set focused state to false on blur', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      onBlur={ () => {} }
      value={ value } />
  );
  wrapper.setState({ focused: true });
  wrapper.find('FormInput').simulate('blur', { target: { value }});
  expect(wrapper.state('focused')).toBe(false);
});
