import React from 'react';
import { Step } from 'semantic-ui-react';

const StepBar = ({ steps, currentStepIndex, goToStep, snippets }) => {

  const cleanSteps = [];

  steps.forEach((step, index) => {
    const newStep = { title: { content: snippets[ `i_` + step.key ] }};
    newStep.active = index === (currentStepIndex - 1);
    newStep.onClick = (e) => {
      goToStep(index + 1);
    };
    newStep.key = index;
    cleanSteps[ index ] = newStep;
  });

  return (<Step.Group
    className='six'
    size='mini'
    ordered
    items={ cleanSteps } />);
};

export default StepBar;
