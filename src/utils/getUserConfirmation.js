import { getConfirmation as defaultConfirm } from 'history/DOMUtils'

let confirm = defaultConfirm;

export const set = fn => confirm = fn;

export const unset = () => confirm = defaultConfirm;

export default (result, callback) => confirm(result, callback);
