import { Map } from 'immutable';

import { SET_LANGUAGE } from '../actions';


/*
State shape:

{
  currentLanguage: <string>
}
 */

const localizationReducer = (state = Map(), action) => {
  switch (action.type) {
  case SET_LANGUAGE:
    return state.set('currentLanguage', action.payload.language);

  default:
    return state;
  }
};

export default localizationReducer;
