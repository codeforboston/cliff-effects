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

    this.handleChange = this.props.handleChange.bind(this);
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


class RentShareField extends Component {
  state = { error: false }

  updateFieldError = error => this.setState({ error: error });

  handleChange( evnt, inputProps ) {
    const { value } = inputProps;
    const { comparator, updateFieldError } = this.props;
  
    let valid = value <= comparator;
    updateFieldError(!valid);
  
    valid = valid && isPositiveNumber(value);
  
    if ( valid ) {
      this.props.store( evnt, inputProps, this.props.otherData );
    }
  
    this.setState({ valid: valid, focusedVal: value });
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
          updateFieldError: this.updateFieldError,
          handleChange: this.handleChange
        };

    const baseContractRent = timeState[ 'contractRent' ];

    return (
      <Form.Field inline className={'cashflow'}>
        <RentInput
          {...baseProps}
          value     = { baseVal }
          name      = { 'rentShare' }
          className = { classes.concat( 'monthly' ).join(' ') }
          otherData = { 'monthly' }
          comparator = {baseContractRent}
        />
        <div className={'cashflow-column cashflow-column-last-child'}>
          <label>Your Monthly Rent Share (how much of the total rent you have to pay)</label>
        </div>
        {error &&
          <Label basic color='red' pointing="left">
            Rent share must be less than contract rent
          </Label>}
      </Form.Field>
    );
  }
}


class ContractRentField extends Component {
  state = { error: false }

  updateFieldError = error => this.setState({ error: error });

  handleChange( evnt, inputProps ) {
    const { value } = inputProps;
    const { comparator, updateFieldError } = this.props;

    let valid = comparator <= value;
    updateFieldError(!valid);

    valid = valid && isPositiveNumber(value);

    if ( valid ) {
      this.props.store( evnt, inputProps, this.props.otherData );
    }

    this.setState({ valid: valid, focusedVal: value });
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
          updateFieldError: this.updateFieldError,
          handleChange: this.handleChange
        };

    const baseRentShare = timeState[ 'rentShare' ];

    return (
      <Form.Field inline className={'cashflow'}>
        <RentInput
          {...baseProps}
          value     = { baseVal }
          name      = { 'rentShare' }
          className = { classes.concat( 'monthly' ).join(' ') }
          otherData = { 'monthly' }
          comparator = {baseRentShare}
        />
        <div className={'cashflow-column cashflow-column-last-child'}>
          <label>Monthly Contract Rent (the total rent for your apartment)</label>
        </div>
        {error &&
          <Label basic color='red' pointing="left">
            Rent share must be less than contract rent
          </Label>}
      </Form.Field>
    );
  }
}

export {
  ContractRentField,
  RentShareField
};
