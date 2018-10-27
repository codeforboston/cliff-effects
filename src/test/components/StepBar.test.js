import React from 'react';
import { mount } from 'enzyme';

import StepBar from '../../components/StepBar';
import { STEPS } from '../../constants';
import { snippets } from '../helpers';

describe('<StepBar>', () => {
  const goToStep = jest.fn();
  const defaultProps = {
    currentStepKey: STEPS[ 0 ].key,
    goToStep:       goToStep,
    snippets:       snippets,
  };

  const buildWrapper = (props = {}) => {
    return mount(<StepBar
      { ...defaultProps }
      { ...props } />);
  };

  afterEach(() => {
    goToStep.mockReset();
  });

  it('renders steps with active prop', () => {
    expect(buildWrapper({ currentStepKey: STEPS[ 0 ].key }).find('Step').at(0).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEPS[ 1 ].key }).find('Step').at(1).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEPS[ 2 ].key }).find('Step').at(2).prop('active')).toBe(true);
  });

  it('calls goToStep with expected index', () => {
    const wrapper = buildWrapper();

    wrapper.find('Step').at(0).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEPS[ 0 ].key });

    wrapper.find('Step').at(1).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEPS[ 1 ].key });

    wrapper.find('Step').at(2).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEPS[ 2 ].key });
  });

  it('matches snapshot', () => {
    expect(buildWrapper()).toMatchSnapshot();
  });
});
