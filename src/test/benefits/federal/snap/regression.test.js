import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { cloneDeep, extend } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import { getSNAPBenefits } from '../../../../benefits/federal/snap';

test('getSNAPBenefits() matches saved results', (done) => {
  const rl = readline.createInterface({ input: fs.createReadStream(path.resolve(__dirname, 'test-cases.txt')) });

  rl.on('line', (line) => {
    const [
      setupStr,
      expectedStr,
    ] = line.split(';');
    const client = cloneDeep(CLIENT_DEFAULTS);
    extend(client.current, JSON.parse(setupStr));
    expect(getSNAPBenefits(client, 'current')).toEqual(+expectedStr);
  });

  rl.on('close', done);
}, 2 * jasmine.DEFAULT_TIMEOUT_INTERVAL); // time allotted for this test
