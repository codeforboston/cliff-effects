// import _ from 'lodash'
import React, { Component } from 'react';
import {
	// Button,
  Form,
  Grid,
  Header,
  // Segment,
  // Step,
  // Card,
  // Icon,
  // Checkbox,
  // Divider,
  // Radio,
  Statistic,
  // Reveal,
  Input
} from 'semantic-ui-react';
// import { Redirect, Prompt } from 'react-router-dom';
import { percentPovertyLevel, 
        percentStateMedianIncome } from '../helpers/helperFunctions';
import { PrevNext, FormPartsContainer } from './formHelpers';


/**
* @todo Figure out which programs need to know which types of incomes
* and categorize them accordingly.
* @todo Kristin's lists (@see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9}):
* - Income
*  - Earned income
*  - TAFDC
*  - SSI
*  - SSDI
*  - Child support
*  - Unemployment
*  - Worker’s comp
*  - Pension
*  - Social Security
*  - Alimony
*  - Other income
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


// <Form.Input
//   label='Annual Income'
//   placeholder='Annual Income'
//   name='annualIncome'
//   onChange={props.handleChange}
//   type='number'
// />


// <Form.Field inline>
//   <span className='column-1-header'>Income Source</span>
//   <div className='right-column'>
//     <span className='Weekly'>Income Source</span>
//     <span className='Monthly'>Income Source</span>
//     <span className='Yearly'>Income Source</span>
//   </div>
//   <Input
//     type='number'
//     onChange={props.handleChange}
//     className='right-column'
//     name='Earned Income' placeholder='Earned Income'
//   />

// <input
//   className='weekly'
//   type='number'
//   onChange={props.handleChange}
//   name='Earned Income Weekly' placeholder='Earned Income Weekly'
// />

// <div className='income-inputs-column left-column'>



// ========================================
// FUNCTIONS
// ========================================
var myProps = {}
myProps.handleChange = ( e, { name, value }, props ) => {

  console.log( '~~~~~~~~~~~~~~', e.target );
  props.handleChange({ [name]: value });

};



// ========================================
// COMPONENTS
// ========================================


const IncomeRow = ( props ) => {

  var lefterColStyles = { 'width': '7em', 'marginRight': '.2em' },
      rightColStyles  = { 'width': '7em', 'marginRight': '.9em' };

  var originals = props.props; 

  var handleChange = function ( evnt, input ) {

    var value     = input.value,
        target    = evnt.target,
        container = target.parentNode.parentNode,
        inputs    = container.querySelectorAll('input');


    console.log( '~~~~~~~~~~~~~~', inputs );

    originals.handleChange( evnt, { name: input.name, value: input.value } );

  };

  return (
    <Form.Field inline>
        <Input
          className='weekly income-column'
          type='number'
          onChange={ handleChange }
          style={ lefterColStyles }
          name={ props.id + 'Weekly' } placeholder='Pick one'
        />
        <Input
          className='monthly income-column'
          type='number'
          onChange={ props.handleChange }
          style={ lefterColStyles }
          name={ props.id + 'Monthly' } placeholder='Pick one'
        />
        <Input
          className='yearly income-column'
          type='number'
          onChange={ props.handleChange }
          style={ rightColStyles }
          name={ props.id + 'Yearly' } placeholder='Pick one'
        />
        <label>{props.label}</label>
      </Form.Field>
  );
};  // End Row() Component

/** @todo Is it possible for id's to be the same as the text in the label? */
const IncomeForm = ( propsContainer ) => {

  var lefterColStyles = { width: '7em', marginRight: '.2em', textAlign: 'center', display: 'inline-block', fontSize: '14px' },
      rightColStyles  = { width: '7em', marginRight: '.9em', textAlign: 'center', display: 'inline-block', fontSize: '14px' };

  let props = propsContainer.props;
  return (
    <div className='field-aligner two-column'>

      <Form.Field inline>
        <Header as='h4' className='weekly income-column header' style={ lefterColStyles } color='teal'>
          Weekly
        </Header>
        <Header as='h4' className='monthly income-column header' style={ lefterColStyles } color='teal'>
          Monthly
        </Header>
        <Header as='h4' className='yearly income-column header' style={ rightColStyles } color='teal'>
          Yearly
        </Header>
        <Header as='h4' style={ { display: 'inline-block', fontSize: '14px' } } color='teal'>
          Income Type
        </Header>
      </Form.Field>

      <IncomeRow id='earnedIncome'    label='Earned Income' props={props}/>
      <IncomeRow id='TAFDC'           label='TAFDC' props={props}/>
      <IncomeRow id='SSI'             label='SSI' props={props}/>
      <IncomeRow id='SSDI'            label='SSDI' props={props}/>
      <IncomeRow id='childSupport'    label='Child support' props={props}/>
      <IncomeRow id='unemployment'    label='Unemployment' props={props}/>
      <IncomeRow id='workersComp'     label='Worker’s Comp' props={props}/>
      <IncomeRow id='pension'         label='Pension' props={props}/>
      <IncomeRow id='socialSecurity'  label='Social Security' props={props}/>
      <IncomeRow id='alimony'         label='Alimony' props={props}/>
      <IncomeRow id='otherIncome'     label='Other income' props={props}/>

      <br/>
      <br/>

      <div>
        <Header as='h4' textAlign='center'>
          FOR A HOUSEHOLD SIZE OF <strong>{props.pageState.householdSize}</strong>:
        </Header>
        <Statistic>
          <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
          <Statistic.Value>{Math.round(percentPovertyLevel(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
        </Statistic>
        <Statistic>
          <Statistic.Label>% of State Median Income</Statistic.Label>
          <Statistic.Value>{Math.round(percentStateMedianIncome(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
        </Statistic>
      </div>

    </div>
  );

};  // End IncomeForm() Component

const IncomeStep = ( props ) => {

  return (
    <Form className='income-form'>
      <FormPartsContainer
        title='Household Annual Income'
        clarifier='How much money does your household earn every year before taxes?'
        props={props}
        Insertable={IncomeForm}
      />
    </Form>
  );

};  // End IncomeStep() Component

export { IncomeStep };
