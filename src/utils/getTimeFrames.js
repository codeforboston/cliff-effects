/**
 * Abstracts current and future program and
 * income values on Predictions form
 */

const getBenefitTimeFrames = function ( client, benefitCheck, benefitsFunc ) {
    if (client.current[benefitCheck]) {
        return {
            benefitCurrent: Math.round( benefitsFunc ( client, 'current' ) ),
            benefitFuture: Math.round( benefitsFunc ( client, 'future' ) )
        }
    } else {
        return 0;
    }
};

const getIncomeTimeFrames = function( client ) {
    return {
        incomeCurrent: Math.round( client.current.earned ),
        incomeFuture: Math.round( client.future.earned )
    }
};

export { getBenefitTimeFrames, getIncomeTimeFrames };
