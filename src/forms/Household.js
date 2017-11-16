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
  Button,
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



const MemberButton = function ({ className, setClientProperty, children }) {
  return (
    <Button circular
      style={{ fontSize: '2rem', padding: '0', height: '1.25em', width: '1.25em' }}
      className={className}
      onChange={setClientProperty}
    >
        {children}
    </Button>
  );
};



// To be able to adjust sizes easily
const Columns = {};

Columns.One = function ({ style, children }) {
  return (
    <ColumnHeading
      type={'household'} colName={''}
      style={{...style, width: '5em'}}>
              {children}
    </ColumnHeading>
  );
}

Columns.Two = function ({ style, children }) {
  return (
    <ColumnHeading
      type={'household'} colName={''}
      style={{...style, width: '20em'}}>
              {children}
    </ColumnHeading>
  );
}

Columns.Three = function ({ style, children }) {
  return (
    <ColumnHeading
      type={'household'} colName={''}
      style={{...style, width: '8em'}}>
              {children}
    </ColumnHeading>
  );
}

Columns.Four = function ({ style, children }) {
  return (
    <ColumnHeading
      type={'household'} colName={''}
      style={{...style, width: '5em'}}>
              {children}
    </ColumnHeading>
  );
}

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

  var style = { display: 'inline-block', textAlign: 'center' };

  return (
    <wrapper className='field-aligner two-column'>
      <wrapper>
        <Columns.One style={style}>Add</Columns.One>
        <Columns.Two style={style}>Role</Columns.Two>
        <Columns.Three style={style}>Age</Columns.Three>
        <Columns.Four style={style}>Disabled</Columns.Four>
      </wrapper>
      <Columns.One style={style}>
        <MemberButton circular className={'add'} onChange={null}>+</MemberButton>
      </Columns.One>
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
