import React from 'react';
import { Step } from 'semantic-ui-react';

import { STEP_VALS } from '../forms/STEP_VALS';


const StepBar = ({ currentStepKey, goToStep, translations }) => {

  let cleanSteps = [];

  STEP_VALS.forEach((step, index) => {
    let newStep = { title: { content: translations[ `i_` + step.key ] }};

    newStep.active  = step.key === currentStepKey;
    newStep.onClick = function (event) { goToStep({ key: step.key }); };
    newStep.key     = index;

    cleanSteps[ index ] = newStep;
  });

  return (
    <Step.Group
      className = { `six` }
      size      = { `mini` }
      items     = { cleanSteps }
      ordered />
  );
};


export { StepBar };
