import React, { Component } from 'react';

import {
  Segment,
  Visibility,
} from 'semantic-ui-react';

import { MainMenu } from '../MainMenu';
import FixedMenu from '../FixedMenu';


class Header extends Component {

  constructor ( props ) {
    super( props );

    this.state = {
      fixHeader: false,
      path: props.path
    };
  }

  componentWillReceiveProps ( newProps ) {
  // Update props in a Component instance when app re-rendering
    this.setState({path: newProps.path})
  }

  render () {
    if ( this.state.path === '/' ) {
      return null;

    } else {
      return (
        <Visibility
          onTopPassed={ () => { this.setState({fixHeader: true}) } }
          onTopPassedReverse={ () => { this.setState({fixHeader: false}) } }
          once={ false }
        >
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
            color='teal'
          >
            { this.state.fixHeader
              ? <FixedMenu />
              : <MainMenu/>
            }
          </Segment>
        </Visibility>
      );
    }  // end if( location )
  }  // End render()

};

export default Header;