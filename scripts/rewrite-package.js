// get remote repositories
require('simple-git')()
    .listRemote(['--get-url'], (err, data) => {
        if (!err) {
            console.log('Remote url for repository at ' + __dirname + ':');
            console.log(data);
 
            // write remote data to package.json
            var fs = require('fs');
            var fileName = '../package.json';
            var file = require(fileName);

            // data contains a newline char, removing before adding to json
            file.homepage =  data.replace(/\n/g, '');

            fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
            if (err) return console.log(err);
            console.log('writing to ' + fileName);
            });
        }
    });



