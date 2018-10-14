import React from 'react';

import { Segment } from 'semantic-ui-react';

import { MainMenu } from './MainMenu';
import { BetaWarning } from './BetaWarning';

class Header extends React.Component {
  render() {
    return (
      <Segment
        id={ `appHeader` }
        className="header-segment"
        inverted
        textAlign='center'
        vertical
        color='teal'>
        <MainMenu snippets={ this.props.snippets } />
        <BetaWarning />
      </Segment>
    );
  }
}

export default Header;
