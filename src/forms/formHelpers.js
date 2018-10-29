/** @module formHelpers
 * @todo Separate into better-named dirs/files
 */

// REACT COMPONENTS
import React from 'react';
import { Icon } from 'semantic-ui-react';

// PROJECT COMPONENTS
// @todo Move all references to this component to the actual component file
import { ExternalLink } from './../components/ExternalLink';


// ========================================
// INPUT CONTAINER COMPONENTS
// ========================================

/** Red bold text that only appears if `validRow` is `false` */
const InvalidMessage = function ({ validRow, className, children }) {
  className = className || ``;

  var result = null;
  if (!validRow && children) {
    result = (
      <div className = { `invalid ` + className }>
        { children }
      </div>
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
