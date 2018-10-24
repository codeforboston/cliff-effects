import React from 'react';
import { mount } from 'enzyme';

import AboutPage from '../../containers/AboutPage';
import { snippets } from '../helpers';

describe('<AboutPage>', () => {
  it('renders', () => {
    expect(() => {
      return mount(<AboutPage snippets={ snippets } />);
    }).not.toThrow();
  });
});
