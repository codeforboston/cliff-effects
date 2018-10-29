import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { StackedBarGraph } from '../../../forms/output/StackedBarGraph';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

jest.mock('react-chartjs-2', () => {
  const BarMock = () => {
    return null;
  };

  return {
    Bar(props) {
      return <BarMock { ...props } />;
    },
  };
});

describe('<StackedBarGraph>', () => {
  let client;

  const buildGraph = () => {
    return mount(<StackedBarGraph client={ client } />);
  };

  beforeEach(() => {
    client = cloneDeep(CLIENT_DEFAULTS);
  });

  it('renders with snap and current earned less than future earned', () => {
    set(client, 'current.hasSnap', true);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with snap and current earned greater than future earned', () => {
    set(client, 'current.hasSnap', true);
    set(client, 'current.earned', 200);
    set(client, 'future.earned', 100);
    
    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with section8', () => {
    set(client, 'current.hasSection8', true);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with both snap and section8', () => {
    set(client, 'current.hasSnap', true);
    set(client, 'current.hasSection8', true);
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });
});
