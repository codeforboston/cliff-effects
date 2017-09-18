// REACT COMPONENTS
import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer
} from './formHelpers';


/** @todo description
* 
* @todo Could this be a number field? If not, then a dropdown?
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const HouseholdSizeContent = (props) => {

  var origin = props.origin,
      client = origin.pageState;

  return (      
    <wrapper className={'field-aligner'}>
      {[1,2,3,4,5,6,7,8].map(size =>
        (<Form.Field key={size.toString()}>
          <Radio
            label={size}
            name='householdSize'
            value={size}
            checked={client.householdSize === size}
            onChange={origin.storeComplex}
          />
        </Form.Field>)
      )}
    </wrapper>
  )
};  // End HouseholdSizeContent()

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const HouseholdSizeStep = function ( props ) {

  return (
    <Form className='household-size-form'>
      <FormPartsContainer
        title     = {'Household Size'}
        clarifier = {'Select the number of people in your household including yourself.'}
        next      = {props.nextStep}
        prev      = {props.previousStep} >
        <HouseholdSizeContent origin={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End HouseholdSizeStep()

export { HouseholdSizeStep };
