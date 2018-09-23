import React from 'react';
import renderer from 'react-test-renderer';

import { BenefitsTable } from '../../forms/output/BenefitsTable';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


var snippets = getTextForLanguage(`en`);
test('Benefits table renders correctly', () => {
  const rendered = renderer.create(
    <BenefitsTable 
      client={ CLIENT_DEFAULTS } 
      snippets={ snippets.visitPage.predictions } />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
