/** Allows insertion of provided components at specified points in a translated text block. */

import React from 'react';
import { mapValues } from 'lodash';

// To make sure all keys are unique
var count = 0;

/** Interpolate components into a single text block (specified as an array) */
const interpolateText = function (template, components, langCode) {
  return template.map((item) => {

    count++;

    var props = {
      key:  item.name || langCode + count,
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
  return mapValues(snippets, (value, key) => {

    count++;
    var langCode = snippets.langCode;

    var props = {
      key:  langCode + count,
      lang: langCode,
    };

    if (key === 'langCode') {
      // don't wrap the langCode, it's just metadata
      return value;
    } else if (typeof(value) === 'string') {
      // plain translated string
      return (<span { ...props }>{ value }</span>);
    } else if (Array.isArray(value)) {
      // template for interpolation
      return interpolateText(value, components, langCode);
    } else {
      // else: value is a nested object
      value.langCode = langCode;
      return interpolateSnippets(value, components);
    }

  });
};

export { interpolateText, interpolateSnippets };
