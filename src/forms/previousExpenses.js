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
      storeBool   = props.props.storeChecked,
      sharedProps = {
        client: client, type: props.type, time: time,
        storeComplex: props.props.storeComplex
      };

  // `hasHousing` is actually whether they're in the housing voucher program
  var ownedAHome  = client[ time + 'Homeowner' ],
      wasHomeless = client[ time + 'Homeless' ] && !client.hasHousing && !ownedAHome;

  var utils = client[ time + 'PaidUtilities' ], climate = client[ time + 'GotClimateControl' ],
      electricity = client[ time + 'NonHeatElectricity' ], phone = client[ time + 'Phone' ];

  /** @todo Owning a home vs. renting vs. homeless should probably be radio buttons */
  return (
    <wrapper>
      <FormHeading>Housing</FormHeading>

      <MassiveToggle id={ time + 'Homeless' } value={ wasHomeless } storeChecked={ storeBool }
          label={'Was the household homeless at the last benefit assessment?'}/>
      { wasHomeless
        ? null
        : <MassiveToggle id={ time + 'Homeowner' } value={ ownedAHome }
            storeChecked={ storeBool } label={ 'Did the household own a home?' } />
      }
      { ownedAHome
        ? <wrapper>
            <IntervalColumnHeadings type={ props.type }/>
            <CashFlowRow {...merge( {generic: 'RentOrMortgage'}, sharedProps )}> Mortgage </CashFlowRow>
            <CashFlowRow {...merge( {generic: 'HousingInsurance'}, sharedProps )}> Insurance Costs </CashFlowRow>
            <CashFlowRow {...merge( {generic: 'PropertyTax'}, sharedProps )}> Property Tax </CashFlowRow>
          </wrapper>
        : <wrapper> { wasHomeless
          ? null
          : <wrapper>
            <IntervalColumnHeadings type={ props.type }/>
            <CashFlowRow {...merge( {generic: 'RentOrMortgage'}, sharedProps )}> Rent </CashFlowRow>
            <MassiveToggle id={ time + 'PaidUtilities' } value={ utils } storeChecked={ storeBool }
              label={'Did the household pay utilities seperately from the rent?'}/>
            { !client[ time + 'PaidUtilities' ]
              ? null
              : <wrapper>
                  <MassiveToggle id={ time + 'ClimateControl' } value={ climate } storeChecked={ storeBool }
                    label={'Did the household pay for heating or cooling (e.g. A/C during summer), OR did they receive Fuel Assistance in the 12 months prior to the previous benefit assessment?'}/>
                  <MassiveToggle id={ time + 'NonHeatElectricity' } value={ electricity } storeChecked={ storeBool }
                    label={'Did the household pay for electricity for non-heating purposes?'}/>
                  <MassiveToggle id={ time + 'Phone' } value={ phone } storeChecked={ storeBool }
                    label={'Did the household pay for its own telephone service?'}/>
                </wrapper>
            } </wrapper>
        } </wrapper>
    } </wrapper>
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
      truth     = props.props,
      storeBool = truth.storeChecked,
      time      = 'previous', type = 'expense';

  var needsHandicappedAssistance = client[ time + 'GettingHandicappedAssistance' ]
    || client[ time + 'DisabledOrElderlyHeadOrSpouse' ]
    || client[ time + 'HandicappedHeadOrSpouse' ];

  var time = 'previous', type = 'expense';
  var sharedProps = { client: client, type: type, time: time,
                    storeComplex: truth.storeComplex };
  var incomeProps = merge( {}, sharedProps );
  incomeProps.type = 'income';

  /** @todo Determine if client can only enter amounts not covered by other programs
  * for childcare expenses (does money from those programs count as income?). */
  return (
    <wrapper className='field-aligner two-column'>

      <FormHeading>Dependents</FormHeading>
      <Form.Field inline>
        <Input
          className = { type + 'Dependents' }
          onChange  = { truth.storeComplex }
          value     = { client[ type + 'Dependents' ] }
          name      = { type + 'Dependents' }
          id        = { type + 'Dependents' }
          type = { 'number' } step = { '0.01' } min = { '0' } />
        <label labelInfo={'Non-head of hold or their spouse that is under 18, disabled, handicapped, and//or a full-time student'}>Number of dependents</label>
      </Form.Field>

      <FormHeading subheading = {'A "child" is a person 12 or younger. Don\'t include amounts that are paid for by other benefit programs.\n'}>
        Child(ren) Monthly Care</FormHeading>
      <IntervalColumnHeadings type={type}/>
      <CashFlowRow {...merge( {generic: 'ChildDirectCareCosts'}, sharedProps )}> Direct Care Costs </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'ChildBeforeAndAfterSchoolCareCosts'}, sharedProps )}> Before- and After-School Care </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'ChildTransportationCosts'}, sharedProps )}> Transportation Costs </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'ChildOtherCareCosts'}, sharedProps )}> Other Care </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'EarnedIncomeBecauseOfChildCare'}, incomeProps )}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by child care expenses </CashFlowRow>

      <FormHeading>Dependent Care</FormHeading>
      <IntervalColumnHeadings type={type}/>
      <CashFlowRow {...merge( {generic: 'ChildSupportPaidOut'}, sharedProps )}> LEGALLY OBLIGATED Child support paid out </CashFlowRow>

      <FormHeading subheading = {'"Elderly" refers to someone 62 or older. Don\'t include amounts that are paid for by other benefit programs.\n'}>
        Elderly or Disabled Monthly Care</FormHeading>
      <IntervalColumnHeadings type={type}/>
      <CashFlowRow {...merge( {generic: 'AdultDirectCareCosts'}, sharedProps )}> Direct Care Costs </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'AdultTransportationCosts'}, sharedProps )}> Transportation Costs </CashFlowRow>
      <CashFlowRow {...merge( {generic: 'AdultOtherCareCosts'}, sharedProps )}> Other Care </CashFlowRow>

      <Housing props={props.props} time={time} type={type}/>

      <FormHeading>Medical</FormHeading>
      <MassiveToggle id={ time + 'GettingHandicappedAssistance' } value={ client[ time + 'GettingHandicappedAssistance' ] }
        storeChecked={ storeBool }
        label={'Did the resident have handicapped assistance?'}/>
      <MassiveToggle id={ time + 'DisabledOrElderlyHeadOrSpouse' } value={ client[ time + 'DisabledOrElderlyHeadOrSpouse' ] }
        storeChecked={ storeBool }
        label={'Was the head of household or their spouse disabled or at least 62?'}/>{/** @todo Use for rent medical expenses */}
      <MassiveToggle id={ time + 'HandicappedHeadOrSpouse' } value={ client[ time + 'HandicappedHeadOrSpouse' ] }
        storeChecked={ storeBool }
        label={'Was the head of household or their spouse handicapped?'}/>
      <IntervalColumnHeadings type={type}/>
      { !needsHandicappedAssistance
        ? <CashFlowRow {...merge( {generic: 'Medical'}, sharedProps )}> Medical expenses of the individual(s) </CashFlowRow>
        : <wrapper>
          <CashFlowRow {...merge( {generic: 'HandicappedAssistance'}, sharedProps )}> Handicapped Assistance </CashFlowRow>
          <CashFlowRow {...merge( {generic: 'EarnedIncomeBecauseOfAdultCare'}, incomeProps )}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by elderly or disabled care expenses </CashFlowRow>
          <CashFlowRow {...merge( {generic: 'Medical'}, sharedProps )}> Medical expenses of the individual(s) </CashFlowRow>
        </wrapper>
      }
      {/*{ !client[ time + 'DisabledOrElderlyHeadOrSpouse' ]
         ? null
         : <CashFlowRow {...merge( {generic: 'Medical'}, sharedProps )}> Medical expenses for the handicapped individual(s) </CashFlowRow>}
      {*/}

      <FormHeading>Other</FormHeading>
      <CashFlowRow {...merge( {generic: 'OtherExpenses'}, sharedProps )}> Other Expenses </CashFlowRow>

    </wrapper>
  );

};  // End ExpensesFormContent()

// 'previous' to 'was'? 'current' to 'is'? Not always

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
*/
// `props` is a cloned version of the original props. References broken.
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
