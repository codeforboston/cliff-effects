import React from 'react';
import {
  Menu,
  Responsive,
} from 'semantic-ui-react';


const BetaWarning = function () {
  return (
    <Menu.Item>
      <Responsive
        as = { `strong` }
        { ...Responsive.onlyTablet }>
        This tool is a prototype.
      </Responsive>
      <Responsive
        as = { `strong` }
        { ...Responsive.onlyComputer }>
        This tool is a prototype and should not be used to make financial decisions.
      </Responsive>
    </Menu.Item>
  );
};


export { BetaWarning };
