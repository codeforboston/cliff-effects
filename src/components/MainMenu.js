import React from 'react';
import {
  // Button,
  Container,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BetaWarning } from './BetaWarning';


const MainMenu = function (props) {
  return (
    <Container>
      <Menu
        inverted
        secondary
        size='large'>
        
        <Menu.Item><Link to="/">Home</Link></Menu.Item>
        <Menu.Item><Link to="/about">About</Link></Menu.Item>
        <Menu.Item position='right'>
          {/*<Link to="/login"><Button inverted>Log in</Button></Link>*/}
          {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
        </Menu.Item>
        <BetaWarning />
      </Menu>
    </Container>
  );
};  // End MainMenu(<>)


export { MainMenu };
