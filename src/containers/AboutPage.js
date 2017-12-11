import React from 'react';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

import { AboutContent } from '../components/AboutContent';

const AboutPage = () => {
  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={10}>

              <AboutContent/>

            </Grid.Column>
            <Grid.Column floated='right' width={6}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

export default AboutPage;