import React from 'react';

import {
  Grid,
  Header,
  Icon,
  Segment,
  Image
} from 'semantic-ui-react';
import logo from '../images/logo.svg';

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ padding: '2em 0em' }}
      color='teal'>
      <Grid
        container
        divided
        inverted
        stackable>
        <Grid.Row columns={4}>
          <Grid.Column floated='left' left>
            <Header
              as='h4'
              inverted>Cliff Effects Tool
            </Header>
            <p>Made with <Icon
              name='heart'
              size='small' /> by Code for Boston
            </p>
          </Grid.Column>
          
          <a
            
            href="http://www.codeforboston.org"
            target="_blank"
            rel="noopener noreferrer"><Image
              src={ logo }
              size='small' 
              floated='right'/>
          </a>
        
       
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Footer;
