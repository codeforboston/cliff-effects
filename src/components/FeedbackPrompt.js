import React from 'react';
import { Button, Form, Modal, Message } from 'semantic-ui-react';
import 'isomorphic-fetch';

// URL to direct requests to, from the Google Apps Script
const postUrl = 'https://script.google.com/macros/s/AKfycbyXYbemTPcqsdbmXITnjaNi-CkN85g5kKPrgzt4AS8ykT2jH6Zn/exec';

/**
* Maps short question names to input type and question text
*/
const questions = {
  currentSnap: {
    inputType: Form.Input,
    text: 'If amount for the CURRENT SNAP subsidy was wrong, what\'s the correct amount?'
  },
  futureSnap: {
    inputType: Form.Input,
    text: 'If amount for the FUTURE SNAP subsidy was wrong, what\'s the correct amount?'
  },
  futureS8: {
    inputType: Form.Input,
    text: 'If amount for the FUTURE Section 8 voucher was wrong, what\'s the correct amount?'
  },
  otherCircumstances: {
    inputType: Form.TextArea,
    text: 'What else could be going on that could affect your benefit amount? ' +
      'For example, are you a veteran? Are you a full-time student?'
  },
  bugReport: {
    inputType: Form.TextArea,
    text: 'If there was a bug or error, describe the bug and what you were trying to do when the bug happened.'
  },
  comments: {
    inputType: Form.TextArea,
    text: 'Do you have any other comments?'
  }
};

/**
* Form for submitting user feedback.
*/
class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionFailed: false,
    };
    // TODO finish this
  }

  /**
  * Builds an array of input elements to populate the form.
  */
  getInputs(formData) {
    return Object.entries(questions).map(([key, {inputType: InputType, text}]) => {
        return (
          <InputType
            key={key}
            name={key}
            label={text}
            value={formData[key] || ''}
            onChange={this.props.handleInputChange} />
        );
      });
  }

  render() {
    return (
      <Form>
        {this.getInputs(this.props.formData)}
      </Form>
    );
  }
};

/*
* Modal that shows the feedback form.
*/
class FeedbackPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      submissionFailed: false
    };
  }

  handleInputChange = (event) => {
    // Source: https://reactjs.org/docs/forms.html#controlled-components
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const currFormData = this.state.formData;
    this.setState({
      formData: Object.assign(currFormData, { [name]: value })
    });
  }

  // returns promise that succeeds if submission is successful, else rejects.
  sendDataToSpreadsheet(formData) {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(formData),
    };
    return fetch(postUrl, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    });
  }

  cancel = (event) => {
    // Reset state for next time it's opened
    this.setState({ formData: {}, submissionFailed: false });
    this.props.callback();
  }

  submit = (event) => {
    const data = Object.assign(this.state.formData, { clientData: this.props.data });
    this.sendDataToSpreadsheet(data)
    .then((result) => {
      this.props.callback();
    })
    .catch((error) => {
      this.setState({ submissionFailed: true });
      console.error(error.message);
    });
  }

  render () {
    return (
      <Modal open={this.props.open}>
        <Modal.Header>Submit Cliff Effects Feedback</Modal.Header>
        <Modal.Content>
          <FeedbackForm
            handleInputChange={this.handleInputChange}
            formData={this.state.formData} />
          <Message hidden={!this.state.submissionFailed} error>
            Error submitting data, please try again or <a href="mailto:andrew@codeforboston.org">email us</a>.
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.cancel}>Cancel</Button>
          <Button onClick={this.submit} primary>Submit</Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

export default FeedbackPrompt;
