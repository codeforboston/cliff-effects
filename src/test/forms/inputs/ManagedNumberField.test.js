import React from 'react';
import { mount } from 'enzyme';

import { ManagedNumberField } from '../../../forms/inputs';
import { isNonNegNumber, hasOnlyNonNegNumberChars } from '../../../utils/validators';


let getMNF = function (value, store, validator, displayValidator) {
  return (
    <ManagedNumberField
      value            = { value }
      store            = { store }
      storeValidator   = { validator }
      displayValidator = { displayValidator || validator }
      format           = { () => {} }
      name             = { `MNFTest` }
      otherData        = {{ interval: `monthly` }} />
  );
};


test('ManagedNumberField should render', () => {
  expect(() => {
    mount(getMNF(0));
  }).not.toThrow();
});

test('should set focused state to true on focus if current value of input is positive number', () => {
  const userInput = 10,
        wrapper   = mount(getMNF(userInput));
  // Really want this to be checked using an actual click, but apparently that's impossible :/
  wrapper.find('input').simulate('focus', { target: { value: userInput }});
  expect(wrapper.state('focused')).toBe(true);
});

// @todo Figure out why value of 0 creates warning
// test('should set focused state to true on focus if current value of input is 0', () => {
//   const userInput = 0,
//         wrapper   = mount(getMNF(userInput));
//   // The following line creates a warning
//   // 'A component is changing an uncontrolled input of type text to be controlled.'
//   wrapper.find('input').simulate('focus', { target: { value: userInput }});
//   expect(wrapper.state('focused')).toBe(true);
// });

// @todo Figure out why value of 0 creates warning
// test('should blank focusedVal state before focus if current value of input is 0', () => {
//   const userInput = 0,
//         wrapper   = mount(getMNF(userInput));
//   // The following line creates a warning
//   // 'A component is changing an uncontrolled input of type text to be controlled.'
//   wrapper.find('input').simulate('focus', { target: { value: userInput }});
//   expect(wrapper.state('focusedVal')).toBe('');
// });

test('should set focused state to false on blur', () => {
  const userInput = 10,
        wrapper   = mount(getMNF(userInput));
  wrapper.setState({ focused: true });
  wrapper.find('input').simulate('blur', { target: { value: userInput }});
  expect(wrapper.state('focused')).toBe(false);
});

test('should change local and app state correctly when user inputs positive number', () => {
  const mockValidator = jest.fn();
  const mockStore = jest.fn();

  // Define the test case here
  const userInput = 10;
  mockValidator.mockReturnValue(true);

  const wrapper = mount(getMNF(0, mockStore, mockValidator));
  wrapper.find('input').simulate('change', { target: { value: userInput }});

  // sending the proper call to change the application's state
  expect(mockStore.mock.calls[ 0 ][ 1 ].value).toEqual(userInput);

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput);
  expect(wrapper.state('valid')).toBe(true);
});

test('should change local and app state correctly to 0 when user inputs empty string', () => {
  const mockValidator = jest.fn();
  const mockStore = jest.fn();

  // Define the test case here
  const userInput = '';
  mockValidator.mockReturnValue(true);

  const wrapper = mount(getMNF(10, mockStore, mockValidator));
  wrapper.find('input').simulate('change', { target: { value: userInput }});

  // sending the proper call to change the application's state
  // Since value is empty string, store should be given 0 as value
  expect(mockStore.mock.calls[ 0 ][ 1 ].value).toEqual(`0`);

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput);
  expect(wrapper.state('valid')).toBe(true);
});

test('should change local and app state correctly to last valid value when user inputs negative number', () => {
  const mockStore = jest.fn();

  let mockDisplayValidator = jest.fn();
  mockDisplayValidator.mockImplementation(hasOnlyNonNegNumberChars);

  let mockValidator = jest.fn();
  mockValidator.mockImplementation(isNonNegNumber);

  // Define the test case here
  const userInput1 = 6;
  const userInput2 = -6;

  const wrapper = mount(getMNF(0, mockStore, mockValidator, mockDisplayValidator));
  wrapper.find('input').simulate('change', { target: { value: userInput1 }});
  wrapper.find('input').simulate('change', { target: { value: userInput2 }});

  // expect that the store has not been called
  expect(mockStore.mock.calls).toHaveLength(1);

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput1);
  expect(wrapper.state('valid')).toBe(true);
});

test('should set FormInput `state.error` value correctly depending on `state.valid` value', () => {
  const wrapper = mount(getMNF(0));
  // Set valid to false -- FormInput error should be true
  wrapper.setState({ valid: false });
  expect(wrapper.find('FormInput').props().error).toBe(true);
  // Set valid back to true -- FormInput error should be false
  wrapper.setState({ valid: true });
  expect(wrapper.find('FormInput').props().error).toBe(false);
});
