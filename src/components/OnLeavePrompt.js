import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import DownloadFile from './DownloadFile';

/**
 * Called with result of user interaction with on leave modal.
 * Receives true if the user chose to leave or downloads the data,
 * or false if the user chose to stay.
 * 
 * @callback onLeaveCallback
 * @param ok {boolean} - Result of result of user interaction.
 */

/**
 * Modal with three options: stay, leave, or download;
 * 
 * @param props {object}
 * @param props.callback {onLeaveCallback}
 * @param props.data {object}
 * @param props.message {string}
 * @param props.open {boolean} - Whether the modal is visible.
 */
class OnLeavePrompt extends React.Component {
  state = { downloaded: false };

  download = () => this.setState({ downloaded: true });

  leave = event => {
    event.preventDefault();
    this.props.callback(true);
  }
  stay = event => {
    event.preventDefault();
    this.props.callback(false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({ downloaded: false });
    }
  }

  render() {
    const { data, message, open } = this.props;
    const { downloaded } = this.state;

    return (
      <Modal open={open}>
        <Modal.Header>Do you want to leave this site?</Modal.Header>
        <Modal.Content>
          <p>{message || 'Are you sure you want to leave the page?'}</p>
          <p>
            Please include session data in support requests.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.leave}>Leave</Button>
          <Button onClick={this.stay}>Stay</Button>
          <Button
            as={DownloadFile}
            data={data}
            onClick={this.download}
            primary={!downloaded}
          >
            {downloaded ? 'Download again' : 'Download data'}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OnLeavePrompt;
