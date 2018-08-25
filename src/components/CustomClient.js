import React from 'react';
import { Form, Message } from 'semantic-ui-react';


/**
 * Load previous session from object.
 * @callback loadClient
 * @param {object} clientContainer - Object containing previous session as `client`.
 */

/**
 * Form which loads previous session from JSON.
 * 
 * @param {object} props
 * @param {boolean} props.mayLoadCustomClient - Whether form should be visible
 * @param {loadClient} props.loadClient
 * 
 * @extends React.Component
 */
class CustomClient extends React.Component {
  state = {
    toLoad: null,  // parsed json
    error:  null,
    json:   '',
  };

  loadClient = (toLoad) => {
    if (toLoad === null) {
      return;
    }

    this.setState({
      toLoad: null,
      error:  null,
      json:   '',
    });

    this.props.loadClient({ toLoad: toLoad });
  };

  reset = () => {
    this.loadClient(this.props.toRestore);
  };

  submit = (event) => {
    const { toLoad } = this.state;
    event.preventDefault();
    this.loadClient(toLoad);
  };

  handleChange = (_event, inputProps) => {
    const { value } = inputProps;
    try {
      const newClient = JSON.parse(value);
      this.setState({
        toLoad: newClient,
        error:  null,
        json:   value,
      });
    } catch (error) {
      this.setState({
        toLoad: null,
        error:  error,
        json:   value,
      });
    }
  };

  render() {
    const { toLoad, error, json } = this.state;

    return (
      <Form
        error={ error !== null }
        onSubmit={ this.submit }>
        <Form.Field>
          <label>Client JSON</label>
          <Form.Input
            type={ 'text' }
            value={ json }
            onChange={ this.handleChange } />
        </Form.Field>
        <Message 
          error
          header={ 'JSON Parse Failed!' }
          content={ error && error.message } />
        <div className = { `load-buttons` }>
          <Form.Button
            type={ 'submit' }
            disabled={ toLoad === null }>
            Import Data
          </Form.Button>
          <Form.Button
            onClick = { this.reset }>
            Reset
          </Form.Button>
        </div>
      </Form>
    );
  }
}

export { CustomClient };
