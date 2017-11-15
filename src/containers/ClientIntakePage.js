import React, { Component } from 'react';
import {
  Divider,
  Grid,
  Header,
  Image,
  Segment,
  Form
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class ClientIntakePage extends Component {

  state = {
    redirect: false,
    name: '',
    lastVisit: '',
    clientId: '',
    image: 'http://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg',
    dob: '',
    zipCode: '',
    visits: [],
  };

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFormSubmit = e => {
    // alert('Placeholder. Will save the client and take you to the client detail page')
    this.setState({redirect:true});
    // Take the current state and create a new client in the database
  }

  render() {
    return (
      <div>
        { /* REVIEW: There's got to be a cleaner way to handle this redirect */ }
        {this.state.redirect ? (<Redirect to='/detail/54321'/>) : false}

        <Segment style={{ padding: '4em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Header as='h1' style={{ fontSize: '4em' }}>New Client Intake</Header>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={this.state.image} size='medium'/>
              </Grid.Column>
              <Grid.Column floated='right' width={12}>
                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Input label='Name' placeholder='First name and last initial' name='name' value={this.state.name} onChange={this.handleInputChange} />
                  <Form.Input label='Date of Birth' placeholder='Date of Birth' name='dob' value={this.state.dob} onChange={this.handleInputChange}  />
                  <Form.Input label='Zip Code' placeholder='Zip Code' name='zipCode' value={this.state.zipCode} onChange={this.handleInputChange}  />
                  <Form.Input label='Client Avatar URL' placeholder='Avatar URL' name='image' value={this.state.image} onChange={this.handleInputChange}  />
                  <Form.Button color='teal'>Submit</Form.Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default ClientIntakePage;