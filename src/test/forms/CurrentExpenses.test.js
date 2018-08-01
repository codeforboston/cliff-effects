import React from 'react';
import { shallow } from 'enzyme';

import { CurrentExpensesStep } from '../../forms/CurrentExpenses';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';
import snippets from '../../localization/en.js';

test('Expenses step component renders as snapshot correctly', () => {
  const navData = {
          left:   { text: 'Previous', onClick: jest.fn() },
          middle: null,
          right:  { text: 'Next', onClick: jest.fn() },
        },
        updateClientValues     = jest.fn(),
        saveForm         = jest.fn(),
        askToResetClient = jest.fn(),
        openFeedback     = jest.fn(),
        formSnippets     = snippets.visitPage.currentExpenses;

  const wrapper = shallow(
    <CurrentExpensesStep
      currentStep       = { 4 }
      client            = { CLIENT_DEFAULTS }
      navData           = { navData }
      updateClientValues      = { updateClientValues }
      saveForm          = { saveForm }
      askToResetClient  = { askToResetClient }
      openFeedback      = { openFeedback }
      snippets          = { formSnippets } />
  );

  expect(wrapper).toMatchSnapshot();
});
