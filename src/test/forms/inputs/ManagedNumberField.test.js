import React from 'react';
import { shallow } from 'enzyme';

import { ManagedNumberField } from '../../../forms/inputs';
import { isNonNegNumber, hasOnlyNonNegNumberChars } from '../../../utils/validators';

test('ManagedNumberField should match snapshot', () => {
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ 0 }
      name={ `test` }
      otherData={{ interval: `monthly` }} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should set focused state to true on focus if current value of FormInput is positive number', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ value }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value }});
  expect(wrapper.state('focused')).toBe(true);
});

test('should set focused state to true on focus if current value of FormInput is 0', () => {
  const value = 0;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ value }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value }});
  expect(wrapper.state('focused')).toBe(true);
});

test('should blank focusedVal state before focus if current value of FormInput is 0', () => {
  const inputValue = 0;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ 0 }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('focus', { target: { value: inputValue }});
  expect(wrapper.state('focusedVal')).toBe('');
});

test('should set focused state to false on blur', () => {
  const value = 10;
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ value }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.setState({ focused: true });
  wrapper.find('FormInput').simulate('blur', { target: { value }});
  expect(wrapper.state('focused')).toBe(false);
});

test('should change local and app state correctly when user inputs positive number', () => {
  const mockValidator = jest.fn();
  const mockStore = jest.fn();

  // Define the test case here
  const userInput = 5;
  mockValidator.mockReturnValue(true);

  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      store={ mockStore }
      storeValidator={ mockValidator }
      displayValidator={ mockValidator }
      value={ 0 }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('change', {}, { value: userInput });

  // sending the proper call to change the application's state
  // TODO: Determine whether the 1st and 3rd arguments should be checked w/ Enzyme too
  expect(mockStore.mock.calls[ 0 ][ 1 ]).toEqual({ value: userInput });

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput);
  expect(wrapper.state('valid')).toBe(true);
});

test('should change local and app state correctly when user inputs empty string', () => {
  const mockValidator = jest.fn();
  const mockStore = jest.fn();

  // Define the test case here
  const userInput = '';
  mockValidator.mockReturnValue(true);

  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      store={ mockStore }
      displayValidator={ mockValidator }
      storeValidator={ mockValidator }
      value={ 0 }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('change', {}, { value: userInput });

  // sending the proper call to change the application's state
  // Since userInput is empty string, store should be given 0 as value
  expect(mockStore.mock.calls[ 0 ][ 1 ]).toEqual({ value: '0' });

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput);
  expect(wrapper.state('valid')).toBe(true);
});

test('should change local and app state correctly when user inputs negative number', () => {
  const mockStore = jest.fn();

  var mockDisplayValidator = jest.fn();
  mockDisplayValidator.mockImplementation(hasOnlyNonNegNumberChars);

  var mockStoreValidator = jest.fn();
  mockStoreValidator.mockImplementation(isNonNegNumber);

  // Define the test case here
  const userInput1 = 6;
  const userInput2 = -6;

  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      store={ mockStore }
      displayValidator={ mockDisplayValidator }
      storeValidator={ mockStoreValidator }
      value={ 0 }
      otherData={{ interval: `monthly` }} />
  );
  wrapper.find('FormInput').simulate('change', {}, { value: userInput1 });
  wrapper.find('FormInput').simulate('change', {}, { value: userInput2 });

  // expect that the store has not been called
  expect(mockStore.mock.calls).toHaveLength(1);

  // changes to this.state's focusedVal and valid variables
  expect(wrapper.state('focusedVal')).toBe(userInput1);
  expect(wrapper.state('valid')).toBe(true);
});

test('should set FormInput error state properly when valid condition changes', () => {
  const wrapper = shallow(
    <ManagedNumberField
      format={ () => {} }
      value={ 0 }
      otherData={{ interval: `monthly` }} />
  );
  // Set valid to false -- FormInput error should be true
  wrapper.setState({ valid: false });
  expect(wrapper.find('FormInput').props().error).toBe(true);
  // Set valid back to true -- FormInput error should be false
  wrapper.setState({ valid: true });
  expect(wrapper.find('FormInput').props().error).toBe(false);
});
