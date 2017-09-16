// import _ from 'lodash'
import React, { Component } from 'react';
import {
  // Button,
  Form,
  // Grid,
  Header,
  // Segment, Step, Card, Icon, Checkbox, Divider, Radio,
  Statistic,
  Divider,
  // Reveal,
  Input
} from 'semantic-ui-react';
// import { Redirect, Prompt } from 'react-router-dom';
// import { percentPovertyLevel, 
//         percentStateMedianIncome } from '../helpers/helperFunctions';
import {
  FormPartsContainer, MassiveToggle, FormHeading,
  IntervalColumnHeadings, CashFlowRow
} from './formHelpers';
import { merge } from '../helpers/object-manipulation';
import { roundMoney, limit } from '../helpers/math';


// ========================================
// COMPONENTS
// ========================================

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const Housing = function ( props ) {

  var client      = props.props.pageState,
      time        = props.time,
      storeBool   = props.props.storeBoolean,
      sharedProps = {
        client: client, type: props.type, time: time,
        storeComplex: props.props.storeComplex
      };

  // `hasHousing` is actually whether they're in the housing voucher program
  var ownedAHome  = client.previousHomeowner,
      wasHomeless = client.previousHomeless && !client.hasHousing && !ownedAHome;

  var utils = client.previousPaidUtilities, climate = client.previousGotClimateControl,
      electricity = client.previousNonHeatElectricity, phone = client.previousTelephone;

  return (
    <wrapper>
      <FormHeading>Housing</FormHeading>

      <MassiveToggle id={ time + 'Homeless' } value={ wasHomeless } storeBoolean={ storeBool }
          label={'Was the household homeless at the last benefit assessment?'}/>
      { wasHomeless
        ? null
        : <MassiveToggle id={ time + 'Homeowner' } value={ ownedAHome }
            storeBoolean={ storeBool } label={ 'Did the household own a home?' } />
      }

      <Divider></Divider>

      { ownedAHome
        ? <wrapper>
            <IntervalColumnHeadings type={ props.type }/>
            <CashFlowRow {...merge( sharedProps, {generic: 'RentOrMortgage'} )}> Mortgage </CashFlowRow>
            <CashFlowRow {...merge( sharedProps, {generic: 'HousingInsurance'} )}> Insurance Costs </CashFlowRow>
            <CashFlowRow {...merge( sharedProps, {generic: 'PropertyTax'} )}> Property Tax </CashFlowRow>
          </wrapper>
        : <wrapper>
            <IntervalColumnHeadings type={ props.type }/>
            <CashFlowRow {...merge( sharedProps, {generic: 'RentOrMortgage'} )}> Rent </CashFlowRow>
            <MassiveToggle id={ time + 'PaidUtilities' } value={ utils } storeBoolean={ storeBool }
              label={'Did the household pay utilities seperately from the rent?'}/>
            { !client.previousPaidUtilities
              ? null
              : <wrapper>
                  <MassiveToggle id={ time + 'ClimateControl' } value={ climate } storeBoolean={ storeBool }
                    label={'Did the household pay for heating or cooling (e.g. A/C during summer), OR did they receive Fuel Assistance in the 12 months prior to the previous benefit assessment?'}/>
                  <MassiveToggle id={ time + 'NonHeatElectricity' } value={ electricity } storeBoolean={ storeBool }
                    label={'Did the household pay for electricity for non-heating purposes?'}/>
                  <MassiveToggle id={ time + 'Telephone' } value={ phone } storeBoolean={ storeBool }
                    label={'Did the household pay for its own telephone service?'}/>
                </wrapper>
            }
          </wrapper>
      }
    </wrapper>
  );

};  // End Housing()


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const ExpensesFormContent = function ( props ) {

  var client    = props.client,
      storeBool = props.props.storeBoolean;

  var needsMedical = client.previousDisabledOrElderlyMember;

  var time = 'previous', type = 'expense';
  var sharedProps = { client: client, type: type, time: time,
                    storeComplex: props.props.storeComplex };

  return (
    <wrapper className='field-aligner two-column'>

      <FormHeading subheading = {'(a dependant is a child or disabled adult)'}>
        Dependent Monthly Care</FormHeading>
      <IntervalColumnHeadings type={type}/>
      <CashFlowRow {...merge( sharedProps, {generic: 'DirectCareCosts'} )}> Direct Care Costs </CashFlowRow>
      <CashFlowRow {...merge( sharedProps, {generic: 'BeforeAndAfterSchoolPrograms'} )}> Before- and After-School Programs </CashFlowRow>
      <CashFlowRow {...merge( sharedProps, {generic: 'TransportationCosts'} )}> Transportation Costs </CashFlowRow>
      <CashFlowRow {...merge( sharedProps, {generic: 'OtherDependentCareCosts'} )}> Other </CashFlowRow>

      <Housing props={props.props} time={time} type={type} />

      <FormHeading>Other</FormHeading>
      <MassiveToggle id={ time + 'DisabledOrElderlyMember' } value={ client.previousDisabledOrElderlyMember }
        storeBoolean={ storeBool }
        label={'Was any member of the household elderly (age 60+) or receiving a disability-based benefit (e.g. SSI, EAEDC, MassHealth Disability, etc.)'}/>
      <IntervalColumnHeadings type={type}/>
      { !needsMedical
        ? null
        : <CashFlowRow {...merge( sharedProps, {generic: 'Medical'} )}>Medical</CashFlowRow>
      }
      <CashFlowRow {...merge( sharedProps, {generic: 'ChildSupportPaidOut'} )}>Child support paid out</CashFlowRow>

    </wrapper>
  );

};  // End ExpensesFormContent()


/**
* @todo Does a medical assistant's payments count as a medical expense?
* @todo Medical expense only matters if household has elder/disabled, but
* are they any medical expenses or only those of the disabled person? "Medical
* Expenses for Disabled or Elderly". Also, do they sometimes need to
* enter medical expenses even if they don't have an elderly or disabled
* household member?
*/

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/// `props` is a cloned version of the original props. References broken.
const PreviousExpensesStep = function ( props ) {

  return (
    <Form className = 'expense-form'>
      <FormPartsContainer
        title     = {'Previous Household Monthly Expenses'}
        clarifier = {'What were the household\'s expenses at the last time benefits were calculated?'}
        next      = {props.nextStep}
        prev      = {props.previousStep} >
        <ExpensesFormContent client={props.pageState} props={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End PreviousExpensesStep()


export { PreviousExpensesStep };
