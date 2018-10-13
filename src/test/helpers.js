import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

export const snippets = new Proxy({}, {
  get() {
    return 'Some translated text.';
  },
});

export const withRouter = (node) => {
  return <Router>{node}</Router>;
};
