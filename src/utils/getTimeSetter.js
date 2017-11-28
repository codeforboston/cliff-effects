/**
 * Standardizing sending 'current' and
 *     'future' values to a function
 *     (which we all know is for setting
 *     the state).
 */


const getTimeSetter = function ( time, func ) {

  var timeFunc = function ( evnt, data ) {
    data.time = time;
    func( evnt, data );
  };

  return timeFunc;

};  // End getTimeSetter()


export { getTimeSetter };
