import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';

import { InlineLabelInfo } from './formHelpers';

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
    const { contractRent, updateFieldError } = this.props;
  
    let valid = value <= contractRent;
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
          value     = { baseVal / 4.33 }
          name      = { 'rentShareWeekly' }
          className = { classes.concat( 'weekly' ).join(' ') }
          otherData = { 'weekly' }
          contractRent = {baseContractRent / 4.33}
        />
        <RentInput
          {...baseProps}
          value     = { baseVal }
          name      = { 'rentShare' }
          className = { classes.concat( 'monthly' ).join(' ') }
          otherData = { 'monthly' }
          contractRent = {baseContractRent}
        />
        <RentInput
          {...baseProps}
          value     = { baseVal * 12 }
          name      = { 'rentShareYearly' }
          className = { classes.concat( 'yearly' ).join(' ') }
          otherData = { 'yearly' }
          contractRent = {baseContractRent * 12}
        />
        <div className={'cashflow-column'}>
          <label>Rent Share</label>
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
    const { rentShare, updateFieldError } = this.props;

    let valid = rentShare <= value;
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
          value     = { baseVal / 4.33 }
          name      = { 'rentShareWeekly' }
          className = { classes.concat( 'weekly' ).join(' ') }
          otherData = { 'weekly' }
          rentShare = {baseRentShare / 4.33}
        />
        <RentInput
          {...baseProps}
          value     = { baseVal }
          name      = { 'rentShare' }
          className = { classes.concat( 'monthly' ).join(' ') }
          otherData = { 'monthly' }
          rentShare = {baseRentShare}
        />
        <RentInput
          {...baseProps}
          value     = { baseVal * 12 }
          name      = { 'rentShareYearly' }
          className = { classes.concat( 'yearly' ).join(' ') }
          otherData = { 'yearly' }
          rentShare = {baseRentShare * 12}
        />
        <div className={'cashflow-column'}>
          <label>Contract Rent</label>
          <InlineLabelInfo>
            The full amount the landlord would charge without a Section 8 voucher
          </InlineLabelInfo>
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
