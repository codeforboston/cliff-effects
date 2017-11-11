import React from 'react';
import { Menu, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BetaWarning } from './BetaWarning';
import logo from './images/logo.svg';

const SimpleMenu = (props) => {
  return (
    <Menu inverted color='teal'>
      <Menu.Item>
        <a href="http://www.codeforboston.org" target="_blank" rel="noopener noreferrer"><Image src={logo} size='tiny' /></a>
      </Menu.Item>
      <Menu.Item name='navigation'>
      { props.client
        ? (<Link to={`/detail/${props.client.clientId}`}>Back to Client Detail</Link>)
        : (<Link to="/">Go Home</Link>) }         
      </Menu.Item>
      { props.client
        ? ( <Menu.Item>
              <Header as='h2' 
                content={'Visit #' + props.visit + ' for ' + props.client.name}
                inverted 
                style={{ fontSize: '2em', marginLeft: '1em', marginBottom: '1em', marginTop: '1em' }} />
            </Menu.Item>)
        : false }
      <BetaWarning/>
    </Menu>
  );
};  // End SimpleMenu()

export default SimpleMenu;
