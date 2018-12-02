import React from 'react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


const BLANK_CALLBACK = function () {};

const ButtonReset = function ({ children, onClick, overrides }) {

  if (!overrides) {
    overrides = {};
  };

  let clickHandler = function () {
    onClick({
      header:    ``,
      message:   `default`,
      leaveText: `Start New Client`,
      callback:  { BLANK_CALLBACK },
    });
  };

  return (
    <BigButton
      className = { `caution` }
      onClick   = { clickHandler }
      overrides = { overrides }>
      { children }
    </BigButton>
  );

};  // Ends <ButtonReset>


export { ButtonReset };
