import React from 'react';
import { shallow } from 'enzyme';

import {
  HashRouter,
  Route,
} from 'react-router-dom';

import FeedbackPrompt from '../components/prompts/FeedbackPrompt';

test('A feedback prompt should match the snapshot', () => {
  let isBlocking = true;

  let promptData = {
    header:    'Test prompt data',
    leaveText: 'Reset',
  };

  const wrapper = shallow(
    <FeedbackPrompt
    { ...promptData }
    isBlocking={ isBlocking }
    openFeedback={ jest.fn() } />
  )
  expect(wrapper).toMatchSnapshot();
});
