import React from 'react';
import { mount } from 'enzyme';

import { StepBar } from '../../components/StepBar';
import { STEP_VALS } from '../../forms/STEP_VALS';
import { translations } from '../helpers';

describe('<StepBar>', () => {
  const goToStep = jest.fn();
  const defaultProps = {
    currentStepKey: STEP_VALS[ 0 ].key,
    goToStep:       goToStep,
    translations:   translations,
  };

  const buildWrapper = (props = {}) => {
    return mount(<StepBar
      { ...defaultProps }
      { ...props } />);
  };

  afterEach(() => {
    goToStep.mockReset();
  });

  it('renders STEP_VALS with active prop', () => {
    expect(buildWrapper({ currentStepKey: STEP_VALS[ 0 ].key }).find('Step').at(0).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEP_VALS[ 1 ].key }).find('Step').at(1).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEP_VALS[ 2 ].key }).find('Step').at(2).prop('active')).toBe(true);
  });

  it('calls goToStep with expected index', () => {
    const wrapper = buildWrapper();

    wrapper.find('Step').at(0).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_VALS[ 0 ].key });

    wrapper.find('Step').at(1).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_VALS[ 1 ].key });

    wrapper.find('Step').at(2).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_VALS[ 2 ].key });
  });
});
