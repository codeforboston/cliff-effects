import React from 'react';
import {
  Form,
  Radio,
  Modal,
  Button,
  Message,
} from 'semantic-ui-react';

// URL to direct requests to, from the Google Apps Script
const postUrl = 'https://script.google.com/macros/s/AKfycbyXYbemTPcqsdbmXITnjaNi-CkN85g5kKPrgzt4AS8ykT2jH6Zn/exec';


/**
 * Modal that asks for permission to store user data for debugging purposes
 */
class AskPermission extends React.Component {
  state = {
    submitType: null,
    submitting: false,
  };

  close = () => {
    this.setState({ submitFunc: null });
    this.props.closeAskPermission();
  };

  submit = (event) => {
    this.props.submit(event, this.state.submitType);
  };

  setSubmitType = (event, inputProps) => {
    this.setState({ submitType: inputProps.value });
  };

  // Return an array to take advantage of `Modal` styling
  render () {
    const { question, submitting } = this.props;
    const { submitType } = this.state;
    return ([
      <Modal.Content key={ `ask-permission-content` }>
        <p>{ question }</p>

        <Form.Field>
          <Radio
            name     = { `data-ask` }
            value    = { `withData` }
            label    = { `Yes` }
            checked  = { submitType === `withData` }
            onChange = { this.setSubmitType } />
        </Form.Field>
        <Form.Field>
          <Radio
            name     = { `data-ask` }
            value    = { `withoutData` }
            label    = { `No` }
            checked  = { submitType === `withoutData` }
            onChange = { this.setSubmitType } />
        </Form.Field>
      </Modal.Content>,
      <Modal.Actions key={ `ask-permission-actions` }>
        <Button
          onClick  ={ this.close }
          disabled ={ submitting }>Cancel
        </Button>
        <Button
          onClick  = { this.submit }
          loading  = { submitting }
          disabled = { submitType === null }
          color    ='teal'>
          { (submitType === `withData`) ? (
            `Send with my information`
          ) : (
            null
          ) }
          { (submitType === `withoutData`) ? (
            `Send without my information`
          ) : (
            null
          ) }
          { (submitType === null) ? (`Send`) : (null) }
        </Button>
      </Modal.Actions>,
    ]);
  };
};  // Ends <AskPermission>


/**
 * Modal that shows the feedback form.
 */
class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData:         {},
      ready:            false,
      submitting:       false,
      submissionFailed: false,
    };
  }

  handleInputChange = (event) => {
    // Source: https://reactjs.org/docs/forms.html#controlled-components
    const target = event.target;
    const name = target.name;
    let value;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }

    this.setState({ formData: Object.assign({}, this.state.formData, { [ name ]: value }) });
  };

  // returns promise that succeeds if submission is successful, else rejects.
  sendDataToSpreadsheet(data) {
    const fetchOptions = {
      method: 'POST',
      body:   JSON.stringify(data),
    };
    return fetch(postUrl, fetchOptions)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      });
  };

  close = (event) => {
    // Reset state for next time it's opened
    this.setState({
      formData:         {},
      ready:            false,
      submitting:       false,
      submissionFailed: false,
    });
    this.props.close();
  };

  onReady = () => {
    this.setState({ ready: true });
  };

  closeAskPermission = () => {
    this.setState({ ready: false });
  };

  submit = (event, type) => {
    this.setState({ submitting: true });

    let data = this.state.formData;
    if (type === `withData`) {
      data = Object.assign({ clientData: this.props.data }, data);
    }

    this.sendDataToSpreadsheet(data)
      .then((response) => {
        this.close();
      })
      .catch((error) => {
        this.setState({ submissionFailed: true, submitting: false });
        console.error(error.message);
      });
  };

  render () {
    const { isOpen } = this.props;
    const { formData, submissionFailed, submitting, ready } = this.state;
    const inputProps = (name) => {
      return {
        name,
        value:    formData[ name ] || '',
        onChange: this.handleInputChange,
      };
    };

    // Without the #root selector, we can't get the accessibility
    // focus styles to win
    return (
      <Modal
        mountNode          = { document.getElementById(`App`) }
        size               = { `large` }
        open               = { isOpen }
        onClose            = { this.close }
        closeOnDimmerClick = { false }
        closeOnEscape      = { false }
        closeIcon>

        <Modal.Header>Tell Us More</Modal.Header>

        <Modal.Content scrolling>
          <Form>
            <Form.Input
              autoFocus
              { ...inputProps(`currentSnap`) }
              label = { <span>If the <strong>current</strong> SNAP amount was wrong, what's the right amount?</span> } />
            <Form.Input
              { ...inputProps(`futureSnap`) }
              label = { <span>If the <strong>future</strong> SNAP amount was wrong, what's the right amount?</span> } />
            <Form.Input
              { ...inputProps(`futureS8`) }
              label = { <span>If the <strong>future</strong> Section 8 amount was wrong, what's the right amount?</span> } />
            <Form.TextArea
              { ...inputProps(`otherCircumstances`) }
              label = { `What else could be going on that could affect your benefit amount? ` +
              `For example, are you a veteran? Are you a full-time student?` } />
            <Form.TextArea
              { ...inputProps(`bugReport`) }
              label = { `If there was a bug or error, describe the bug and what you were trying to do when the bug happened.` } />
            <Form.TextArea
              { ...inputProps(`comments`) }
              label = { `Do you have any other comments?` } />
          </Form>

          <Message
            hidden = { !submissionFailed }
            error>
            Error submitting data, please try again or <a href="mailto:andrew@codeforboston.org">email us</a>.
          </Message>
        </Modal.Content>

        <Modal.Actions>
          <Button
            onClick  = { this.close }
            disabled = { submitting }>
            Cancel
          </Button>
          <Button
            onClick = { this.onReady }
            color   = { `teal` }>
            Ready
          </Button>
        </Modal.Actions>

        <Modal
          mountNode          = { document.getElementById(`App`) }
          size               = { `large` }
          open               = { ready }
          onClose            = { this.closeAskPermission }
          closeOnDimmerClick = { false }
          closeOnEscape      = { false }
          closeIcon>
          <AskPermission
            submitting         = { submitting }
            closeAskPermission = { this.closeAskPermission }
            submit             = { this.submit }
            question           = { `Is it ok if we save the information you've put in here? We won't save anything else about you. If you had problems with the app, it'll help us work on them.` } />
        </Modal>
      </Modal>
    );
  };
};  // Ends <FeedbackForm>


export {
  FeedbackForm,
  AskPermission,
};
