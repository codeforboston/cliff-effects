import React from 'react';
import renderer from 'react-test-renderer';

import { BenefitsTable } from '../../forms/BenefitsTable';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

test('Benefits table renders correctly', () => {
  const rendered = renderer.create(
    <BenefitsTable client={ CLIENT_DEFAULTS } />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
