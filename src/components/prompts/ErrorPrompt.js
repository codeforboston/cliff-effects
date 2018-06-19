import React from 'react';

/**
 * Prompt for latest uncaught error.
 * @extends React.Component
 *
 * @param props {object}
 * @param props.callback {function}
 * @param props.message {string}
 * @param props.askForFeedback {function}
 */
class ErrorPrompt extends React.Component {
  handleError = ({ error }) => {
    // Does `promptProps` need to be changed to `rest`?
    const { callback, askForFeedback, ...promptProps } = this.props;
    askForFeedback(callback, promptProps);
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
