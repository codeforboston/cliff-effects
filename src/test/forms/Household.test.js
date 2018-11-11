import React from 'react';
import { mount } from 'enzyme';

import { HouseholdStep } from '../../forms/Household';

// LOCALIZATION
import { getTextForLanguage } from '../../utils/getTextForLanguage';

import createReducer from '../../reducers';

const NO_OP = () => {};


var snippets = getTextForLanguage(`en`);
test('Household step component should render without error', () => {
  const navData = {
          left:   (<div>House left</div>),
          middle: null,
          right:  (<div>House right</div>),
        },
        saveForm          = jest.fn(),
        askToResetClient  = jest.fn(),
        openFeedback      = jest.fn(),
        formSnippets      = snippets.visitPage.household;
  
  const reducer = createReducer();
    
  const state = reducer(undefined, {});

  expect(() => {
    mount(
      <HouseholdStep
        household           = { state.getIn([
          'client',
          'current',
          'household', 
        ]) }
        setMemberAge        = { NO_OP }
        setMemberIsDisabled = { NO_OP }
        setMemberRole       = { NO_OP }
        removeMember        = { NO_OP }
        addMember           = { NO_OP }
        navData             = { navData }
        saveForm            = { saveForm }
        askToResetClient    = { askToResetClient }
        openFeedback        = { openFeedback }
        snippets            = { formSnippets } />
    );
  }).not.toThrow();
});
