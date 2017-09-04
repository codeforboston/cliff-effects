import { percentPovertyLevel, 
    percentStateMedianIncome } from '../../../helpers/helperFunctions';

function getHousingEligibility(client) {
    let percentPov = parseInt(percentStateMedianIncome(parseInt(client.annualIncome), client.householdSize));
    if (client.annualIncome == 0 || percentPov < 70) {
        return {result: 'good', details: 'All good!', benefitValue: 800};
    } else if (percentPov > 70 && percentPov < 80) {
        return {result: 'information', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is close to the 80% limit.`, benefitValue: 800};
    } else {
        return {result: 'warning', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is above the 80% limit.`, benefitValue: 0};
    }
}

export {getHousingEligibility};