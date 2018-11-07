import React from 'react';
import { mount } from 'enzyme';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


var snippets = getTextForLanguage(`en`);
test('Benefits step component should render without error', () => {
  const navData = {
          left:   null,
          middle: null,
          right:  (<div>CB right</div>),
        },
        updateClientValue = jest.fn(),
        saveForm          = jest.fn(),
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        benefitsSnippets  = snippets.visitPage.currentBenefits;

  expect(() => {
    mount(
      <CurrentBenefitsStep
        client            = { CLIENT_DEFAULTS }
        navData           = { navData }
        updateClientValue = { updateClientValue }
        saveForm          = { saveForm }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        snippets          = { benefitsSnippets } />
    );
  }).not.toThrow();
});
