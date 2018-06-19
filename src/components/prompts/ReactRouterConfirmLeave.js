import React from 'react';
import { Prompt } from 'react-router-dom';

/**
 * Customize React Router on leave/unmount prompt to use <OnLeavePrompt>
 *
 * Hijacks history to show a modal first before
 * letting history take its course.
 * 
 * @param props {object}
 * @param props.askForFeedback {function}
 * @param props.message {string} - Passed indirectly to <OnLeavePrompt>
 * @param props.confirmer {object} - For hijacking history
 * @param props.isBlocking {boolean} - Whether this prompt should be shown
 * 
 * @see OnLeavePrompt
 * @see getUserConfirmation
 */
class ReactRouterConfirmLeave extends React.Component {
  componentDidMount() {
    var { confirmer, askForFeedback } = this.props;

    const confirm = (message, callback) =>
    {return askForFeedback(callback, { message: message });};
    confirmer.set(confirm);
  }

  componentWillUnmount() {
    this.props.confirmer.unset();
  }

  render() {
    const { isBlocking, ...rest } = this.props;
    return <Prompt
      when={ isBlocking }
      { ...rest } />;
  }
}

export default ReactRouterConfirmLeave;
