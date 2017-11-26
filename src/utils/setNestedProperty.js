import { valueFixers } from './valueFixers';

const setNestedProperty = function ({ route, value, time }, {current, future}, prevSetByUser) {
  // console.log( 'nested prop' );
  
  // var itemID = route.shift();
  // if ( route.length <= 0 ) {

  //   var newEvent = { type: time, name: itemID, value: value };
  //   setValidCurrent( newEvent, current );
  //   setValidFuture( newEvent, future, prevSetByUser );

  // } else {
  //   // Get this key or index and remove it from list
  //   var next = {
  //     current:  current[itemID],
  //     future:   future[itemID]
  //   };
  //   updateNested({route, value, time}, next, prevSetByUser)
  // }
  
  return true;
};  // End setNestedProperty()


// const setValidCurrent = function ({ name, value, type }, newCurrent ) {

//   if ( type === 'current' ) {
//     newCurrent[ name ] = fixers[ name ]( value, newCurrent );
//   }

//   return newCurrent;
// };  // End setValidCurrent()


// const setValidFuture = function ( evnt, newFuture, setByUser ) {
//   if ( evnt.type === 'future' ) {
//     newFuture[evnt.name] = fixers[ evnt.name ]( evnt.value, newFuture );

//   } else if ( evnt.type === 'current' ) {
//     if ( !setByUser )  {
//       newFuture[evnt.name] = fixers[ evnt.name ]( evnt.value, newFuture );
//     }
//   }
//   return newFuture;
// };  // End setValidFuture()


export { setNestedProperty };
