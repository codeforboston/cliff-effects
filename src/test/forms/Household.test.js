import React from 'react';
import { mount } from 'enzyme';

import { HouseholdStep } from '../../forms/Household';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


const translations = getTextForLanguage(`en`);
test('Household step component should render without error', () => {
  const navData = {
          left:   (<div>House left</div>),
          middle: null,
          right:  (<div>House right</div>),
        },
        updateClientValue = jest.fn(),
        saveForm          = jest.fn(),
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formTranslations  = translations.visitPage.household;

  expect(() => {
    mount(
      <HouseholdStep
        client            = { CLIENT_DEFAULTS }
        navData           = { navData }
        updateClientValue = { updateClientValue }
        saveForm          = { saveForm }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        translations      = { formTranslations } />
    );
  }).not.toThrow();
});
