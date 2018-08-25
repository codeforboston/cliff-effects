import React from 'react';
import {
  Menu,
  Button,
} from 'semantic-ui-react';


const DevHud = function ({ active }) {
  return (
    <Menu
      className = { `dev-hud` }
      compact
      vertical >
      <Menu.Item>
        Some Checkbox
      </Menu.Item>
      <Button className = { `hide` }>
        Hide
      </Button>
    </Menu>
  );
};


export { DevHud };
