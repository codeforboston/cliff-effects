import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { GraphHolder } from '../../../forms/output/GraphHolder';

const passedActivePrograms = wrapper => wrapper.find('Graph').prop('activePrograms');

describe('<GraphHolder>', () => {
  let client;
  const Graph = ({ activePrograms, ...props}) => <div {...props} />;

  const buildWrapper = () => mount(<GraphHolder Graph={Graph} client={client} />);
  
  beforeEach(() => {
    client = cloneDeep(CLIENT_DEFAULTS);
  });

  it('selects timescale with buttons', () => {
    const wrapper = buildWrapper();
    expect(wrapper.state('activeID')).toEqual('Yearly');

    wrapper.find('Button#Weekly').simulate('click');
    expect(wrapper.state('activeID')).toEqual('Weekly');
  });

  it('adds selected programs to array', () => {
    expect(passedActivePrograms(buildWrapper())).toEqual([]);

    set(client, 'current.hasSnap', true);
    expect(passedActivePrograms(buildWrapper())).toEqual(['snap']);

    set(client, 'current.hasSection8', true);
    expect(passedActivePrograms(buildWrapper())).toEqual(['section8', 'snap']);
  });

  it('matches snapshot', () => {
    expect(buildWrapper()).toMatchSnapshot();
  });
});
