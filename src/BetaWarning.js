import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const BetaWarning = function ( props ) {
  // The `style` 'fixes' no space in between those two nodes, but whoever works on
  // this long term might consider a different UI package because that's not great.
  return (
    <Menu.Item>
      <div style={{ display: 'block' }}><strong>WARNING:</strong>{' '}This tool is a Prototype. It should not be used for official purposes.</div>
    </Menu.Item>
  );
};  // End BetaWarning(<>)


export { BetaWarning };
