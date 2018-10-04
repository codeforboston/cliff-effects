import React, { Component } from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';

/**
 * Displays a model that requires the user to accept the terms and conditions before using the app
 * @extends React.Component
 * @param {boolean} termsAccepted - boolean indicating whether terms and conditions have been accepted by the user
 * @param {function} toggleAcceptTerms - function to set the termsAccepted in app state
 * @param {object} snippets - object containing localization snippets
 */
class TermsAndConditions extends Component {
  
  state = { showPrivacy: false };

  closeModal = () => {
    this.props.toggleAcceptTerms();
  };

  togglePrivacy = () => {
    let showPrivacy = !this.state.showPrivacy;
    this.setState({ showPrivacy });
  };

  renderTerms = ({ i_header, i_terms }) => {
    return (
      <div>
        <h4>{ i_header }</h4>
        {
          i_terms.map((term) => {
            return <p key={ `p_${term.key}` }>{ term }</p>;
          })
        }
      </div>
    );
  }

  render() {

    const {
      termsAccepted,
      snippets,
    } = this.props;

    return (
      <Modal
        id={ `WarningModal` }
        size='large'
        open={ !termsAccepted }
        onClose={ this.closeModal }
        closeOnDimmerClick={ false }
        closeOnEscape={ false }>
        <Modal.Header> 
          {/* className={ classes.modalHeader } */}
          Terms and Conditions
        </Modal.Header>
        <Modal.Content scrolling>
          {
            !this.state.showPrivacy ?
              this.renderTerms(snippets.termsOfUse) :
              this.renderTerms(snippets.privacyAndCookies)
          } 
        </Modal.Content>
        <Modal.Actions>
          {
            !this.state.showPrivacy ?
              <Button
                onClick={ this.closeModal }
                color='red'>
                { snippets.i_buttonAcceptTerms }
              </Button> :
              null
          }
          <Button
            onClick={ this.togglePrivacy }>
            { this.state.showPrivacy ? snippets.i_buttonBackToTerms : snippets.i_buttonViewPrivacy }
          </Button>
        </Modal.Actions>
      </Modal>
    ); // End return()
  } // End render()
};

export default TermsAndConditions;
