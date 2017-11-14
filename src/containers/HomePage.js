import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo_stacked from '../images/logo_stacked.svg';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 500, padding: '1em 0em' }}
          vertical
          color='teal'
        >
          <Container text>
          <br/>
            <Image src={logo_stacked} size='small' inline />
            <Header
              as='h1'
              content='Cliff Effects Tool'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
            />
            <Header
              as='h2'
              content='Intake a new client to begin.'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Link to="/intake"><Button size='big' inverted>Intake New Client<Icon name='right arrow'/></Button></Link>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical textAlign='center' className={'spaceholder'}/>
      </div>
    )
  }
}

export default HomePage;
