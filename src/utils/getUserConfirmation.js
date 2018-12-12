import { getConfirmation as defaultConfirm } from 'history/DOMUtils';

/**
 * tl;dr: This is a wrapper that temporarily hijacks React history.
 * 
 * More details:
 * _history_, which is used by _React Router_ (`HashRouter`
 *     in App.js), runs the function `getConfirmation()` every
 *     time the user navigates away from a React 'page'.
 *     Navigates to a different `Route`, that is. This is useful
 *     for adding `onunload`-like prompts.
 * 
 * We could do this in a way that would be persistent
 *     throughout the site, but that became too hard to follow.
 *     Instead we pass it down through `props`. When we're done
 *     hijacking, we restore the old history behavior. We only
 *     really use the non-default behavior, but we figure it's
 *     probably good practice to restore the default behavior
 *     when we're done with our special case.
 */

class Confirmer {
  constructor () {
    this.confirm = defaultConfirm;
  };

  set = (func) => {
    return this.confirm = func;
  };

  unset = () => {
    return this.confirm = defaultConfirm;
  };

  getConfirmation = (message, reactCallback) => {
    return this.confirm(message, reactCallback);
  };
};


export { Confirmer };
