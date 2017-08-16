import React from 'react';
import { Container, Menu, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const FixedMenu = () => (
  <Menu fixed='top' size='large' color='teal' inverted >
    <Container>
        <Menu.Item>
          <Link to="/"><Image src={logo} size='tiny' /></Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/about">About</Link></Menu.Item>
      <Menu.Item><Link to="/intake">New Client Intake</Link></Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
        <Link to="/login"><Button inverted>Log in</Button></Link>
        </Menu.Item>
        {/*<Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>*/}
      </Menu.Menu>
    </Container>
  </Menu>
)

export default FixedMenu;