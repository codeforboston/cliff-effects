import React from 'react';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

const PageLayout = (props) => {
  return (
    <div>
      <Segment
        style={{ padding: '8em 0em' }}
        vertical>
        <Grid
          container
          stackable
          verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={ 10 }>
              {props.children}
            </Grid.Column>
            <Grid.Column
              floated='right'
              width={ 6 } />
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export { PageLayout };
