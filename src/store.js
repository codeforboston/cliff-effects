/**
 * Configures the Redux store for use on the browser. Separate from configure-store.js both so
 * that configure-store.js could be used server-side (without a DOM reference) and so that other
 * client-side modules can get a reference to the store if needed.
 */

import { Map } from 'immutable';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configure-store';

export const history = createHistory();

const initialState = Map();

let store;

export default function getStore() {
  /* istanbul ignore else */
  if (!store) {
    store = configureStore(initialState, history);
  }

  return store;
}
