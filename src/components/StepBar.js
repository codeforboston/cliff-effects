import React from 'react';
import { Step } from 'semantic-ui-react';

const StepBar = ({ steps, currentStepIndex, goToStep, snippets }) => {

  var cleanSteps = [];

  steps.forEach((step, index) => {
    var newStep = { title: snippets[ step.key ] };
    newStep.completed = index < currentStepIndex;
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
