import React from 'react';
import { mount } from 'enzyme';

import { AboutContent } from '../../components/AboutContent';
import { snippets } from '../helpers';

describe('<AboutContent>', () => {
  it('renders', () => {
    expect(() => {
      mount(<AboutContent snippets={ snippets } />);
    }).not.toThrow();
  });
});
