import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';

import { toMonthlyAmount } from '../utils/math';
import { isPositiveNumber } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';


class RentInput extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      focused:    false,
      valid:      true,
      focusedVal: this.props.value,
    };
  }

  handleChange = ( evnt, inputProps ) => {

    var { value } = inputProps,
        valid     = this.props.validate( value );

    if ( valid ) {
      this.props.store( evnt, inputProps, this.props.otherData );
    }

    this.props.updateFieldError(!valid);
    this.setState({ valid: valid, focusedVal: value });
  }
  
  handleFocus = ( evnt, inputProps ) => {
    var newState = {
      focused:    true,
      focusedVal: this.props.format( this.props.value )
    }
    this.setState( newState );
  }
  
  handleBlur = ( evnt ) => {
    this.props.updateFieldError(false)
    this.setState({ focused: false, valid: true });
  }

  render() {

    var { valid, focused, focusedVal }  = this.state;
    var { value, name, className }      = this.props;

    // Format correctly when neighbors are updated, if needed
    if ( !focused ) { value = this.props.format( value ) }
    else { value = focusedVal; }

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
  }
}


const RentRow = function ({Inputs, label, error, errorMessage}) {
  return (
    <Form.Field inline className={'cashflow'}>
      {Inputs}
      <div className={'cashflow-column cashflow-column-last-child'}>
        <label>{label}</label>
      </div>
      {error &&
        <Label basic color='red' pointing="left">{errorMessage}</Label>
      }
    </Form.Field>
  );
};  // End <RentRow>


class RentShareField extends Component {
  state = { error: false }

  updateFieldError = error => this.setState({ error: error });

  validate = ( value ) => {
    let below = value <= this.props.timeState[ 'contractRent' ]
    return below && isPositiveNumber( value );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { error } = this.state;

    var updateClient = function ( evnt, inputProps, interval ) {
      var monthly = toMonthlyAmount[ interval ]( evnt, inputProps.value ),
          obj     = { name: 'rentShare', value: monthly };
      setClientProperty( evnt, obj );
    };

    var baseVal   = timeState[ 'rentShare' ],
        classes   = [ time, type, 'cashflow-column' ],
        baseProps = {
          store:    updateClient,
          format:   toMoneyStr,
          validate: this.validate,
          updateFieldError: this.updateFieldError
        };

    const Inputs = <RentInput
            {...baseProps}
            value     = { baseVal }
            name      = { 'rentShare' }
            className = { classes.concat( 'monthly' ).join(' ') }
            otherData = { 'monthly' } />

    return (
      <RentRow
        Inputs={Inputs}
        label={'Your Monthly Rent Share (how much of the total rent you have to pay)'}
        error={error}
        errorMessage={'Rent share must be less than contract rent'} />
    );
  }
}


class ContractRentField extends Component {
  state = { error: false }

  updateFieldError = error => this.setState({ error: error });

  validate = ( value ) => {
    let above = value >= this.props.timeState[ 'rentShare' ]
    return above && isPositiveNumber( value );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { error } = this.state;

    var updateClient = function ( evnt, inputProps, interval ) {
      var monthly = toMonthlyAmount[ interval ]( evnt, inputProps.value ),
          obj     = { name: 'contractRent', value: monthly };
      setClientProperty( evnt, obj );
    };

    var baseVal   = timeState[ 'contractRent' ],
        classes   = [ time, type, 'cashflow-column' ],
        baseProps = {
          store:    updateClient,
          format:   toMoneyStr,
          validate: this.validate,
          updateFieldError: this.updateFieldError,
        };

    const Inputs = <RentInput
            {...baseProps}
            value     = { baseVal }
            name      = { 'rentShare' }
            className = { classes.concat( 'monthly' ).join(' ') }
            otherData = { 'monthly' } />

    return (
      <RentRow
        Inputs={Inputs}
        label={'Monthly Contract Rent (the total rent for your apartment)'}
        error={error}
        errorMessage={'Rent share must be less than contract rent'} />
    );
  }
}

export {
  ContractRentField,
  RentShareField
};
