import React from 'react';
import { mount } from 'enzyme';

import { IntervalColumnHeadings } from '../../../components/headings';

describe('<IntervalColumnHeadings>', () => {
  it('matches snapshot', () => {
    expect(mount(<IntervalColumnHeadings type="ALL CAPS" />)).toMatchSnapshot();
    expect(mount(<IntervalColumnHeadings type="all lowercase" />)).toMatchSnapshot();
    expect(mount(<IntervalColumnHeadings type="1WITH 2NUMBERS" />)).toMatchSnapshot();
  });
});
