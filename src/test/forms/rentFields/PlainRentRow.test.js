import React from 'react';
import { mount } from 'enzyme';

import { PlainRentRow } from '../../../forms/rentFields';

import createReducer from '../../../reducers';

const reducer = createReducer();

describe('<PlainRentRow>', () => {
  it('renders', () => {
    const state = reducer(undefined, {});

    const props = {
      timeState: state.getIn([
        'client',
        'current',
      ]),
      setValue: function() {},
    };
    expect(() => {
      mount(<PlainRentRow { ...props } />);
    }).not.toThrow();
  });
});
