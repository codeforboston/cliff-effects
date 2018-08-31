import { valueFixers } from './valueFixers';
import { sideEffects } from './sideEffects';

const setNestedProperty = function ({ route, value, time }, { current, future }, previouslySetByUser) {

  var itemID = route.shift();

  if (route.length <= 0) {

    var newEvent = { type: time, name: itemID, value: value };
    setValidCurrent(newEvent, current);
    setValidFuture(newEvent, future, previouslySetByUser);
    doSideEffects({ current, future, itemID });

  } else {
    // Get this key or index and remove it from list
    var next = {
      current: current[ itemID ],
      future:  future[ itemID ],
    };
    setNestedProperty({ route, value, time }, next, previouslySetByUser);
    doSideEffects({ current, future, itemID });
  }

};  // End setNestedProperty()


const setValidCurrent = function ({ name, value, type }, newCurrent) {
  if (type === 'current') {
    newCurrent[ name ] = valueFixers[ name ](value, newCurrent);
  }

  return newCurrent;
};  // End setValidCurrent()


const setValidFuture = function (evnt, newFuture, setByUser) {
  if (evnt.type === 'future') {
    newFuture[ evnt.name ] = valueFixers[ evnt.name ](evnt.value, newFuture);
    // console.log( valueFixers[ evnt.name ]( evnt.value, newFuture ) );
  } else if (evnt.type === 'current') {
    if (!setByUser)  {
      newFuture[ evnt.name ] = valueFixers[ evnt.name ](evnt.value, newFuture);
    }
  }
  return newFuture;
};  // End setValidFuture()

/** Trigger functions that could affect other client
 *     values. Run after other client properties have
 *     been set.
 * 
 * @param {object} current
 * @param {object} future
 * @param {string} itemID
 */
const doSideEffects = function ({ current, future, itemID }) {

  var addToCurrent = sideEffects[ itemID ](current),
      addToFuture  = sideEffects[ itemID ](future);
  Object.assign(current, addToCurrent);
  Object.assign(future, addToFuture);

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
  doSideEffects,
};
