import React from 'react';
import renderer from 'react-test-renderer';
import { cloneDeep, set } from 'lodash';

import { BenefitsTable } from '../../../forms/output/BenefitsTable';
import { snippets } from '../../helpers';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

const buildSnapshot = (client) => {
  const rendered = renderer.create(
    <BenefitsTable 
      client={ client } 
      snippets={ snippets } />
  );

  return rendered.toJSON();
};

test('Benefits table renders correctly', () => {
  const client = cloneDeep(CLIENT_DEFAULTS);
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'current.hasSnap', true);
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'current.earned', 100);
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'future.earned', 200);
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'current.earned', 300);
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'current.hasSection8');
  expect(buildSnapshot(client)).toMatchSnapshot();

  set(client, 'future.earned', 400);
  expect(buildSnapshot(client)).toMatchSnapshot();
});
