import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Form,
  Modal,
  Radio,
} from 'semantic-ui-react';

/**
 * Displays a model that requires the user to accept the terms and conditions before using the app
 * @extends React.Component
 * @param {boolean} termsAccepted - boolean indicating whether terms and conditions have been accepted by the user
 * @param {function} toggleAcceptTerms - function to set the termsAccepted in app state
 * @param {object} snippets - object containing localization snippets
 */
class TermsAndConditions extends Component {
  
  state = { canCountOnPredictions: null };

  closeModal = (accept) => {
    if (accept) {
      this.props.toggleAcceptTerms();
    } else {
      this.props.history.push('/');
    }
  };

  handleChange = (canCountOnPredictions) => {
    this.setState({ canCountOnPredictions });
  };

  render() {
  
    const {
      termsAccepted,
      snippets,
    } = this.props;

    return (
      <Modal
        id={ `WarningModal` }
        mountNode = { document.getElementById('App') }
        size='large'
        open={ !termsAccepted }
        closeOnDimmerClick={ false }
        closeOnEscape={ false }>
        <Modal.Header> 
          { snippets.i_header }
        </Modal.Header>
        <Modal.Content scrolling>

          { snippets.i_warning } 

          <h4>{ snippets.i_formInstructions }</h4>

          <div className="radio-yes-no">
            <Form.Field>
              <Radio
                checked={ this.state.canCountOnPredictions === true }
                name="CanCountOn"
                onClick={ () => this.handleChange(true) } />
            </Form.Field>
            <Form.Field>
              { snippets.i_radioYesLabel }
            </Form.Field>
          </div>
         
          <div className="radio-yes-no">
            <Form.Field>
              <Radio
                checked={ this.state.canCountOnPredictions === false }
                name="CanCountOn"
                onClick={ () => this.handleChange(false) } />
            </Form.Field>
            <Form.Field>
              { snippets.i_radioNoLabel }
            </Form.Field>
          </div>
         
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={ () => this.closeModal(false) }>
            { snippets.i_buttonCancel }
          </Button>
          <Button
            disabled={ this.state.canCountOnPredictions === false ? false : true }
            onClick={ () => this.closeModal(true) }
            color='teal'>
            { snippets.i_buttonAcceptWarning }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // End return()
  } // End render()
};

export default withRouter(TermsAndConditions);
