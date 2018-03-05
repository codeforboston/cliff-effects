import React, { Component } from 'react';
import { MonthlyCashFlowRow } from './formHelpers';

import { isPositiveNumber } from '../utils/validators';


class RentShareField extends Component {
  state = { valid: true }

  updateFieldValidity = valid => this.setState({ valid: valid });

  validate = ( ownValue ) => {
    let selfBelow = ownValue <= this.props.timeState[ 'contractRent' ]
    return selfBelow && isPositiveNumber( ownValue );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { valid } = this.state;
    const inputProps = {
      value:      timeState[ 'rentShare' ],
      name:       'rentShare',
      className:  [ time, type, 'cashflow-column', 'monthly' ].join(' '),
      validate:   this.validate,
      updateFieldValidity: this.updateFieldValidity,
    }

    return (
      <MonthlyCashFlowRow
        inputProps={inputProps}
        setClientProperty={setClientProperty}
        label={'Your Monthly Rent Share (how much of the total rent you have to pay)'}
        valid={valid}
        invalidMessage={'Rent share must be less than contract rent'} />
    );
  }
}


class ContractRentField extends Component {
  state = { valid: true }

  updateFieldValidity = valid => this.setState({ valid: valid });

  validate = ( ownValue ) => {
    let selfAbove = ownValue >= this.props.timeState[ 'rentShare' ]
    return selfAbove && isPositiveNumber( ownValue );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { valid } = this.state;

    const inputProps = {
      value:      timeState[ 'contractRent' ],
      name:       'contractRent',
      className:  [ time, type, 'cashflow-column', 'monthly' ].join(' '),
      validate:   this.validate,
      updateFieldValidity: this.updateFieldValidity,
    }

    return (
      <MonthlyCashFlowRow
        inputProps={inputProps}
        setClientProperty={setClientProperty}
        label={'Monthly Contract Rent (the total rent for your apartment)'}
        valid={valid}
        invalidMessage={'Rent share must be less than contract rent'} />
    );
  }
}


const PlainRentRow = function ({ timeState, setClientProperty, time, type }) {

  const inputProps = {
    value:      timeState[ 'rent' ],
    name:       'rent',
    className:  [ time, type, 'cashflow-column', 'monthly' ].join(' '),
    validate:   isPositiveNumber,
    updateFieldValidity: function () {},
  }

  return (
    <MonthlyCashFlowRow
      inputProps={inputProps}
      setClientProperty={setClientProperty}
      label={'Monthly Rent'}
      valid={true}
      invalidMessage={''} />
  );

};  // End <PlainRentRow>


export {
  ContractRentField,
  RentShareField,
  PlainRentRow,
};
