import React from 'react';
import { Button, Grid } from 'semantic-ui-react'

/**
 * A function that is run when the button is clicked.
 * @callback func
 * @param {Object} event - React Event
 */

/** 
 * Returns a Grid Column containing a button of the style used
 * to navigate backwards and forwards through steps of the form.
 *
 * @param {Object} props
 * @param {func} props.func
 * @param {*} props.children - Serves as the label/content of the button
 *
 * @returns {Object} - React Element
 */
const BottomButton = function({ children, func }) {
  return (
    <Grid.Column className='large-bottom-button' width={3}>
      <Button type='button' color='teal' fluid size='large' onClick={func}>
        { children }
      </Button>
    </Grid.Column>
  );
};

export default BottomButton;
