import { valueFixers } from './valueFixers';
import { getSideEffects } from './getSideEffects';


const setNestedProperty = function ({ route, value, time }, { current, future }, previouslySetByUser) {

  let itemID = route.shift();

  if (route.length <= 0) {

    let newEvent = { type: time, name: itemID, value: value };
    setValidCurrent(newEvent, current);
    setValidFuture(newEvent, future, previouslySetByUser);
    applySideEffects({ current, future, itemID });

  } else {
    // Get this key or index and remove it from list
    let next = {
      current: current[ itemID ],
      future:  future[ itemID ],
    };
    setNestedProperty({ route, value, time }, next, previouslySetByUser);
    applySideEffects({ current, future, itemID });
  }  // ends if last recursion because route is empty

};


const setValidCurrent = function ({ name, value, type }, newCurrent) {
  if (type === `current`) {
    newCurrent[ name ] = valueFixers[ name ](value, newCurrent);
  }

  return newCurrent;
};


const setValidFuture = function (evnt, newFuture, setByUser) {

  let newValue = valueFixers[ evnt.name ](evnt.value, newFuture);

  if (evnt.type === `future`) {
    newFuture[ evnt.name ] = newValue;

  } else if (evnt.type === `current`) {
    // If this 'future' value hasn't been changed by the user
    // then it continue to be synched up with the 'current'
    // value.
    if (!setByUser)  {
      newFuture[ evnt.name ] = newValue;
    }
  }  // ends if which part of the client object

  return newFuture;
};


/** Trigger functions that could affect other client
 *     values. Run after other client properties have
 *     been set.
 * 
 * @param {object} current
 * @param {object} future
 * @param {string} itemID
 */
const applySideEffects = function ({ current, future, itemID }) {

  let changeInCurrent = getSideEffects(current, itemID),
      changeInFuture  = getSideEffects(future, itemID);
  Object.assign(current, changeInCurrent);
  Object.assign(future, changeInFuture);

  return {
    current: current,
    future:  future,
    itemID:  itemID,
  };
};


export {
  setNestedProperty,
  setValidCurrent,
  setValidFuture,
  applySideEffects,
};
