import React from 'react';
import {
  // Button,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const MainMenu = function ({ translations }) {
  return (
    <Menu
      inverted
      secondary
      size = { `large` }>

      <Menu.Item>
        <Link
          className = { `main-nav` }
          to        = { `/` }>
          { translations.i_homeNav }
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          className = { `main-nav` }
          to        = { `/about` }>
          { translations.i_aboutNav }
        </Link>
      </Menu.Item>
      <Menu.Item>{ translations.i_githubNav }</Menu.Item>
      <Menu.Item position={ `right` }>
        {/*<Link to="/login"><Button inverted>Log in</Button></Link>*/}
        {/*<Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>*/}
      </Menu.Item>
    </Menu>
  );
};  // Ends <MainMenu>


export { MainMenu };
