import React from 'react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


const ButtonReset = function ({ onClick, snippets, ...moreProps }) {
  return (
    <BigButton
      { ...moreProps }
      onClick = { onClick }>
      { snippets.i_newClient }
    </BigButton>
  );
};  // End <ButtonReset>


export { ButtonReset };
