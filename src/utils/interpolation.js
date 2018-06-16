/** Allows insertion of provided components at specified points in a translated text block. */

import React from 'react';
import { mapValues } from 'lodash';

/** Interpolate components into a single text block (specified as an array) */
const interpolateText = function (template, components) {
  return template.map((item) => {
    if (typeof(item) === 'string') {
      return item;
    }

    if (!item.name || !components[ item.name ]) {
      return null;
    }

    if (item.text) {
      // replace inner text
      return React.cloneElement(components[ item.name ], { key: item.name }, item.text);
    } else {
      return React.cloneElement(components[ item.name ], { key: item.name });
    }
  });
};

/** Recursively interpolate each template in a snippets object */
const interpolateSnippets = function (snippets, components) {
  return mapValues(snippets, (value) => {
    if (typeof(value) === 'string') {
      // plain translated string
      return value;
    }

    if (Array.isArray(value)) {
      // template for interpolation
      return interpolateText(value, components);
    }

    // else: value is a nested object
    return interpolateSnippets(value, components);
  });
};

export { interpolateText, interpolateSnippets };
