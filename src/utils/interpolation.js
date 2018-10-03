/** Allows insertion of provided components at specified points in a translated text block. */

import React from 'react';

// To make sure all keys are unique
var count = 0;

/** Interpolate components into a single text block (specified as an array) */
const interpolateText = function (template, components, langCode) {
  return template.map((item) => {

    count++;

    var props = {
      key:       item.name || langCode + count,
      lang:      langCode,
      className: `snippet`,
    };

    if (typeof(item) === 'string') {
      return <span { ...props }>{ item }</span>;
    }

    // Maybe this should create a warning in the console
    if (!item.name || !components[ item.name ]) {
      return null;
    }

    // Item is component
    var component = components[ item.name ];
    props.className = props.className + ` ` + component.props.className;

    if (item.text) {
      // replace inner text
      return React.cloneElement(component, props, item.text);
    } else {
      // otherwise just add the required key and the language code
      return React.cloneElement(component, props);
    }
  });
};

/** Recursively interpolate each template in a snippets object */
const interpolateSnippets = function (snippets, components) {
  var named        = {},
      versionRegex = /_v\d+$/;

  for (let key in snippets) {
    let newKey = `i_` + key.replace(versionRegex, ``),
        value = snippets[ key ];

    count++;
    var langCode = snippets.langCode;

    var props = {
      key:       langCode + count,
      lang:      langCode,
      className: `snippet`,
    };

    if (key === 'langCode') {
      // don't wrap the langCode, it's just metadata
      named[ key ] = value;
    } else if (typeof(value) === 'string') {
      // plain translated string
      named[ newKey ] = (<span { ...props }>{ value }</span>);
    } else if (Array.isArray(value)) {
      // template for interpolation
      named[ newKey ] = interpolateText(value, components, langCode);
    } else {
      // else: value is a nested object
      value.langCode = langCode;
      named[ key ] = interpolateSnippets(value, components);
    }

  }  // end for every key in snippets

  return named;
};


export { interpolateText, interpolateSnippets };
