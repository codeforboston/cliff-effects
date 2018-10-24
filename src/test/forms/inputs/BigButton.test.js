import React from 'react';
import { mount } from 'enzyme';

import { BigButton } from '../../../forms/inputs';

describe('<BigButton>', () => {
  it('renders Button with default props', () => {
    const child = <span>Click me!</span>;
    const button = mount(<BigButton color="red">{child}</BigButton>).find('Button');
    expect(button.prop('color')).toEqual('red');
    expect(button.prop('size')).toEqual('large');
  });
});
