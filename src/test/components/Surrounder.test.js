import React from 'react';
import { mount } from 'enzyme';

import { Surrounder } from '../../components/Surrounder';

describe('<Surrounder>', () => {
  it('matches snapshot', () => {
    const Top = () => null;
    const Right = () => null;
    const Bottom = () => null;
    const Left = () => null;
    const Content = () => null;

    const props = {
      Top: <Top />,
      Right: <Right />,
      Bottom: <Bottom />,
      Left: <Left />,
      children: <Content />,
    };

    expect(mount(<Surrounder {...props} />)).toMatchSnapshot();
  });
});
