import React from 'react';

const style = { display: 'block', textAlign: 'left' };

/**
 * A clearer way than a ternary operator to have a possible
 * subheader. Also, clearer for separate styling
 *
 * @param {Object} props
 * @param {*} props.children
 *
 * @returns {Object} - React Element
 */
const FormSubheading = function ({ children }) {
  if ( !children ) { return null; }

  return (
    <wrapper className='form-subheading' style={style}>
      { children }
    </wrapper>
  );
};

export default FormSubheading;
