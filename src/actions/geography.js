export const SET_US_STATE = 'SET_US_STATE';

export const setUSState = ({ state }) => {
  return {
    type:    SET_US_STATE,
    payload: { state },
  };
};
