import React from 'react';
import { mount } from 'enzyme';

import { ContentSubH1 } from '../../../components/headings';

describe('<ContentSubH1>', () => {
  it('renders null when no children provided', () => {
    expect(mount(<ContentSubH1 />).html()).toBe(null);
  });

  it('matches snapshot', () => {
    const wrapper = mount(
      <ContentSubH1>
        Some text
        <span>And now an element!</span>
      </ContentSubH1>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
