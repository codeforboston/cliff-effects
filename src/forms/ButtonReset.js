import React from 'react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


const ButtonReset = function ({ onClick, snippets, overrides }) {

  if (!overrides) {
    overrides = {};
  };

  var clickHandler = function () {
    onClick({
      header:    ``,
      message:   `default`,
      leaveText: `Start New Client`,
      callback:  () => {},
    });
  };

  return (
    <BigButton
      onClick = { clickHandler }
      { ...overrides }>
      { snippets.i_newClient }
    </BigButton>
  );

};  // End <ButtonReset>


export { ButtonReset };
