import { fromJS, Set } from 'immutable';

import { CLIENT_DEFAULTS } from '../utils/CLIENT_DEFAULTS';
import {
  SET_CLIENT_VALUE,
  ADD_MEMBER,
  REMOVE_MEMBER,
  SET_MEMBER_IS_DISABLED,
  SET_MEMBER_ROLE,
  SET_MEMBER_AGE,
  SET_CASH_VALUE,
  SET_HOUSING_TYPE,
  SET_PAYS_UTILITY,
  SET_GETS_FUEL_ASSISTANCE,
  SET_HAS_BENEFIT,
} from '../actions';

const getDefaultClients = () => {
  return fromJS(CLIENT_DEFAULTS)
    .updateIn(
      [
        'current',
        'benefits',
      ],
      (benefits) => {
        return Set(benefits);
      }
    ).updateIn(
      [
        'future',
        'benefits',
      ],
      (benefits) => {
        return Set(benefits);
      }
    );
};

const clientReducer = (
  state = getDefaultClients(),
  action
) => {
  switch (action.type) {
  case SET_CLIENT_VALUE: {
    const { time, route, value } = action.payload;
    return state.setIn([
      time,
      ...route, 
    ], fromJS(value));
  }
  
  case REMOVE_MEMBER: {
    const { index, time } = action.payload;

    return state.deleteIn(
      [
        time,
        'household',
        index, 
      ]
    );
  }
  
  case ADD_MEMBER: {
    const { member, time } = action.payload;

    return state.updateIn(
      [
        time,
        'household', 
      ],
      (members) => {
        return members.push(fromJS(member));
      }
    );
  }

  case SET_MEMBER_IS_DISABLED: {
    const { time, index, isDisabled } = action.payload;

    return state.setIn(
      [
        time,
        'household',
        index,
        'm_disabled', 
      ],
      isDisabled
    );
  }

  case SET_MEMBER_ROLE: {
    const { time, index, role } = action.payload;

    return state.setIn(
      [
        time,
        'household',
        index,
        'm_role', 
      ],
      role
    );
  }

  case SET_MEMBER_AGE: {
    const { time, index, age } = action.payload;

    return state.setIn(
      [
        time,
        'household',
        index,
        'm_age', 
      ],
      age
    );
  }

  case SET_CASH_VALUE: {
    const { time, name, value } = action.payload;

    return state.setIn(
      [
        time,
        name, 
      ],
      value
    );
  }

  case SET_HOUSING_TYPE: {
    const { time, housingType } = action.payload;

    return state.setIn(
      [
        time,
        'housing',
      ],
      housingType
    );
  }

  case SET_PAYS_UTILITY: {
    const { time, utility, paysUtility } = action.payload;

    return state.setIn(
      [
        time,
        utility,
      ],
      paysUtility
    );
  }

  case SET_GETS_FUEL_ASSISTANCE: {
    const { time, getsAssistance } = action.payload;

    return state.setIn(
      [
        time,
        'fuelAssistance',
      ],
      getsAssistance
    );
  }

  case SET_HAS_BENEFIT: {
    const { time, benefit, value } = action.payload;

    state = state.updateIn(
      [
        time,
        'benefits',
      ],
      (benefits) => {
        if (value) {
          return benefits.add(benefit);
        }
        else {
          return benefits.delete(benefit);
        }
      }
    );

    // Side effect--might be better if this could be decoupled from the reducer?
    if (benefit === 'section8') {
      state = state.setIn(
        [
          time,
          'housing',
        ],
        'voucher'
      );
    }

    return state;
  }
  
  default:
    return state;
  }
};

export default clientReducer;
