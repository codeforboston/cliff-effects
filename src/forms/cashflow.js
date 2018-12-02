/** @module */

// REACT COMPONENTS
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { ManagedNumberField } from './inputs';
import { ValidationError } from './formHelpers';

// UTILITIES
import { toMonthlyAmount } from '../utils/math';
import { isNonNegNumber, hasOnlyNonNegNumberChars } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';


/** Maximum input value of yearly income allowed in the textbox,
 *     monthly/daily will be scaled
 * @var
 */
const MAXIMUM_VALUE_YEARLY = 999999.99;
const PERIODS_REGEX = /\./g;

/** Contains cash flow inputs, their label, and any user feedback
 *
 * @function
 * @param {object} props
 * @param {object} props.children The cash flow inputs
 * @param {object} props.label What category these inputs are for
 * @param {object} props.validRow Whether 'invalid' feedback needs to be shown
 * @param {object} props.message Feedback to user about invalid input
 *
 * @returns React element
 */
const CashFlowRow = function ({ children, label, name, validRow, message }) {

  // `for` and `id` for accessibility purposes
  // `for` can only be for one of the inputs, from what I can tell
  // https://www.w3.org/WAI/tutorials/forms/instructions/#using-aria-labelledby
  // `tab-index` for IE (see 'note')

  return (
    <Form.Field
      inline
      className = { `cashflow` }>
      <ValidationError
        ariaName    = { name }
        isUserError = { validRow === false }
        message     = { message }>
        <div className={ `cashflow-row` }>
          { children }
          <div className={ `cashflow-column cashflow-column-label` }>
            <label
              htmlFor   = { name + `_monthly` }
              id        = { name + `Label` }
              tabIndex  = { `-1` }>
              { label }
            </label>
          </div>
        </div>
      </ValidationError>
    </Form.Field>
  );
};  // Ends <CashFlowRow>

// @todo Find elegant way to combine CashFlowInputsRow and MonthlyCashFlowRow
// use `includes` array to include only certain columns perhaps.
/** One row for cash flow inputs - weekly, monthly, yearly
 *
 * @param {object} props
 * @param {object} props.generic Base name for the client property that
 *     needs to be updated (now the code has changed, this may be a misnomer)
 * @param {object} props.timeState Client, either future values or current values
 * @param {object} props.updateClientValue Updates client state
 * @param {object} props.children Text for the row label
 */
class CashFlowInputsRow extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, message: null };
  }

  // Special store validator that handles maximums and sets error message
  cashFlowStoreValidator = (max) => {
    return (str) => {
      if (!isNonNegNumber(str)) {
        let message = `That number doesn't look right`,
            periods = str.match(PERIODS_REGEX) || [];

        // Have a more detailed message if possible
        if (periods.length > 1) {
          message = `The number should only have one decimal point`;
        }

        this.setState({ valid: false, message: message });
        return false;
      }
      else if (parseFloat(str) > max) {
        // @todo Value should match up with the input that's being edited
        this.setState({ valid: false, message: (`The biggest number you can put in here is $` + MAXIMUM_VALUE_YEARLY + `/yr`) });
        return false;
      }
      this.setState({ valid: true, message: null });
      return true;
    };
  };  // Ends cashFlowStoreValidator()

  onBlur = (evnt) => {
    this.setState({ valid: true, message: null });
  };

  render() {
    let {
      generic,
      timeState,
      updateClientValue,
      children,
    } = this.props;

    let updateClient = function (evnt, inputProps, data) {
      let monthly = toMonthlyAmount[ data.interval ](evnt, inputProps.value),
          obj     = { name: generic, value: monthly };
      updateClientValue(evnt, obj);
    };

    /* Get the time ('future' or 'current') monthly value unless there is
     * none, in which case, get the 'current' monthly cash flow value
     * (to prefill future values with 'current' ones if needed).
     *
     * @todo Add some kind of UI indication when it's the same as the 'current'
     * value. What if some of the row's values are the same and some are
     * different? */
    let baseVal   = timeState[ generic ],
        baseProps = {
          name:             generic,
          className:        `cashflow-column`,
          store:            updateClient,
          displayValidator: hasOnlyNonNegNumberChars,
          format:           toMoneyStr,
          onBlur:           this.onBlur,
        };

    let cashFlowStoreValidator = this.cashFlowStoreValidator;
  
    return (
      <CashFlowRow
        label    = { children }
        name     = { generic }
        validRow = { this.state.valid }
        message  = { this.state.message }>
        <ManagedNumberField
          storeValidator = { cashFlowStoreValidator(MAXIMUM_VALUE_YEARLY / 52) }
          { ...baseProps }
          value     = { baseVal / (4 + 1 / 3) }
          otherData = {{ interval: `weekly` }} />
        <ManagedNumberField
          storeValidator = { cashFlowStoreValidator(MAXIMUM_VALUE_YEARLY / 12) }
          { ...baseProps }
          value     = { baseVal }
          otherData = {{ interval: `monthly` }} />
        <ManagedNumberField
          storeValidator = { cashFlowStoreValidator(MAXIMUM_VALUE_YEARLY) }
          { ...baseProps }
          value     = { baseVal * 12 }
          otherData = {{ interval: `yearly` }} />
      </CashFlowRow>
    );
  };  // Ends render()
};  // Ends <CashFlowInputsRow>


/** Show a value, or the sum of multiple values, of data
 *     that the user has already put in from another input.
 *
 * @todo Turn this row into a link to the input row where
 *     the data came from so the user can jump quickly and
 *     easily to the place where they can change the data.
 */
const CashFlowDisplayRow = function ({ generic, value, timeState, children }) {

  let baseVal      = value || timeState[ generic ],
      colClassName = `cashflow-column`,
      weekly       = toMoneyStr(baseVal / (4 + 1 / 3)),
      monthly      = toMoneyStr(baseVal),
      yearly       = toMoneyStr(baseVal * 12);

  return (
    <div className={ `cashflow cashflow-display` }>
      <div className={ colClassName + ` ` + generic + ` output-number` } >
        { weekly }
      </div>
      <div className={ colClassName + ` ` + generic + ` output-number` } >
        { monthly }
      </div>
      <div className={ colClassName + ` ` + generic + ` output-number` } >
        { yearly }
      </div>
      <div className={ colClassName + ` cashflow-column-label` }>
        <label>{ children }</label>
      </div>

    </div>
  );

};  // End <CashFlowDisplayRow>


/** One row for _one_ cash flow input - a monthly value
 *
 * @function
 * @param {object} props
 * @param {object} props.inputProps Key name, validators, and onBlur
 * @param {object} props.baseValue Start value of field?
 * @param {object} props.updateClientValue Updates client state
 * @param {object} props.rowProps `label`, `validRow`, `message`
 *
 * @returns Component
 */
const MonthlyCashFlowRow = function ({ inputProps, baseValue, updateClientValue, rowProps }) {

  inputProps = {
    ...inputProps, // name, validators, and onBlur
    className: `cashflow-column`,
    format:    toMoneyStr,
    store:     updateClientValue,
  };

  return (
    <CashFlowRow { ...rowProps }>
      <ManagedNumberField
        { ...inputProps }
        value     = { baseValue }
        otherData = {{ interval: `monthly` }} />
    </CashFlowRow>
  );

};  // Ends <MonthlyCashFlowRow>


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
  CashFlowInputsRow,
  CashFlowDisplayRow,
  MonthlyCashFlowRow,
};
