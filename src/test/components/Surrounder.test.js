import React from 'react';
import { mount } from 'enzyme';

import { Surrounder } from '../../components/Surrounder';

describe('<Surrounder>', () => {
  it('renders provided nodes', () => {
    const Top = () => {
      return null;
    };
    const Right = () => {
      return null;
    };
    const Bottom = () => {
      return null;
    };
    const Left = () => {
      return null;
    };
    const Content = () => {
      return null;
    };

    const props = {
      Top:      <Top />,
      Right:    <Right />,
      Bottom:   <Bottom />,
      Left:     <Left />,
      children: <Content />,
    };

    expect(mount(<Surrounder { ...props } />)).toMatchSnapshot();
  });
});
