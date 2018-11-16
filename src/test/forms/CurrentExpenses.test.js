import React from 'react';
import { mount } from 'enzyme';

import { CurrentExpensesStep } from '../../forms/CurrentExpenses';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';

import createReducer from '../../reducers';

const NO_OP = () => {};

const snippets = getTextForLanguage(`en`);
test('Expenses step component should render without error', () => {
  const navData = {
          left:   (<div>Exp left</div>),
          middle: null,
          right:  (<div>Exp right</div>),
        },
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formSnippets      = snippets.visitPage.currentExpenses;
  
  const reducer = createReducer();

  const state = reducer(undefined, {});

  expect(() => {
    mount(
      <CurrentExpensesStep
        currentClient         = { state.getIn([
          'client',
          'current', 
        ]) }
        navData               = { navData }
        askToResetClient      = { askToResetClient }
        openFeedback          = { openFeedback }
        setExpenseValue       = { NO_OP }
        setHousingType        = { NO_OP }
        setPaysUtility        = { NO_OP }
        setGetsFuelAssistance = { NO_OP }
        snippets              = { formSnippets } />
    );
  }).not.toThrow();
});
