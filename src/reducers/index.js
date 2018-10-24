/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';

import geographyReducer from './geography';
import localizationReducer from './localization';
import clientReducer from './client';

export default function createReducer() {
  return combineReducers({
    geography:    geographyReducer,
    localization: localizationReducer,
    client:       clientReducer,
  });
}
