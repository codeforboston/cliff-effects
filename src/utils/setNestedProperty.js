import { valueFixers } from './valueFixers';

const setNestedProperty = function ({ route, value, time }, { current, future }, previouslySetByUser) {
  
  var itemID = route.shift();
  if (route.length <= 0) {
    // console.log( value );
    var newEvent = {
      type: time,
      name: itemID,
      value: value, 
    };
    setValidCurrent(newEvent, current);
    setValidFuture(newEvent, future, previouslySetByUser);

  } else {
    // Get this key or index and remove it from list
    var next = {
      current:  current[itemID],
      future:   future[itemID],
    };
    setNestedProperty({
      route,
      value,
      time, 
    }, next, previouslySetByUser);
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
    newFuture[evnt.name] = valueFixers[ evnt.name ](evnt.value, newFuture);
    // console.log( valueFixers[ evnt.name ]( evnt.value, newFuture ) );
  } else if (evnt.type === 'current') {
    if (!setByUser)  {
      newFuture[evnt.name] = valueFixers[ evnt.name ](evnt.value, newFuture);
    }
  }
  return newFuture;
};  // End setValidFuture()


export { setNestedProperty };
