// REACT COMPONENTS
import React from 'react';
import { Form, } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, ControlledRadioYesNo } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';

const LocalizedRadioYesNo = function ({ translate, checked, name, onChange }) {

  return (
    <ControlledRadioYesNo
      checked   = {checked}
      labelText = {translate(name + '.label')}
      name      = {name}
      onChange  = {onChange} />
  );
};

/** @todo description
*
* @todo Add 'vertical list of options' creator that will create a list of fields using the `.field-aligner` class
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const CurrentBenefitsContent = ({ current, setClientProperty, translate }) => {

  return (
    <div >
      <LocalizedRadioYesNo
        checked   = {current.hasSection8}
        name      = {'hasSection8'}
        onChange  = {setClientProperty}
        translate = {translate}
      />
      <LocalizedRadioYesNo
        checked   = {current.hasSnap}
        name      = {'hasSnap'}
        onChange  = {setClientProperty}
        translate = {translate}
      />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()

/** @todo description
*
* @function
* @param {object} props
* @property {object} props.changeClient - explanation
* 
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const CurrentBenefitsStep = ({ changeClient, nextStep, client, translate }) => {

  const setTimeProp = getTimeSetter( 'current', changeClient );

  return (
    <Form size='massive' className='household-size-form flex-item flex-column'>
      <FormPartsContainer
        title     = {'Current Benefits'}
        clarifier = {'Select the benefits you currently receive.'}
        right     = {{name: 'Next', func: nextStep}}>
          <CurrentBenefitsContent
            setClientProperty = {setTimeProp}
            current           = {client.current}
            translate         = {translate} />
      </FormPartsContainer>

    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
