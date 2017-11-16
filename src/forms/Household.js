// // REACT COMPONENTS
// import React from 'react';
// import {
//   Form, Input, // Radio
// } from 'semantic-ui-react';

// // // PROJECT COMPONENTS
// // import {
// //   FormPartsContainer, MassiveToggle,
// //   InlineLabelInfo
// // } from './formHelpers';

// REACT COMPONENTS
import React, { Component } from 'react';
import {
  // Button,
  Form,
  // Header,
  // Checkbox,
  // Divider,
  // Input
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer,
  FormHeading,
  ColumnHeading
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
const HouseholdContent = ({ client, time, setClientProperty }) => {

  var style = { display: 'inline-block' };

  return (
    <wrapper className='field-aligner two-column'>
      <wrapper>
        <ColumnHeading type={'household'} colName={''} style={{...style, width: '5em'}}>Add</ColumnHeading>
        <ColumnHeading type={'household'} colName={''} style={{...style, width: '20em'}}>Role</ColumnHeading>
        <ColumnHeading type={'household'} colName={''} style={{...style, width: '8em'}}>Age</ColumnHeading>
        <ColumnHeading type={'household'} colName={''} style={{...style, width: '5em'}}>Disabled</ColumnHeading>
      </wrapper>
    </wrapper>
  );
};  // End HouseholdContent()

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const HouseholdStep = function ( props ) {

  return (
    <Form className='current-household-size-form'>
      <FormPartsContainer
        title     = {'Household'}
        clarifier = {'Information about the members of your household.'}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
			<HouseholdContent setClientProperty={props.setClientProperty} client={props.client} time={'current'} />
      </FormPartsContainer>
    </Form>
  );

};  // End HouseholdStep()

export { HouseholdStep };
