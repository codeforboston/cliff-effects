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
  Icon,
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



// To be able to adjust sizes easily
// Very specific to household size. May be worth creating
// a constructor for columns in general.

const columnStyle = { display: 'inline-block', textAlign: 'center' };
const Columns = {};

Columns.One = function ({ style, children }) {
  return ( <div style={{...columnStyle, width: '5em'}}> {children} </div> );
}

Columns.Two = function ({ style, children }) {
  return ( <div style={{...columnStyle, width: '20em'}}> {children} </div> );
}

Columns.Three = function ({ style, children }) {
  return ( <div style={{...columnStyle, width: '8em'}}> {children} </div> );
}

Columns.Four = function ({ style, children }) {
  return ( <div style={{...columnStyle, width: '5em'}}> {children} </div> );
}


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const ColumnHeader = function ({ style, children, columnNum }) {
  var Container = Columns[ columnNum ];

  return (
    <Container>
      <ColumnHeading type={'household'} colName={''}
        style={style}>
            { children }
      </ColumnHeading>
    </Container>
  );
};


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const MemberButton = function ({ className, onChange, iconName }) {
  return (
    <Button circular
      icon={iconName}
      style={{ padding: '0', height: '2.2em', width: '2.2em' }}
      className={className}
      onChange={onChange} />
  );
};


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const MemberField = function ({ household, time, setClientProperty, columnStyles }, indx ) {
  
  console.log( columnStyles );

  var member = household[ indx ];

  var removeMember = function ( evnt, inputProps ) {};  // End removeMember()

  // The font size thing is a bit weird, but... later
  return (
    <Form.Field key={member.key}>

      <Columns.One style={columnStyles}>
        <MemberButton className={'remove'} onChange={removeMember} iconName={'remove'}/>
      </Columns.One>

      <Columns.Two style={columnStyles}>Role</Columns.Two>

      <Columns.Three style={columnStyles}>Age</Columns.Three>

      <Columns.Four style={columnStyles}>Disabled</Columns.Four>

    </Form.Field>
  );
};  // End MemberField()


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const getMembers = function ( client, time, setClientProperty, columnStyles ) {

  var household = client[ time + 'Household' ],
      props     = {
        household:          household,
        time:               time,
        setClientProperty:  setClientProperty,
        columnStyles:       columnStyles
      },
      mems      = [];

  for (let memi = 0; memi < household.length; memi++) {
    mems.push( MemberField( props, memi ) );
  };

  return mems;
};  // End getMembers()


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
const HouseholdContent = function ({ client, time, setClientProperty }) {

  var style = { display: 'inline-block', textAlign: 'center' };

  var addMember = function ( evnt, inputProps ) {};  // End addMember()

  return (
    <wrapper className='field-aligner two-column'>
      <wrapper>
        <ColumnHeader columnNum='One' style={style}>Add</ColumnHeader>
        <ColumnHeader columnNum='Two' style={style}>Role</ColumnHeader>
        <ColumnHeader columnNum='Three' style={style}>Age</ColumnHeader>
        <ColumnHeader columnNum='Four' style={style}>Disabled</ColumnHeader>
      </wrapper>

      { getMembers( client, time, setClientProperty, style ) }

      <Columns.One style={style}>
        <MemberButton circular className={'add'} onChange={addMember} iconName={'plus'} />
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
