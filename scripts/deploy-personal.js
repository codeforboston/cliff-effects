var ghpages = require('gh-pages');
var path = require('path');

// push the dev branch to the user's gh-pages branch
// creates a gh-pages branch if one does not exist
ghpages.publish('build');
