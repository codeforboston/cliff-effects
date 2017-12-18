import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PredictionsStep } from '../../forms/Predictions';

import { CLIENT_DEFAULTS } from '../../utils/CLIENT_DEFAULTS';

configure({ adapter: new Adapter() });

test('Prediction component renders as snapshot correctly', () => {
  const nextStep = jest.fn();
  const previousStep = jest.fn();
  const setClientProperty = jest.fn();
  const changeClient = jest.fn();
  const saveForm = jest.fn();
  const rendered = renderer.create(
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
  expect(rendered.toJSON()).toMatchSnapshot();
});