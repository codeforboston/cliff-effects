import React from 'react';
import { mount } from 'enzyme';

import { ContentSubH1 } from '../../../components/headings';

describe('<ContentSubH1>', () => {
  it('renders nothing when no children provided', () => {
    expect(mount(<ContentSubH1 />).children().exists()).toBe(false);
  });

  it('renders content', () => {
    const wrapper = mount(
      <ContentSubH1>
        Some text
        <span>And now an element!</span>
      </ContentSubH1>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
