import React from 'react';
import { mount } from 'enzyme';

import { ContentH1 } from '../../../components/headings';

describe('<ContentH1>', () => {
  it('renders nothing with no children', () => {
    expect(mount(<ContentH1 />).children().exists()).toBe(false);
  });

  it('renders subheading', () => {
    const wrapper = mount(
      <ContentH1 subheading="Less important text">
        Some text
      </ContentH1>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
