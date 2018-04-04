import React from 'react';
import { Button, Form, Modal, Message } from 'semantic-ui-react';

// URL to direct requests to, from the Google Apps Script
const postUrl = 'https://script.google.com/macros/s/AKfycbyXYbemTPcqsdbmXITnjaNi-CkN85g5kKPrgzt4AS8ykT2jH6Zn/exec';

/*
* Modal that shows the feedback form.
*/
class FeedbackPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      submissionFailed: false,
      submitting: false
    };
  }

  handleInputChange = (event) => {
    // Source: https://reactjs.org/docs/forms.html#controlled-components
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      formData: Object.assign({}, this.state.formData, { [name]: value })
    });
  }

  // returns promise that succeeds if submission is successful, else rejects.
  sendDataToSpreadsheet(data) {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };
    return fetch(postUrl, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    });
  }

  close = (event) => {
    // Reset state for next time it's opened
    this.setState({
      formData: {},
      submissionFailed: false,
      submitting: false
    });
    this.props.close();
  }

  submit = (event) => {
    this.setState({ submitting: true });
    const data = Object.assign({ clientData: this.props.data }, this.state.formData);
    this.sendDataToSpreadsheet(data)
    .then((response) => {
      this.close();
    })
    .catch((error) => {
      this.setState({ submissionFailed: true, submitting: false });
      console.error(error.message);
    });
  }

  render () {
    const inputProps = (name) => ({
      name,
      value: this.state.formData[name] || '',
      onChange: this.handleInputChange
    });

    return (
      <Modal
        size='large'
        open={this.props.isOpen}
        onClose={this.close}
        closeOnDimmerClick={false}
        closeOnEscape={false}
        closeIcon
      >
        <Modal.Header>Submit Cliff Effects Feedback</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Input {...inputProps('currentSnap')} label={'If amount for the CURRENT SNAP subsidy was wrong, what\'s the correct amount?'} />
            <Form.Input {...inputProps('futureSnap')} label={'If amount for the FUTURE SNAP subsidy was wrong, what\'s the correct amount?'} />
            <Form.Input {...inputProps('futureS8')} label={'If amount for the FUTURE Section 8 voucher was wrong, what\'s the correct amount?'} />
            <Form.TextArea {...inputProps('otherCircumstances')} label={'What else could be going on that could affect your benefit amount? ' +
              'For example, are you a veteran? Are you a full-time student?'} />
            <Form.TextArea {...inputProps('bugReport')} label={'If there was a bug or error, describe the bug and what you were trying to do when the bug happened.'} />
            <Form.TextArea {...inputProps('comments')} label={'Do you have any other comments?'} />
          </Form>
          <Message hidden={!this.state.submissionFailed} error>
            Error submitting data, please try again or <a href="mailto:andrew@codeforboston.org">email us</a>.
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} disabled={this.state.submitting}>Cancel</Button>
          <Button onClick={this.submit} loading={this.state.submitting} disabled={this.state.submitting} primary>Submit</Button>
        </Modal.Actions>
      </Modal>
    );
  }
};

export default FeedbackPrompt;
