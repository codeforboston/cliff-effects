import React from 'react';

import {
  Segment,
} from 'semantic-ui-react';

import { MainMenu } from '../MainMenu';
import FixedMenu from '../FixedMenu';

const Header = ({fix}) => {
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

export default Header;