// REACT COMPONENTS
import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer
} from './formHelpers';


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const CitizenshipContent = ({ setClientProperty, client }) => {

  return (
    <wrapper className={'field-aligner'}>
      <Form.Field>
        <Radio
          label='US Citizen / National'
          name='citizenshipStatus'
          value='citizen'
          checked={client.citizenshipStatus === 'citizen'}
          onChange={setClientProperty}
        />
      </Form.Field>
      <br/>
      <Form.Field>
        <Radio
          label='Lawfully present immigrant / AWSS'
          name='citizenshipStatus'
          value='immigrant'
          checked={client.citizenshipStatus === 'immigrant'}
          onChange={setClientProperty}
        />
      </Form.Field>
      <br/>
      <Form.Field>
        <Radio
          label="Don't Know"
          name='citizenshipStatus'
          value='unknown'
          checked={client.citizenshipStatus === 'unknown'}
          onChange={setClientProperty}
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
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <CitizenshipContent setClientProperty={props.setClientProperty} client={props.client} />
      </FormPartsContainer>
    </Form>
  );

};  // End CitizenshipStep()

export { CitizenshipStep };
