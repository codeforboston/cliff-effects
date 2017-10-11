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
const HouseholdSizeContent = (props) => {

  var time   = 'previous';


  /** Makes sure values are propagated to 'current' properties if needed */
  var ensureCurrComplex = function ( evnt, inputProps ) {

    var keyOfCurr = inputProps.id.replace( 'previous', 'current' );
    if ( !props.client[ keyOfCurr ] ) {
      props.storeComplex( evnt, { name: keyOfCurr, value: inputProps.value } );
    }

    // Do the usual thing too
    props.storeComplex( evnt, inputProps );

  };  // End ensureCurrComplex()


  /** Makes sure values are propagated to 'current' properties if needed */
  var ensureCurrChecked = function ( evnt, inputProps ) {
    
    var keyOfCurr = inputProps.id.replace( 'previous', 'current' );
    if ( !props.client[ keyOfCurr ] ) {
      props.storeChecked( evnt, { name: keyOfCurr, checked: inputProps.checked } );
    }

    // Do the usual thing too
    props.storeChecked( evnt, inputProps );

  };  // End ensureCurrChecked()


  var numberChange = function ( evnt, inputProps ) {
    var val = limit( inputProps.value, { min: inputProps.min, max: inputProps.max } );
    ensureCurrComplex( evnt, {name: inputProps.id, id: inputProps.id, value: val} );
  };


  return (      
    <wrapper className={'field-aligner'}>

      {/*[1,2,3,4,5,6,7,8].map(size =>
        (<Form.Field key={size.toString()}>
          <Radio
            label={size}
            name='householdSize'
            value={size}
            checked={props.client.householdSize === size}
            onChange={props.storeComplex}
          />
        </Form.Field>)
      )*/}

      <Form.Field inline>
        <Input
          className = {time + 'HouseholdSize'}
          onChange  = {numberChange}
          value     = {props.client[ time + 'HouseholdSize' ] || 1}
          name      = {time + 'HouseholdSize'}
          id        = {time + 'HouseholdSize'}
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
          value     = {props.client[ time + 'Dependents' ] || ''}
          name      = {time + 'Dependents'}
          id        = {time + 'Dependents'}
          type={'number'} step={1} min={0} max={props.client[ time + 'HouseholdSize' ] - 1} />
        <wrapper>
          <label>Number of dependents</label>
          <InlineLabelInfo>Members that are under 18, disabled, handicapped, and/or a full-time student. Cannot include the head of household, their spouse, or foster children.</InlineLabelInfo>
        </wrapper>
      </Form.Field>

      <Form.Field inline>
        <Input
          className = {time + 'ChildrenUnder12'}
          onChange  = {numberChange}
          value     = {props.client[ time + 'ChildrenUnder12' ] || ''}
          name      = {time + 'ChildrenUnder12'}
          id        = {time + 'ChildrenUnder12'}
          type={'number'} step={1} min={0} max={props.client[ time + 'HouseholdSize' ] - 1} />
        <wrapper>
          <label>Number of children under 12</label>
        </wrapper>
      </Form.Field>

      <MassiveToggle id={time + 'DisabledOrElderlyHeadOrSpouse'} value={props.client[ time + 'DisabledOrElderlyHeadOrSpouse' ]}
        storeChecked={ensureCurrChecked}
        label={'Was the head of household or their spouse considered disabled, handicapped, or elderly (62 or older)?'} />

      {/** Really should be split into disabled under 12 and other disabled? */}
      <MassiveToggle id={time + 'DisabledOrElderlyMember'} value={props.client[ time + 'DisabledOrElderlyMember' ]}
        storeChecked={ensureCurrChecked}
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
<HouseholdSizeContent storeChecked={props.storeChecked} storeComplex={props.storeComplex} client={props.pageState} />
      </FormPartsContainer>
    </Form>
  );

};  // End HouseholdSizeStep()

export { HouseholdSizeStep };
