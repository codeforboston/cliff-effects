import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const translations = new Proxy({}, {
  get() {
    return 'Some translated text.';
  },
});

const initialEntries = [
  {
    pathname: '/',
    key:      'testKey',
  },
];

export const withRouter = (node) => {
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      {node}
    </MemoryRouter>
  );
};
