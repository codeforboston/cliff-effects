export const SET_CLIENT_VALUE = 'SET_CLIENT_VALUE';

export const setClientValue = ({ time, route, value }) => {
  return {
    type:    SET_CLIENT_VALUE,
    payload: {
      time,
      route,
      value,
    },
  };
};

export const REMOVE_MEMBER = 'REMOVE_MEMBER';

export const removeMember = ({ time = 'current', index }) => {
  return {
    type:    REMOVE_MEMBER,
    payload: {
      time,
      index,
    },
  };
};

export const ADD_MEMBER = 'ADD_MEMBER';

export const addMember = ({ time = 'current', member }) => {
  return {
    type:    ADD_MEMBER,
    payload: {
      time,
      member,
    },
  };
};

export const SET_MEMBER_IS_DISABLED = 'SET_MEMBER_IS_DISABLED';

export const setMemberIsDisabled = ({ time = 'current', index, isDisabled }) => {
  return {
    type:    SET_MEMBER_IS_DISABLED,
    payload: {
      time,
      index,
      isDisabled: !!isDisabled,
    },
  };
};

export const SET_MEMBER_ROLE = 'SET_MEMBER_ROLE';

export const setMemberRole = ({ time = 'current', index, role }) => {
  return {
    type:    SET_MEMBER_ROLE,
    payload: {
      time,
      index,
      role,
    },
  };
};

export const SET_MEMBER_AGE = 'SET_MEMBER_AGE';

export const setMemberAge = ({ time = 'current', index, age }) => {
  return {
    type:    SET_MEMBER_AGE,
    payload: {
      time,
      index,
      age,
    },
  };
};

export const SET_CASH_VALUE = 'SET_CASH_VALUE';

export const setCashValue = ({ time, name, value }) => {
  return {
    type:    SET_CASH_VALUE,
    payload: {
      time,
      name,
      value,
    },
  };
};

export const SET_HOUSING_TYPE = 'SET_HOUSING_TYPE';

export const setHousingType = ({ time, housingType }) => {
  return {
    type:    SET_HOUSING_TYPE,
    payload: {
      time,
      housingType,
    },
  };
};

export const SET_PAYS_UTILITY = 'SET_PAYS_UTILITY';

export const setPaysUtility = ({ time, utility, paysUtility }) => {
  return {
    type:    SET_PAYS_UTILITY,
    payload: {
      time,
      utility,
      paysUtility,
    },
  };
};

export const SET_GETS_FUEL_ASSISTANCE = 'SET_GETS_FUEL_ASSISTANCE';

export const setGetsFuelAssistance = ({ time, getsAssistance }) => {
  return {
    type:    SET_GETS_FUEL_ASSISTANCE,
    payload: {
      time,
      getsAssistance,
    },
  };
};

export const SET_HAS_BENEFIT = 'SET_HAS_BENEFIT';

export const setHasBenefit = ({ time, benefit, value }) => {
  return {
    type:    SET_HAS_BENEFIT,
    payload: {
      time,
      benefit,
      value: !!value,
    },
  };
};
