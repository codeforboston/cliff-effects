import React from 'react';
import { Prompt } from 'react-router-dom';

// React Router <Prompt> customization shenanigans
import * as getUserConfirmation from '../utils/getUserConfirmation';

/**
 * Customize React Router on leave prompt to use <OnLeavePrompt>
 * 
 * @param props {object}
 * @param props.prompt {function}
 * @param props.message {string} - Passed on to <OnLeavePrompt>
 * 
 * @see OnLeavePrompt
 * @see getUserConfirmation
 */
class ReactRouterConfirmLeave extends React.Component {
  componentDidMount() {
    const confirm = (message, callback) =>
      this.props.prompt(callback, { message: message });
    getUserConfirmation.set(confirm);
  }

  componentWillUnmount() {
    getUserConfirmation.unset();
  }

  render() {
    return <Prompt {...this.props} />;
  }
}

export default ReactRouterConfirmLeave;
