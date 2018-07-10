import React from 'react';
import { shallow } from 'enzyme';

import FeedbackPrompt from '../components/prompts/FeedbackPrompt';

test('A feedback prompt should match the snapshot', () => {
  let isBlocking = true;

  let openFeedback = () => {
    this.setState({ feedbackFormRequested: true });
  };

  let promptData = {
    header:    'Test prompt data',
    leaveText: 'Reset',
  };

  const wrapper = shallow(
    <FeedbackPrompt
    { ...promptData }
    isBlocking={ isBlocking }
    openFeedback={ openFeedback } />
  )
  expect(wrapper).toMatchSnapshot();
});
