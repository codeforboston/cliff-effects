import React from 'react';
import { mount } from 'enzyme';


import { FeedbackPrompt } from '../../../components/prompts/FeedbackPrompt';

test(`<FeedbackPrompt> renders`, () => {
  let isBlocking = true;

  let promptData = {
    header:    'Test prompt data',
    leaveText: 'Reset',
  };

  expect(() => {
    mount(
      <FeedbackPrompt
        { ...promptData }
        isBlocking={ isBlocking }
        openFeedback={ jest.fn() } />
    );
  }).not.toThrow();
});
