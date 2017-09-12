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
import { grossMonthlyIncome } from '../programs/grossMonthlyIncome';


/**
* @todo Abstract most of this out? It will eventually basically be
* a duplication of `PreviousIncomeStep` in many ways, though it'll
* have to get it's data differently. I think we can handle that
* farther out, though.
* 
* Also, there are a bunch of other notes in `PreviousIncomeStep`
*/


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

  var generics  = UNEARNED_INCOME_SOURCES,  // DO NOT ALTER THIS ARRAY
      sum       = 0;

  for (let namei = 0; namei < generics.length; namei++) {

    let name = generics[ namei ];
    sum += client[ 'current' + name + 'Monthly' ] || 0;

  };

  originals.handleChange(null, { name: 'currentUnearnedIncomeMonthly', value: sum });

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

  var incomeObj = { name: genericID + 'Monthly', value: monthly };
  originals.handleChange( evnt, incomeObj, function ( that ) {
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

  	var prevID 	= this.props.id.replace( 'current', 'previous' ) + 'Monthly',
  		  client  = this.props.client,
        baseVal = client[ this.props.id + 'Monthly' ];
    /**
    * Use the previous value unless the client has changed it to something new
    * 
    * @todo Add some kind of UI indication when it's the same as the previous
    * value. What if some of the row's values are the same and some are
    * different?
    */
    if ( !baseVal ) {
    	baseVal = client[ prevID ] || '';
    }

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
          value     = { roundMoney( baseVal ) || '' }
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


/** WATCH OUT: THIS COMES FROM FORM HELPERS, NOT CurrentIncomeStep */
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

    var client      = this.props.client,
        otherProps  = this.props.props;

    var monthly     = grossMonthlyIncome( client, 'current' ),
        grossAnnual = monthly * 12;

    /** 
    * As per Project Hope input, for the first prototype we're only
    * including the ability to change earned income.
    */
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

        <IncomeRow id='currentEarnedIncome' label='Earned income' client={ client } labelInfo={'(Weekly income = hourly wage times average number of work hours per week)'}/>

        <br/>
        <br/>

        <div>
          <Header as='h4' textAlign='center'>
            FOR A HOUSEHOLD SIZE OF <strong>{ otherProps.pageState.householdSize }</strong>:
          </Header>
          <Statistic>
            <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
            <Statistic.Value>{Math.round( percentPovertyLevel( grossAnnual, otherProps.pageState.householdSize ))}%</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>% of State Median Income</Statistic.Label>
            <Statistic.Value>{Math.round( percentStateMedianIncome( grossAnnual, otherProps.pageState.householdSize ))}%</Statistic.Value>
          </Statistic>
        </div>

      </div>
    );

  }  // End render()

};  // End IncomeForm() Component





// ===========================================
// ===========================================
// THIS IS ACTUALLY SEPARATE STUFF DOWN HERE
// ===========================================
// ===========================================

// When props are passed along into classes, etc., the are cloned. They
// don't stay the same object.
// I suppose I could pass everythign in repeatedly...
/** @todo Pass in everything, not just `pageState`/`client` */
var originals;

/** WATCH OUT: THIS SENDS TO FORM HELPERS AND /THEN/ TO IncomeForm */
// `props` is a cloned version of the original props. References broken.
class CurrentIncomeStep extends Component {

  constructor ( props ) {
    super( props );  // makes `this.props`
    originals = props;
  }

  render () {

    originals = this.props;

    /** @todo Are these titles accurate now? */

    /** WATCH OUT: THIS SENDS TO FORM HELPERS AND /THEN/ TO IncomeForm */
    return (
      <Form className = 'income-form'>
        <FormPartsContainer
          title = 'Current Household Monthly Income'
          clarifier = 'How much money does your household make now?'
          next = { this.props.nextStep }
          prev = { this.props.previousStep }
          Insertable = { IncomeForm }
          props = { this.props }
          client = { this.props.pageState }
        />
      </Form>
    );

  }  // End render()

};  // End CurrentIncomeStep() Component


export { CurrentIncomeStep };
