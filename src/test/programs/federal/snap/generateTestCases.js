import fs from 'fs';
import path from 'path';

import { cloneDeep, sample, times } from 'lodash';
import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import {
  UNEARNED_INCOME_SOURCES,
  UNDER13_CARE_EXPENSES,
  OVER12_CARE_EXPENSES,
} from '../../../../data/massachusetts/name-cores';
import { getSNAPBenefits } from '../../../../programs/federal/snap';

export const FILE_NAME = 'test-cases.txt';
const NUMBER_TEST_CASES = 1000;
const randomizers = [
];

const defaultMember = { m_age: 30,
  m_disabled: false,
  m_role: 'member' };
const headMember = Object.assign({}, defaultMember, { m_role: 'head' });
const householdSize = (changes) => {
  const size = Math.ceil(Math.random() * 9);
  const members = [
    headMember,
  ];
  times(size - 1, () => {return members.push(defaultMember);});
  changes.household = members;
  return changes;
};
randomizers.push(householdSize);

const elderlyOrDisabled = (changes) => {
  const rnd = Math.random * 3;
  if (rnd < 1) {return changes;}

  const member = rnd < 2
    ? Object.assign({}, defaultMember, { m_disabled: true })
    : Object.assign({}, defaultMember, { m_age: 61 });
  changes.household.push(member);
  return changes;
};
randomizers.push(elderlyOrDisabled);

const under13Dependent = (changes) => {
  if (Math.random() < 0.5) {return changes;}

  changes.household.push(Object.assign({}, defaultMember, { m_age: 11 }));
  return changes;
};
randomizers.push(under13Dependent);

const earned = (changes) => {
  changes.earned = (Math.random() * 100) ** 2;
  return changes;
};
randomizers.push(earned);

const childSupportPaidOut = (changes) => {
  const rnd = Math.random();
  if (rnd < 0.66) {return changes;}

  changes.childSupportPaidOut = rnd * 2000;
  return changes;
};
randomizers.push(childSupportPaidOut);

const unearnedIncomeSources = (changes) => {
  UNEARNED_INCOME_SOURCES.forEach((key) => {
    changes[key] = (Math.random() * 50) ** 2;
  });
  return changes;
};
randomizers.push(unearnedIncomeSources);

const possibleShelters = [
  'homeless',
  'houseowner',
  'renter',
  'voucher',
];
const shelters = (changes) => {
  changes.shelter = sample(possibleShelters);
  return changes;
};
randomizers.push(shelters);

const possibleUtilityBrackets = [
  'Heating',
  'Non-heating',
  'Telephone',
  'None',
];
const utilityBrackets = (changes) => {
  switch (sample(possibleUtilityBrackets)) {
  case 'Heating':
    if (Math.random() < 0.5) {
      changes.climateControl = true;
    } else {
      changes.fuelAssistance = true;
    }
    break;
  case 'Non-heating':
    changes.nonHeatElectricity = true;
    break;
  case 'Telephone':
    changes.phone = true;
    break;
  }
  return changes;
};
randomizers.push(utilityBrackets);

const shelterFeeNames =
  [
    'mortgage',
    'propertyTax',
    'housingInsurance',
    'rent',
    'rentShare',
  ];
const shelterFees = (changes) => {
  shelterFeeNames.forEach((name) => {return changes[name] = (Math.random() * 50) ** 2 + 200;});
  return changes;
};
randomizers.push(shelterFees);

const disabledMedical = (changes) => {
  changes.disabledMedical = (Math.random() * 100) ** 2;
  return changes;
};
randomizers.push(disabledMedical);

const under13CareExpenses = (changes) => {
  UNDER13_CARE_EXPENSES.forEach((key) => {
    changes[key] = (Math.random() * 50) ** 2;
  });
  return changes;
};
randomizers.push(under13CareExpenses);

const over12CareExpenses = (changes) => {
  OVER12_CARE_EXPENSES.forEach((key) => {
    changes[key] = (Math.random() * 50) ** 2;
  });
  return changes;
};
randomizers.push(over12CareExpenses);

// write tests
const stream = fs.createWriteStream(path.resolve(__dirname, FILE_NAME));

times(NUMBER_TEST_CASES, () => {
  const changes = randomizers.reduce((changes, fn) => {return fn(changes);}, {});
  const client = { current: cloneDeep(CLIENT_DEFAULTS.current) };
  Object.assign(client.current, changes);
  const benefits = getSNAPBenefits(client, 'current');
  stream.write(`${JSON.stringify(changes)};${benefits}\n`);
});

stream.end();
