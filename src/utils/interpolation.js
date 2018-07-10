/** Allows insertion of provided components at specified points in a translated text block. */

import React from 'react';
import { mapValues } from 'lodash';

/** Interpolate components into a single text block (specified as an array) */
const interpolateText = function (template, components, langCode) {
  return template.map((item) => {
    if (typeof(item) === 'string') {
      return <span lang={ langCode }>{ item }</span>;
    }

    // Maybe this should create a warning in the console
    if (!item.name || !components[ item.name ]) {
      return null;
    }

    var props = {
      key:  item.name,
      lang: langCode,
    };

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
  return mapValues(snippets, (value) => {
    if (typeof(value) === 'string') {
      // plain translated string
      return <span lang={ snippets.langCode }>{ value }</span>;
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
