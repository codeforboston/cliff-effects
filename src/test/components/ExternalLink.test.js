import React from 'react';
import { mount } from 'enzyme';

import { ExternalLink } from '../../components/ExternalLink';

describe('<ExternalLink>', () => {
  it('matches snapshot', () => {
    expect(mount(<ExternalLink href="http://example.com" />)).toMatchSnapshot();
  });
});
