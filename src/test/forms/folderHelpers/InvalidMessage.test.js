import React from 'react';
import { mount } from 'enzyme';

import { InvalidMessage } from '../../../forms/formHelpers';

const NOT_EMPTY = 'Hi! I\'m not an empty string.';

const label = (wrapper) => {
  return wrapper.find('Label');
};

describe('<InvalidMessage>', () => {
  it('renders null if valid', () => {
    const wrapper = mount(<InvalidMessage
      validRow={ true }
      message={ NOT_EMPTY } />);
    expect(wrapper.children().exists()).toBe(false);
  });

  it('renders null if no message provided', () => {
    const wrapper = mount(<InvalidMessage validRow={ false } />);
    expect(wrapper.children().exists()).toBe(false);
  });

  it('renders label if invalid', () => {
    const wrapper = mount(<InvalidMessage
      validRow={ false }
      message={ NOT_EMPTY } />);
    expect(label(wrapper)).toHaveLength(1);
    expect(label(wrapper).text()).toEqual(NOT_EMPTY);
  });
});
