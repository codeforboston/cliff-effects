import React from 'react';
import { Message } from 'semantic-ui-react';

import DownloadErrorData from './DownloadErrorData';

/**
 * Download prompt for latest uncaught error.
 * @extends React.Component
 * 
 * @param props {object}
 * @param props.client {object}
 */
class DownloadErrorPrompt extends React.Component {
  state = {
    error: null,
    visible: false
  };

  saveError = ({ error }) =>
    this.setState({ error: error, visible: true });

  hide = () => this.setState({ visible: false });

  componentDidMount() {
    window.addEventListener('error', this.saveError);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.saveError);
  }

  render() {
    const { client } = this.props;
    const { error, visible } = this.state;

    return visible &&
      <Message onDismiss={this.hide}>
        <Message.Header>There was an error!</Message.Header>
        <Message.Content>
          <DownloadErrorData client={client} error={error} />
        </Message.Content>
      </Message>;
  }
}

export default DownloadErrorPrompt;
