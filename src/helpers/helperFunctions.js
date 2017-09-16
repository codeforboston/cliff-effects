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

export {
  percentPovertyLevel, percentStateMedianIncome
};
