import React from 'react';
import { mount } from 'enzyme';

import { WithMessageAbove } from '../../../forms/formHelpers';

const NOT_EMPTY = 'Hi! I\'m not an empty string.',
      ariaName  = `id`;

const getMessage = (wrapper) => {
  let selector = `#` + ariaName + `Message`;
  return wrapper.find(selector);
};

describe(`<WithMessageAbove>`, () => {

  it(`renders no message if there's no message and no error`, () => {
    const wrapper = mount(
      <WithMessageAbove
        isUserError = { false }
        ariaName    = { ariaName }>
        { NOT_EMPTY }
      </WithMessageAbove>
    );
    expect(getMessage(wrapper)).toHaveLength(0);
  });

  it(`renders no message if there's no message, but there is an error`, () => {
    const wrapper = mount(
      <WithMessageAbove
        isUserError = { true }
        ariaName    = { ariaName }>
        { NOT_EMPTY }
      </WithMessageAbove>
    );
    expect(getMessage(wrapper)).toHaveLength(0);
  });

  it(`renders message if there's a message and no error`, () => {
    const wrapper = mount(
      <WithMessageAbove
        isUserError = { false }
        ariaName    = { ariaName }
        message     = { NOT_EMPTY }>
        { NOT_EMPTY }
      </WithMessageAbove>
    );
    expect(getMessage(wrapper)).toHaveLength(1);
  });

  it(`renders message if there's a message and an error`, () => {
    const wrapper = mount(
      <WithMessageAbove
        isUserError = { true }
        ariaName    = { ariaName }
        message     = { NOT_EMPTY }>
        { NOT_EMPTY }
      </WithMessageAbove>
    );
    expect(getMessage(wrapper)).toHaveLength(1);
  });

});
