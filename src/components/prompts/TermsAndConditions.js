import React, { Component } from 'react';
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

  closeModal = () => {
    this.props.toggleAcceptTerms();
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
        onClose={ this.closeModal }
        closeOnDimmerClick={ false }
        closeOnEscape={ false }>
        <Modal.Header> 
          { snippets.i_header }
        </Modal.Header>
        <Modal.Content scrolling>

          { snippets.i_terms } 

          <h5>{ snippets.i_formHeader }</h5>

          <div className="radio-yes-no">
            <Form.Field>
              <Radio
                checked={ this.state.canCountOnPredictions === true }
                onClick={ () => this.handleChange(true) } />
            </Form.Field>
            <Form.Field>
              { snippets.i_fieldYesLabel }
            </Form.Field>
          </div>
         
          <div className="radio-yes-no">
            <Form.Field>
              <Radio
                checked={ this.state.canCountOnPredictions === false }
                onClick={ () => this.handleChange(false) } />
            </Form.Field>
            <Form.Field>
              { snippets.i_fieldNoLabel }
            </Form.Field>
          </div>
         
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={ this.state.canCountOnPredictions === false ? false : true }
            onClick={ this.closeModal }
            color='red'>
            { snippets.i_buttonAcceptTerms }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // End return()
  } // End render()
};

export default TermsAndConditions;
