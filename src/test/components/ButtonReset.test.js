import React from 'react';
import { shallow } from 'enzyme';

import { ButtonReset } from '../../forms/ButtonReset';


describe('Test ButtonReset component', () => {
  it('Test click event', () => {
    let mockCallBack = jest.fn();

    let button = shallow(
      <ButtonReset
        onClick={ mockCallBack }
        snippets={{}} />
    );
    button.find('BigButton').simulate('click');

    expect(mockCallBack).toHaveBeenCalled();
  });
});
