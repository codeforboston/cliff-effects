import React from 'react';
import { Header} from 'semantic-ui-react';

/** Too simplify the process of creating content for the 'About' page */

const AboutContent = function ( props ) {

  return (
    <wrapper>
      
      <Header as='h1' style={{ fontSize: '4em' }}>About the Cliff Effects Tool</Header>
      <p style={{ fontSize: '1.33em' }}>
        Fill in information about the tool here.
      </p>

    </wrapper>
  );

};  // End AboutContent(<>)


export { AboutContent };
