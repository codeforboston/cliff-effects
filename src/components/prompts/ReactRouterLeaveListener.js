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
 * @param props.askForFeedback {function} - Right now we always trigger feedback
 * @param props.confirmer {Confirmer} - For hijacking standard functionality
 * @param props.isBlocking {boolean} - If true, interrupt navigation
 * 
 * @see FeedbackPrompt
 * @see Confirmer
 */
class ReactRouterLeaveListener extends React.Component {
  componentDidMount() {

    let {
      confirmer,
      askForFeedback,
    } = this.props;

    const tempConfirm = (message, reactCallback) => {
      // `message` is passed indirectly to `<FeedbackPrompt>`
      return askForFeedback(reactCallback, { message: `default` });
    };
    // Temporarily use our custom function
    confirmer.set(tempConfirm);

  };

  componentWillUnmount() {
    // Restore React Router's standard functionality
    this.props.confirmer.unset();
  };

  getConfirmationMessage = (location) => {
    // Allow component consumer to determine whether to request
    // confirmation based on destination location
    if (typeof this.props.shouldRequestConfirmation === `function`) {
      if (!this.props.shouldRequestConfirmation({ location })) {
        return true;
      }
    }

    return `If you leave you'll lose this data. Are you sure you want to leave?`;
  };

  render() {
    const { isBlocking } = this.props;

    // This is always invisible and waits for the user
    // to navigate to a different React Page/Route.
    // This message doesn't usually show up, but sometimes does.
    return (
      <Prompt
        when    = { isBlocking }
        message = { this.getConfirmationMessage } />
    );
  };
};  // Ends <ReactRouterLeaveListener>

export { ReactRouterLeaveListener };
