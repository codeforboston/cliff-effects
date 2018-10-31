import React from 'react';
import { mount } from 'enzyme';

import { InvalidMessage } from '../../../forms/formHelpers';

const NOT_EMPTY = 'Hi! I\'m not an empty string.';

const div = (wrapper) => {
  return wrapper.find('div');
};

describe('<InvalidMessage>', () => {
  it('renders null if valid', () => {
    const wrapper = mount(<InvalidMessage validRow={ true }>{ NOT_EMPTY }</InvalidMessage>);
    expect(wrapper.children().exists()).toBe(false);
  });

  it('renders null if no message provided', () => {
    const wrapper = mount(<InvalidMessage validRow={ false } />);
    expect(wrapper.children().exists()).toBe(false);
  });

  it('renders message if invalid', () => {
    const wrapper = mount(<InvalidMessage validRow={ false }>{ NOT_EMPTY }</InvalidMessage>);
    expect(div(wrapper)).toHaveLength(1);
    expect(div(wrapper).text()).toEqual(NOT_EMPTY);
  });
});
