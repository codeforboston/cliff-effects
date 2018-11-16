import React from 'react';
import { mount } from 'enzyme';

import { BenefitsLineGraph } from '../../../forms/output/BenefitsLineGraph';

import createReducer from '../../../reducers';
import { setHasBenefit, setCashValue } from '../../../actions';

const reducer = createReducer();

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

describe('<BenefitsLineGraph>', () => {
  let activePrograms;
  let defaultProps;

  const buildGraph = (state) => {
    return mount(<BenefitsLineGraph
      { ...defaultProps }
      client={ state.get('client') } />);
  };

  beforeEach(() => {
    activePrograms = [];
    defaultProps = {
      activePrograms: activePrograms,
      timescale:      'Monthly',
      className:      'some-class',
    };
  });
  
  it('renders message when no benefits selected', () => {
    const state = reducer(undefined, {});

    const graph = buildGraph(state);

    expect(graph.children).toHaveLength(1);
    expect(graph.childAt(0).is('Message')).toBe(true);
  });

  it('renders with snap and current earned less than future earned', () => {
    activePrograms.push('snap');

    const state = [
      setHasBenefit({
        time:    'current',
        benefit: 'snap',
        value:   true,
      }),

      setCashValue({
        time:  'current',
        name:  'earned',
        value: 100,
      }),

      setCashValue({
        time:  'future',
        name:  'earned',
        value: 200,
      }),
    ].reduce(reducer, undefined);

    expect(buildGraph(state)).toMatchSnapshot();
  });

  it('renders with snap and current earned greater than future earned', () => {
    activePrograms.push('snap');

    const state = [
      setHasBenefit({
        time:    'current',
        benefit: 'snap',
        value:   true,
      }),

      setCashValue({
        time:  'current',
        name:  'earned',
        value: 200,
      }),

      setCashValue({
        time:  'future',
        name:  'earned',
        value: 100,
      }),
    ].reduce(reducer, undefined);

    expect(buildGraph(state)).toMatchSnapshot();
  });

  it('renders with section8', () => {
    activePrograms.push('section8');

    const state = [
      setHasBenefit({
        time:    'current',
        benefit: 'section8',
        value:   true,
      }),

      setCashValue({
        time:  'current',
        name:  'earned',
        value: 100,
      }),

      setCashValue({
        time:  'future',
        name:  'earned',
        value: 200,
      }),
    ].reduce(reducer, undefined);

    expect(buildGraph(state)).toMatchSnapshot();
  });

  it('renders with both snap and section8', () => {
    activePrograms.push('snap');
    activePrograms.push('section8');

    const state = [
      setHasBenefit({
        time:    'current',
        benefit: 'snap',
        value:   true,
      }),

      setHasBenefit({
        time:    'current',
        benefit: 'section8',
        value:   true,
      }),

      setCashValue({
        time:  'current',
        name:  'earned',
        value: 100,
      }),

      setCashValue({
        time:  'future',
        name:  'earned',
        value: 200,
      }),
    ].reduce(reducer, undefined);

    expect(buildGraph(state)).toMatchSnapshot();
  });
});
