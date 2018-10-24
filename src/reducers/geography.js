import { Map } from 'immutable';

import { SET_US_STATE } from '../actions';


/*
State shape:
{
  state: <string>,
}
 */

const geographyReducer = (state = Map(), action) => {
  switch (action.type) {
  case SET_US_STATE: {
    return state.set('state', action.payload.state);
  }

  default: return state;
  }
};

export default geographyReducer;
