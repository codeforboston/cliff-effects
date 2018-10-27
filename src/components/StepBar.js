import React from 'react';
import { Step } from 'semantic-ui-react';

const StepBar = ({ steps, currentStepKey, goToStep, snippets }) => {

  var cleanSteps = [];

  steps.forEach((step, index) => {
    var newStep = { title: { content: snippets[ `i_` + step.key ] }};
    newStep.active = step.key === currentStepKey;
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
