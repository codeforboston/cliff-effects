import React from 'react';
import { shallow } from 'enzyme';

import { PredictionsStep } from '../../forms/Predictions';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';
import snippets from '../../localization/en.js';

test('Prediction component renders as snapshot correctly', () => {
  const navData = {
          left:   { text: 'Previous', onClick: jest.fn() },
          middle: null,
          right:  { text: 'New Client', onClick: jest.fn() },
        },
        updateClientValue     = jest.fn(),
        saveForm         = jest.fn(),
        askToResetClient = jest.fn(),
        openFeedback     = jest.fn(),
        formSnippets     = snippets.visitPage.predictions;

  const wrapper = shallow(
    <PredictionsStep
      currentStep       = { 5 }
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
