import React from 'react';

// To make sure all keys are unique
let count = 0;

/** Interpolate components into a single text block (specified as an
 * array).
 */
const interpolateText = function (template, components, langCode) {
  return template.map((item) => {

    count++;

    let props = {
      key:       item.name || langCode + count,
      lang:      langCode,
      className: `translation`,
    };

    if (typeof(item) === 'string') {
      return <span { ...props }>{ item }</span>;
    }

    // Maybe this should create a warning in the console
    if (!item.name || !components[ item.name ]) {
      return null;
    }

    // Item is component
    let component = components[ item.name ];
    props.className = props.className + ` ` + component.props.className;

    if (item.text) {
      // replace inner text
      return React.cloneElement(component, props, item.text);
    } else {
      // otherwise just add the required key and the language code
      return React.cloneElement(component, props);
    }
  });
};  // Ends interpolateText()


/** Recursively interpolate each template in a translations object.
 * Allows insertion of provided components at specified points
 * in a translated text block.
 */
const interpolateTranslations = function (translations, components) {
  let named        = {},
      versionRegex = /_v\d+$/;

  for (let key in translations) {
    let newKey = `i_` + key.replace(versionRegex, ``),
        value = translations[ key ];

    count++;
    let langCode = translations.langCode;

    let props = {
      key:       langCode + count,
      lang:      langCode,
      className: `translation`,
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
      named[ key ] = interpolateTranslations(value, components);
    }

  }  // ends for every key in translations

  return named;
};  // Ends interpolateTranslations()


export {
  interpolateText,
  interpolateTranslations,
};
