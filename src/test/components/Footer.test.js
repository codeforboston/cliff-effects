import React from 'react';
import { mount } from 'enzyme';

import Footer from '../../components/Footer';
import { snippets } from '../helpers';

describe('<Footer>', () => {
  it('matches snapshot', () => {
    expect(() => {
      mount(<Footer snippets={ snippets } />);
    }).not.toThrow();
  });
});
