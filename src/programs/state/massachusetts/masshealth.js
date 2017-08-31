import { percentPovertyLevel, 
    percentStateMedianIncome } from '../../../helper/helperFunctions';

function getMassHealthEligibility(client) {
    let percentSmi = percentStateMedianIncome(parseInt(client.annualIncome), client.householdSize);
    if (client.annualIncome == 0 || percentSmi < 120) {
        return {result: 'good', details: 'All good!', benefitValue: 600};
    } else if (percentSmi > 120 && percentSmi < 130) {
        return {result: 'information', details: `Your income puts you at ${percentSmi.toFixed()}% of the state median income, which is close to the 130% limit.`, benefitValue: 600};
    } else {
        return {result: 'warning', details: `Your income puts you at ${percentSmi.toFixed()}% of the state median income, which is above the 130% limit.`, benefitValue: 0};
    }
}

export {getMassHealthEligibility};