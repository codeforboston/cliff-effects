import React from 'react';
import { Segment } from 'semantic-ui-react';

import { MainMenu } from './MainMenu';
import { BetaWarning } from './BetaWarning';


class Header extends React.Component {
  render() {
    return (
      <Segment
        id        = { `appHeader` }
        className = { `header-segment` }
        textAlign = { `center` }
        color     = { `teal` }
        inverted
        vertical>
        <MainMenu translations={ this.props.translations } />
        <BetaWarning translations={ this.props.translations } />
      </Segment>
    );
  };
};


export { Header };
