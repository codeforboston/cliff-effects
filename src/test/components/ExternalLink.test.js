import React from 'react';
import { mount } from 'enzyme';

import { ExternalLink } from '../../components/ExternalLink';

describe('<ExternalLink>', () => {
  it('renders with provided props', () => {
    const props = {
      children:    <span className="some-icon" />,
      href:        'http://example.com',
      anotherprop: 'pass me through please',
    };
    expect(mount(<ExternalLink { ...props } />)).toMatchSnapshot();
  });
});
