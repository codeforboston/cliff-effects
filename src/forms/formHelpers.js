import React, { Component } from 'react';
import {
  // Generic Form stuff
	Button,
  Grid,
  Header,
  Segment,
  Divider,
  Form,
  Input,
  Checkbox
  // Money columns
} from 'semantic-ui-react';
import { merge } from '../helpers/object-manipulation';
import { roundMoney, limit, toMonthlyAmount } from '../helpers/math';


// ========================================
// GENERIC COMPONENTS
// ========================================

/** Returns a Grid Column containing a button of the style used
* to navigate backwards and forwards through steps of the form.
* 
* @function
* @param {object} props
* @property {object} props.func - A function that is run when the
* button is clicked.
* @property {string} props.name - The text to be displayed on
* the button.
* 
* @returns Component
*/
class NavButton extends Component {

  constructor ( props ) { super( props ); }

  render () {

    return (
      <Grid.Column className="formNav" width={3}>
        <Button color='teal' fluid size='large' onClick={() => this.props.func()}>
          { this.props.name }
        </Button>
      </Grid.Column>
    );

  }  // End render()

};  // End PrevNext() Component


/** The row containing the "Previous" and 'Next' buttons at the
* bottom of each form page.
* 
* @function
* @param {object} propsContainer - Containing the `props` object in
* another object seemed to be the only way to pass on `props`.
* @property {object} propsContainer.props - Properties needed
* for the functional aspects of the Component. @todo Move the
* functions `previousStep()` and `nextStep()` into here if possible.
* @property {object} propsContainer.props.previousStep() - Function
* that goes back to the previous form element.
* @property {object} propsContainer.props.nextStep() - Function
* that goes forward to the next form element.
* 
* @todo Use this somehow for the first page and last page too,
* but then hide the 'previous' and the 'next' respectively? Or
* split those into their own Components?
* 
* @returns Component
*/
class PrevNext extends Component {

  constructor ( props ) { super( props ); }

  render () {

    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Row>
          <NavButton name='Previous' func={ this.props.prev } />
          <Grid.Column width={10} />
          <NavButton name='Next' func={ this.props.next } />
        </Grid.Row>
      </Grid>
    );

  }  // End render()

};  // End PrevNext() Component


/** Constructor for all the stuff that's supposed to go inside
* the Form Component. Does not include the `<Form>` Component
* as a container because it looks like that needs to be unique
* (the 'CurrentBenefitsStep' gives it `size='massive'`).
* 
* @function
* @param {object} props
* @property {string} props.title - Text to go in the `h1` element.
* @property {string} props.clarifier - Text to go in the `h3`
* element, giving some description, instructions, or clarifications.
* @property {string} props.Insertable - Component to be inserted
* into the middle - a custom form section containing inputs, etc.
* @property {Object} props.next - the 'next form section' function
* @property {Object} props.prev - the 'previous form section' function
* 
* @returns Component
*/
class FormPartsContainer extends Component {

  constructor ( props ) { super( props ); }

  render () {

    var props = this.props;

    return (
      <Segment padded='very' style={{ minHeight: '600' }}>
        <Segment style={{ minHeight: '500' }} basic={true}>
          <Header as='h1' color='teal' textAlign='center'>
            { props.title }
          </Header>
          <Header as='h3' textAlign='center'>
            { props.clarifier }
          </Header>

          { props.children }

        </Segment>
        <Divider />
        <PrevNext next={props.next} prev={props.prev} />
      </Segment>
    );

  }  // End render()

};  // End FormPartsContainer() Component


/** Toggle with size='massive'
* 
* @function
* @param {object} props - sent from attributes of previous element
* @property {string} props.label - Text displayed next to toggle
* @property {string} props.value - Should reflect state change and
* will be displayed as the value. Flow goes:
* user input > state > value > visual feedback
* @property {object} props.storeChecked - Function that changes page
* state (changes the "source of truth")
* @property {string} props.id - For the 'name' property (@todo switch
* from name to id? Maybe the source of truth only likes names.)
* 
* @returns Component
*/
const MassiveToggle = function ( props ) {

  var time = props.time || '';

  return (
    <Form.Field className='massive-toggle'
      toggle
      label={ props.label }
      checked={ props.value }
      onChange={ props.storeChecked }
      name={ props.id }
      control={ Checkbox }
      size='massive'/>
  );

};  // End MassiveToggle{} Component


/** A clearer way than a ternary operator to have a possible
* subheader. Also, clearer for separate styling
* 
* @function
* @param {object} props
* @property {object} props.children - Contents of this element
* 
* @returns Component
*/
const FormSubheading = function ( props ) {

  if ( !props.children ) { return null; }

  return (
    <wrapper className = { 'form-subheading' }
      style={{ display: 'block', textAlign: 'left' }}>
        { props.children }
    </wrapper>
  );

};  // End FormSubheading{} Component


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const FormHeading = function ( props ) {

  if ( !props.children ) { return null; }

  return (
    <wrapper className={'form-heading'} >
      <br/>
      <Divider horizontal style={{ display: 'inline-block' }}>
        { props.children }
      </Divider>
      <FormSubheading>{ props.subheading }</FormSubheading>
      <br/>
    </wrapper>
  );

};  // End FormHeading{} Component


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const InlineLabelInfo = function ( props ) {

  var labelInfoDisplay = ' hidden'; // Will be '' in future

  // return (
  //   <wrapper className = { 'label-info info-revealer' + labelInfoDisplay } style = {{
  //     position: 'relative', top: '-0.5em',
  //     marginLeft: '1em', padding: '0.1em 0.2em',
  //     textAlign: 'left', verticalAlign: 'middle',
  //     border: '1px solid black'
  //   }}>
  //     <wrapper className='info-indicator'>i</wrapper>
  //     <wrapper className='info-tooltip'>{props.children}</wrapper>
  //   </wrapper>
  // );

  return (
    <wrapper className = { 'label-info' + labelInfoDisplay }
      style = {{ marginLeft: '1em' }}>
        { props.children }
    </wrapper>
  );

};  // End InlineLabelInfo{} Component

// Possible tooltip version of labels:
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



// ========================================
// MONEY ON INTERVALS COLUMNS COMPONENTS
// ========================================

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


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const ColumnHeading = function ( props ) {
  var classes = props.type + '-column header ' + props.colName;
  return (
    <Header as='h4' className={classes} style={props.style} color='teal'>{ props.children }</Header>
  );
};  // End ColumnHeading()


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const IntervalColumnHeadings = function ( props ) {

  var baseStyles  = {
        marginTop: '0.7em', marginBottom: '0.7em',
        display: 'inline-block', fontSize: '14px'
      },
      inputStyles  = merge( { width: '7em', textAlign: 'center' }, baseStyles  ),
      lefterStyles = merge( { marginRight: '0.2em' }, inputStyles ),
      rightStyles  = merge( { marginRight: '0.9em' }, inputStyles );

  return (
    <wrapper style={{ display: 'inline-block' }}>
      <ColumnHeading type={props.type} colName='weekly'  style={lefterStyles}>Weekly</ColumnHeading>
      <ColumnHeading type={props.type} colName='monthly' style={lefterStyles}>Monthly</ColumnHeading>
      <ColumnHeading type={props.type} colName='yearly'  style={rightStyles}>Yearly</ColumnHeading>
      <ColumnHeading type={props.type} colName={props.type} style={baseStyles}>Expense Type</ColumnHeading>
    </wrapper>
  );

};  // End IntervalColumnHeadings{} Component


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const CashFlowInput = function ( props ) {

  /**
  * Needs: interval, generic, time, store, type, value, style, id
  */
  var handleChange = function ( evnt, inputProps ) {

    var name    = props.time + props.generic + 'Monthly',
        monthly = toMonthlyAmount[ props.interval ]( evnt, evnt.target.value ),
        obj     = { name: name , value: monthly };

    props.store( evnt, obj );

  };  // End handleChange()

  /** @todo Different class for something current that has a previous value that isn't 0 */

  return (
    <Input
      className = { props.type + ' cashflow-column ' + props.interval }
      onChange  = { handleChange }
      value     = { props.value }
      style     = { props.style }
      name      = { props.id }
      id        = { props.id }
      type = { 'number' } step = { '0.01' } min = { '0' }
    />
  );

};  // End CashFlowInput{} Component


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const CashFlowRow = function ( props ) {
  /**
  * Needs: generic, client, store, children, labelInfo, type, time
  */

  var lefter  = { width: '7em', marginRight: '.2em' },
      righter = { width: '7em', marginRight: '.9em' },
      sharedProps = {
        type: props.type, time: props.time,
        store: props.storeComplex, generic: generic
      };

  /** baseVal
  * Get the current monthly value unless there is none, in which case, get
  * the previous monthly cash flow value.
  * 
  * @var
  * 
  * @todo Add some kind of UI indication when it's the same as the previous
  * value. What if some of the row's values are the same and some are
  * different?
  */
  var generic     = props.generic,
      intervalID  = generic + 'Monthly',
      baseVal     = props.client[ 'current' + intervalID ];

  if ( !baseVal ) { baseVal = props.client[ 'previous' + intervalID ] || ''; }

  // Could use `capitalizeWord()` in CashFlowInput to use `props.type`
  // to get id, but doesn't seem worth it at the moment.
  // Maybe put some of these in an object?
  return (
    <Form.Field inline>
      <CashFlowInput
        type     = { props.type }
        time     = { props.time }
        interval = { 'weekly' }
        value    = { roundMoney( baseVal / 4.33 ) || '' }
        store    = { props.storeComplex }
        generic  = { generic }
        id       = { generic + 'Weekly' }
        style    = { lefter }
      />
      <CashFlowInput
        type     = { props.type }
        time     = { props.time }
        interval = { 'monthly' }
        value    = { roundMoney( baseVal ) || '' }
        store    = { props.storeComplex }
        generic  = { generic }
        id       = { generic + 'Monthly' }
        style    = { lefter }
      />
      <CashFlowInput
        type     = { props.type }
        time     = { props.time }
        interval = { 'yearly' }
        value    = { roundMoney( baseVal * 12 ) || '' }
        store    = { props.storeComplex }
        generic  = { generic }
        id       = { generic + 'Yearly' }
        style    = { righter }
      />
      <label>{ props.children }</label>
      <InlineLabelInfo>{ props.labelInfo }</InlineLabelInfo>
    </Form.Field>
  );

};  // End CashFlowRow{} Component


/** @todo Separate into different files? */
export {
  PrevNext, FormPartsContainer, NavButton,
  MassiveToggle, FormSubheading, FormHeading,
  InlineLabelInfo,
  IntervalColumnHeadings, ColumnHeading, CashFlowInput,
  CashFlowRow
};
