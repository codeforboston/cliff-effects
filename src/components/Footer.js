import React from 'react';

import {
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

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
        <Grid.Row>
          <Grid.Column width={ 7 }>
            <Header
              as='h4'
              inverted>Cliff Effects Tool
            </Header>
            <p>Made with <Icon
              name='heart'
              size='small' /> by Code for Boston
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Footer;
