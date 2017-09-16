// import _ from 'lodash'
/** @todo Try without `Component` */
import React, { Component } from 'react';
import {
	// Button,
  Form,
  Grid,
  Header,
  // Segment, Step, Card, Icon, Checkbox, Divider, Radio,
  Statistic,
  // Reveal,
  Input
} from 'semantic-ui-react';
// import { Redirect, Prompt } from 'react-router-dom';
import { percentPovertyLevel, 
        percentStateMedianIncome } from '../helpers/helperFunctions';
import { FormPartsContainer } from './formHelpers';
import { roundMoney, limit } from '../helpers/math';


/**
* @todo Figure out which programs need to know which types of incomes
* and categorize them accordingly.
* @todo Kristin's lists (@see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9}):
* - Expenses (expenses need to be calculated in income stuff, but maybe
* they should be in an adjacent part of the form)
*  - Rent (@see more notes in above doc)
*  - Medical expenses
*  - Childcare/dependent care costs
*  - Other “expenses” (client word) (@see more notes in above doc)
*/


// Ideas of how to handle a different styling situation (if the designers switch columns)

// If we want more control over placement, we may look into this:
// <Grid textAlign='center' verticalAlign='middle'>
//   <Grid.Row className='inputs-in-right-column'>
//     <Grid.Column className='left-label'>
//       <label>Earned Income</label>
//     </Grid.Column>
//     <Grid.Column className='right-input'>
//       <Input type='number'/>
//     </Grid.Column>
//   </Grid.Row>
// </Grid>

// <Form.Field inline>
//   <span className='column-1-header'>Income Source</span>
//   <div className='right-column'>
//     <span className='Weekly'>Income Source</span>
//     <span className='Monthly'>Income Source</span>
//     <span className='Yearly'>Income Source</span>
//   </div>
//   <Input
//     type='number'
//     onChange={props.storeComplex}
//     className='right-column'
//     name='Earned Income' placeholder='Earned Income'
//   />




// ========================================
// CONSTANTS
// ========================================

const UNEARNED_INCOME_SOURCES = [
  'TAFDC', 'SSI', 'SSDI', 'ChildSupport', 'Unemployment',
  'WorkersComp', 'Pension', 'SocialSecurity', 'Alimony', 'OtherIncome'
];



// ========================================
// FUNCTIONS
// ========================================

var handleGrossUnearnedIncome = function ( client ) {

  // Possibly calculate this elsewhere instead of storing
  // it as a property.

  // Or we could store /only/ the `unearnedIncomeMonthly` as a property
  // and leave the rest in here, though then refreshing will destroy the
  // data and it will all have to be filled out again. Also, I'm not sure
  // what data we're storing permanently.
  var generics  = UNEARNED_INCOME_SOURCES,  // DO NOT ALTER THIS ARRAY
      sum       = 0;

  for (let namei = 0; namei < generics.length; namei++) {

    let name = generics[ namei ];
    sum += client[ 'previous' + name + 'Monthly' ] || 0;

  };

  originals.storeComplex(null, { name: 'previousUnearnedIncomeMonthly', value: sum });

  return sum;
};  // End handleGrossUnearnedIncome()



var populators = {};

populators.weekly = function ( evnt, genericID, weeklyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthly = weeklyVal * 4.33;
  populators[ 'monthly' ]( evnt, genericID, monthly );
  
  return weeklyVal;

};  // End populators.weekly()


populators.monthly = function ( evnt, genericID, monthlyVal ) {
// Monthly is used for a lot of things and is the one we want to store

  var monthly = limit( monthlyVal, { min: 0 } );

  var incomeObj = { name: genericID + 'Monthly', value: monthly };
  originals.storeComplex( evnt, incomeObj, function ( visitPage ) {
    handleGrossUnearnedIncome( visitPage.state );
  });

  return monthly;

};  // End populators.monthly()


populators.yearly = function ( evnt, genericID, yearlyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthly = ( yearlyVal / 12 );
  populators[ 'monthly' ]( evnt, genericID, monthly );

  return yearlyVal;

};  // End populators.yearly()



// ========================================
// COMPONENTS
// ========================================

/**
* @todo Earned income has a specialy info/tooltip thing going
* on. Possible solution below
* @todo Earned Income should be `<Form.Field inline required>`,
* but there's no submit, so that has to be handled in here
* somehow. (`isBlocking` is in visitPage.js?)
*/

var IncomeInput = function ( props ) {

  var handleChange = function ( evnt, inputProps ) {
    populators[ props.timeframe ]( evnt, props.generic, evnt.target.value );
  }

  return (
    <Input
      className       = { props.classes }
      data-timeframe  = { props.timeframe }
      type            = 'number'
      step            = { '0.01' }
      onChange        = { handleChange }
      style           = { props.style }
      name            = { props.id }
      id              = { props.id }
      data-generic    = { props.generic }
      min             = { '0' }
      value           = { props.value }
    />
  );

};  // End IncomeInput()


var compileInputProps = function ( props, timeframe ) {

  var capped = timeframe[0].toUpperCase() + timeframe.substr(1);
 
  var obj = {
    classes   : 'income-column ' + timeframe,
    timeframe : timeframe,
    generic   : props.id,
    id        : props.id + capped,
    client    : props.client,
  }

  return obj;
};  // End compileInputProps()


const IncomeRow = function ( props ) {

  var labelInfoDisplay = ' hidden'; // Will be '' in future
  if ( !props.labelInfo ) { labelInfoDisplay = ' hidden'; }

  var lefterColStyles = { width: '7em', marginRight: '.2em' }
  var rightColStyles  = { width: '7em', marginRight: '.9em' }

  var baseVal = props.client[ props.id + 'Monthly' ]

  return (
    <Form.Field inline>
      <IncomeInput
        { ...compileInputProps( props, 'weekly' ) }
        style     = { lefterColStyles }
        value     = { roundMoney( baseVal / 4.33 ) || '' }
      />
      <IncomeInput
        { ...compileInputProps( props, 'monthly' ) }
        style     = { lefterColStyles }
        value     = { roundMoney( baseVal ) || '' }
      />
      <IncomeInput
        { ...compileInputProps( props, 'yearly' ) }
        style     = { rightColStyles }
        value     = { roundMoney( baseVal * 12 ) || '' }
      />
      <label>{ props.label }</label>
      <div className = { 'label-info' + labelInfoDisplay } style = {{
        position: 'relative', marginLeft: '1em',
        textAlign: 'left', verticalAlign: 'middle'
      }}>
        { props.labelInfo }
      </div>
    </Form.Field>
  );  // end return

};  // End IncomeRow()

/** 
* @todo Is it possible for id's to be the same as the text in the label?
* @todo Stuff like interest of bank accounts? (unearned income?)
* @todo Other assets (not counted in gross income? income categories?)
* @todo "Household income (before tax income, and does not include funds such as
* income from children under 18 years old, amounts received through training
* programs funded by HUD, and the income of a live-in aide)" (@see {@link
* http://www.masslegalhelp.org/housing/financial-eligibility})
* @todo "State housing programs base eligibility on net yearly income. Net
* yearly income does not include funds such as wages earned by full-time
* students, worker's compensation, and a certain amount of wages earned by a
* tenant 62 or older. It also allows you to deduct certain amounts, such as
* necessary medical expenses and personal care services." (@see {@link
* http://www.masslegalhelp.org/housing/financial-eligibility})
*/
const IncomeForm = function ( props ) {

  var headingColor = 'teal';

  var lefterColStyles = {
    width: '7em', marginRight: '.2em',
    textAlign: 'center', display: 'inline-block', fontSize: '14px'
  };

  var rightColStyles  = {
    width: '7em', marginRight: '.9em',
    textAlign: 'center', display: 'inline-block', fontSize: '14px'
  };


  var client      = props.client,
      otherProps  = props.props;

  return (
    <div className='field-aligner two-column'>

      <Form.Field inline>
        <Header as='h4' className='weekly income-column header' style={ lefterColStyles } color={ headingColor }>
          Weekly
        </Header>
        <Header as='h4' className='monthly income-column header' style={ lefterColStyles } color={ headingColor }>
          Monthly
        </Header>
        <Header as='h4' className='yearly income-column header' style={ rightColStyles } color={ headingColor }>
          Yearly
        </Header>
        <Header as='h4' style={ { display: 'inline-block', fontSize: '14px' } } color={ headingColor }>
          Income Type
        </Header>
      </Form.Field>

      <IncomeRow id='previousEarnedIncome'    label='Earned income'   client={ client } labelInfo={'(Weekly income = hourly wage times average number of work hours per week)'}/>
      <IncomeRow id='previousTAFDC'           label='TAFDC'           client={ client } labelInfo={null}/>
      <IncomeRow id='previousSSI'             label='SSI'             client={ client } labelInfo={null}/>
      <IncomeRow id='previousSSDI'            label='SSDI'            client={ client } labelInfo={null}/>
      <IncomeRow id='previousChildSupportIn'  label='Child support coming in'   client={ client } labelInfo={null}/>
      <IncomeRow id='previousUnemployment'    label='Unemployment'    client={ client } labelInfo={null}/>
      <IncomeRow id='previousWorkersComp'     label='Worker’s comp'   client={ client } labelInfo={null}/>
      <IncomeRow id='previousPension'         label='Pension'         client={ client } labelInfo={null}/>
      <IncomeRow id='previousSocialSecurity'  label='Social security' client={ client } labelInfo={null}/>
      <IncomeRow id='previousAlimony'         label='Alimony'         client={ client } labelInfo={null}/>
      <IncomeRow id='previousOtherIncome'     label='Other income'    client={ client } labelInfo={null}/>

    </div>
  );  // end return

};  // End IncomeForm()


// Do we want these for previous income?
// <br/>
// <br/>

// <div>
//   <Header as='h4' textAlign='center'>
//     FOR A HOUSEHOLD SIZE OF <strong>{otherProps.pageState.householdSize}</strong>:
//   </Header>
//   <Statistic>
//     <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
//     <Statistic.Value>{Math.round(percentPovertyLevel(otherProps.pageState.annualIncome,otherProps.pageState.householdSize))}%</Statistic.Value>
//   </Statistic>
//   <Statistic>
//     <Statistic.Label>% of State Median Income</Statistic.Label>
//     <Statistic.Value>{Math.round(percentStateMedianIncome(otherProps.pageState.annualIncome,otherProps.pageState.householdSize))}%</Statistic.Value>
//   </Statistic>
// </div>


// Tooltip version of labels:
// (could be made official in the Row creator with conditionals)
// <label>Earned Income
//   <style type='display on hover handled in css'></style>
//   <div
//     className={ 'info-revealer' }
//     style={{
//       position: 'relative',
//       display: 'inline-block',
//       fontSize: '10px',
//       border: '1px solid black',
//       margin: '1em',
//       top: '-0.5em',
//       textAlign: 'center',
//       width: '1.6em',
//       height: '1.6em'
//     }}>
//     <div style={{ position: 'relative', top: '-0.2em' }}>i</div>
//     <div
//       className={ 'info-tooltip' }
//       style={{ position: 'absolute', padding: '.2em' }}
//     >
//       Weekly income = hourly wage times average number of work hours per week
//     </div>
//   </div>
// </label>


// When props are passed along into classes, etc., the are cloned. They
// don't stay the same object.
// I suppose I could pass everythign in repeatedly...
/** @todo Pass in everything, not just `pageState`/`client` */
var originals;

// `props` is a cloned version of the original props. References broken.
const PreviousIncomeStep = function ( props ) {

  originals = props;

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form'>
      <FormPartsContainer
        title     = 'Previous Household Monthly Income'
        clarifier = 'How much money did your household make the last time you were assessed for your benefits?'
        next      = {props.nextStep}
        prev      = {props.previousStep}
      >
        <IncomeForm client={props.pageState} props={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End PreviousIncomeStep()


export { PreviousIncomeStep };
