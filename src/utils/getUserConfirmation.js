import { getConfirmation as defaultConfirm } from 'history/DOMUtils'

/*
_history_, which is used by _React Router_, runs the function `getConfirmation()`
everytime the user navigates away from the page. This is useful for adding `onunload`
prompts.

The problem is you can only customize the function on initialization. Which is where
this module comes in. The default export simply calls a stored function which you can set
using `exports.set()`. `exports.unset()` restores the default function from _history_.
*/

let confirm = defaultConfirm;

export const set = fn => confirm = fn;

export const unset = () => confirm = defaultConfirm;

export default (result, callback) => confirm(result, callback);
