import React from 'react';
import { Form, Message } from 'semantic-ui-react';


/**
 * Propagate data from JSON object.
 * @callback load
 * @param {object} toLoad - Parsed JSON object to use.
 * @todo Change to just 'load'? Change this component
 *     to a more generic `<Load>`.
 */

/**
 * Accept data from a user's JSON object and send it to `load`.
 *     Currently for development only.
 * 
 * @param {object} props
 * @param {toLoad} props.load
 * @param {object} props.toRestore Data to use to reset
 *     values that load changes.
 * 
 * @extends React.Component
 */
class CustomClient extends React.Component {
  state = {
    toLoad: null,  // parsed json
    error:  null,
    json:   '',
  };

  load = (toLoad) => {
    if (toLoad === null) {
      return;
    }

    this.setState({
      toLoad: null,
      error:  null,
      json:   '',
    });

    this.props.load({ toLoad: toLoad });
  };

  reset = () => {
    this.load(this.props.toRestore);
  };

  submit = (event) => {
    const { toLoad } = this.state;
    event.preventDefault();
    this.load(toLoad);
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
