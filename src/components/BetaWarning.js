import React from 'react';
import { Menu, Responsive } from 'semantic-ui-react';

const BetaWarning = function ( props ) {
  return (
    <Menu.Item>
      <Responsive as='strong' {...Responsive.onlyTablet}>
        This tool is a prototype.
      </Responsive>
      <Responsive as='strong' {...Responsive.onlyComputer}>
        This tool is a prototype and should not be used to make financial decisions.
      </Responsive>
    </Menu.Item>
  );
};  // End BetaWarning(<>)


export {
	BetaWarning
};
