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

  it('matches snapshot', () => {
    expect(mount(<GraphTimeButtons />)).toMatchSnapshot();
  });
});
