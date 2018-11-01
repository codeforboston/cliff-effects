import React from 'react';
import { mount } from 'enzyme';

import StepBar from '../../components/StepBar';
import { STEP_PROPS } from '../../forms/STEP_PROPS';
import { snippets } from '../helpers';

describe('<StepBar>', () => {
  const goToStep = jest.fn();
  const defaultProps = {
    currentStepKey: STEP_PROPS[ 0 ].key,
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

  it('renders STEP_PROPS with active prop', () => {
    expect(buildWrapper({ currentStepKey: STEP_PROPS[ 0 ].key }).find('Step').at(0).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEP_PROPS[ 1 ].key }).find('Step').at(1).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepKey: STEP_PROPS[ 2 ].key }).find('Step').at(2).prop('active')).toBe(true);
  });

  it('calls goToStep with expected index', () => {
    const wrapper = buildWrapper();

    wrapper.find('Step').at(0).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_PROPS[ 0 ].key });

    wrapper.find('Step').at(1).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_PROPS[ 1 ].key });

    wrapper.find('Step').at(2).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith({ key: STEP_PROPS[ 2 ].key });
  });
});
