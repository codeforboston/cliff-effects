import React from 'react';
import { mount } from 'enzyme';

import { CurrentIncomeStep } from '../../forms/CurrentIncome';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


const snippets = getTextForLanguage(`en`);
test('Income step component should render without error', () => {
  const navData = {
          left:   (<div>Inc left</div>),
          middle: null,
          right:  (<div>Inc right</div>),
        },
        updateClientValue = jest.fn(),
        saveForm          = jest.fn(),
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formSnippets      = snippets.visitPage.currentIncome;

  expect(() => {
    mount(
      <CurrentIncomeStep
        client            = { CLIENT_DEFAULTS }
        navData           = { navData }
        updateClientValue = { updateClientValue }
        saveForm          = { saveForm }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        snippets          = { formSnippets } />
    );
  }).not.toThrow();
});
