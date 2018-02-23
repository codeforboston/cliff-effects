/**
 * Abstracts current and future program and
 * income values on Predictions form
 */

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

export { getBenefitTimeFrames, getIncomeTimeFrames };
