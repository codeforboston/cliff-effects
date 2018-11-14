import React from 'react';
import { mount } from 'enzyme';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';

import createReducer from '../../reducers';


const snippets = getTextForLanguage(`en`);
test('Benefits step component should render without error', () => {
  const navData = {
          left:   null,
          middle: null,
          right:  (<div>CB right</div>),
        },
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        benefitsSnippets  = snippets.visitPage.currentBenefits;

  expect(() => {
    const reducer = createReducer();

    const state = reducer(undefined, {});

    mount(
      <CurrentBenefitsStep
        currentClient     = { state.getIn([
          'client',
          'current', 
        ]) }
        setHasBenefit     = { () => {} }
        navData           = { navData }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        snippets          = { benefitsSnippets } />
    );
  }).not.toThrow();
});
