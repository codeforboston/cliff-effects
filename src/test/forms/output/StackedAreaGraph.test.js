import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { StackedAreaGraph } from '../../../forms/output/StackedAreaGraph';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

jest.mock('react-chartjs-2', () => {
  const LineMock = () => null;

  return {
    Line(props) {
      return <LineMock {...props} />;
    },
  };
});

describe('<StackedAreaGraph>', () => {
  let activePrograms;
  let client;
  let defaultProps;

  const buildGraph = () => mount(<StackedAreaGraph {...defaultProps} />);

  beforeEach(() => {
    activePrograms = [];
    client = cloneDeep(CLIENT_DEFAULTS);
    defaultProps = {
      activePrograms: activePrograms,
      client: client,
      timescale: 'Monthly',
    };
  });

  it('matches snapshot', () => {
    expect(buildGraph()).toMatchSnapshot();

    activePrograms.push('snap');
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.earned', 100);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'future.earned', 200);
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'current.earned', 300);
    expect(buildGraph()).toMatchSnapshot();

    activePrograms.push('section8');
    expect(buildGraph()).toMatchSnapshot();

    set(client, 'future.earned', 400);
    expect(buildGraph()).toMatchSnapshot();
  });
});
