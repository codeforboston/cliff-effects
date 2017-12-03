import React from 'react';
import { Header } from 'semantic-ui-react';

import FormSubheading from './FormSubheading';

const style = { display: 'inline-block' };

/**
 * @todo description
 * 
 * @param {Object} props
 * @param {*} props.children
 * @param {Object} props.subheading - Children of <FormSubheading>
 *
 * @returns {Object} - React Element
 */
const FormHeading = function ({ subheading, children }) {
    if ( !children ) { return null; }
  
    return (
      <wrapper className='form-heading' >
        <div /> {/* div here to make sure header margin doesn\'t collapse */}
        <Header as='h3' style={style}>
          { children }
        </Header>
        <FormSubheading>{ subheading }</FormSubheading>
        <br />
      </wrapper>
    );
  };

  export default FormHeading;
  