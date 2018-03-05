// REACT COMPONENTS
import React, { Component } from 'react';
import {
  // Generic Form stuff
  Button,
  Header,
  Segment,
  Divider,
  Form,
  Label,
  Grid,
  // Input,
  Checkbox,
} from 'semantic-ui-react';

// UTILITIES
import { toMonthlyAmount } from '../utils/math';
import { isPositiveNumber } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';


// ========================================
// GENERIC COMPONENTS
// ========================================

/** Returns a component with a massive teal button
 * 
 */
const MassiveButton = function ({ className, func, children }) {

  className = (className || '') + ' massive-button';
  return (
    <Button fluid type='button' color='teal' size='large' className={className} onClick={func}>
      { children }
    </Button>
  );

};  // End MassiveButton(<>)

/**
 * Link that opens new tab
 */
const ExternalLink = function ({ href, children }) {
  return (<a href={href} target='_blank'>{children}</a>);
};


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
const BottomButton = function(props){
  return (
    <Grid.Column className={'large-bottom-button'} width={3}>
      <MassiveButton {...props} />
    </Grid.Column>
  );
};  // End BottomButton() Component

/** The row containing the 'Previous' and 'Next' buttons at the
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
const BottomButtons = function({ left, right }) {
  const flexItemStyle = { flexBasis: '118.3px' };
  const buttonProps = { style: flexItemStyle, type: 'button', color: 'teal', size: 'large' }; 
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      { left ?
        <Button {...buttonProps} onClick={left.func}>
          { left.name }
        </Button>
        :
        <div style={flexItemStyle} />
      }
      { right ?
        <Button {...buttonProps} onClick={right.func}>
          { right.name }
        </Button>
        :
        <div style={flexItemStyle} />
      }
    </div>
  );
};  // End BottomButtons() Component


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
* @property {string} props.children - Component(s) to be inserted
* into the middle - a custom form section containing inputs, etc.
* @property {Object} props.next - the 'next form section' function
* @property {Object} props.prev - the 'previous form section' function
*
* @returns Component
*/
const FormPartsContainer = function(props) {
  return (
    <Segment padded='very' className="flex-item flex-column">
      <Segment basic={true} className="flex-item">
        <Header as='h1' color='teal' textAlign='center'>
          { props.title }
        </Header>
        { !props.clarifier
          ? null
          : <Header as='h3' textAlign='center'>
              { props.clarifier }
            </Header>
        }

        { props.children }

      </Segment>
      <Divider />
      <BottomButtons left={props.left} right={props.right} next={props.next} prev={props.prev} />

    </Segment>
  );
};  // End FormPartsContainer() Component


/** Toggle with size='massive'
*
* @function
* @param {object} props - sent from attributes of parent element
* @property {string} props.label - Text displayed next to toggle
* @property {string} props.value - Should reflect state change and
* will be displayed as the value. Flow goes:
* user input > state > value > visual feedback
* @property {object} props.setClientProperty - Function that changes page
* state (changes the "source of truth")
* @property {string} props.name - The key of the client property that
* will be saved and will be used to fill in the field's value.
*
* @returns Component
*/
const MassiveToggle = function (props) {

  /** @todo Switch props.setClientProperty to props.onChange everywhere */
  return (
    <Form.Field className='massive-toggle'
      toggle
      label={ props.label }
      checked={ props.checked || props.value }
      onChange={ props.onChange || props.setClientProperty }
      name={ props.name || props.name }
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
    <div className = { 'form-subheading' }
      style={{ display: 'block', textAlign: 'left' }}>
        { props.children }
    </div>
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
const FormHeading = function ({ subheading, children }) {

  if ( !children ) { return null; }

  return (
    <div className={'form-heading'} >
      <div></div> {/** div here to make sure header margin doesn\'t collapse */}
      <Header as='h3' style={{ display: 'inline-block' }}>
        { children }
      </Header>
      <FormSubheading>{subheading}</FormSubheading>
      <br/>
    </div>
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
  //   <div className = { 'label-info info-revealer' + labelInfoDisplay } style = {{
  //     position: 'relative', top: '-0.5em',
  //     marginLeft: '1em', padding: '0.1em 0.2em',
  //     textAlign: 'left', verticalAlign: 'middle',
  //     border: '1px solid black'
  //   }}>
  //     <div className='info-indicator'>i</div>
  //     <div className='info-tooltip'>{props.children}</div>
  //   </div>
  // );

  return (
    <div className = { 'label-info' + labelInfoDisplay }
      style = {{ marginLeft: '1em' }}>
        { props.children }
    </div>
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
// INPUT CONTAINER COMPONENTS
// ========================================

/** Adds an option for an 'invalid input' message to the right of the last element */
const ValidatableRow = function ({children, valid, invalidMessage}) {
  return (
    <div>
      {children}
      {!valid &&
        <Label basic color='red' pointing="left">{invalidMessage}</Label>
      }
    </div>
  );
};  // End <ValidatableRow>


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
//     onChange={props.setClientProperty}
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
const ColumnHeading = function ({ type, colName, style, children }) {
  var classes = type + '-column cashflow-column header ' + colName;
  return (
    <Header as='h4' className={classes} style={style} color='teal'>{children}</Header>
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
const IntervalColumnHeadings = function ({ type }) {

  var columnTitle = type.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase()) + " Type",
      styles      = { fontSize: '14px' };

  return (
    <div style={{ display: 'inline-block' }}>
      <ColumnHeading type={type} colName='weekly'  style={styles}>Weekly</ColumnHeading>
      <ColumnHeading type={type} colName='monthly' style={styles}>Monthly</ColumnHeading>
      <ColumnHeading type={type} colName='yearly'  style={styles}>Yearly</ColumnHeading>
      <ColumnHeading type={type} colName={type} style={styles} columnTitle={columnTitle}>{columnTitle}</ColumnHeading>
    </div>
  );

};  // End IntervalColumnHeadings{} Component


/** 
 * @todo description
 * @todo Write callback descriptions for function params: http://usejsdoc.org/tags-callback.html
 * 
 * @param {Object} props
 * @param {number || string} props.value - Valid client value
 * @param {string} props.name - For HTML name property
 * @param {string} props.className - HTML class names
 * @param {*} [props.otherData] - Sent back to `store()`
 * @param {function} props.format - Given `value`. Must return what you want shown in the number field.
 * @param {function} props.validate - Given `value`. Must return boolean.
 * @param {function} props.store - Given an event, `value`, [`otherData`]
 */
class ManagedNumberField extends Component {
  constructor ( props ) {
    super( props );
    // Need updating
    this.state = {
      focused:    false,
      valid:      true,
      focusedVal: this.props.value,
    };
  }  // End constructor()
  
  handleFocus = ( evnt, inputProps ) => {
    var newState = {
      focused:    true,
      // `value` here is probably a long decimal
      focusedVal: this.props.format( this.props.value )
    }
    this.setState( newState );
  }
  
  handleBlur = ( evnt ) => {
    this.props.updateFieldValidity(true)
    this.setState({ focused: false, valid: true });
  }

  handleChange = ( evnt, inputProps ) => {

    var { value } = inputProps,
        valid = this.props.validate( value );

    if ( valid ) {
      this.props.store( evnt, inputProps, this.props.otherData );
    }

    this.props.updateFieldValidity(valid);
    this.setState({ valid: valid, focusedVal: value });
  }  // End handleChange()

  render() {

    var { valid, focused, focusedVal }  = this.state;
    var { value, name, className }      = this.props;

    // Format correctly when neighbors are updated, if needed
    if ( !focused ) { value = this.props.format( value ) }
    else { value = focusedVal; }

    /** @todo Different class for something 'future' that has a current value that isn't 0 */
    return (
      <Form.Input
        error     = { !valid }
        value     = { value }
        name      = { name }
        className = { className }
        onChange  = { this.handleChange }
        onFocus   = { this.handleFocus }
        onBlur    = { this.handleBlur }
        type      = { 'number' } />
    );

  }  // End render()

};  // End ManagedNumberField


/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const CashFlowRow = function ({ generic, timeState, setClientProperty, children, labelInfo, type, time }) {

  var updateClient = function ( evnt, inputProps, interval ) {
    var monthly = toMonthlyAmount[ interval ]( evnt, inputProps.value ),
        obj     = { name: generic, value: monthly };
    setClientProperty( evnt, obj );
  };

  /** baseVal
   * Get the time ('future' or 'current') monthly value unless there is
   *     none, in which case, get the 'current' monthly cash flow value
   *     (to prefill future values with 'current' ones if needed).
   *
   * @var
   *
   * @todo Add some kind of UI indication when it's the same as the 'current'
   *     value. What if some of the row's values are the same and some are
   *     different?
   */
  var baseVal   = timeState[ generic ],
      classes   = [ time, type, 'cashflow-column' ],
      baseProps = {
        store:    updateClient,
        validate: isPositiveNumber,
        format:   toMoneyStr,
        updateFieldValidity: function () {}
      };

  return (
    <Form.Field inline className={'cashflow'}>
      <ManagedNumberField
        {...baseProps}
        value     = { baseVal / 4.33 }
        name      = { generic + 'Weekly' }
        className = { classes.concat( 'weekly' ).join(' ') }
        otherData = { 'weekly' }
      />
      <ManagedNumberField
        {...baseProps}
        value     = { baseVal }
        name      = { generic }
        className = { classes.concat( 'monthly' ).join(' ') }
        otherData = { 'monthly' }
      />
      <ManagedNumberField
        {...baseProps}
        value     = { baseVal * 12 }
        name      = { generic + 'Yearly' }
        className = { classes.concat( 'yearly' ).join(' ') }
        otherData = { 'yearly' }
      />
      <div className={'cashflow-column'}>
        <label>{ children }</label>
        <InlineLabelInfo>{ labelInfo }</InlineLabelInfo>
      </div>
    </Form.Field>
  );

};  // End CashFlowRow{} Component


/** CashflowRow with only a monthly value. */
const MonthlyCashFlowRow = function ({inputProps, setClientProperty, label, valid, invalidMessage}) {

  var updateClient = function ( evnt, inputProps, interval ) {
    var monthly = toMonthlyAmount[ interval ]( evnt, inputProps.value ),
        obj     = { name: inputProps.name, value: monthly };
    setClientProperty( evnt, obj );
  };

  return (
    <Form.Field inline className={'cashflow'}>
      <ValidatableRow valid={valid} invalidMessage={invalidMessage}>

        <ManagedNumberField {...inputProps} store={updateClient} otherData={'monthly'} format={ toMoneyStr } />
        <div className={'cashflow-column cashflow-column-last-child'}>
          <label>{label}</label>
        </div>
      
      </ValidatableRow>
    </Form.Field>
  );

};  // End <MonthlyCashFlowRow>


/** @todo Separate into different files? */
export {
  ExternalLink,
  BottomButtons, FormPartsContainer, BottomButton,
  MassiveToggle, FormSubheading, FormHeading,
  InlineLabelInfo,
  ValidatableRow,
  IntervalColumnHeadings, ColumnHeading, ManagedNumberField,
  CashFlowRow, MonthlyCashFlowRow
};
