// REACT COMPONENTS
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer, MassiveToggle
} from './formHelpers';


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const HealthContent = ({ setClientProperty, client }) => {

  return (
    <wrapper>

      <MassiveToggle
        label={client.qualifyingConditions ? {children: 'Yes'} : {children: 'No'}}
        checked={client.qualifyingConditions}
        onChange={setClientProperty}
        name='qualifyingConditions'
      />

      <br/>
      
      <Segment.Group>
        <Segment>Pregnant</Segment>
        <Segment>HIV+</Segment>
        <Segment>Disabled</Segment>
        <Segment>Woman with breast or cervical cancer</Segment>
      </Segment.Group>

    </wrapper>
  );
};  // End HealthContent()

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const HealthStep = function ( props ) {

  return (
    <Form className='health-form'>
      <FormPartsContainer
        title     = {'MassHealth Qualifying Conditions'}
        clarifier = {'Do you have any of the following MassHealth qualifying conditions?'}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
			<HealthContent setClientProperty={props.setClientProperty} client={props.client} />
      </FormPartsContainer>
    </Form>
  );

};  // End HealthStep()

export { HealthStep };
