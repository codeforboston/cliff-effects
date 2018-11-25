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
 * @param {object} snippets - object containing localization snippets
 */
class PredictionsWarningComp extends Component {
  
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

  render() {
  
    const {
      termsAccepted,
      snippets,
    } = this.props;

    return (
      <Modal
        id                 = { `WarningModal` }
        mountNode          = { document.getElementById(`App`) }
        size               = { `large` }
        open               = { !termsAccepted }
        closeOnDimmerClick = { false }
        closeOnEscape      = { false }>

        <Modal.Header>{ snippets.i_header }</Modal.Header>
        
        <Modal.Content scrolling>

          { snippets.i_warning } 

          <h4>{ snippets.i_formInstructions }</h4>

          <div
            className = { `radio-yes-no` }
            key       = { `ReqCkBx1` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox1 }
                name    = { `checkbox1` }
                onClick = { () => { return this.handleChange(`checkbox1`); } } />
            </Form.Field>
            <Form.Field>{ snippets.i_checkboxLabel1 }</Form.Field>
          </div>

          <div
            className = { `radio-yes-no` }
            key       = { `ReqCkBx2` }>
            <Form.Field>
              <Checkbox
                checked = { this.state.Checkbox2 }
                name    = { `checkbox2` }
                onClick = { () => { return this.handleChange(`checkbox2`); } } />
            </Form.Field>
            <Form.Field>{ snippets.i_checkboxLabel2 }</Form.Field>
          </div>
         
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ () => { return this.closeModal(false); } }>
            { snippets.i_buttonCancel }
          </Button>
          <Button
            disabled = { !this.allowContinue() }
            onClick  = { () => { return this.closeModal(true); } }
            color    = { `teal` }>
            { snippets.i_buttonAcceptWarning }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // Ends return()
  }; // Ends render()
};

const PredictionsWarning = withRouter(PredictionsWarningComp);


export { PredictionsWarning };
