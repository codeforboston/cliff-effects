import React from 'react';

/**
 * Download prompt for latest uncaught error.
 * @extends React.Component
 * 
 * @param props {object}
 * @param props.client {object}
 * @param props.prompt {prompt}
 */
class DownloadErrorPrompt extends React.Component {
  static message = 'There was an unexpected error. Would you like to reload the page?';

  handleError = ({ error }) => {
    const { callback, client, prompt } = this.props;
    const { message } = DownloadErrorPrompt;
    const data = {
      client: client,
      error: {
        message: error.message,
        stack: error.stack
      }
    };
    prompt(callback, data, message);
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

export default DownloadErrorPrompt;
