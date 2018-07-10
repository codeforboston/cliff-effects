import React from 'react';
import logo from '../images/logo.svg';

import {
  Grid,
  Header,
  Icon,
  Segment,
  Image
} from 'semantic-ui-react';

import { interpolateSnippets } from '../utils/interpolation';

const inlineComponents = {
  __heartIcon__: <Icon
    name='heart'
    size='small' />,
};

const Footer = ({ snippets }) => {
  snippets = interpolateSnippets(snippets, inlineComponents);

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
          <Grid.Column width={ 4 } floated='left'>
            <Header
              as='h4'
              inverted>
              { snippets.header }
            </Header>
            <p>{ snippets.cfbCredit }</p>
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
