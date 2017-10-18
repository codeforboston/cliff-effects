// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer, MassiveToggle
} from './formHelpers';


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
const CurrentBenefitsContent = ({ client, storeChecked }) => {

  return (
    <wrapper className={'field-aligner'}>
      <MassiveToggle
        label={{ children: client.hasSnap ? <strong>SNAP</strong> : 'SNAP' }}
        checked={client.hasSnap}
        onChange={storeChecked}
        name='hasSnap' />
      <br/>
      <MassiveToggle
        label={{ children: client.hasHousing ? <strong>Section 8 Housing</strong> : 'Section 8 Housing' }}
        checked={client.hasHousing}
        onChange={storeChecked}
        name='hasHousing' />
      <br/>
      <MassiveToggle
        label={{ children: client.hasMassHealth ? <strong>MassHealth</strong> : 'MassHealth' }}
        checked={client.hasMassHealth}
        onChange={storeChecked}
        name='hasMassHealth' />
    </wrapper>
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

  return (
    <Form size='massive' className='household-size-form'>
      <FormPartsContainer
        title     = {'Current Benefits'}
        clarifier = {'Select the benefits you currently receive.'}
        right     = {{name: 'Next', func: props.nextStep}}>
          <CurrentBenefitsContent storeChecked={props.storeChecked} client={props.client} />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
