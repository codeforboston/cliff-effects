import React from 'react';
import {
  Form,
  Radio,
  Modal,
  Button,
  Message,
} from 'semantic-ui-react';

// CUSTOM
import { renderIfTrue } from '../renderIfTrue';

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

  submit = (evnt) => {
    this.props.submit(evnt, this.state.submitType);
  };

  setSubmitType = (evnt, inputProps) => {
    this.setState({ submitType: inputProps.value });
  };

  // Return an array to take advantage of `Modal` styling
  render () {return ([
    <Modal.Content key = { `ask-permission-content` }>
      <p>{ this.props.question }</p>

      <Form.Field>
        <Radio
          name     = { `data-ask` }
          value    = { `withData` }
          label    = { `Yes` }
          checked  = { this.state.submitType === `withData` }
          onChange = { this.setSubmitType } />
      </Form.Field>
      <Form.Field>
        <Radio
          name     = { `data-ask` }
          value    = { `withoutData` }
          label    = { `No` }
          checked  = { this.state.submitType === `withoutData` }
          onChange = { this.setSubmitType } />
      </Form.Field>
    </Modal.Content>,
    <Modal.Actions key = { `ask-permission-actions` }>
      <Button
        onClick  ={ this.close }
        disabled ={ this.props.submitting }>Cancel
      </Button>
      <Button
        onClick  = { this.submit }
        loading  = { this.props.submitting }
        disabled = { this.state.submitType === null }
        color    ='teal'>
        {renderIfTrue(this.state.submitType === `withData`,
          `Send with my information`
        )}
        {renderIfTrue(this.state.submitType === `withoutData`,
          `Send without my information`
        )}
        {renderIfTrue(this.state.submitType === null,
          `Send`
        )}
      </Button>
    </Modal.Actions>,
  ]);}
}


/**
 * Modal that shows the feedback form.
 */
class FeedbackPrompt extends React.Component {
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
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      });
  }

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

  submit = (evnt, type) => {
    this.setState({ submitting: true });

    let data = this.state.formData;
    if (type === `withData`) {
      data = Object.assign({ clientData: this.props.data }, this.state.formData);
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
    const inputProps = (name) => {
      return {
        name,
        value:    this.state.formData[ name ] || '',
        onChange: this.handleInputChange,
      };
    };

    return (
      <Modal
        size='large'
        open={ this.props.isOpen }
        onClose={ this.close }
        closeOnDimmerClick={ false }
        closeOnEscape={ false }
        closeIcon>
        <Modal.Header>Tell Us More</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              { ...inputProps('currentSnap') }
              label={ <span>If the <strong>current</strong> SNAP amount was wrong, what's the right amount?</span> } />
            <Form.Input
              { ...inputProps('futureSnap') }
              label={ <span>If the <strong>future</strong> SNAP amount was wrong, what's the right amount?</span> } />
            <Form.Input
              { ...inputProps('futureS8') }
              label={ <span>If the <strong>future</strong> Section 8 amount was wrong, what's the right amount?</span> } />
            <Form.TextArea
              { ...inputProps('otherCircumstances') }
              label={ 'What else could be going on that could affect your benefit amount? ' +
              'For example, are you a veteran? Are you a full-time student?' } />
            <Form.TextArea
              { ...inputProps('bugReport') }
              label={ 'If there was a bug or error, describe the bug and what you were trying to do when the bug happened.' } />
            <Form.TextArea
              { ...inputProps('comments') }
              label={ 'Do you have any other comments?' } />
          </Form>
          <Message
            hidden={ !this.state.submissionFailed }
            error>
            Error submitting data, please try again or <a href="mailto:andrew@codeforboston.org">email us</a>.
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={ this.close }
            disabled={ this.state.submitting }>Cancel
          </Button>
          <Button
            onClick={ this.onReady }
            color='teal'>Ready
          </Button>
        </Modal.Actions>

        <Modal
          size               = { `large` }
          open               = { this.state.ready }
          onClose            = { this.closeAskPermission }
          closeOnDimmerClick = { false }
          closeOnEscape      = { false }
          closeIcon>
          <AskPermission
            submitting         = { this.state.submitting }
            closeAskPermission = { this.closeAskPermission }
            submit             = { this.submit }
            question           = { `Is it ok if we save the information you've put in here? We won't save anything else about you. If you had problems with the app, it'll help us work on them.` } />
        </Modal>
      </Modal>
    );
  }
};


export default FeedbackPrompt;
export { AskPermission };
