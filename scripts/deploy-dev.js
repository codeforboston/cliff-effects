var ghpages = require('gh-pages');
var path = require('path');

// push the dev branch to codeforbostons's gh-pages branch
ghpages.publish('build', {
    repo: 'https://github.com/codeforbostn/cliff-effects.git'
}, callback);
