import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Segment,
  Table
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { clientList } from '../clientList';


const VisitTable = (props) => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Visit Date</Table.HeaderCell>
        <Table.HeaderCell>Benefits Reviewed</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.pageState.visits.map(visit =>
        (<Table.Row key={visit.date}>
          <Table.Cell singleLine>{visit.date}</Table.Cell>
          <Table.Cell singleLine>{visit.benefits}</Table.Cell>
        </Table.Row>)
      )}
    </Table.Body>
  </Table>
)

class ClientDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = clientList.find( client => {
      return client.clientId === parseInt(this.props.match.params.id, 10);
    });
  }

  render() {

    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={this.state.image} size='medium'/>
              </Grid.Column>
              <Grid.Column floated='right' width={12}>
                <Header as='h1' style={{ fontSize: '4em' }}>{this.state.name}</Header>
                <Segment style={{ padding: '1em'}} vertical>
                  <Header as='h3' style={{ fontSize: '2.5em' }}>Client ID: {this.state.clientId}</Header>
                  <p style={{ fontSize: '1.33em' }}>Date of Birth: {this.state.dob}</p>
                  <p style={{ fontSize: '1.33em' }}>Zip Code: {this.state.zipCode}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row style={{ padding: '8em 0em' }} >
              {this.state.visits.length > 0 ?
                (<Container style={{ width: '100%' }}><Header as='h4' style={{ fontSize: '2em' }}>Previous Visits</Header>
                <VisitTable pageState={this.state}/></Container>) : (<br/>)
              }
              <Link to={`/visit/${this.state.clientId}/${(this.state.visits.length + 1)}`}><Button color='teal' size='large'>Create New Visit</Button></Link>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default ClientDetailPage;