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
        <MainMenu translations={ this.props.translations } />
        <BetaWarning translations={ this.props.translations } />
      </Segment>
    );
  }
}

export default Header;
