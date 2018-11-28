import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { ResourcesColumns } from '../../../forms/output/ResourcesColumns';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

// Skipping till highcharts testing is worked out
describe.skip('<ResourcesColumns>', () => {
  let client;

  const buildGraph = () => {
    return mount(<ResourcesColumns client={ client } />);
  };

  beforeEach(() => {
    client = cloneDeep(CLIENT_DEFAULTS);
  });

  it('renders with snap and current earned less than future earned', () => {
    const benefits = [ 'snap' ];

    set(client, 'current.benefits', benefits);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with snap and current earned greater than future earned', () => {
    const benefits = [ 'snap' ];

    set(client, 'current.benefits', benefits);
    set(client, 'current.earned', 200);
    set(client, 'future.earned', 100);
    
    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with section8', () => {
    const benefits = [ 'section8' ];

    set(client, 'current.benefits', benefits);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with both snap and section8', () => {
    const benefits = [
      'snap',
      'section8',
    ];

    set(client, 'current.benefits', benefits);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });
});
