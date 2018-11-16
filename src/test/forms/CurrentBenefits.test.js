import React from 'react';
import { mount } from 'enzyme';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';

import createReducer from '../../reducers';
import { setUSState } from '../../actions';

const reducer = createReducer();

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

    const state = reducer(
      undefined,
      setUSState({ state: 'MA' })
    );

    mount(
      <CurrentBenefitsStep
        currentClient     = { state.getIn([
          'client',
          'current', 
        ]) }
        USState           =  { state.getIn([
          'geography',
          'state',
        ]) }
        setHasBenefit     = { () => {} }
        navData           = { navData }
        askToResetClient  = { askToResetClient }
        openFeedback      = { openFeedback }
        snippets          = { benefitsSnippets } />
    );
  }).not.toThrow();
});
