import fs from 'fs';
import { cloneDeep, extend, head, tail, times, sample } from 'lodash';

import { getSNAPBenefits } from '../../../programs/federal/snap';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

const stream = fs.createWriteStream('src/test/programs/federal/test-cases.txt');

const bool = [true, false];
const memberData = {
  numMembers: [1, 2, 3, 6, 8, 12],
  earned: [0, 100, 1000, 5000, 10000, 30000],
  shelter: ['homeless', 'homeowner', 'renter', 'housingVoucher'],
  climateControl: bool,
  nonHeatElectricity: bool,
  phone: bool,
  fuelAssistance: bool,
};

function writeTestCases(keys, setup = {}) {
  if (keys.length === 0) {
    setup.members = generateMembers(setup.numMembers);
    delete setup.numMembers;

    const client = cloneDeep(CLIENT_DEFAULTS);
    extend(client.current, setup);

    const benefits = getSNAPBenefits(client, 'current');
    stream.write(`${JSON.stringify(setup)};${benefits}\n`);
  } else {
    const key = head(keys);
    const rest = tail(keys);
    memberData[key].forEach(value => {
      writeTestCases(rest, extend({}, setup, { [key]: value }))
    });
  }
}

writeTestCases(Object.keys(memberData));

stream.end();

function generateMembers(count) {
  const roles = ['head', 'spouse', 'member'];
  const members = [];

  if (count === 1) {
    members.push(generateMember(sample(roles)));
  } else {
    members.push(generateMember(sample(['head', 'member'])));
    members.push(generateMember(sample(['spouse', 'member'])));

    times(count - 2, () => members.push(generateMember('member')));
  }

  return members;
}

function generateMember(role) {
  const ages = [0, 11, 12, 13, 14, 30, 60, 61, 62, 63];
  const disabled = bool;

  return {
    m_role: role,
    m_age: sample(ages),
    m_disabled: sample(disabled)
  };
}
