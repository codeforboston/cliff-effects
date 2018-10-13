import React from 'react';
import { mount } from 'enzyme';

import StepBar from '../../components/StepBar';
import { snippets } from '../helpers';

describe('<StepBar>', () => {
  const goToStep = jest.fn();
  const steps = [
    'firstStep',
    'secondStep',
    'thirdStep',
  ].map(key => ({ key: key }));
  const defaultProps = {
    currentStepIndex: 1,
    goToStep: goToStep,
    snippets: snippets,
    steps: steps,
  };

  const buildWrapper = (props = {}) => {
    return mount(<StepBar {...defaultProps} {...props} />);
  };

  afterEach(() => {
    goToStep.mockReset();
  });

  it('renders steps with active prop', () => {
    expect(buildWrapper({ currentStepIndex: 1 }).find('Step').at(0).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepIndex: 2 }).find('Step').at(1).prop('active')).toBe(true);
    expect(buildWrapper({ currentStepIndex: 3 }).find('Step').at(2).prop('active')).toBe(true);
  });

  it('calls goToStep with expected index', () => {
    const wrapper = buildWrapper();

    wrapper.find('Step').at(0).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith(1);

    wrapper.find('Step').at(1).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith(2);

    wrapper.find('Step').at(2).simulate('click');
    expect(goToStep).toHaveBeenLastCalledWith(3);
  });

  it('matches snapshot', () => {
    expect(buildWrapper()).toMatchSnapshot();
  });
});
