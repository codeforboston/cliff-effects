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
  leave = event => {
    event.preventDefault();
    this.props.callback(true);
  }
  stay = event => {
    event.preventDefault();
    this.props.callback(false);
  }

  render() {
    const { data, message, open } = this.props;

    return (
      <Modal open={open}>
        <Modal.Content>
          <p>{message || 'Are you sure you want to leave the page?'}</p>
          <p>
            Please include session data in support requests.
            {' '/* TODO: better way of adding horizontal space */}
            <DownloadFile data={data}>
              Download session data
            </DownloadFile>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.leave}>Leave</Button>
          <Button onClick={this.stay}>Stay</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OnLeavePrompt;
