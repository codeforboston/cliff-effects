import React, { Component } from 'react';
import { MonthlyCashFlowRow } from './formHelpers';

import { isPositiveNumber } from '../utils/validators';


class RentShareField extends Component {
  state = { valid: true,
    message: null };

  validation = (ownValue) => {
    var message = null, valid = true;

    let isPosNum = isPositiveNumber(ownValue);
    if (!isPosNum) { valid = false; }
    else {
      valid = ownValue <= this.props.timeState[ 'contractRent' ];
      if (!valid) { message = 'Rent share must be less than contract rent'; }
    }

    this.setState({ valid: valid,
      message: message });
    return valid;
  };

  onBlur = (evnt) => {
    this.setState({ valid: true,
      message: null });
  };

  render() {
    const { timeState, setClientProperty } = this.props,
      { valid, message } = this.state;

    const inputProps = {
        name:       'rentShare',
        validation: this.validation,
        onBlur:     this.onBlur,
      },
      rowProps = {
        label:    'Your Monthly Rent Share (how much of the total rent you have to pay)',
        validRow: valid,
        message:  message,
      };

    return (
      <MonthlyCashFlowRow
        inputProps        = { inputProps }
        baseValue         = { timeState[ 'rentShare' ] }
        includes          = {[
          'monthly', 
        ]}
        setClientProperty = { setClientProperty }
        rowProps          = { rowProps } />
    );
  }
}  // End <RentShareField>


class ContractRentField extends Component {
  state = { valid: true,
    message: null };

  validation = (ownValue) => {
    var message = null, valid = true;

    let isPosNum = isPositiveNumber(ownValue);
    if (!isPosNum) { valid = false; }
    else {
      valid = ownValue >= this.props.timeState[ 'rentShare' ];
      if (!valid) { message = 'Rent share must be less than contract rent'; }
    }

    this.setState({ valid: valid,
      message: message });
    return valid;
  };

  onBlur = (evnt) => {
    this.setState({ valid: true,
      message: null });
  };

  render() {
    const { timeState, setClientProperty } = this.props,
      { valid, message } = this.state;

    const inputProps = {
        name:       'contractRent',
        validation: this.validation,
        onBlur:     this.onBlur,
      },
      rowProps = {
        label:    'Monthly Contract Rent (the total rent for your apartment)',
        validRow: valid,
        message:  message,
      };

    return (
      <MonthlyCashFlowRow
        inputProps        = { inputProps }
        baseValue         = { timeState[ 'contractRent' ] }
        includes          = {[
          'monthly', 
        ]}
        setClientProperty = { setClientProperty }
        rowProps          = { rowProps } />
    );
  }
}  // End <ContractRentField>


const PlainRentRow = function ({ timeState, setClientProperty }) {

  const inputProps = {
      name:       'rent',
      validation: isPositiveNumber,
      onBlur:     function () {},
    },
    rowProps = {
      label:    'Monthly Rent',
      validRow: true,
      message:  null,
    };

  return (
    <MonthlyCashFlowRow
      inputProps        = { inputProps }
      baseValue         = { timeState[ 'rent' ] }
      includes          = {[
        'monthly', 
      ]}
      setClientProperty = { setClientProperty }
      rowProps          = { rowProps } />
  );

};  // End <PlainRentRow>


export {
  ContractRentField,
  RentShareField,
  PlainRentRow,
};
