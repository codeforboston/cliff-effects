import React from 'react';
import {
  withRouter
} from 'react-router-dom'

import {
  Segment,
} from 'semantic-ui-react';

import { MainMenu } from '../MainMenu';
import FixedMenu from '../FixedMenu';

const Header = ({fix, location}) => {
  if (location.pathname === '/') return (<div></div>)
  return (
    <div>
      <Segment
        inverted
        textAlign='center'
        style={{ padding: '1em 0em' }}
        vertical
        color='teal'
      >
        { fix ?
          <FixedMenu /> :
          <MainMenu/>
        }
      </Segment>
    </div>
  )
}

export default withRouter(Header);