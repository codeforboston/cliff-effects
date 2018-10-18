import React from 'react';

import { Segment, Container } from 'semantic-ui-react';

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
        <Container>
          <MainMenu snippets={ this.props.snippets } />
          <BetaWarning snippets={ this.props.snippets } />
        </Container>
      </Segment>
    );
  }
}

export default Header;
