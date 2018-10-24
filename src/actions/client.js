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
