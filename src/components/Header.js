import React from 'react';

import {
  Segment,
  Visibility,
} from 'semantic-ui-react';

import { MainMenu } from './MainMenu';
import FixedMenu from './FixedMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fix: false
    };
  }

  render() {
    const { fix } = this.state;

    return (
      <Visibility
        onTopPassed={ () => { this.setState({fix: true}) } }
        onTopPassedReverse={ () => { this.setState({fix: false}) } }
        once={ false }
      >
        <Segment
          inverted
          textAlign='center'
          style={{ padding: '1em 0em' }}
          vertical
          color='teal'
        >
          { fix ?
            <FixedMenu /> :
            <MainMenu />
          }
        </Segment>
      </Visibility>
    );
  }
}

export default Header;