import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep, set } from 'lodash';

import { BenefitsLineGraph } from '../../../forms/output/BenefitsLineGraph';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

jest.mock('react-chartjs-2', () => {
  const LineMock = () => null;

  return {
    Line(props) {
      return <LineMock {...props} />;
    },
  };
});

describe('<BenefitsLineGraph>', () => {
  let activePrograms;
  let client;
  let defaultProps;

  const buildGraph = () => mount(<BenefitsLineGraph {...defaultProps} />);

  beforeEach(() => {
    activePrograms = [];
    client = cloneDeep(CLIENT_DEFAULTS);
    defaultProps = {
      activePrograms: activePrograms,
      client: client,
      timescale: 'Monthly',
      className: 'some-class',
    };
  });
  
  it('renders message when no benefits selected', () => {
    const graph = buildGraph();

    expect(graph.children).toHaveLength(1);
    expect(graph.childAt(0).is('Message')).toBe(true);
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
