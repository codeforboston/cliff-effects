/** @module formHelpers */
// @todo Separate into better-named dirs/files

// REACT COMPONENTS
import React from 'react';
import { Icon } from 'semantic-ui-react';

// ========================================
// FEEDBACK FOR USER
// ========================================

/** Puts a message above the given children.
 * 
 * @description It should always be the only item in its
 *     row - block content. Currently meant to be used with
 *     an input row to give short instructions or user error
 *     message. It also attempts to conform to accessibility: 
 *     @see {link https://www.w3.org/WAI/tutorials/forms/instructions/#using-aria-labelledby}. 
 *     It's given a hook to allow an input to label it as a
 *     description with aria. `tab-index` for IE (see 'note').
 * 
 * @param {string|object} children Objects react can render.
 * @param {string} ariaName ID of node this message will be
 *     describing.
 * @param {string} [className] Optional classes to add to allow
 *     access with css.
 * @param {string|object|null} [message] To be rendered above
 *     the children.
 * @param {boolean} [isUserError] Is this an error message?
 *     Another option would be `type` instead - descriptor(s)
 *     for the message that will currently be turned into
 *     classes. Things like 'invalid'.
 *
 * @returns React element
 */
const ValidationError = function ({ children, ariaName, isUserError, message, className }) {

  className = className || ``;

  let messageElem = null;
  if (message) {

    let messageClasses = `message-above `;
    if (isUserError) {
      messageClasses += `invalid`;
    }
    // `id` is for aria description hook
    // tabIndex is for IE (see link in description)
    messageElem = (
      <div
        className = { messageClasses }
        id        = { ariaName + `Message` }
        htmlFor   = { ariaName }
        tabIndex  = { -1 }>
        { message }
      </div>
    );
  }  // ends if there's a message

  return (
    <div className={ `with-message-above ` + className }>
      { messageElem }
      <div className={ `below-message` }>{ children }</div>
    </div>
  );

};


// ========================================
// NECESSARY VISUAL SUGAR
// ========================================

let AttentionArrow = function () {

  return (
    <span className={ `attention-arrow` }>
      <Icon
        fitted
        className = { `attention-font` }
        name      = { `angle right` }
        size      = { `big` } />
      <Icon
        fitted
        className = { `attention-font` }
        name      = { `angle right` }
        size      = { `big` } />
    </span>
  );

};  // End <AttentionArrow


export {
  ValidationError,
  AttentionArrow,
};
