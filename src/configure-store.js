/* global module, process */

import { createStore, compose } from 'redux';
import { Map } from 'immutable';
import createReducer from './reducers';


export default function configureStore(initialState = Map()) {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers()
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer());
    });
  }

  return store;
}
