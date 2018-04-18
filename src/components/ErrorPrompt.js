import React from 'react';

/**
 * Prompt for latest uncaught error.
 * @extends React.Component
 *
 * @param props {object}
 * @param props.callback {onLeaveCallback}
 * @param props.message {string}
 * @param props.prompt {prompt}
 */
class ErrorPrompt extends React.Component {
  handleError = ({ error }) => {
    const { callback, prompt, ...promptProps } = this.props;
    prompt(callback, promptProps);
  }

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
