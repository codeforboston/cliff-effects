import React, { Component } from 'react';
import { MonthlyCashFlowRow } from './cashflow';

import {
  isNonNegNumber,
  hasOnlyNonNegNumberChars,
} from '../utils/validators';


const BLANK_FUNCTION = function () {};


class RentShareField extends Component {
  state = { valid: true, message: null };

  storeValidator = (ownValue) => {
    let message = null,
        valid   = true;

    let isPosNum = isNonNegNumber(ownValue);
    if (!isPosNum) {
      valid = false;
    } else {
      valid = (Number(ownValue) <= this.props.timeState[ `contractRent` ]);
      if (!valid) {
        message = `Rent share must be less than contract rent`;
      }
    }

    this.setState({ valid: valid, message: message });
    return valid;
  };

  onBlur = (evnt) => {
    this.setState({ valid: true, message: null });
  };

  render() {
    const {
            timeState,
            updateClientValue,
          } = this.props,
          {
            valid,
            message,
          } = this.state;

    const inputProps = {
            name:             `rentShare`,
            displayValidator: hasOnlyNonNegNumberChars,
            storeValidator:   this.storeValidator,
            onBlur:           this.onBlur,
          },
          rowProps = {
            label:    `Your Monthly Rent Share (how much of the total rent you have to pay)`,
            name:     `rentShare`,
            validRow: valid,
            message:  message,
          };

    return (
      <MonthlyCashFlowRow
        inputProps        = { inputProps }
        baseValue         = { timeState[ `rentShare` ] }
        includes          = { [ `monthly` ] }
        updateClientValue = { updateClientValue }
        rowProps          = { rowProps } />
    );
  };
};  // Ends <RentShareField>


class ContractRentField extends Component {
  state = { valid: true, message: null };

  storeValidator = (ownValue) => {
    let message = null,
        valid   = true;

    let isPosNum = isNonNegNumber(ownValue);
    if (!isPosNum) {
      valid = false;
    } else {
      valid = (ownValue >= this.props.timeState[ `rentShare` ]);
      if (!valid) {
        message = `Contract rent must be more than rent share`;
      }
    }

    this.setState({ valid: valid, message: message });
    return valid;
  };

  onBlur = (evnt) => {
    this.setState({ valid: true, message: null });
  };

  render() {
    const {
            timeState,
            updateClientValue,
          } = this.props,
          {
            valid,
            message,
          } = this.state;

    const inputProps = {
            name:             `contractRent`,
            displayValidator: hasOnlyNonNegNumberChars,
            storeValidator:   this.storeValidator,
            onBlur:           this.onBlur,
          },
          rowProps = {
            label:    `Monthly Contract Rent (the total rent for your apartment)`,
            name:     `contractRent`,
            validRow: valid,
            message:  message,
          };

    return (
      <MonthlyCashFlowRow
        inputProps        = { inputProps }
        baseValue         = { timeState[ `contractRent` ] }
        includes          = { [ `monthly` ] }
        updateClientValue = { updateClientValue }
        rowProps          = { rowProps } />
    );
  };
};  // Ends <ContractRentField>


const PlainRentRow = function ({ timeState, updateClientValue }) {

  const inputProps = {
          name:             `rent`,
          displayValidator: hasOnlyNonNegNumberChars,
          storeValidator:   isNonNegNumber,
          onBlur:           BLANK_FUNCTION,
        },
        rowProps = {
          label:    `Monthly Rent`,
          validRow: true,
          message:  null,
        };

  return (
    <MonthlyCashFlowRow
      inputProps        = { inputProps }
      baseValue         = { timeState[ `rent` ] }
      includes          = { [ `monthly` ] }
      updateClientValue = { updateClientValue }
      rowProps          = { rowProps } />
  );
};


export {
  ContractRentField,
  RentShareField,
  PlainRentRow,
};
