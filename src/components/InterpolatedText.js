import React from 'react';

const InterpolatedText = function ({ template, elements }) {
  return template.map((item) => {
    if (typeof(item) === 'string') {
      return item;
    }

    if (!item.name || !elements[ item.name ]) {
      return null;
    }

    if (item.text) {
      // replace inner text
      return React.cloneElement(elements[ item.name ], { key: item.name }, item.text);
    } else {
      return React.cloneElement(elements[ item.name ], { key: item.name });
    }
  });
};

export { InterpolatedText };
