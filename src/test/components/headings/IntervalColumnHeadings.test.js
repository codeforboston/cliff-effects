import React from 'react';
import { mount } from 'enzyme';

import { IntervalColumnHeadings } from '../../../components/headings';

describe('<IntervalColumnHeadings>', () => {
  it('renders with uppercase type', () => {
    expect(mount(<IntervalColumnHeadings type="ALL CAPS" />)).toMatchSnapshot();
  });

  it('renders with lowercase type', () => {
    expect(mount(<IntervalColumnHeadings type="all lowercase" />)).toMatchSnapshot();
  });

  it('renders with alphanumeric type', () => {
    expect(mount(<IntervalColumnHeadings type="1WITH 2NUMBERS" />)).toMatchSnapshot();
  });
});
