#!/bin/sh
# runs documentation.js to generate HTML documentation, then transforms the
# result to get it to work with React.

# generate docs
echo Generating documentation...
node_modules/.bin/documentation build src/index.js -f html -o docs

# make into a JSX file
echo Converting to JSX...
# deal with CSS imports
grep '<link' docs/index.html | \
  sed -e "s/^\s*<link href='\([^']*'\).*$/import '.\/\1;/" > src/docs/DocsPage.js
sed -f docs2jsx.sed docs/index.html >> src/docs/DocsPage.js
cp -r docs/assets src/docs
node_modules/.bin/eslint --fix src/docs/DocsPage.js