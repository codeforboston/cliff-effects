// REACT COMPONENTS
import React from 'react';
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
const HouseholdSizeContent = ({ client, time, storeChecked, storeComplex }) => {

  /** Makes sure values are propagated to 'future' properties if needed */
  var ensureFutureComplex = function ( evnt, inputProps ) {

    var keyOfFuture = inputProps.name.replace( 'current', 'future' );
    if ( !client[ keyOfFuture ] ) {
      storeComplex( evnt, { name: keyOfFuture, value: inputProps.value } );
    }

    // Do the usual thing too
    storeComplex( evnt, inputProps );

  };  // End ensureFutureComplex()


  /** Makes sure values are propagated to 'future' properties if needed */
  var ensureFutureChecked = function ( evnt, inputProps ) {
    
    var keyOfFuture = inputProps.name.replace( 'current', 'future' );
    if ( !client[ keyOfFuture ] ) {
      storeChecked( evnt, { name: keyOfFuture, checked: inputProps.checked } );
    }

    // Do the usual thing too
    storeChecked( evnt, inputProps );

  };  // End ensureFutureChecked()


  var numberChange = function ( evnt, inputProps ) {
    var val = limit( inputProps.value, { min: inputProps.min, max: inputProps.max } );
    ensureFutureComplex( evnt, {name: inputProps.name, value: val} );
  };


  return (      
    <wrapper className={'field-aligner'}>

      <Form.Field inline>
        <Input
          className = {time + 'HouseholdSize'}
          onChange  = {numberChange}
          value     = {client[ time + 'HouseholdSize' ] || 1}
          name      = {time + 'HouseholdSize'}
          type={'number'} step={1} min={1} max={8} />
        <wrapper>
          <label>Number of members in the household</label>
          <InlineLabelInfo>Including live-in aides.</InlineLabelInfo>
        </wrapper>
      </Form.Field>

      <Form.Field inline>
        <Input
          className = {time + 'Dependents'}
          onChange  = {numberChange}
          value     = {client[ time + 'Dependents' ] || ''}
          name      = {time + 'Dependents'}
          type={'number'} step={1} min={0} max={client[ time + 'HouseholdSize' ] - 1 || 0} />
        <wrapper>
          <label>Number of dependents</label>
          <InlineLabelInfo>Members that are under 18, disabled, handicapped, and/or a full-time student. Cannot include the head of household, their spouse, or foster children.</InlineLabelInfo>
        </wrapper>
      </Form.Field>

      <Form.Field inline>
        <Input
          className = {time + 'ChildrenUnder12'}
          onChange  = {numberChange}
          value     = {client[ time + 'ChildrenUnder12' ] || ''}
          name      = {time + 'ChildrenUnder12'}
          type={'number'} step={1} min={0} max={client[ time + 'HouseholdSize' ] - 1} />
        <wrapper>
          <label>Number of children under 12</label>
        </wrapper>
      </Form.Field>

      <MassiveToggle name={time + 'DisabledOrElderlyHeadOrSpouse'} value={client[ time + 'DisabledOrElderlyHeadOrSpouse' ]}
        storeChecked={ensureFutureChecked}
        label={'Is the head of household or their spouse considered disabled, handicapped, or elderly (62 or older)?'} />

      {/** Really should be split into disabled under 12 and other disabled? */}
      <MassiveToggle name={time + 'DisabledOrElderlyMember'} value={client[ time + 'DisabledOrElderlyMember' ]}
        storeChecked={ensureFutureChecked}
        label={'Are any other household members, including children, considered disabled, handicapped, or elderly (62 or older)?'} />

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
    <Form className='current-household-size-form'>
      <FormPartsContainer
        title     = {'Household'}
        clarifier = {'Information about the members of the household.'}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
			<HouseholdSizeContent storeChecked={props.storeChecked} storeComplex={props.storeComplex} client={props.pageState} time={'current'} />
      </FormPartsContainer>
    </Form>
  );

};  // End HouseholdSizeStep()

export { HouseholdSizeStep };
