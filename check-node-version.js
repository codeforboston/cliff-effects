const fs = require('fs');
const path = require('path');

const targetVersion = fs.readFileSync(path.resolve(__dirname, '.nvmrc'), { encoding: 'utf8' })
  // strip trailing and leading whitespace
  .replace(/\s*$/, '').replace(/^\s*/, '');

if (process.version !== targetVersion) {
  const separator = '===========================================================';
  console.warn(
    separator + '\nUsing the wrong Node version; expected ' + targetVersion + ', got ' + process.version +
    '\n' + separator
  );
}
