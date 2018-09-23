import React from 'react';
import { shallow } from 'enzyme';

import { CurrentIncomeStep } from '../../forms/CurrentIncome';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


var snippets = getTextForLanguage(`en`);

test('Income step component renders as snapshot correctly', () => {
  const navData = {
          left:   { text: 'Previous', onClick: jest.fn() },
          middle: null,
          right:  { text: 'Next', onClick: jest.fn() },
        },
        updateClientValue     = jest.fn(),
        saveForm         = jest.fn(),
        askToResetClient = jest.fn(),
        openFeedback     = jest.fn(),
        formSnippets     = snippets.visitPage.currentIncome;

  const wrapper = shallow(
    <CurrentIncomeStep
      currentStep       = { 3 }
      client            = { CLIENT_DEFAULTS }
      navData           = { navData }
      updateClientValue      = { updateClientValue }
      saveForm          = { saveForm }
      askToResetClient  = { askToResetClient }
      openFeedback      = { openFeedback }
      snippets          = { formSnippets } />
  );

  expect(wrapper).toMatchSnapshot();
});
