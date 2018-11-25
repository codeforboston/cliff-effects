import React from 'react';
import { mount } from 'enzyme';

import { ButtonReset } from '../../forms/ButtonReset';


describe('Test ButtonReset component', () => {
  it('Test click event', () => {
    let mockCallBack = jest.fn();

    let button = mount(
      <ButtonReset
        onClick={ mockCallBack }
        translations={{}} />
    );
    button.find('BigButton').simulate('click');

    expect(mockCallBack).toHaveBeenCalled();
  });
});
