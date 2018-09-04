import React from 'react';
import renderer from 'react-test-renderer';

import { BenefitsTable } from '../../forms/output/BenefitsTable';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';
import snippets from '../../localization/en.js'

test('Benefits table renders correctly', () => {
  const rendered = renderer.create(
    <BenefitsTable 
    client={ CLIENT_DEFAULTS } 
    snippets={ snippets.visitPage.predictions.benefitsTable }/>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
