/** Sets nested client properties. Helper for updating state.
 * @module
 */

import { valueFixers } from './valueFixers';
import { getSideEffects } from './getSideEffects';

const setNestedProperty = function ({ route, value, time }, { current, future }, previouslySetByUser) {

  var itemID = route.shift();

  if (route.length <= 0) {

    var newEvent = { type: time, name: itemID, value: value };
    setValidCurrent(newEvent, current);
    setValidFuture(newEvent, future, previouslySetByUser);
    applySideEffects({ current, future, itemID });

  } else {
    // Get this key or index and remove it from list
    var next = {
      current: current[ itemID ],
      future:  future[ itemID ],
    };
    setNestedProperty({ route, value, time }, next, previouslySetByUser);
    applySideEffects({ current, future, itemID });
  }

};  // End setNestedProperty()


const setValidCurrent = function ({ name, value, type }, newCurrent) {
  if (type === 'current') {
    newCurrent[ name ] = valueFixers[ name ](value, newCurrent);
  }

  return newCurrent;
};  // End setValidCurrent()


const setValidFuture = function (evnt, newFuture, setByUser) {

  var newValue = valueFixers[ evnt.name ](evnt.value, newFuture);

  if (evnt.type === 'future') {
    newFuture[ evnt.name ] = newValue;

  } else if (evnt.type === 'current') {
    // If this 'future' value hasn't been changed by the user
    // then it continue to be synched up with the 'current'
    // value.
    if (!setByUser)  {
      newFuture[ evnt.name ] = newValue;
    }
  }

  return newFuture;
};  // End setValidFuture()

/** Triggers functions that could affect other client
 *     values. Run after other client properties have
 *     been set.
 * 
 * @param {object} current
 * @param {object} future
 * @param {string} itemID
 */
const applySideEffects = function ({ current, future, itemID }) {

  var changeInCurrent = getSideEffects(current, itemID),
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
