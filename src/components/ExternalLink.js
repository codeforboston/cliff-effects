import React from 'react';

/** Link that opens new tab */
const ExternalLink = function ({ href, children, ...otherProps }) {
  return (
    <a
      href   = { href }
      target = { `_blank` }
      { ...otherProps }>

      { children }

    </a>
  );
};

export { ExternalLink };
