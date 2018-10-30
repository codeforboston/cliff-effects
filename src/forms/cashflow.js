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
 * @param {object} props.children The cash flow inputs
 * @param {object} props.label What category these inputs are for
 * @param {object} props.validRow Whether 'invalid' feedback needs to be shown
 * @param {object} props.message Feedback to user about invalid input
 *
 * @returns React element
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

/** Maximum input value of yearly income allowed in the textbox,
 *     monthly/daily will be scaled
 * @var
 */
const maximum_value_yearly = 999999.99;


class CashFlowInputsRow extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = { message: '' };
  }

  
  // Special store validator that handles maximums and sets error message
  cashFlowStoreValidator = (max) => {
    return (str) => {
      if (!isNonNegNumber(str)) {
        this.setState({ message: 'Invalid number format' });
        return false;
      } else if (parseFloat(str) > max) {
        this.setState({ message: ('The input number exceeds the maximum of $' + maximum_value_yearly + '/yr') });
        return false;
      }
      this.setState({ message: '' });
      return true;
    };
  };

  setValue = (event, { value }, { interval }) => {
    this.props.setValue({
      name:  this.props.generic,
      value: toMonthlyAmount[ interval ](event, value),
    });
  };

  render() {
    const { children, generic, timeState } = this.props;

    const baseVal = timeState.get(generic);

    const baseProps = {
      name:             generic,
      className:        'cashflow-column',
      store:            this.setValue,
      displayValidator: hasOnlyNonNegNumberChars,
      format:           toMoneyStr,
    };

    return (
      <CashFlowContainer
        label={ children }
        validRow={ !this.state.message }
        message={ this.state.message }>
        <ManagedNumberField
          storeValidator={ this.cashFlowStoreValidator(maximum_value_yearly / 52) }
          { ...baseProps }
          value     = { baseVal / (4 + 1 / 3) }
          otherData = {{ interval: 'weekly' }} />
        <ManagedNumberField
          storeValidator={ this.cashFlowStoreValidator(maximum_value_yearly / 12) }
          { ...baseProps }
          value     = { baseVal }
          otherData = {{ interval: 'monthly' }} />
        <ManagedNumberField
          storeValidator={ this.cashFlowStoreValidator(maximum_value_yearly) }
          { ...baseProps }
          value     = { baseVal * 12 }
          otherData = {{ interval: 'yearly' }} />
      </CashFlowContainer>
    );
  }
}

/** Show a value, or the sum of multiple values, of data
 *     that the user has already put in from another input.
 *
 * @todo Turn this row into a link to the input row where
 *     the data came from so the user can jump quickly and
 *     easily to the place where they can change the data.
 */
const CashFlowDisplayRow = function ({ generic, value, timeState, children }) {

  var baseVal      = value || timeState[ generic ],
      colClassName = `cashflow-column`,
      weekly       = toMoneyStr(baseVal / (4 + 1 / 3)),
      monthly      = toMoneyStr(baseVal),
      yearly       = toMoneyStr(baseVal * 12);

  return (
    <div className = { `cashflow cashflow-display` }>
      <div className = { colClassName + ` ` + generic + ` output-number` } >
        { weekly }
      </div>
      <div className = { colClassName + ` ` + generic + ` output-number` } >
        { monthly }
      </div>
      <div className = { colClassName + ` ` + generic + ` output-number` } >
        { yearly }
      </div>
      <div className = { colClassName + ` cashflow-column-last-child` }>
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
    className: 'cashflow-column',
    format:    toMoneyStr,
    store:     updateClientValue,
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
export class ImmutableMonthlyCashFlowRow extends React.PureComponent {

  setValue = (event, { value }) => {
    this.props.setValue({
      name:  this.props.inputProps.name,
      value: toMonthlyAmount.monthly(event, value),
    });
  };

  render() {
    const { inputProps, baseValue, rowProps } = this.props;
    
    return (
      <CashFlowContainer { ...rowProps }>
        <ManagedNumberField
          { ...inputProps }
          className="cashflow-column"
          format={ toMoneyStr }
          store={ this.setValue }
          value={ baseValue }
          otherData={{ interval: 'monthly' }} />
      </CashFlowContainer>
    );
  }
}; // End <ImmutableMonthlyCashFlowRow>


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
  CashFlowContainer,
  CashFlowInputsRow,
  CashFlowDisplayRow,
  MonthlyCashFlowRow,
};
