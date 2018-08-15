import React from 'react';
/**
 * Link that opens new tab
 */
const ExternalLink = function ({ href, children }) {
  return (
    <a
      href={ href }
      target='_blank'>{children}
    </a>);
};

export { ExternalLink };
