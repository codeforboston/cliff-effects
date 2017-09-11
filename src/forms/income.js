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
// TEMPORARY STORAGE
// ========================================
var values = {};



// ========================================
// FUNCTIONS
// ========================================

var roundMoney = function ( val ) {
  // Only round values for display. In actual calculations, keep things
  // exact otherwise the numbers keep changing
  if ( val === 0 || val === '' ) { return ''; }
  else { return ( Math.round(val * 100) / 100); }
};  // End roundMoney()


var limit = function ( initialVal, minMax ) {

  /** @todo Make sure 0's can't be entered after two decimal places */
  var min = minMax.min,
      max = minMax.max;

  var raw   = parseFloat( initialVal ),
      value = raw;
  if ( typeof min === 'number' && !isNaN(min) ) { value = Math.max( min, raw ); }
  if ( typeof max === 'number' && !isNaN(max) ) { value = Math.min( max, raw ); }

  if ( isNaN( value ) || value === 0 ) { value = ''; }

  return value;
};  // End limit()

var equalizers = {};

/** About the data being sent back to `state`, three pieces of data are
* always sent because different types of programs may use different
* income timeframes (weekly, monthly, yearly/annualy), so all three
* are being made available. @todo Change that to one thing.
*/

// equalizers.sendData = function ( evnt, funcProps, incomeDataArr ) {

//   var equalized = {};

//   for ( let dati = 0; dati < incomeDataArr.length; dati++ ) {

//     let data      = incomeDataArr[ dati ],
//         incomeObj = { name: data[0], value: data[1] };

//     funcProps.handleChange( evnt, incomeObj );
//     equalized[ data[0] ] = data[1];

//   };

//   return equalized;
// };  // End equalizers.sendData()


// equalizers.weekly = function ( evnt, weeklyNode, funcProps ) {

//   var grandparent = weeklyNode.parentNode.parentNode;
//   var weeklyVal   = limit( weeklyNode.value, { min: 0 } );

//   /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
//   var weekly  = weeklyVal,
//       monthly = ( weekly * 4.33 ) || '',
//       yearly  = ( weekly * 52 ) || '';

//   var monthlyNode = ( grandparent.querySelector('.monthly') ).querySelector('input'),
//       yearlyNode  = ( grandparent.querySelector('.yearly') ).querySelector('input');

//   var equalized = equalizers.sendData( evnt, original, [
//     [ weeklyNode.name, weekly ],
//     [ monthlyNode.name, monthly ],
//     [ yearlyNode.name, yearly ]
//   ]);

//   return equalized;

// };  // End equalizers.weekly()


// equalizers.monthly = function ( evnt, monthlyNode, funcProps ) {

//   var grandparent = monthlyNode.parentNode.parentNode;
//   var monthlyVal  = limit( monthlyNode.value, { min: 0 } );

//   /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
//   var monthly = monthlyVal,
//       weekly  = ( monthly / 4.33 ) || '',
//       yearly  = ( weekly * 52 ) || '';

//   var weeklyNode = ( grandparent.querySelector('.weekly') ).querySelector('input'),
//       yearlyNode = ( grandparent.querySelector('.yearly') ).querySelector('input');

//   var equalized = equalizers.sendData( evnt, original, [
//     [ weeklyNode.name, weekly ],
//     [ monthlyNode.name, monthly ],
//     [ yearlyNode.name, yearly ]
//   ]);

//   return equalized;

// };  // End equalizers.monthly()


// equalizers.yearly = function ( evnt, yearlyNode, funcProps ) {

//   var grandparent = yearlyNode.parentNode.parentNode;
//   var yearlyVal   = limit( yearlyNode.value, { min: 0 } );

//   /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
//   var yearly  = yearlyVal,
//       weekly  = ( yearly / 52 ) || '',
//       monthly = ( weekly * 4.33 ) || '';

//   var weeklyNode  = ( grandparent.querySelector('.weekly') ).querySelector('input'),
//       monthlyNode = ( grandparent.querySelector('.monthly') ).querySelector('input');

//   var equalized = equalizers.sendData( evnt, original, [
//     [ weeklyNode.name, weekly ],
//     [ monthlyNode.name, monthly ],
//     [ yearlyNode.name, yearly ]
//   ]);

//   return equalized;

// };  // End equalizers.yearly()



equalizers.weekly2 = function ( evnt, weeklyNode ) {

  // var grandparent = weeklyNode.parentNode.parentNode;
  // var weeklyVal   = limit( weeklyNode.value, { min: 0 } );

  // /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  // var monthly = ( weeklyVal * 4.33 ) || '',
  //     yearly  = ( weeklyVal * 52 ) || '';

  // var monthlyNode = ( grandparent.querySelector('.monthly') ).querySelector('input'),
  //     yearlyNode  = ( grandparent.querySelector('.yearly') ).querySelector('input');

  // // var equalized = equalizers.sendData( evnt, [
  // //   [ weeklyNode.name, weekly ],
  // //   [ monthlyNode.name, monthly ],
  // //   [ yearlyNode.name, yearly ]
  // // ]);
  // // return equalized;

  // values[ monthlyNode.id ] = monthly;
  // values[ yearlyNode.id  ]  = yearly;

  // console.log( 'values:', values );

  // // monthlyNode.value = roundMoney( monthly )
  // // yearlyNode.value  = roundMoney( yearly )

  // var incomeObj = { name: weeklyNode.id, value: weeklyVal };
  // original.handleChange( evnt, incomeObj );

  // return incomeObj;


  // instead get generic and value
  var grandparent = weeklyNode.parentNode.parentNode;
  var weeklyVal   = weeklyNode.value;
  // weeklyVal       = weeklyVal.toFixed(2);
  console.log( 'weekly:', weeklyVal );

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthlyNode    = ( grandparent.querySelector('.monthly') ).querySelector('input');
  monthlyNode.value  = ( weeklyVal * 4.33 ) || '';
  console.log( 'monthly value:', monthlyNode.value );

  var incomes = equalizers[ 'monthly2' ]( evnt, monthlyNode );
  return incomes;

};  // End equalizers.weekly()


equalizers.monthly2 = function ( evnt, monthlyNode ) {


  // var grandparent = monthlyNode.parentNode.parentNode;
  // var monthlyVal  = limit( monthlyNode.value, { min: 0 } );

  // /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  // var weeklyNode    = ( grandparent.querySelector('.weekly') ).querySelector('input');
  // weeklyNode.value  = ( monthlyVal / 4.33 ) || '';

  // var incomes = equalizers[ 'weekly' ]( evnt, weeklyNode );
  // return incomes;



  var grandparent = monthlyNode.parentNode.parentNode;
  var monthlyVal  = limit( monthlyNode.value, { min: 0 } );
  // monthlyVal      = monthlyVal.toFixed(2);
  console.log( 'monthly value:', monthlyNode.value, monthlyVal );
  console.log( 'to be weekly:', ( monthlyVal / 4.33 ), roundMoney( ( monthlyVal / 4.33 ) ) );

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var weekly = roundMoney( ( monthlyVal / 4.33 ) ) || '',
      yearly  = roundMoney( ( monthlyVal * 12 ) ) || '';
  console.log( 'other values 1:', weekly, yearly, monthlyVal/4.33, monthlyVal * 12 );

  var weeklyNode = ( grandparent.querySelector('.weekly') ).querySelector('input'),
      yearlyNode = ( grandparent.querySelector('.yearly') ).querySelector('input');

  values[ weeklyNode.id ]   = weekly;
  values[ yearlyNode.id  ]  = yearly;
  console.log( 'other values 2:', weekly, yearly );

  var incomeObj = { name: monthlyNode.id, value: roundMoney( monthlyVal ) };
  original.handleChange( evnt, incomeObj );

  return incomeObj;

};  // End equalizers.monthly()


equalizers.yearly2 = function ( evnt, yearlyNode ) {

  var grandparent = yearlyNode.parentNode.parentNode;
  var yearlyVal   = yearlyNode.value;
  // yearlyVal       = yearlyVal.toFixed(2);

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthlyNode    = ( grandparent.querySelector('.monthly') ).querySelector('input');
  monthlyNode.value  = ( yearlyVal / 12 ) || '';
  console.log( 'monthly value:', monthlyNode.value );

  var incomes = equalizers[ 'monthly2' ]( evnt, monthlyNode );
  return incomes;

};  // End equalizers.yearly()



// ========================================
// COMPONENTS
// ========================================

// const IncomeRow = ( newProps ) => {

//   var lefterColStyles = { width: '7em', marginRight: '.2em' },
//       rightColStyles  = { width: '7em', marginRight: '.9em' };

//   var props = newProps.props;

//   var handleChange = function ( evnt, inputProps ) {
//     equalizers[ inputProps['data-timeframe'] ]( evnt, evnt.target, props );
//   };

//   var fromWeekly = function ( evnt, inputProps ) {
//     var weeklyClass = '#' + inputProps.id
//     // var node      = ((evnt.target.parentNode).parentNode).querySelector( '.weekly' )
//     var node      = document.body.querySelector( weeklyClass ),
//         node      = evnt.target,
//         equalized = equalizers[ 'weekly' ]( evnt, node, props );

//     return equalized[ inputProps.name ];
//   }

//   var InputFieldsComponent = (
//     <div>
//     <Form.Field inline>
//       <Input
//         className='weekly income-column'
//         data-timeframe={ 'weekly' }
//         type='number'
//         onChange={ handleChange }
//         style={ lefterColStyles }
//         name={ newProps.id + 'Weekly' }
//         id={ newProps.id + 'Weekly' }
//         min={ '0' }
//         value={ props.pageState[ newProps.id + 'Weekly' ] }
//         componentDidMount={ fromWeekly }
//       />
//       <Input
//         className='monthly income-column'
//         data-timeframe={ 'monthly' }
//         type='number'
//         onChange={ handleChange }
//         style={ lefterColStyles }
//         name={ newProps.id + 'Monthly' }
//         id={ newProps.id + 'Monthly' }
//         min={ '0' }
//       />
//       <Input
//         className='yearly income-column'
//         data-timeframe={ 'yearly' }
//         type='number'
//         onChange={ handleChange }
//         style={ rightColStyles }
//         name={ newProps.id + 'Yearly' }
//         id={ newProps.id + 'Yearly' }
//         min={ '0' }
//       />
//       <label>{newProps.label}</label>
//     </Form.Field>
//     </div>
//   );

//   return InputFieldsComponent;
// };  // End IncomeRow() Component




/**
* @todo Earned income has a specialy info/tooltip thing going
* on. Possible solution below
* @todo Earned Income should be `<Form.Field inline required>`,
* but there's no submit, so that has to be handled in here
* somehow. (`blocking` is in visitPage.js?)
*/

var count = 0;

class IncomeInput extends Component {

  constructor ( props ) {
    super( props );  // makes `this.props`
    this.handleIndex = count;
    count++
  }

  handleChange = ( evnt, inputProps ) => {
    // if ( inputProps['data-handleIndex'] % 2 ) {
    //   console.log( 'evens:', evnt.target.id );
    //   equalizers[ inputProps['data-timeframe'] ]( evnt, evnt.target, original );
    // } else {
    //   console.log( 'alternate:', evnt.target.id );
      equalizers[ inputProps['data-timeframe'] + '2' ]( evnt, evnt.target, original );
    // }
  }

  componentDidMount = () => {
    var id  = '#' + this.props.id,
        node      = document.body.querySelector( id ),
        equalized = equalizers[ this.props.timeframe + '2' ]( null, node, original );
    return equalized[ this.props.id ];
  }

  render () {

    var props = this.props;

    return (
      <Input
        className       = { props.classes }
        data-timeframe  = { props.timeframe }
        type            = 'number'
        step            = { '0.01' }
        onChange        = { this.handleChange }
        style           = { props.style }
        name            = { props.id }
        id              = { props.id }
        min             = { '0' }
        value           = { props.value }
        data-handleIndex = { this.handleIndex }
      />
    );
  }  // End render()

};  // End IncomeInput{} Component


class IncomeRow extends Component {

  constructor ( props ) {
    super( props );  // makes this.props

    // In future, may show label info text
    if ( props.labelInfo ) { this.labelInfoDisplayClass = ' hidden'; }  // Will be '' in future
    else { this.labelInfoDisplayClass = ' hidden'; }
  }

  lefterColStyles = { width: '7em', marginRight: '.2em' }
  rightColStyles  = { width: '7em', marginRight: '.9em' }

  handleChange ( evnt, inputProps ) {
    equalizers[ inputProps['data-timeframe'] + '2' ]( evnt, evnt.target, original );
  }

  render () {

    var weekly = roundMoney( original.pageState[ this.props.id + 'Weekly' ] ) || ''

    return (
      <Form.Field inline>
        <IncomeInput
          classes       = 'weekly income-column'
          timeframe     = { 'weekly' }
          type          = 'number'
          style         = { this.lefterColStyles }
          generic       = { this.props.id }
          id            = { this.props.id + 'Weekly' }
          min           = { '0' }
          value         = { values[ this.props.id + 'Weekly' ] || '' }
        />
        <IncomeInput
          classes       = 'monthly income-column'
          timeframe     = { 'monthly' }
          type          = 'number'
          style         = { this.lefterColStyles }
          generic       = { this.props.id }
          id            = { this.props.id + 'Monthly' }
          min           = { '0' }
          value         = { original.pageState[ this.props.id + 'Monthly' ] || '' }
        />
        <IncomeInput
          classes       = 'yearly income-column'
          timeframe     = { 'yearly' }
          type          = 'number'
          style         = { this.rightColStyles }
          generic       = { this.props.id }
          id            = { this.props.id + 'Yearly' }
          min           = { '0' }
          value         = { values[ this.props.id + 'Yearly' ] || '' }
        />
        <label>{this.props.label}</label>
        <div className = { 'label-info' + this.labelInfoDisplayClass } style = {{
          position: 'relative', marginLeft: '1em',
          textAlign: 'left', verticalAlign: 'middle'
        }}>
          {this.props.labelInfo}
        </div>
      </Form.Field>
    );
  }  // End render()
};  // End IncomeRow{} Component

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
const IncomeForm = ( propsContainer ) => {

  let props = propsContainer.props;

  var lefterColStyles = { width: '7em', marginRight: '.2em', textAlign: 'center', display: 'inline-block', fontSize: '14px' },
      rightColStyles  = { width: '7em', marginRight: '.9em', textAlign: 'center', display: 'inline-block', fontSize: '14px' };

  var handleChange = function ( evnt, inputProps ) {
    equalizers[ inputProps['data-timeframe'] ]( evnt, inputProps, props );
    // originals.handleChange( evnt, inputProps );
  };

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

      <IncomeRow id='earnedIncome'    label='Earned income'   props={props} labelInfo={'(Weekly income = hourly wage times average number of work hours per week)'}/>
      <IncomeRow id='TAFDC'           label='TAFDC'           props={props} labelInfo={null}/>
      <IncomeRow id='SSI'             label='SSI'             props={props} labelInfo={null}/>
      <IncomeRow id='SSDI'            label='SSDI'            props={props} labelInfo={null}/>
      <IncomeRow id='childSupport'    label='Child support coming in'   props={props} labelInfo={null}/>
      <IncomeRow id='unemployment'    label='Unemployment'    props={props} labelInfo={null}/>
      <IncomeRow id='workersComp'     label='Worker’s comp'   props={props} labelInfo={null}/>
      <IncomeRow id='pension'         label='Pension'         props={props} labelInfo={null}/>
      <IncomeRow id='socialSecurity'  label='Social security' props={props} labelInfo={null}/>
      <IncomeRow id='alimony'         label='Alimony'         props={props} labelInfo={null}/>
      <IncomeRow id='otherIncome'     label='Other income'    props={props} labelInfo={null}/>

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
var original;

const IncomeStep = ( props ) => {

  original = props;

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

/** @todo Put this object in... helpers? Not data... */
// unearned is monthly income
// Probably better to have a `earnedGrossIncomeMonthlySources` list and
// a `unearnedGrossIncomeMonthlySources` and whatever other categories
// need to be made.
const incomeSources = {
  earnedIncome: {
    earned: true, gross: true,
    timeframes: [ 'weekly', 'monthly' ], relevantPrograms: [ 'SNAP' ],
    // or
    categories: [ 'earned', 'gross' ],
  },
  TAFDC: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  SSI: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  SSDI: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  unemployment: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  workersComp: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  pension: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  socialSecurity: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  alimony: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
  otherIncome: {
    earned: false, gross: true,
    timeframes: [ null ], relevantPrograms: [ 'SNAP' ],
  },
};  // End incomeSources {}


const incomeSourcesList = [
  'earnedIncome',
  'TAFDC',
  'SSI',
  'SSDI',
  'unemployment',
  'workersComp',
  'pension',
  'socialSecurity',
  'alimony',
  'otherIncome'
];


export { IncomeStep };


