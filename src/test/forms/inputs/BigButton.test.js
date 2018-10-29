import React from 'react';
import { mount } from 'enzyme';

import { BigButton } from '../../../forms/inputs';

describe('<BigButton>', () => {
  it('renders Button with overridden props', () => {
    const child = <span>Click me!</span>;
    const button = mount(
      <BigButton
        className={ `test` }
        overrides={{ color: 'red' }}>{child}
      </BigButton>
    ).find('Button');
    expect(button.prop('size')).toEqual('large');
    expect(button.prop('color')).toEqual('red');
    expect(button.prop('className')).toEqual('big-button test');
  });

  it(`renders BigButton with any given props`, () => {
    const child = <span>Click me!</span>;
    const button = mount(
      <BigButton alt={ `test` }>
        {child}
      </BigButton>
    ).find('Button');
    expect(button.prop(`alt`)).toEqual(`test`);
  });
});
