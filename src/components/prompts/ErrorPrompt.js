import React from 'react';

/**
 * Prompt for latest uncaught error.
 * @extends React.Component
 *
 * @param props {object}
 * @param props.callback {onLeaveCallback}
 * @param props.askForFeedback {function}
 */
class ErrorPrompt extends React.Component {
  handleError = ({ error }) => {
    var promptData = {
      header:    'There was an unexpected error. Do you want to submit feedback?',
      leaveText: 'Reset',
    };

    const { callback, askForFeedback } = this.props;
    askForFeedback(callback, promptData);
  };

  componentDidMount() {
    window.addEventListener('error', this.handleError);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError);
  }

  render() {
    return null;
  }
}

export default ErrorPrompt;
