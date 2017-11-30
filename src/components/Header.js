import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Segment,
  Visibility
} from 'semantic-ui-react';

import { MainMenu } from '../MainMenu';
import FixedMenu from '../FixedMenu';

class Header extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        fixHeader: false
      };
    }
  
    render () {
      let menu = undefined;
      if ( this.props.location.pathname === '/' ) {
        return null;
      }
      menu = this.state.fixHeader ? <FixedMenu /> : <MainMenu />;
      return (
        <Visibility
          onTopPassed={ () => { this.setState({fixHeader: true}); } }
          onTopPassedReverse={ () => { this.setState({fixHeader: false}); } }
          once={false} >
          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
            color='teal' >
            {menu}
          </Segment>
        </Visibility>
      );
     
   }
}

export default withRouter(Header);