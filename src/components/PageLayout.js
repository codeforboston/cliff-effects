import React from 'react';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';


const PageLayout = ({ children }) => {
  return (
    <div>
      <Segment
        className = { `pl-segment` }
        vertical>
        <Grid
          container
          stackable
          verticalAlign = { `middle` }>
          <Grid.Row>
            <Grid.Column width={ 10 }>

              { children }

            </Grid.Column>
            <Grid.Column
              floated = { `right` }
              width   = { 6 } />
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};


export { PageLayout };
