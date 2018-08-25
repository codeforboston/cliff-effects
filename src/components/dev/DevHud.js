import React from 'react';
import {
  Menu,
  Checkbox,
  Message,
  Button,
} from 'semantic-ui-react';


const DevHud = function ({ setDev, devProps }) {

  var toggleEnglish = function () {
    if (devProps.english) {
      setDev('english', false);
    } else {
      setDev('english', true);
    }
  };

  var toggleNonEnglish = function () {
    if (devProps.nonEnglish) {
      setDev('nonEnglish', false);
    } else {
      setDev('nonEnglish', true);
    }
  };

  return (
    <Menu
      className = { `dev-hud` }
      compact
      vertical >
      <Menu.Item>
        <Checkbox
          label   = { `Underline English snippets` }
          checked = { devProps.english }
          onClick = { toggleEnglish } />
      </Menu.Item>
      <Menu.Item>
        <Checkbox
          label   = { `Underline non-English snippets` }
          checked = { devProps.nonEnglish }
          onClick = { toggleNonEnglish } />
        <Message>
          Note: text that doesn't have
          <br />
          an underline (for reasons)          
          <br />
          has no snippets.
        </Message>
      </Menu.Item>
      <Button className = { `hide` }>
        Hide
      </Button>
    </Menu>
  );
};


export { DevHud };
