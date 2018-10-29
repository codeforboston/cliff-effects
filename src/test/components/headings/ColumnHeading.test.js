import React from 'react';
import { mount } from 'enzyme';

import { ColumnHeading } from '../../../components/headings';

describe('<ColumnHeading>', () => {
  it('renders with provided props and calculated class name', () => {
    const props = {
      type:     'Monthly',
      colName:  'income',
      style:    { color: 'red' },
      children: <span>Text~</span>,
    };
    expect(mount(<ColumnHeading { ...props } />)).toMatchSnapshot();
  });
});
