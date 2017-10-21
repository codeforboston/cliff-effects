import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const BetaWarning = function ( props ) {
  return (
    <Menu.Item>
      <div>This tool is a prototype and should not be used to make financial decisions.</div>
    </Menu.Item>
  );
};  // End BetaWarning(<>)


export { BetaWarning };
