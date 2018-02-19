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

const getBenefitTimeFrames = function ( client, benefitCheck, benefitsFunc ) {
    if (client.current[benefitCheck]) {
        return {
            benefitCurrent: Math.round( benefitsFunc ( client, 'current' ) * 12 ),
            benefitFuture: Math.round( benefitsFunc ( client, 'future' ) * 12 )
        }
    } else {
        return 0;
    }
};

const getIncomeTimeFrames = function( client ) {
    return {
        incomeCurrent: Math.round( client.current.earned * 12 ),
        incomeFuture: Math.round( client.future.earned * 12 )
    }
};

export { getTimeSetter, getBenefitTimeFrames, getIncomeTimeFrames };
