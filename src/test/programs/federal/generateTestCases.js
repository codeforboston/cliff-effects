import fs from 'fs';
import { clone, cloneDeep, extend, head, tail, times, sample } from 'lodash';

import { getSNAPBenefits } from '../../../programs/federal/snap';
import { CLIENT_DEFAULTS } from '../../../utils/CLIENT_DEFAULTS';

const stream = fs.createWriteStream('src/test/programs/federal/test-cases.txt');

const baseMember = { age: 30, m_role: 'member', m_disabled: false };
const bool = [true, false];
const clientData = {
  numMembers: [1, 2, 3, 6, 8, 12],
  firstMember: [
    extend({}, baseMember, { m_age: 12 }),
    extend({}, baseMember, { m_disabled: true }),
    extend({}, baseMember, { m_age: 60 }),
    extend({}, baseMember, { m_role: 'head' }),
    extend({}, baseMember, { m_role: 'spouse' }),
    baseMember,
  ],
  earned: [0, 100, 1000, 5000, 10000, 30000],
  shelter: ['homeless', 'homeowner', 'renter', 'housingVoucher'],
  climateControl: bool,
  nonHeatElectricity: bool,
  phone: bool,
  fuelAssistance: bool,
};

function writeTestCases(keys, setup = {}) {
  if (keys.length === 0) {
    setup.members = [setup.firstMember];
    times(setup.numMembers - 1, () => setup.members.push(baseMember));
    delete setup.firstMember;
    delete setup.numMembers;

    const client = cloneDeep(CLIENT_DEFAULTS);
    extend(client.current, setup);

    const benefits = getSNAPBenefits(client, 'current');
    stream.write(`${JSON.stringify(setup)};${benefits}\n`);
  } else {
    const key = head(keys);
    const rest = tail(keys);
    clientData[key].forEach(value => {
      writeTestCases(rest, extend({}, setup, { [key]: value }))
    });
  }
}

writeTestCases(Object.keys(clientData));

stream.end();
