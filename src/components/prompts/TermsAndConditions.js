import React from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';

// import * as classes from './TermsAndConditions.css';

/**
 * Modal that shows the feedback form.
 */
const TermsAndConditions = (props) => {

  const closeModal = () => {
    console.log('closeModal()');
    props.toggleAcceptTerms();
  };

  const {
    termsAccepted,
    snippets,
  } = props;

  return (
    <Modal
      size='large'
      open={ !termsAccepted }
      onClose={ closeModal }
      closeOnDimmerClick={ false }
      closeOnEscape={ false } >
      <Modal.Header> 
        {/* className={ classes.modalHeader } */}
        Terms and Conditions
      </Modal.Header>
      <Modal.Content scrolling>
        { snippets.i_termsOfUse } 
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={ closeModal }
          color='red'>
          Accept
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TermsAndConditions;
// export { AskPermission };
