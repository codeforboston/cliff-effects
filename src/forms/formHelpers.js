// REACT COMPONENTS
import React from 'react';
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

// UTILITIES
import { roundMoney, toMonthlyAmount } from '../helpers/math';


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
const BottomButton = function(props){
  return (
    <Grid.Column className='large-bottom-button' width={3}>
      <Button color='teal' fluid size='large' onClick={props.func}>
        { props.children }
      </Button>
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
const BottomButtons = function(props){
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Row>
        { !props.left
          ? <Grid.Column className='large-bottom-button' width={3}/>
          : <BottomButton func={props.left.func}>{ props.left.name }</BottomButton>
        }
        <Grid.Column width={10} />
        { !props.right
          ? <Grid.Column className='large-bottom-button' width={3}/>
          : <BottomButton func={props.right.func}>{ props.right.name }</BottomButton>
          
        }
      </Grid.Row>
    </Grid>
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
    <Segment padded='very' style={{ minHeight: '600px' }}>
      <Segment style={{ minHeight: '500px' }} basic={true}>
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
* @property {object} props.setClientCheckedProperty - Function that changes page
* state (changes the "source of truth")
* @property {string} props.name - The key of the client property that
* will be saved and will be used to fill in the field's value.
* 
* @returns Component
*/
const MassiveToggle = function (props) {

  /** @todo Switch props.setClientCheckedProperty to props.onChange everywhere */
  return (
    <Form.Field className='massive-toggle'
      toggle
      label={ props.label }
      checked={ props.checked || props.value }
      onChange={ props.onChange || props.setClientCheckedProperty }
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
const FormHeading = function ({ subheading, children }) {

  if ( !children ) { return null; }

  return (
    <wrapper className={'form-heading'} >
      <div></div> {/** div here to make sure header margin doesn\'t collapse */}
      <Header as='h3' style={{ display: 'inline-block' }}>
        { children }
      </Header>
      <FormSubheading>{subheading}</FormSubheading>
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
  var classes = type + '-column header ' + colName;
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

  var baseStyles  = {
        marginTop: '0.7em', marginBottom: '0.7em',
        display: 'inline-block', fontSize: '14px'
      },
      inputStyles  = { ...baseStyles, width: '7em', textAlign: 'center' },
      lefterStyles = { ...inputStyles, marginRight: '0.2em' },
      rightStyles  = { ...inputStyles, marginRight: '0.9em' };

  return (
    <wrapper style={{ display: 'inline-block' }}>
      <ColumnHeading type={type} colName='weekly'  style={lefterStyles}>Weekly</ColumnHeading>
      <ColumnHeading type={type} colName='monthly' style={lefterStyles}>Monthly</ColumnHeading>
      <ColumnHeading type={type} colName='yearly'  style={rightStyles}>Yearly</ColumnHeading>
      <ColumnHeading type={type} colName={type} style={baseStyles}>Expense Type</ColumnHeading>
    </wrapper>
  );

};  // End IntervalColumnHeadings{} Component


/** @todo description
* 
* @todo Make this more generic and make the caller
* handle more of the specifics.
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const CashFlowInput = function ({ interval, generic, time, type, store, value, style, id, name }) {

  var handleChange = function ( evnt, inputProps ) {

    var name    = time + generic + 'Monthly',
        monthly = toMonthlyAmount[ interval ]( evnt, evnt.target.value ),
        obj     = { name: name , value: monthly };

    store( evnt, obj );

  };  // End handleChange()

  /** @todo Different class for something 'future' that has a current value that isn't 0 */

  return (
    <Input
      className = { type + ' cashflow-column ' + interval }
      onChange  = { handleChange }
      value     = { value }
      style     = { style }
      name      = { name }
      type      = { 'number' } step = { '0.01' } min = { '0' }
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
const CashFlowRow = function ({ generic, client, setClientProperty, children, labelInfo, type, time }) {

  var lefter  = { width: '7em', marginRight: '.2em' },
      righter = { width: '7em', marginRight: '.9em' };

  /** baseVal
  * Get the time ('future' or 'current') monthly value unless there is
  * none, in which case, get the 'current' monthly cash flow value (to
  * prefill future values with 'current' ones if needed).
  * 
  * @var
  * 
  * @todo Add some kind of UI indication when it's the same as the 'current'
  * value. What if some of the row's values are the same and some are
  * different?
  */
  var intervalID  = generic + 'Monthly',
      baseVal     = client[ time + intervalID ];

  if ( !baseVal ) { baseVal = client[ 'current' + intervalID ] || ''; }

  // Could use `_.capitalize()` in CashFlowInput to use `type`
  // to get id, but doesn't seem worth it at the moment.
  // Maybe put some of these in an object?
  return (
    <Form.Field inline>
      <CashFlowInput
        type     = { type }
        time     = { time }
        interval = { 'weekly' }
        value    = { roundMoney( baseVal / 4.33 ) || '' }
        store    = { setClientProperty }
        generic  = { generic }
        name     = { time + generic + 'Weekly' }
        style    = { lefter }
      />
      <CashFlowInput
        type     = { type }
        time     = { time }
        interval = { 'monthly' }
        value    = { roundMoney( baseVal ) || '' }
        store    = { setClientProperty }
        generic  = { generic }
        name     = { time + generic + 'Monthly' }
        style    = { lefter }
      />
      <CashFlowInput
        type     = { type }
        time     = { time }
        interval = { 'yearly' }
        value    = { roundMoney( baseVal * 12 ) || '' }
        store    = { setClientProperty }
        generic  = { generic }
        name     = { time + generic + 'Yearly' }
        style    = { righter }
      />
      <wrapper>
        <label>{ children }</label>
        <InlineLabelInfo>{ labelInfo }</InlineLabelInfo>
      </wrapper>
    </Form.Field>
  );

};  // End CashFlowRow{} Component


/** @todo Separate into different files? */
export {
  BottomButtons, FormPartsContainer, BottomButton,
  MassiveToggle, FormSubheading, FormHeading,
  InlineLabelInfo,
  IntervalColumnHeadings, ColumnHeading, CashFlowInput,
  CashFlowRow
};
