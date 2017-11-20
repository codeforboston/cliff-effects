import React from 'react';
import { Menu } from 'semantic-ui-react';

const BetaWarning = function ( props ) {
  return (
    <Menu.Item>
      <div><strong>This tool is a prototype and should not be used to make financial decisions.</strong></div>
    </Menu.Item>
  );
};  // End BetaWarning(<>)


export {
	BetaWarning
};
