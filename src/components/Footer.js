import React from 'react';

import {
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

import { InterpolatedText } from './InterpolatedText';

const inlineComponents = {
  heart: <Icon
    name='heart'
    size='small' />,
};

const Footer = ({ snippets }) => {
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
              inverted>
              { snippets.header }
            </Header>
            <p>
              <InterpolatedText
                template={ snippets.cfbCredit }
                components={ inlineComponents } />
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default Footer;
