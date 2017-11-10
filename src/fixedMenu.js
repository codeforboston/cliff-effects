import React from 'react';
import {
  Container,
  Menu,
  // Button,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BetaWarning } from './Beta';
import logo from './images/logo.svg';

const FixedMenu = () => (
  <Menu fixed='top' size='large' color='teal' inverted >
    <Container>
        <Menu.Item>
          <a href="http://www.codeforboston.org" target="_blank" rel="noopener noreferrer"><Image src={logo} size='tiny' /></a>
        </Menu.Item>
        <Menu.Item>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item><Link to="/about">About</Link></Menu.Item>
        <Menu.Item><Link to="/intake">New Client Intake</Link></Menu.Item>
        <Menu.Menu position='right'>
        {/*<Menu.Item className='item'>
          <Link to="/login"><Button inverted>Log in</Button></Link>
        </Menu.Item>
         <Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>*/}
        <BetaWarning/>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default FixedMenu;