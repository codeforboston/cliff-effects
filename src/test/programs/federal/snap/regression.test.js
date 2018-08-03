import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { cloneDeep, extend } from 'lodash';

import { CLIENT_DEFAULTS } from '../../../../utils/CLIENT_DEFAULTS';
import { getSNAPBenefits } from '../../../../programs/federal/snap';

test('getSNAPBenefits() matches saved results', (done) => {
  const rl = readline.createInterface({ input: fs.createReadStream(path.resolve(__dirname, 'test-cases.txt')) });
  // console.log('blah');
  rl.on('line', (line) => {
    // console.log(line);
    // try {
      const [
        setupStr,
        expectedStr, 
      ] = line.split(';');
      const client = cloneDeep(CLIENT_DEFAULTS);
      extend(client.current, JSON.parse(setupStr));
      expect(getSNAPBenefits(client, 'current')).toEqual(+expectedStr);
    // } catch (err) {
    //   console.log('======================\n======================\n======================\n======================\n======================\n======================\n======================\n======================\n======================\n');
    //   console.log(line);
    //   console.log('======================\n======================\n======================\n======================\n======================\n======================\n======================\n======================\n======================\n');
    // }
    
  });

  rl.on('close', done);
});
