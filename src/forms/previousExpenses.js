// import _ from 'lodash'
import React, { Component } from 'react';
import {
  // Button,
  Form,
  Grid,
  Header,
  Segment,
  // Step, Card, Icon,
  Checkbox,
  // Divider, Radio,
  Statistic,
  Divider,
  // Reveal,
  Input
} from 'semantic-ui-react';
// import { Redirect, Prompt } from 'react-router-dom';
// import { percentPovertyLevel, 
//         percentStateMedianIncome } from '../helpers/helperFunctions';
import { FormPartsContainer } from './formHelpers';
import { roundMoney, limit } from '../helpers/math';


/**
* @todo Abstract most of this out? It will eventually basically be
* a duplication of `PreviousIncomeStep` in many ways, though it'll
* have to get it's data differently. I think we can handle that
* farther out, though.
* 
* Also, there are a bunch of other notes in `PreviousIncomeStep`
*/


// ========================================
// FUNCTIONS
// ========================================

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

  var expenseObj = { name: genericID + 'Monthly', value: monthly };
  originals.handleChange( evnt, expenseObj );

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

class ExpenseInput extends Component {

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

};  // End ExpenseInput{} Component


class ExpenseRow extends Component {

  constructor ( props ) {
    super( props );  // makes this.props

    // In future, may show label info text
    if ( props.labelInfo ) { this.labelInfoDisplayClass = ' hidden'; }  // Will be '' in future
    else { this.labelInfoDisplayClass = ' hidden'; }
  }

  lefterColStyles = { width: '7em', marginRight: '.2em' }
  rightColStyles  = { width: '7em', marginRight: '.9em' }

  render () {

    var prevID  = this.props.id.replace( 'current', 'previous' ) + 'Monthly',
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
        <ExpenseInput
          classes   = 'weekly expense-column'
          timeframe = 'weekly'
          type      = 'number'
          style     = { this.lefterColStyles }
          generic   = { this.props.id }
          id        = { this.props.id + 'Weekly' }
          value     = { roundMoney( baseVal / 4.33 ) || '' }
          client    = { client }
        />
        <ExpenseInput
          classes   = 'monthly expense-column'
          timeframe = 'monthly'
          type      = 'number'
          style     = { this.lefterColStyles }
          generic   = { this.props.id }
          id        = { this.props.id + 'Monthly' }
          value     = { roundMoney( baseVal ) || '' }
          client    = { client }
        />
        <ExpenseInput
          classes   = 'yearly expense-column'
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
};  // End ExpenseRow{} Component



class Toggle  extends Component {
  constructor ( props ) { super( props ); }

  render() {
    var props = this.props;
    return (
      <Form.Field>
        <Form.Field
          name={ props.id }
          checked={ props.value }
          onChange={ props.handleChange }
          control={ Checkbox }
          label={ props.label }
          size='massive'
          toggle      
        />
      </Form.Field>
    );
  }  // End render()
};  // End Toggle{} Component



class None extends Component {
  constructor ( props ) { super( props ); }
  render() { return null; }  // End render()
};  // End None{} Component


class FormSubheading extends Component {

  // MUST HAVE a props.subheading
  constructor ( props ) { super( props ); }

  render() {
    return (
      <div className = { 'form-subheading' } >
        <div style={{ display: 'inline-block', textAlign: 'center' }}>
          {this.props.subheading}
        </div>
      </div>
    );
  }  // End render()

};  // End FormSubheading{} Component


class FormHeading extends Component {

  constructor ( props ) { super( props ); }

  render() {

    if ( !this.props.heading ) { return null; }

    var Subheading = None;
    if ( this.props.subheading ) { Subheading = FormSubheading }

    return (
      <div className = { 'form-heading' } >
        <br/>
        <Divider horizontal style={{ display: 'inline-block' }}>
          { this.props.heading }
        </Divider>
        <Subheading subheading={ this.props.subheading }/>
        <br/>
      </div>
    );

  }  // End render()

};  // End FormHeading{} Component


class ColumnHeadings extends Component {

  constructor ( props ) {

    super( props );

    this.color = 'teal';

    this.lefterColStyles = {
      width: '7em', marginRight: '0.2em', marginTop: '0.7em', marginBottom: '0.7em',
      textAlign: 'center', display: 'inline-block', fontSize: '14px'
    };

    this.rightColStyles  = {
      width: '7em', marginRight: '0.9em', marginTop: '0.7em', marginBottom: '0.7em',
      textAlign: 'center', display: 'inline-block', fontSize: '14px'
    };

  }  // End constructor()

  render() {
    return (
      <Form.Field inline>
        <Header as='h4' className='weekly expense-column heading' style={ this.lefterColStyles } color={ this.color }>
          Weekly
        </Header>
        <Header as='h4' className='monthly expense-column heading' style={ this.lefterColStyles } color={ this.color }>
          Monthly
        </Header>
        <Header as='h4' className='yearly expense-column heading' style={ this.rightColStyles } color={ this.color }>
          Yearly
        </Header>
        <Header as='h4' style={ { display: 'inline-block', fontSize: '14px', marginTop: '0.7em', marginBottom: '0.7em' } } color={ this.color }>
          Expense Type
        </Header>
      </Form.Field>
    );
  }  // End render()

};  // End ColumnHeadings{} Component


/** WATCH OUT: THIS COMES FROM FORM HELPERS, NOT PreviousExpensesStep */
class ExpensesForm extends Component {

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

    // `hasHousing` is actually whether they're in the housing voucher program
    var ownedAHome  = client.previousHomeowner,
        wasHomeless = client.previousHomeless && !client.hasHousing && !ownedAHome;

    return (
      <div className='field-aligner two-column'>

        <FormHeading heading = { 'Dependent Monthly Care' }
          subheading = {'(a dependant is a child or disabled adult)'}
          client = { client } props = { otherProps } />
        <ColumnHeadings/>
        <ExpenseRow id='previousDirectCareCosts'          label='Direct Care Costs ' client={ client } labelInfo={null}/>
        <ExpenseRow id='previousBeforeAndAfterSchoolPrograms'  label='Before- and After-School Programs' client={ client } labelInfo={null}/>
        <ExpenseRow id='previousTransportationCosts'      label='Transportation Costs' client={ client } labelInfo={null}/>
        <ExpenseRow id='previousOtherDependentCareCosts'  label='Other'               client={ client } labelInfo={null}/>


        <FormHeading heading={ 'Housing' } client={ client } props={ otherProps } />
          <Toggle id={ 'previousHomeless' } value={ wasHomeless }
            handleChange={ otherProps.toggle } label={ 'Was the household homeless at the last benefit assessment?' }
            labelInfo={null} />
        { wasHomeless
          ? null
          : <wrapper>
            <Divider></Divider>
            <ColumnHeadings/>
            <ExpenseRow id='previousRentOrMortgage'
              label='Rent or Mortgage'
              client={ client }  labelInfo={null} />
            <Toggle id='previousPaidUtilities' value={ client.previousPaidUtilities }
              label='Did the household pay utilities seperately from the rent?'
              handleChange={ otherProps.toggle }
              labelInfo={null} />
            { !client.previousPaidUtilities
              ? null
              : <wrapper>
                <Toggle id='previousClimateControl' value={ client.previousGotClimateControl }
                  label='Did the household pay for heating or cooling (e.g. A/C during summer), OR did they receive Fuel Assistance in the 12 months prior to the previous benefit assessment?'
                  handleChange={ otherProps.toggle }
                  labelInfo={null} />
                <Toggle id='previousNonHeatElectricity' value={ client.previousNonHeatElectricity }
                  label='Did the household pay for electricity for non-heating purposes?'
                  handleChange={ otherProps.toggle }
                  labelInfo={null} />
                <Toggle id='previousTelephone' value={ client.previousTelephone }
                  label='Did the household pay for its own telephone service?'
                  handleChange={ otherProps.toggle }
                  labelInfo={null} />
                </wrapper>
              }
          </wrapper>
        }
        { !wasHomeless
          ? <wrapper>
            <Divider></Divider>
            <Toggle id={ 'previousHomeowner' } value={ ownedAHome }
              handleChange={ otherProps.toggle } label={ 'Did the household own a home?' } />
          </wrapper>
          : null
        }
        { ownedAHome
          ? <wrapper>
            <ColumnHeadings/>
            <ExpenseRow id='previousHousingInsurance' label='Insurance Costs'   client={ client }  labelInfo={null}/>
            <ExpenseRow id='previousPropertyTax'      label='Property Tax'      client={ client }  labelInfo={null}/>
          </wrapper>
          : null
        }


        <FormHeading heading={ 'Other' } client={ client } props={ otherProps } />
        <ColumnHeadings/>
        <ExpenseRow id='previousChildSupportPaidOut'  label='Child support paid out' client={ client }  labelInfo={null}/>
        <ExpenseRow id='previousMedical'              label='Medical'                client={ client }  labelInfo={null}/>

      </div>
    );

  }  // End render()

};  // End ExpensesForm() Component

        // <div className = 'under-heading-spacer'></div>
/**
* @todo Does a medical assistant count as a medical expense?
* @todo Medical expense only matters if household has elder/disabled, but
* are they any medical expenses or only those of the disabled person? "Medical
* Expenses for Disabled or Elderly"
*/





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

/** WATCH OUT: THIS SENDS TO FORM HELPERS AND /THEN/ TO ExpensesForm */
// `props` is a cloned version of the original props. References broken.
class PreviousExpensesStep extends Component {

  constructor ( props ) {
    super( props );  // makes `this.props`
    originals = props;
  }

  render () {

    originals = this.props;

    /** WATCH OUT: THIS SENDS TO FORM HELPERS AND /THEN/ TO ExpensesForm */
    return (
      <Form className = 'expense-form'>
        <FormPartsContainer
          title       = 'Previous Household Monthly Expenses'
          clarifier   = { 'What were the household\'s expenses at the last time benefits were calculated?' }
          next        = { this.props.nextStep }
          prev        = { this.props.previousStep }
          Insertable  = { ExpensesForm }
          props       = { this.props }
          client      = { this.props.pageState }
        />
      </Form>
    );

  }  // End render()

};  // End PreviousExpensesStep() Component


export { PreviousExpensesStep };
