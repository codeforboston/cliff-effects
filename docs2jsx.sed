# hold onto the html tag
/^<html/ {
  s/>/ \/>/   # make it self-closing
  h
}

# replace HTML header with beginning of JSX file
1 c import React from 'react';
2 c import { Helmet } from 'react-helmet';
3 {
  s/.*/\
export default () => {\
  return (\
    <div>\
      <Helmet>/
  G # insert the html tag
}

# contents of <head> go into the <Helmet>
# fix for annoying meta tag
s/\(<meta .*'\)>/\1 \/>/

# delete <link>s (handled separately)
/<link/ d

# delete end of <head>
/^<\/head>/ d

# put the <body> in and end the <Helmet>
/^<body/ {
  s/>/ \/>/ # make it self-closing
  a </Helmet>
}

# *IMPT*: change all class's to className's
# note this is not foolproof (HTML is not a regular language) but hopefully good enough?
s/ class=/ className=/g

# this seems suboptimal, oh well... assumes no nested curly brackets
s/{\([^}]*\)}/{\'{\1}\'}/g

# annoying <pre> tags
s/<pre[^>]*>/&{`/g
s/<\/pre>/`}&/g

# replace end of <body> with end of enclosing <div>
/^<\/body/ c \ \ </div>);

# replace end of <html> with end of arrow functions
/^<\/html/ c };