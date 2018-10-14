import React from 'react';
import {
  // Button,
  Container,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BetaWarning } from './BetaWarning';


const MainMenu = function ({ snippets }) {
  console.log(snippets)
  return (
    <Container>
      <Menu
        inverted
        secondary
        size='large'>
        
        <Menu.Item><Link to="/">{ snippets.i_homeNav }</Link></Menu.Item>
        <Menu.Item><Link to="/about">{ snippets.i_aboutNav }</Link></Menu.Item>
        <Menu.Item>{ snippets.i_githubNav }</Menu.Item>
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
