import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { StackedAreaGraph } from '../../../forms/output/StackedAreaGraph';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

jest.mock('react-chartjs-2', () => {
  const LineMock = () => {
    return null;
  };

  return {
    Line(props) {
      return <LineMock { ...props } />;
    },
  };
});

describe('<StackedAreaGraph>', () => {
  let activePrograms;
  let client;
  let defaultProps;

  const buildGraph = () => {
    return mount(<StackedAreaGraph { ...defaultProps } />);
  };

  beforeEach(() => {
    activePrograms = [];
    client = cloneDeep(CLIENT_DEFAULTS);
    defaultProps = {
      activePrograms: activePrograms,
      client:         client,
      timescale:      'Monthly',
    };
  });

  it('renders with snap and current earned less than future earned', () => {
    activePrograms.push('snap');
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with snap and current earned greater than future earned', () => {
    activePrograms.push('snap');
    set(client, 'current.earned', 200);
    set(client, 'future.earned', 100);
    
    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with section8', () => {
    activePrograms.push('section8');
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });

  it('renders with both snap and section8', () => {
    activePrograms.push('snap');
    activePrograms.push('section8');
    set(client, 'current.earned', 100);
    set(client, 'future.earned', 200);

    expect(buildGraph()).toMatchSnapshot();
  });
});
