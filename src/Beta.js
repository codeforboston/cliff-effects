import React from 'react';
import { Menu } from 'semantic-ui-react';

const BetaWarning = function ( props ) {
  return (
    <Menu.Item>
      <div>This tool is a prototype and should not be used to make financial decisions.</div>
    </Menu.Item>
  );
};  // End BetaWarning(<>)

const About = function ( props ) {
  return (
    <Menu.Item>
      <a href='https://github.com/codeforboston/cliff-effects#cliff-effects'>About</a>
    </Menu.Item>
  );
};  // End About(<>)


export { BetaWarning, About };
