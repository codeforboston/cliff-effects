var fs = require('fs');
var fileName = '../package.json';
var file = require(fileName);

file.homepage = 'remote';

fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
  if (err) return console.log(err);
  // console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});
