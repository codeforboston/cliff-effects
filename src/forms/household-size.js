// REACT COMPONENTS
import React, { Component } from 'react';
import {
  Form, Input, // Radio
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer, MassiveToggle,
  InlineLabelInfo
} from './formHelpers';
import { limit } from '../helpers/math';


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
      client = origin.pageState,
      time   = 'previous';

  var numberChange = function ( evnt, inputProps ) {
    var val = limit( inputProps.value, { min: 0, max: inputProps.max } );
    origin.storeComplex( evnt, {name: inputProps.id, value: val} );
  };

  return (      
    <wrapper className={'field-aligner'}>

      {/*[1,2,3,4,5,6,7,8].map(size =>
        (<Form.Field key={size.toString()}>
          <Radio
            label={size}
            name='householdSize'
            value={size}
            checked={client.householdSize === size}
            onChange={origin.storeComplex}
          />
        </Form.Field>)
      )*/}

      <Form.Field inline>
        <Input
          className = {time + 'HouseholdSize'}
          onChange  = {numberChange}
          value     = {client[ time + 'HouseholdSize' ] || 1}
          name      = {time + 'HouseholdSize'}
          id        = {time + 'HouseholdSize'}
          type={'number'} step={1} min={0} max={8} />
        <wrapper>
          <label>Number of members in the household</label>
          <InlineLabelInfo>Including live-in aides.</InlineLabelInfo>
        </wrapper>
      </Form.Field>

      <Form.Field inline>
        <Input
          className = {time + 'Dependents'}
          onChange  = {numberChange}
          value     = {client[ time + 'Dependents' ] || 0}
          name      = {time + 'Dependents'}
          id        = {time + 'Dependents'}
          type={'number'} step={1} min={0} max={client[ time + 'HouseholdSize' ] - 1} />
        <wrapper>
          <label>Number of dependents</label>
          <InlineLabelInfo>Members that are under 18, disabled, handicapped, and/or a full-time student. Cannot include the head of household, their spouse, or foster children.</InlineLabelInfo>
        </wrapper>
      </Form.Field>

      <Form.Field inline>
        <Input
          className = {time + 'ChildrenUnder12'}
          onChange  = {numberChange}
          value     = {client[ time + 'ChildrenUnder12' ] || 0}
          name      = {time + 'ChildrenUnder12'}
          id        = {time + 'ChildrenUnder12'}
          type={'number'} step={1} min={0} max={client[ time + 'HouseholdSize' ] - 1} />
        <wrapper>
          <label>Number of children under 12</label>
        </wrapper>
      </Form.Field>

      <MassiveToggle id={time + 'DisabledOrElderlyHeadOrSpouse'} value={client[ time + 'DisabledOrElderlyHeadOrSpouse' ]}
        storeChecked={origin.storeChecked}
        label={'Was the head of household or their spouse considered disabled, handicapped, or elderly (62 or older)?'} />

      {/** Really should be split into disabled under 12 and other disabled? */}
      <MassiveToggle id={time + 'DisabledOrElderlyMember'} value={client[ time + 'DisabledOrElderlyMember' ]}
        storeChecked={origin.storeChecked}
        label={'Was any other household member, including children, considered disabled, handicapped, or elderly (62 or older)?'} />

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
    <Form className='previous-household-size-form'>
      <FormPartsContainer
        title     = {'Household'}
        clarifier = {'Information about the members of the household.'}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <HouseholdSizeContent origin={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End HouseholdSizeStep()

export { HouseholdSizeStep };
