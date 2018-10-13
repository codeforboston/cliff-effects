import React from 'react';
import { mount } from 'enzyme';
import { times } from 'lodash';

import { HeadingWithDetail } from '../../../components/details';

describe('<HeadingWithDetails>', () => {
  const FirstChild = () => {
    return null;
  };
  const SecondChild = () => {
    return null;
  };

  const buildWrapper = () => {
    return mount(
      <HeadingWithDetail>
        <FirstChild />
        <SecondChild />
      </HeadingWithDetail>
    );
  };

  it('requires exactly two children', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      return null;
    }); // suppress warnings
    const mountNumChildren = (num) => {
      return mount(
        <HeadingWithDetail>
          {times(num, <div />)}
        </HeadingWithDetail>
      );
    };

    expect(mountNumChildren(0).children().exists()).toBe(false);
    expect(mountNumChildren(1).children().exists()).toBe(false);
    expect(mountNumChildren(3).children().exists()).toBe(false);

    expect(mountNumChildren(2).children().exists()).toBe(true);
  });

  it('always displays first child', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find(FirstChild).exists()).toBe(true);

    wrapper.setState({ showDetails: false });
    expect(wrapper.find(FirstChild).exists()).toBe(true);
  });

  it('hides second child by default', () => {
    expect(buildWrapper().find(SecondChild).exists()).toBe(false);
  });

  it('shows second child when icon clicked', () => {
    const wrapper = buildWrapper();
    wrapper.find('Icon').simulate('click');
    expect(wrapper.find(SecondChild).exists()).toBe(true);
  });

  it('shows second child when enter pressed', () => {
    const wrapper = buildWrapper();
    wrapper.find('span').simulate('keyDown', { key: 'Enter' });
    expect(wrapper.find(SecondChild).exists()).toBe(true);
  });
});
