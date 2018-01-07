import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import DownloadSessionData from './DownloadSessionData';

/**
 * Called with result of user interaction with on leave modal.
 * Receives true if user downloaded file or chose to stay,
 * or false if user chose to leave.
 * 
 * @callback onLeaveCallback
 * @param ok {boolean} - Result of result of user interaction.
 */

/**
 * Modal with three options: stay, leave, or download;
 * 
 * @param props {object}
 * @param props.callback {onLeaveCallback}
 * @param props.client {object}
 * @param props.open {boolean} - Whether the modal is visible.
 */
class OnLeavePrompt extends React.Component {
  leave = event => {
    event.preventDefault();
    this.props.callback(false);
  }
  stay = event => {
    event.preventDefault();
    this.props.callback(true);
  }

  render() {
    const { callback, client, open } = this.props;

    return (
      <Modal open={open}>
        <Modal.Content>
          <p>Are you sure you want to leave the page?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.leave}>Leave</Button>
          <Button onClick={this.stay}>Stay</Button>
          <Button
            as={DownloadSessionData}
            client={client}
            onClick={() => callback(true)}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OnLeavePrompt;
