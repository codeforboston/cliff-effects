import React from 'react';
import { Divider, Form, Message } from 'semantic-ui-react';

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
    client: null,
    error: null,
    json: ''
  };

  submit = event => {
    const { client } = this.state;
    event.preventDefault();
    if (client === null) return;

    this.setState({
      client: null,
      error: null,
      json: ''
    })
    this.props.loadClient({ client: client });
  }

  handleChange = (_event, inputProps) => {
    const { value } = inputProps;
    try {
      const newClient = JSON.parse(value);
      this.setState({
        client: newClient,
        error: null,
        json: value
      });
    } catch (error) {
      this.setState({
        client: null,
        error: error,
        json: value
      });
    }
  }

  render() {
    if (!this.props.mayLoadCustomClient) return null;
    const { client, error, json } = this.state;

    return (
      <Form error={error !== null} onSubmit={this.submit}>
        <Form.Field>
          <label>Client JSON</label>
          <Form.Input type={'text'} value={json} onChange={this.handleChange} />
        </Form.Field>
        <Message 
          error
          header={'JSON Parse Failed!'}
          content={error && error.message}
        />
        <Form.Button type={'submit'} disabled={client === null}>
          Import Data
        </Form.Button>
        <Divider />
      </Form>
    )
  }
}

export { CustomClient };
