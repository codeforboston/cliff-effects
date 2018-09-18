// Node script to fix up the build folder after building
const fs = require('fs-extra');

// Move all the app stuff to build/app
try {
  fs.accessSync('build/app');
  // App folder already exists!
} catch (err) {
  console.log('Moving app to build/app...');
  const buildContents = fs.readdirSync('build');
  fs.mkdirSync('build/app');
  for (let filename of buildContents) {
    fs.renameSync('build/' + filename, 'build/app/' + filename);
  }
}

// Copy docs to build, if they exist
try {
  fs.accessSync('docs');
  console.log('Copying docs to build/docs...');
  fs.copySync('docs', 'build/docs');
} catch (err) {
  console.warn('Copying docs failed - documentation will not be available.');
}

// Copy redirect page to build
console.log('Putting redirect to app in the build root...');
fs.copyFileSync('redirect.html', 'build/index.html');
