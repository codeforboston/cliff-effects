import React from 'react';
import logo from '../images/logo.svg';

import {
  Grid,
  Header,
  Segment,
  Image,
} from 'semantic-ui-react';

const Footer = ({ snippets }) => {
  return (
    <Segment className="footer_segment"
      inverted
      vertical
      color='teal'>
      <Grid
        container
        divided
        inverted
        stackable>
        <Grid.Row>
          <Grid.Column
            width={ 4 }
            floated='left'>
            <Header
              as='h4'
              inverted>
              { snippets.header_v1 }
            </Header>
            <p>{ snippets.cfbCredit_v1 }</p>
          </Grid.Column>
          <a

            href="http://www.codeforboston.org"
            target="_blank"
            rel="noopener noreferrer"><Image
              src={ logo }
              size='small'
              floated='right' />
          </a>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Footer;
