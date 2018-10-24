import { fromJS } from 'immutable';

import { CLIENT_DEFAULTS } from '../utils/CLIENT_DEFAULTS';
import { SET_CLIENT_VALUE } from '../actions';

const clientReducer = (
  state = fromJS(CLIENT_DEFAULTS),
  action
) => {
  switch (action.type) {
  case SET_CLIENT_VALUE:
    const { time, route, value } = action.payload;
    return state.setIn([
      time,
      ...route, 
    ], fromJS(value));
  
  default:
    return state;
  }
};

export default clientReducer;
