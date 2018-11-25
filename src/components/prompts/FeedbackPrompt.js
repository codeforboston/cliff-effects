import React from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';

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
class FeedbackPrompt extends React.Component {
  leave = (event) => {
    event.preventDefault();
    this.props.callback(true);
  };

  stay = (event) => {
    event.preventDefault();
    this.props.callback(false);
  };

  render() {
    const {
      isBlocking,
      header,
      message,
      open,
      leaveText,
      stayText,
      openFeedback,
    } = this.props;

    // If the user hasn't interacted with the form at all
    if (!isBlocking) {
      // just go ahead and leave without displaying prompt
      return null;
    }

    // Otherwise, set up the prompt
    let realLeave   = leaveText || `Leave`,
        realStay    = stayText || `Cancel`,
        realMessage = message;
    if (message === `default`) {
      realMessage = `Clicking "${realLeave}" will erase the information you have put into the form. Do you want to tell us something about the app first? That information could help us. You will still be able to come back and click "${realLeave}" afterwards.`;
    }

    return (
      <Modal
        mountNode = { document.getElementById(`App`) }
        open      = { open }>
        <Modal.Header>{header || `Do you want to tell us more before you click "${realLeave}"?`}</Modal.Header>
        <Modal.Content>
          <p>{ realMessage }</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ this.stay }>{ realStay }</Button>
          <Button onClick={ this.leave }>{ realLeave }</Button>
          <Button
            onClick = { openFeedback }
            primary>
            Tell Us More
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
};  // Ends <FeedbackPrompt>

export { FeedbackPrompt };
