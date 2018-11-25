import React from 'react';
import {
  Grid,
  Header,
  Segment,
  Image,
} from 'semantic-ui-react';

import logo from '../images/logo.svg';


const Footer = function ({ translations }) {
  return (
    <Segment
      className = { `footer_segment` }
      color     = { `teal` }
      inverted
      vertical>
      <Grid
        container
        divided
        inverted
        stackable>
        <Grid.Row>

          <Grid.Column
            width   = { 4 }
            floated = { `left` }>
            <Header
              as = { `h4` }
              inverted>
              { translations.i_header }
            </Header>
            <p>{ translations.i_cfbCredit }</p>
          </Grid.Column>

          <a
            href   = { `http://www.codeforboston.org` }
            target = { `_blank` }
            rel    = { `noopener noreferrer` }>
            <Image
              src     = { logo }
              size    = { `small` }
              floated = { `right` } />
          </a>

        </Grid.Row>
      </Grid>
    </Segment>
  );
};  // Ends <Footer>


export { Footer };
