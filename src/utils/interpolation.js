/** Allows insertion of provided components at specified points in a translated text block. */

import React from 'react';
import { mapValues } from 'lodash';

/** Interpolate components into a single text block (specified as an array) */
const interpolateText = function (template, components, langCode) {
  var count = 0;

  return template.map((item) => {

    count++;

    var props = {
      key:  item.name || count,
      lang: langCode,
    };

    if (typeof(item) === 'string') {
      return <span { ...props }>{ item }</span>;
    }

    // Maybe this should create a warning in the console
    if (!item.name || !components[ item.name ]) {
      return null;
    }

    if (item.text) {
      // replace inner text
      return React.cloneElement(components[ item.name ], props, item.text);
    } else {
      // otherwise just add the required key and the language code
      return React.cloneElement(components[ item.name ], props);
    }
  });
};

/** Recursively interpolate each template in a snippets object */
const interpolateSnippets = function (snippets, components) {
  var count = 0;

  return mapValues(snippets, (value) => {
    count++;
    var props = {
      key:  count,
      lang: snippets.langCode,
    };

    if (typeof(value) === 'string') {
      // plain translated string
      return (<span { ...props }>{ value }</span>);
    }

    if (Array.isArray(value)) {
      // template for interpolation
      return interpolateText(value, components, snippets.langCode);
    }

    // else: value is a nested object
    return interpolateSnippets(value, components);
  });
};

export { interpolateText, interpolateSnippets };
