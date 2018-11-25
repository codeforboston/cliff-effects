import React from 'react';
import { mount } from 'enzyme';

import { CurrentExpensesStep } from '../../forms/CurrentExpenses';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';


const translations = getTextForLanguage(`en`);
test('Expenses step component should render without error', () => {
  const navData = {
          left:   (<div>Exp left</div>),
          middle: null,
          right:  (<div>Exp right</div>),
        },
        updateClientValue = jest.fn(),
        saveForm          = jest.fn(),
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formTranslations  = translations.visitPage.currentExpenses;

  expect(() => {
    mount(
      <CurrentExpensesStep
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
