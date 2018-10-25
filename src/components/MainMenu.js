import React from 'react';
import {
  // Button,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const MainMenu = function ({ snippets }) {
  return (
    <Menu
      inverted
      secondary
      size='large'>

      <Menu.Item><Link className="main-nav" to="/">{ snippets.i_homeNav }</Link></Menu.Item>
      <Menu.Item><Link className="main-nav" to="/about">{ snippets.i_aboutNav }</Link></Menu.Item>
      <Menu.Item>{ snippets.i_githubNav }</Menu.Item>
      <Menu.Item position='right'>
        {/*<Link to="/login"><Button inverted>Log in</Button></Link>*/}
        {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
      </Menu.Item>
    </Menu>
  );
};  // End MainMenu(<>)


export { MainMenu };
