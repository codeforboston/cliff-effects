import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { ButtonReset } from '../../forms/ButtonReset';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';


describe('Test ButtonReset component', () => {
  it('Test click event', () => {
    let mockCallBack = jest.fn();

    let button = shallow(<ButtonReset
      onClick={ mockCallBack }
      snippets={{}} />);
    button.find('BigButton').simulate('click');

    expect(mockCallBack).toHaveBeenCalled();
  });
});
