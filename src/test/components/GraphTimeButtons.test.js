import React from 'react';
import { mount } from 'enzyme';

import { GraphTimeButtons } from '../../components/GraphTimeButtons';

describe('<GraphTimeButtons>', () => {
  it('renders Weekly, Monthly, and Yearly buttons', () => {
    const wrapper = mount(<GraphTimeButtons />);
    expect(wrapper.find('#Weekly').exists()).toBe(true);
    expect(wrapper.find('#Monthly').exists()).toBe(true);
    expect(wrapper.find('#Yearly').exists()).toBe(true);
  });

  it('renders with provided props', () => {
    const props = {
      activeID:   'Monthly',
      onClick:    jest.fn(),
      otherProps: 'I don\'t get passed through =(',
    };
    expect(mount(<GraphTimeButtons { ...props } />)).toMatchSnapshot();
  });
});
