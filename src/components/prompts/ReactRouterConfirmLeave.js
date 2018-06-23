import React from 'react';
import { Prompt } from 'react-router-dom';

/**
 * `<Prompt>` waits, invisible, till a user navigates
 * to another React 'page', then triggers the
 * `getUserConfirmation` prop that we gave it in
 * 'App.js'. The standard functionality is very
 * limited, though. Its component will only show
 * two buttons, etc. We keep it in our code, but
 * for this specific purpose, we temporarily
 * use this component's parent's callback with
 * custom data. The parent component can use 
 * that to decide what to do next.
 * 
 * @param props {object}
 * @param props.askForFeedback {function} - Right now we just trigger feedback
 * @param props.message {string} - Passed indirectly to `<OnLeavePrompt>`
 * @param props.confirmer {object} - For hijacking standard functionality
 * @param props.isBlocking {boolean} - If true, interrupt navigation
 * 
 * @see OnLeavePrompt
 * @see getUserConfirmation
 */
class ReactRouterConfirmLeave extends React.Component {
  componentDidMount() {

    var { confirmer, askForFeedback } = this.props;

    const tempConfirm = (message, callback) => {
      return askForFeedback(callback, { message: message });
    };
    // Temporarily use our custom function
    confirmer.set(tempConfirm);

  }

  componentWillUnmount() {
    // Restore React Router's standard functionality
    this.props.confirmer.unset();
  }

  render() {
    const { isBlocking, ...rest } = this.props;
    // This is invisible and waits for the user
    // to navigate to a different React Page/Route
    return <Prompt
      when={ isBlocking }
      { ...rest } />;
  }
}

export default ReactRouterConfirmLeave;
