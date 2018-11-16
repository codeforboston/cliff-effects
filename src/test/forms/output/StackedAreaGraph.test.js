import React from 'react';
import { mount } from 'enzyme';

import { StackedAreaGraph } from '../../../forms/output/StackedAreaGraph';

import createReducer from '../../../reducers';
import { setCashValue } from '../../../actions';

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

describe('<StackedAreaGraph>', () => {
  let activePrograms;
  let defaultProps;

  const buildGraph = (state) => {
    return mount(<StackedAreaGraph
      { ...defaultProps }
      client = { state.get('client') } />);
  };

  beforeEach(() => {
    activePrograms = [];
    defaultProps = {
      activePrograms: activePrograms,
      timescale:      'Monthly',
    };
  });

  it('renders with snap and current earned less than future earned', () => {
    activePrograms.push('snap');

    const state = [
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
    activePrograms.push('snap', 'section8');

    const state = [
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
