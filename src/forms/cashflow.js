// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { ManagedNumberField } from './inputs';
import { InvalidMessage } from './formHelpers';

// UTILITIES
import { toMonthlyAmount } from '../utils/math';
import { isNonNegNumber, hasOnlyNonNegNumberChars } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';


/** Contains cash flow inputs, their label, and any user feedback
 *
 * @function
 * @param {object} props
 * @property {object} props.children - The cash flow inputs
 * @property {object} props.label - What category these inputs are for
 * @property {object} props.validRow - Whether 'invalid' feedback needs to be shown
 * @property {object} props.message - Feedback to user about invalid input
 *
 * @returns Component
 */
const CashFlowContainer = function ({ children, label, validRow, message }) {
  return (
    <Form.Field
      inline
      className={ 'cashflow' }>
      { children }
      <div className={ 'cashflow-column cashflow-column-last-child' }>
        <label>{ label }</label>
      </div>
      <InvalidMessage
        validRow={ validRow }
        message={ message } />
    </Form.Field>
  );
};  // End <CashFlowContainer>


/** One row for cash flow inputs - weekly, monthly, yearly
 *
 * @function
 * @param {object} props
 * @property {object} props.generic - Base name for the client property that
 *     needs to be updated (now the code has changed, this may be a misnomer)
 * @property {object} props.timeState - Client, either future values or current values
 * @property {object} props.setClientProperty - Updates client state
 * @property {object} props.children - Text for the row label
 *
 * @returns Component
 */
/** @todo Find elegant way to combine CashFlowRow and MonthlyCashFlowRow
      use `includes` array to include only certain columns perhaps. */
const CashFlowRow = function ({ generic, timeState, setClientProperty, children }) {

  var updateClient = function (evnt, inputProps, data) {
    var monthly = toMonthlyAmount[ data.interval ](evnt, inputProps.value),
        obj     = { name: generic, value: monthly };
    setClientProperty(evnt, obj);
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
      baseProps = {
        name:             generic,
        className:        'cashflow-column',
        store:            updateClient,
        displayValidator: hasOnlyNonNegNumberChars,
        storeValidator:   isNonNegNumber,
        format:           toMoneyStr,
      };

  return (
    <CashFlowContainer
      label={ children }
      validRow={ true }
      message={ null }>
      <ManagedNumberField
        { ...baseProps }
        value     = { baseVal / (4 + 1 / 3) }
        otherData = {{ interval: 'weekly' }} />
      <ManagedNumberField
        { ...baseProps }
        value     = { baseVal }
        otherData = {{ interval: 'monthly' }} />
      <ManagedNumberField
        { ...baseProps }
        value     = { baseVal * 12 }
        otherData = {{ interval: 'yearly' }} />
    </CashFlowContainer>
  );

};  // End CashFlowRow{} Component


/** One row for _one_ cash flow input - a monthly value
 *
 * @function
 * @param {object} props
 * @property {object} props.inputProps - Key name, validators, and onBlur
 * @property {object} props.baseValue - Start value of field?
 * @property {object} props.setClientProperty - Updates client state
 * @property {object} props.rowProps - `label`, `validRow`, `message`
 *
 * @returns Component
 */
const MonthlyCashFlowRow = function ({ inputProps, baseValue, setClientProperty, rowProps }) {

  inputProps = {
    ...inputProps, // name, validators, and onBlur
    className: 'cashflow-column',
    format:    toMoneyStr,
    store:     setClientProperty,
  };

  return (
    <CashFlowContainer { ...rowProps }>
      <ManagedNumberField
        { ...inputProps }
        value={ baseValue }
        otherData={{ interval: 'monthly' }} />
    </CashFlowContainer>
  );

};  // End <MonthlyCashFlowRow>


// Ideas of how to handle a different styling situation
// (if we swap the input and label positions)

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


export {
  CashFlowRow,
  MonthlyCashFlowRow,
  CashFlowContainer,
};
