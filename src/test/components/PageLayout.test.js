import React from 'react';
import { mount } from 'enzyme';

import { PageLayout } from '../../components/PageLayout';

describe('<PageLayout>', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <PageLayout>
        Some content
      </PageLayout>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
