import React from 'react';
import { mount } from 'enzyme';

import { PageLayout } from '../../components/PageLayout';

describe('<PageLayout>', () => {
  it('renders children', () => {
    const wrapper = mount(
      <PageLayout>
        Some content
      </PageLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
