import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { PlainRentRow } from '../../../forms/rentFields';

describe('<PlainRentRow>', () => {
  it('renders', () => {
    const props = {
      timeState:         cloneDeep(CLIENT_DEFAULTS.current),
      updateClientValue: jest.fn(),
    };
    expect(() => {
      mount(<PlainRentRow { ...props } />);
    }).not.toThrow();
  });
});
