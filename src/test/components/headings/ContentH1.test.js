import React from 'react';
import { mount } from 'enzyme';

import { ContentH1 } from '../../../components/headings';

describe('<ContentH1>', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <ContentH1 subheading="Less important text">
        Some text
      </ContentH1>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
