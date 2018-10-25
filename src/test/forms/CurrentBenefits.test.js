import React from 'react';
import { shallow } from 'enzyme';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


const snippets = getTextForLanguage(`en`);
test('Benefits step component renders as snapshot correctly', () => {
  const navData = {
          left:   null,
          middle: null,
          right:  { text: 'Next', onClick: jest.fn() },
        },
        updateClientValue     = jest.fn(),
        saveForm         = jest.fn(),
        askToResetClient = jest.fn(),
        openFeedback     = jest.fn(),
        formSnippets     = snippets.visitPage.currentBenefits;

  const wrapper = shallow(
    <CurrentBenefitsStep
      currentStep       = { 1 }
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
