// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, ControlledRadioYesNo } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';


/** @todo description
*
* @todo Add "vertical list of options" creator that will create a list of fields using the `.field-aligner` class
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const CurrentBenefitsContent = ({ current, setClientProperty }) => {

  return (
    <div >
      <ControlledRadioYesNo
        labelText = "Do you have Section 8 Housing?"
        checked={current.hasHousing}
        name="hasHousing"
        onChange={setClientProperty}
      />
      <ControlledRadioYesNo
        labelText = "Do you have Snap?"
        checked={current.hasSnap}
        name="hasSnap"
        onChange={setClientProperty}
      />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()

/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const CurrentBenefitsStep = (props) => {

  const setTimeProp = getTimeSetter( 'current', props.changeClient );

  return (
    <Form size='massive' className='household-size-form flex-item flex-column'>
      <FormPartsContainer
        title     = {'Current Benefits'}
        clarifier = {'Select the benefits you currently receive.'}
        right     = {{name: 'Next', func: props.nextStep}}>
          <CurrentBenefitsContent
          setClientProperty={setTimeProp}
          current={props.client.current} />
      </FormPartsContainer>

    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
