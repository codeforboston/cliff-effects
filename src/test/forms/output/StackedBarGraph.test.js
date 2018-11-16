import React from 'react';
import { mount } from 'enzyme';

import { StackedBarGraph } from '../../../forms/output/StackedBarGraph';

import createReducer from '../../../reducers';
import { setHasBenefit, setCashValue } from '../../../actions';

const reducer = createReducer();

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
  const buildGraph = (state) => {
    return mount(<StackedBarGraph client={ state.get('client') } />);
  };

  it('renders with snap and current earned less than future earned', () => {
    /*
     * Break down what's happening here; we're applying a series of actions through the
     * reducer to create a state object. This is essentially what Redux does through dispatch().
     * The way a reducer function works (not unique to Redux) is that it takes at leat two arguments:
     * 
     *  function reducer(currentState, iteratorValue) {
     *    return changeCurrentState(currentState, iteratorValue);
     *  }
     * 
     * Each time through the loop, the function takes the return value of the previous iteration, and the
     * value being iterated, and returns some value, until it's done iterating, at which point it returns
     * the final return value. Since we're iterating over an array of actions, each time through the loop
     * the second argument will be an action. The reducer then takes that action, and the previous state,
     * and returns a new state. At the end of the iteration, we'll have a state object exactly as is Redux
     * had dispatched each of these actions in succession.
     */

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
    ].reduce(
      reducer,
      // Since we don't have an initial value, we have to pass `undefined` here; otherwise Javascript's
      // Array.reduce() uses the object being iterated over (in this case, the array of actions) as the initial value.
      undefined
    );

    expect(buildGraph(state)).toMatchSnapshot();
  });

  it('renders with snap and current earned greater than future earned', () => {
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
