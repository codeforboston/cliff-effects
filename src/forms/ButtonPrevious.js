import React from 'react';

// PROJECT COMPONENTS
import { BigButton } from './inputs';


const ButtonPrevious = function ({ onClick, snippets, ...moreProps }) {
  return (
    <BigButton
      { ...moreProps }
      onClick = { onClick }>
      { snippets.i_previous }
    </BigButton>
  );
};  // End <ButtonPrevious>


export { ButtonPrevious };
