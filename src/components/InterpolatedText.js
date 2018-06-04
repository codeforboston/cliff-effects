import React from 'react';

const InterpolatedText = function ({ template, components }) {
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

export { InterpolatedText };
