import React from 'react';
import { mount } from 'enzyme';

import { CustomClient } from '../../components/CustomClient';

const enterText = (wrapper, text) => {
  wrapper.instance().handleChange({}, { value: text });
  wrapper.update();
};
const submit = (wrapper) => {
  wrapper.find('Form').simulate('submit');
};
const reset = (wrapper) => {
  wrapper.find('FormButton[children="Reset"] button').simulate('click');
};

describe('<CustomClient>', () => {
  const defaultValue = { key: 'value' };

  let load;
  let toRestore; // default values

  const buildWrapper = () => {
    return mount(<CustomClient
      load={ load }
      toRestore={ toRestore } />
    );
  };

  beforeEach(() => {
    load = jest.fn();
    toRestore = defaultValue;
  });

  it('displays error when given invalid JSON', () => {
    const wrapper = buildWrapper();
    const invalidJSON = '{,';
    
    enterText(wrapper, invalidJSON);
    expect(wrapper.state()).toEqual({
      toLoad: null,
      error:  expect.any(Object),
      json:   invalidJSON,
    });
  });

  it('saves parsed client when JSON entered', () => {
    const wrapper = buildWrapper();
    const client = { some: 'data' };
    const validJSON = JSON.stringify(client);

    enterText(wrapper, validJSON);
    expect(wrapper.state()).toEqual({
      toLoad: client,
      error:  null,
      json:   validJSON,
    });
  });

  it('when submitted, calls load function with parsed client', () => {
    const wrapper = buildWrapper();
    const client = { some: 'data' };
    wrapper.setState({ toLoad: client });

    submit(wrapper);
    expect(load).toHaveBeenCalledWith({ toLoad: client });

    expect(wrapper.state()).toEqual({
      toLoad: null,
      error:  null,
      json:   '',
    });
  });

  it('when reset, calls load function with default values', () => {
    const wrapper = buildWrapper();
    const client = { some: 'data' };
    wrapper.setState({ toLoad: client });

    reset(wrapper);
    expect(load).toHaveBeenCalledWith({ toLoad: toRestore });

    expect(wrapper.state()).toEqual({
      toLoad: null,
      error:  null,
      json:   '',
    });
  });
});
