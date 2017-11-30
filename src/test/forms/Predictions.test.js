import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PredictionsStep } from '../../forms/Predictions';
import VisitPage from '../../containers/VisitPage';

configure({ adapter: new Adapter() });

test('Prediction component renders as snapshot correctly', () => {
  const match = {params: {clientId: 1}};
  const visitPageInstance = new VisitPage({match}); //mock container to pass in callbacks
  const rendered = renderer.create(
    <PredictionsStep
      currentStep={visitPageInstance.state.currentStep}
      client={visitPageInstance.state.client}
      nextStep={visitPageInstance.nextStep}
      previousStep={visitPageInstance.previousStep}
      setClientProperty={visitPageInstance.setClientProperty}
      changeClient={visitPageInstance.changeClient}
      saveForm={visitPageInstance.saveForm}
     />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});