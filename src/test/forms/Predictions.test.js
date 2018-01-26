import React from 'react';
import { shallow } from 'enzyme';

import { PredictionsStep } from '../../forms/Predictions';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

test('Prediction component renders as snapshot correctly', () => {
  const nextStep = jest.fn();
  const previousStep = jest.fn();
  const setClientProperty = jest.fn();
  const changeClient = jest.fn();
  const saveForm = jest.fn();
  const wrapper = shallow(
    <PredictionsStep
      currentStep={1}
      client={CLIENT_DEFAULTS}
      nextStep={nextStep}
      previousStep={previousStep}
      setClientProperty={setClientProperty}
      changeClient={changeClient}
      saveForm={saveForm}
     />
  );
  expect(wrapper).toMatchSnapshot();
});