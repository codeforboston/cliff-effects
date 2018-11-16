import React from 'react';
import renderer from 'react-test-renderer';

import { BenefitsTable } from '../../../forms/output/BenefitsTable';
import { snippets } from '../../helpers';

import createReducer from '../../../reducers';
import { setHasBenefit, setCashValue } from '../../../actions';

const reducer = createReducer();

const buildSnapshot = (state) => {
  const rendered = renderer.create(
    <BenefitsTable 
      client={ state.get('client') } 
      snippets={ snippets } />
  );

  return rendered.toJSON();
};

test('Benefits table renders correctly', () => {
  let state = reducer(undefined, {});

  expect(buildSnapshot(state)).toMatchSnapshot();

  state = [
    setHasBenefit({
      time:    'current',
      benefit: 'snap',
      value:   true,
    }),
  ].reduce(reducer, state);

  state = reducer(
    state,
    setHasBenefit({
      time:    'current',
      benefit: 'snap',
      value:   true,
    })
  );

  expect(buildSnapshot(state)).toMatchSnapshot();

  state = reducer(
    state,
    setCashValue({
      time:  'current',
      name:  'earned',
      value: 100,
    })
  );
  expect(buildSnapshot(state)).toMatchSnapshot();

  state = reducer(
    state,
    setCashValue({
      time:  'future',
      name:  'earned',
      value: 200,
    })
  );
  expect(buildSnapshot(state)).toMatchSnapshot();

  state = reducer(
    state,
    setCashValue({
      time:  'current',
      name:  'earned',
      value: 300,
    })
  );
  expect(buildSnapshot(state)).toMatchSnapshot();

  state = reducer(
    state,
    setCashValue({
      time:  'future',
      name:  'earned',
      value: 400,
    })
  );
  expect(buildSnapshot(state)).toMatchSnapshot();
});
