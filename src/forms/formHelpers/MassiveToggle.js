import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

/**
 * Function that changes page state (changes the "source of truth")
 * @callback onChange
 * @param {Object} event - React Event
 */

/**
 * Toggle with size='massive'
 *
 * @param {Object} props
 * @param {boolean} props.checked
 * @param {string} props.label
 * @param {string} props.name
 * @param {onChange} props.onChange
 *
 * @returns {Object} - React Element
 */
const MassiveToggle = function (props) {
  return (
    <Form.Field
      {...props}
      className='massive-toggle'
      toggle
      control={Checkbox}
      size='massive' />
  );
};

export default MassiveToggle;
