import React, { Component } from 'react';
import {
  Form,
} from 'semantic-ui-react';
import 'isomorphic-fetch';

// From the Google Apps Script
const postUrl = 'https://script.google.com/macros/s/AKfycbyXYbemTPcqsdbmXITnjaNi-CkN85g5kKPrgzt4AS8ykT2jH6Zn/exec';

export class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionFailed: false,
    };
    // TODO finish this
  }

  // returns promise that succeeds if submission is successful, else rejects.
  sendDataToSpreadsheet(formData) {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(formData),
    };
    return fetch(postUrl, fetchOptions).then((response) => {
      if (response.ok) {
        return true;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    });
  }

  this.handleSubmit = () => {
    // TODO don't use dummy data
    const dummyData = {
      clientData: { a: 'foo', b: 'bar', c: 'baz'},
      question1: "I had no problems.",
      question2: "I couldn't figure out how to enter my income from blah.",
    };
    this.sendDataToSpreadsheet(dummyData).catch((error) => {
      this.setState(Object.assign(this.state, { submissionFailed: true }));
      console.error(error.message);
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        { /*TODO make the form!*/ }
        <Form.Button content="Submit" />
      </Form>
    );
  }
};
