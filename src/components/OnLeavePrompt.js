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
    const { data, header, message, open, leaveText, stayText } = this.props;
    const { downloaded } = this.state;

    var realLeave = leaveText || 'Leave',
        realStay  = stayText || 'Stay';

    return (
      <Modal open={open}>
        <Modal.Header>{header || 'Do you want to download the anonymized data?'}</Modal.Header>
        <Modal.Content>
          <p>
            If you are giving feedback or reporting a bug, please use the download button first to download an anoymized version of the data, then attach that downloaded file to the email you send to andrew@codeforboston.org.
          </p>
          <p>
            {message || 'Selecting "' + realLeave + '" will erase the information you have put into the form. You will still be able to click it after downloading.'}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.leave}>{realLeave}</Button>
          <Button onClick={this.stay}>{realStay}</Button>
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
