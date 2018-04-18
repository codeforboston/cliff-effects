import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

/**
 * Called with result of user interaction with on leave modal.
 * Receives true if the user chose to leave,
 * or false if the user chose to stay.
 *
 * @callback onLeaveCallback
 * @param ok {boolean} - Result of result of user interaction.
 */

/**
 * Modal with three options: stay, leave, or submit feedback;
 *
 * @param props {object}
 * @param props.callback {onLeaveCallback}
 * @param props.message {string}
 * @param props.open {boolean} - Whether the modal is visible.
 * @param props.isBlocking {boolean} - A secondary flag to control modal visibility.
 * @param props.leaveText {string}
 * @param props.stayText {string}
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
    const { isBlocking, header, message, open, leaveText, stayText } = this.props;

    // If the user hasn't interacted with the form at all
    if ( !isBlocking ) {
      // just go ahead and leave without displaying prompt
      return null;
    }

    // Otherwise, set up the prompt
    var realLeave   = leaveText || 'Leave',
        realStay    = stayText || 'Stay',
        realMessage = message;
    if ( message === 'default' ) {
       realMessage =  'Selecting "' + realLeave + '" will erase the information you have put into the form. ' +
                      'You will still be able to click it after submitting feedback.';
     }

    return (
      <Modal open={open}>
        <Modal.Header>{header || `Do you want to give feedback before you ${realLeave.toLowerCase()}?`}</Modal.Header>
        <Modal.Content>
          <p> {realMessage} </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.leave}>{realLeave}</Button>
          <Button onClick={this.stay}>{realStay}</Button>
          <Button onClick={this.props.feedbackPrompt} primary>Submit Feedback</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OnLeavePrompt;
