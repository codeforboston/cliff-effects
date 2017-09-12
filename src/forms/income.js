// import _ from 'lodash'
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
//     onChange={props.handleChange}
//     className='right-column'
//     name='Earned Income' placeholder='Earned Income'
//   />




// ========================================
// CONSTANTS
// ========================================

const UNEARNED_INCOME_SOURCES = [
  'TAFDC', 'SSI', 'SSDI', 'childSupport', 'unemployment',
  'workersComp', 'pension', 'socialSecurity', 'alimony', 'otherIncome'
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
    sum += client[ name + 'Monthly' ];

  };

  funcs.handleChange(null, { name: 'unearnedIncomeMonthly', value: sum });

  return sum;
};  // End handleGrossUnearnedIncome()



var equalizers = {};

equalizers.weekly = function ( evnt, genericID, weeklyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthly = weeklyVal * 4.33;
  equalizers[ 'monthly' ]( evnt, genericID, monthly );
  
  return weeklyVal;

};  // End equalizers.weekly()


equalizers.monthly = function ( evnt, genericID, monthlyVal ) {
// Monthly is used for a lot of things and is the one we want to store

  var monthly = limit( monthlyVal, { min: 0 } );
  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var weekly = monthly / 4.33,
      yearly = monthly * 12;

  var incomeObj = { name: genericID + 'Monthly', value: monthly };
  funcs.handleChange( evnt, incomeObj, function ( that ) {
    handleGrossUnearnedIncome( that.state );
  });

  return monthly;

};  // End equalizers.monthly()


equalizers.yearly = function ( evnt, genericID, yearlyVal ) {

  /** @see {@link https://docs.google.com/document/d/13kb1hsxMi6pN9oAUGsTatDz4OSX5IeDLF9B-ddPjMCk/edit#heading=h.hxz256tmbsz9} */ 
  var monthly = ( yearlyVal / 12 );
  equalizers[ 'monthly' ]( evnt, genericID, monthly );

  return yearlyVal;

};  // End equalizers.yearly()



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

class IncomeInput extends Component {

  // makes `this.props`
  constructor ( props ) { super( props ); }

  handleChange = ( evnt, inputProps ) => {
    var generic = inputProps[ 'data-generic' ];
    equalizers[ inputProps['data-timeframe'] ]( evnt, generic, evnt.target.value );
  }

  componentDidMount = () => {
    var id        = '#' + this.props.id,
        node      = document.body.querySelector( id ),
        equalized = equalizers[ this.props.timeframe ]( null, this.props.generic, node.value );
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
        data-generic    = { props.generic }
        min             = { '0' }
        value           = { props.value }
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

  render () {

    var client  = this.props.client,
        baseVal = client[ this.props.id + 'Monthly' ]

    return (
      <Form.Field inline>
        <IncomeInput
          classes   = 'weekly income-column'
          timeframe = 'weekly'
          type      = 'number'
          style     = { this.lefterColStyles }
          generic   = { this.props.id }
          id        = { this.props.id + 'Weekly' }
          value     = { roundMoney( baseVal / 4.33 ) || '' }
          client    = { client }
        />
        <IncomeInput
          classes   = 'monthly income-column'
          timeframe = 'monthly'
          type      = 'number'
          style     = { this.lefterColStyles }
          generic   = { this.props.id }
          id        = { this.props.id + 'Monthly' }
          value     = { roundMoney( client[ this.props.id + 'Monthly' ] ) || '' }
          client    = { client }
        />
        <IncomeInput
          classes   = 'yearly income-column'
          timeframe = 'yearly'
          type      = 'number'
          style     = { this.rightColStyles }
          generic   = { this.props.id }
          id        = { this.props.id + 'Yearly' }
          value     = { roundMoney( baseVal * 12 ) || '' }
          client    = { client }
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
class IncomeForm extends Component {

  constructor ( props ) {
    super( props );  // makes `this.props`

    this.color = 'teal';

    this.lefterColStyles = {
      width: '7em', marginRight: '.2em',
      textAlign: 'center', display: 'inline-block', fontSize: '14px'
    };

    this.rightColStyles  = {
      width: '7em', marginRight: '.9em',
      textAlign: 'center', display: 'inline-block', fontSize: '14px'
    };

  }

  render () {

    var client = this.props.client;
    return (
      <div className='field-aligner two-column'>

        <Form.Field inline>
          <Header as='h4' className='weekly income-column header' style={ this.lefterColStyles } color={ this.color }>
            Weekly
          </Header>
          <Header as='h4' className='monthly income-column header' style={ this.lefterColStyles } color={ this.color }>
            Monthly
          </Header>
          <Header as='h4' className='yearly income-column header' style={ this.rightColStyles } color={ this.color }>
            Yearly
          </Header>
          <Header as='h4' style={ { display: 'inline-block', fontSize: '14px' } } color={ this.color }>
            Income Type
          </Header>
        </Form.Field>

        <IncomeRow id='earnedIncome'    label='Earned income'   client={ client } labelInfo={'(Weekly income = hourly wage times average number of work hours per week)'}/>
        <IncomeRow id='TAFDC'           label='TAFDC'           client={ client } labelInfo={null}/>
        <IncomeRow id='SSI'             label='SSI'             client={ client } labelInfo={null}/>
        <IncomeRow id='SSDI'            label='SSDI'            client={ client } labelInfo={null}/>
        <IncomeRow id='childSupport'    label='Child support coming in'   client={ client } labelInfo={null}/>
        <IncomeRow id='unemployment'    label='Unemployment'    client={ client } labelInfo={null}/>
        <IncomeRow id='workersComp'     label='Worker’s comp'   client={ client } labelInfo={null}/>
        <IncomeRow id='pension'         label='Pension'         client={ client } labelInfo={null}/>
        <IncomeRow id='socialSecurity'  label='Social security' client={ client } labelInfo={null}/>
        <IncomeRow id='alimony'         label='Alimony'         client={ client } labelInfo={null}/>
        <IncomeRow id='otherIncome'     label='Other income'    client={ client } labelInfo={null}/>

        <br/>
        <br/>

        <div>
          <Header as='h4' textAlign='center'>
            FOR A HOUSEHOLD SIZE OF <strong>{funcs.pageState.householdSize}</strong>:
          </Header>
          <Statistic>
            <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
            <Statistic.Value>{Math.round(percentPovertyLevel(funcs.pageState.annualIncome,funcs.pageState.householdSize))}%</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>% of State Median Income</Statistic.Label>
            <Statistic.Value>{Math.round(percentStateMedianIncome(funcs.pageState.annualIncome,funcs.pageState.householdSize))}%</Statistic.Value>
          </Statistic>
        </div>

      </div>
    );

  }  // End render()

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
var funcs;

// `props` is a cloned version of the original props. References broken.
class IncomeStep extends Component {

  constructor ( props ) {
    super( props );  // makes `this.props`
    // Just use the functions from that since other references are broken
    funcs = props;
  }

  render () {

    // Prospective titles:
    // title = 'Previous Household Monthly Income'
    // clarifier = 'How much money did your household make the last time you were assessed for your benefits?'

    return (
      <Form className = 'income-form'>
        <FormPartsContainer
          title = 'Household Annual Income'
          clarifier = 'How much money does your household earn every year before taxes?'
          next = { this.props.nextStep }
          prev = { this.props.previousStep }
          Insertable = { IncomeForm }
          client = { this.props.pageState }
        />
      </Form>
    );

  }  // End render()

};  // End IncomeStep() Component


export { IncomeStep };
