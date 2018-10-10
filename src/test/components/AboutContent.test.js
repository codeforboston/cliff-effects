import React from 'react';
import { mount } from 'enzyme';

import { AboutContent } from '../../components/AboutContent';

const snippets = new Proxy({}, {
  get() {
    return 'Some translated text.';
  },
});

describe('<AboutContent>', () => {
  it('matches snapshot', () => {
    expect(mount(<AboutContent snippets={snippets} />)).toMatchSnapshot();
  });
});
