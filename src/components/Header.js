import React from 'react';

import { Segment } from 'semantic-ui-react';

import { MainMenu } from './MainMenu';

class Header extends React.Component {
  render() {
    return (
      <Segment className="header_segment"
        inverted
        textAlign='center'
        vertical
        color='teal'>
        <MainMenu />
      </Segment>
    );
  }
}

export default Header;
