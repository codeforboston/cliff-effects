import React from 'react';
import { mount } from 'enzyme';

import { CurrentIncomeStep } from '../../forms/CurrentIncome';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';

import createReducer from '../../reducers';


const snippets = getTextForLanguage(`en`);
test('Income step component should render without error', () => {
  const navData = {
          left:   (<div>Inc left</div>),
          middle: null,
          right:  (<div>Inc right</div>),
        },
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formSnippets      = snippets.visitPage.currentIncome;

  expect(() => {
    const reducer = createReducer();

    const state = reducer(undefined, {});

    mount(
      <CurrentIncomeStep
        currentClient     = { state.getIn([
          'client',
          'current', 
        ]) }
        setIncomeValue    = { () => {} }
        navData           = { navData }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        snippets          = { formSnippets } />
    );
  }).not.toThrow();
});
