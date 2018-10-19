import React from 'react';
import { mount } from 'enzyme';

import { FormPartsContainer } from '../../forms/FormPartsContainer';

const NOT_EMPTY_STRING = 'text';
const identity = (x) => {
  return x;
};

const clarifierHeader = (container) => {
  return container.find('Header[as="h3"]');
};
const navButtons = (container) => {
  return container.find('div.form-section-bottom-row').children().map(identity);
};

describe('<FormPartsContainer>', () => {
  const defaultProps = {
    title:     'A form!',
    clarifier: 'You can enter stuff into the little boxes.',
    navData:   {}, // no navbuttons
    formClass: 'a-form',
    children:  <div />, // there isn't actually a form
  };

  const buildContainer = (props = {}) => {
    return (
      mount(<FormPartsContainer
        { ...defaultProps }
        { ...props } />)
    );
  };

  it('renders clarifier if provided', () => {
    expect(clarifierHeader(buildContainer({ clarifier: '' })).exists()).toBe(false);

    const header = clarifierHeader(buildContainer({ clarifier: NOT_EMPTY_STRING }));
    expect(header.exists()).toBe(true);
    expect(header.text()).toEqual(NOT_EMPTY_STRING);
  });

  it('uses navData to render navigation buttons', () => {
    const LEFT_TEXT = 'Back';
    const RIGHT_TEXT = 'Next';

    const navData = {
      left: <div
        children={ LEFT_TEXT }
        onClick={ jest.fn() } />,
      center: null,
      right:  <div
        children={ RIGHT_TEXT }
        onClick={ jest.fn() } />,
    };

    const [
      left,
      center,
      right, 
    ] = navButtons(buildContainer({ navData: navData }));

    expect(left.text()).toEqual(LEFT_TEXT);
    expect(center.is('SpaceHolder')).toBe(true);
    expect(right.text()).toEqual(RIGHT_TEXT);
  });

  it('renders provided children', () => {
    const child = <div className='render-me' />;
    const container = buildContainer({ children: child });
    expect(container.find('.render-me').exists()).toBe(true);
  });
});
