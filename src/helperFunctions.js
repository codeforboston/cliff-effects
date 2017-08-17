function percentPovertyLevel(annualIncome, householdSize) {
    var pov = new Map();
    pov.set(1,12060);
    pov.set(2,16240);
    pov.set(3,20420);
    pov.set(4,24600);
    pov.set(5,28780);
    pov.set(6,32960);
    pov.set(7,37140);
    pov.set(8,41320);

    return (100*(annualIncome)/(pov.get(householdSize))); 
}

function percentStateMedianIncome(annualIncome, householdSize) {
    var smi = new Map();
    smi.set(1,56668);
    smi.set(2,74105);
    smi.set(3,91542);
    smi.set(4,108978);
    smi.set(5,126415);
    smi.set(6,143852);
    smi.set(7,147120);
    smi.set(8,150390);

    return (100*(annualIncome)/(smi.get(householdSize))); 
}

function getSnapEligibility(client) {
    let percentPov = percentPovertyLevel(parseInt(client.annualIncome), client.householdSize);
    if (client.annualIncome == 0 || percentPov < 70) {
        return {result: 'good', details: 'All good!', benefitValue: 1000};
    } else if ( percentPov > 70 && percentPov < 80) {
        return {result: 'information', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is close to the 80% limit.`, benefitValue: 1000};
    } else {
        return {result: 'warning', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is above the 80% limit.`, benefitValue: 0};
    }
}

function getHousingEligibility(client) {
    let percentPov = parseInt(percentPovertyLevel(parseInt(client.annualIncome), client.householdSize));
    if (client.annualIncome == 0 || percentPov < 70) {
        return {result: 'good', details: 'All good!', benefitValue: 800};
    } else if (percentPov > 70 && percentPov < 80) {
        return {result: 'information', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is close to the 80% limit.`, benefitValue: 800};
    } else {
        return {result: 'warning', details: `Your income puts you at ${percentPov.toFixed()}% of the federal poverty level, which is above the 80% limit.`, benefitValue: 0};
    }
}

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


export {percentPovertyLevel, percentStateMedianIncome, getSnapEligibility, getHousingEligibility, getMassHealthEligibility};