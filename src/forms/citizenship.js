
import React, { Component } from 'react';
import { Form, Segment, Radio } from 'semantic-ui-react';

// Our Components
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
const CitizenshipContent = (props) => {

	var origin = props.origin,
      client = origin.pageState;

  return (
    <wrapper className={'field-aligner'}>
      <Form.Field>
        <Radio
          label='US Citizen / National'
          name='citizenshipStatus'
          value='citizen'
          checked={client.citizenshipStatus === 'citizen'}
          onChange={origin.storeComplex}
        />
      </Form.Field>
      <br/>
      <Form.Field>
        <Radio
          label='Lawfully present immigrant / AWSS'
          name='citizenshipStatus'
          value='immigrant'
          checked={client.citizenshipStatus === 'immigrant'}
          onChange={origin.storeComplex}
        />
      </Form.Field>
      <br/>
      <Form.Field>
        <Radio
          label="Don't Know"
          name='citizenshipStatus'
          value='unknown'
          checked={client.citizenshipStatus === 'unknown'}
          onChange={origin.storeComplex}
        />
      </Form.Field>
    </wrapper>
  );  // end return

};  // End CitizenshipContent()

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const CitizenshipStep = function ( props ) {

  return (
    <Form className='citizenship-form'>
      <FormPartsContainer
        title     = {'Citizenship Status'}
        clarifier = {'Select your citizenship status.'}
        next      = {props.nextStep}
        prev      = {props.previousStep} >
        <CitizenshipContent origin={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End CitizenshipStep()

export { CitizenshipStep };
