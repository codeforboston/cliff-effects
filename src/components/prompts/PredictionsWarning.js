import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Modal,
} from 'semantic-ui-react';


/**
 * Displays a model that requires the user to accept the terms and conditions before using the app
 * @extends React.Component
 * @param {boolean} termsAccepted - boolean indicating whether terms and conditions have been accepted by the user
 * @param {function} toggleDistrustConfirmed - function to set the termsAccepted in app state
 * @param {object} translations - object containing translations
 */
class PredictionsWarning extends Component {
  
  state = { 
    checkbox1: false,
    checkbox2: false,
  };

  handleChange = (checkboxField) => {
    let checked = !this.state[ checkboxField ];
    this.setState({ [ checkboxField ]: checked });
  };

  allowContinue = () => {
    let {
      checkbox1,
      checkbox2,
    } = this.state;
    return (checkbox1 === true && checkbox2 === true);
  };

  closeModal = (accept) => {
    if (accept) {
      this.props.toggleDistrustConfirmed();
    } else {
      this.props.history.push(`/`);
    }
  };

  clickHandlerBox1 = () => {
    return this.handleChange(`checkbox1`);
  };

  clickHandlerBox2 = () => {
    return this.handleChange(`checkbox2`);
  };

  cancelHandler = () => {
    return this.closeModal(false);
  };

  acceptHandler = () => {
    return this.closeModal(true);
  };

  render() {
  
    const {
      termsAccepted,
      translations,
    } = this.props;

    return (
      <Modal
        id                 = { `WarningModal` }
        mountNode          = { document.getElementById(`App`) }
        size               = { `large` }
        open               = { !termsAccepted }
        closeOnDimmerClick = { false }
        closeOnEscape      = { false }>

        <Modal.Header>{ translations.i_header }</Modal.Header>

        <Modal.Content scrolling>

          { translations.i_warning } 

          <h4>{ translations.i_formInstructions }</h4>

          <div
            className = { `radio-yes-no` }
            key       = { `ReqCkBx1` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox1 }
                name    = { `checkbox1` }
                onClick = { this.clickHandlerBox1 } />
            </Form.Field>
            <Form.Field>{ translations.i_checkboxLabel1 }</Form.Field>
          </div>

          <div
            className = { `radio-yes-no` }
            key       = { `ReqCkBx2` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox2 }
                name    = { `checkbox2` }
                onClick = { this.clickHandlerBox2 } />
            </Form.Field>
            <Form.Field>{ translations.i_checkboxLabel2 }</Form.Field>
          </div>
         
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ this.cancelHandler }>
            { translations.i_buttonCancel }
          </Button>
          <Button
            disabled = { !this.allowContinue() }
            onClick  = { this.acceptHandler }
            color    = { `teal` }>
            { translations.i_buttonAcceptWarning }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // ends return()
  }; // Ends render()
};  // Ends <PredictionsWarning>

const wrappedWarning = withRouter(PredictionsWarning);


export { wrappedWarning as PredictionsWarning };
