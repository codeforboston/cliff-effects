import React from 'react';
import { shallow } from 'enzyme';

import { ShowOnYes } from '../../forms/ShowOnYes';

test('showonyes component renders as expected', () => {
  const wrapper = shallow(<ShowOnYes />);
  expect(wrapper).toMatchSnapshot();
});







