/** @module formHelpers
 * @todo Separate into better-named dirs/files
 */

// REACT COMPONENTS
import React from 'react';
import {
  // Generic Form stuff
  Label,
  Icon,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
// @todo Move all references to this component to the actual component file
import { ExternalLink } from './../components/ExternalLink';


// ========================================
// INPUT CONTAINER COMPONENTS
// ========================================

// @todo Put above input instead, using `.Top` of `<Surrounder>`
/** Adds an option for an 'invalid input' message to the right
 *     of the last element
 */
const InvalidMessage = function ({ validRow, message }) {

  var result = null;
  if (!validRow && message) {
    result = (
      <Label
        basic
        color='red'
        pointing="left">{message}
      </Label>
    );
  }

  return result;
};  // End <InvalidMessage>


var AttentionArrow = function () {

  return (
    <span className={ 'attention-arrow' }>
      <Icon
        className = { 'attention-font' }
        fitted
        name      = { 'angle right' }
        size      = { 'big' } />
      <Icon
        className = { 'attention-font' }
        fitted
        name      = { 'angle right' }
        size      = { 'big' } />
    </span>
  );

};  // End <AttentionArrow>


export {
  ExternalLink,
  InvalidMessage,
  AttentionArrow,
};
