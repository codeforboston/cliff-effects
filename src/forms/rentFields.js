import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';

import { toMonthlyAmount } from '../utils/math';
import { isPositiveNumber } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';
import { ManagedNumberField } from './formHelpers';


const RentRow = function ({RentInput, label, error, errorMessage}) {
  return (
    <Form.Field inline className={'cashflow'}>
      {RentInput}
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

    var classes = [ time, type, 'cashflow-column', 'monthly' ].join(' ');

    const RentInput = <ManagedNumberField
            value     = { timeState[ 'rentShare' ] }
            name      = { 'rentShare' }
            className = { classes }
            otherData = { 'monthly' }
            store     = { updateClient }
            format    = { toMoneyStr }
            validate  = { this.validate }
            updateFieldError = { this.updateFieldError } />

    return (
      <RentRow
        RentInput={RentInput}
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

    var classes = [ time, type, 'cashflow-column', 'monthly' ].join(' ');

    const RentInput = <ManagedNumberField
            value     = { timeState[ 'contractRent' ] }
            name      = { 'rentShare' }
            className = { classes }
            otherData = { 'monthly' }
            store     = { updateClient }
            format    = { toMoneyStr }
            validate  = { this.validate }
            updateFieldError = { this.updateFieldError } />

    return (
      <RentRow
        RentInput={RentInput}
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
