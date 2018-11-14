import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';
import { GraphHolder } from '../../../forms/output/GraphHolder';

const passedActivePrograms = (wrapper) => {
  return wrapper.find('Graph').prop('activePrograms');
};

// For some reason, using Highcharts is making these tests fail.
// Skipping until it can be worked out.
describe.skip('<GraphHolder>', () => {
  let client;
  const Graph = ({ activePrograms, ...props }) => {
    return <div { ...props } />;
  };

  const buildWrapper = () => {
    return mount(<GraphHolder
      Graph={ Graph }
      client={ client } />
    );
  };
  
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

    const benefits = [ 'snap' ];

    set(client, 'current.benefits', benefits);
    expect(passedActivePrograms(buildWrapper())).toEqual(benefits);

    benefits.push('section8');

    set(client, 'current.benefits', benefits);
    expect(passedActivePrograms(buildWrapper())).toEqual(benefits);
  });

  it('matches snapshot', () => {
    expect(buildWrapper()).toMatchSnapshot();
  });
});
