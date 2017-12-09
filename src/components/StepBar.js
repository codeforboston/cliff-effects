import React from 'react';
import { Step } from 'semantic-ui-react';

const StepBar = ({ steps, currentStepIndex, goToStep }) => {
  steps.forEach((step, index) => {
    step.completed = index < currentStepIndex
    step.active = index === (currentStepIndex - 1)
    step.onClick = (e) => { goToStep(index + 1) }
    step.key = index
  })

  return (<Step.Group className='six' size='mini' ordered items={steps} />)
}

export default StepBar