import React from 'react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


const ButtonNext = function ({ onClick, snippets, ...moreProps }) {
  return (
    <BigButton
      { ...moreProps }
      onClick = { onClick }>
      { snippets.i_next }
    </BigButton>
  );
};  // End <ButtonNext>


export { ButtonNext };
