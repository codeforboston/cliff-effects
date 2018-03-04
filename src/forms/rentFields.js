import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import { toMonthlyAmount } from '../utils/math';
import { isPositiveNumber } from '../utils/validators';
import { toMoneyStr } from '../utils/prettifiers';
import { ManagedNumberField, ValidatableRow } from './formHelpers';


const RentRow = function ({inputProps, setClientProperty, label, invalid, invalidMessage}) {

  var updateClient = function ( evnt, inputProps, interval ) {
    var monthly = toMonthlyAmount[ interval ]( evnt, inputProps.value ),
        obj     = { name: inputProps.name, value: monthly };
    setClientProperty( evnt, obj );
  };

  return (
    <Form.Field inline className={'cashflow'}>
      <ValidatableRow invalid={invalid} invalidMessage={invalidMessage}>

        <ManagedNumberField {...inputProps} store={updateClient} otherData={'monthly'} format={ toMoneyStr } />
        <div className={'cashflow-column cashflow-column-last-child'}>
          <label>{label}</label>
        </div>
      
      </ValidatableRow>
    </Form.Field>
  );
};  // End <RentRow>


class RentShareField extends Component {
  state = { invalid: false }

  updateFieldValidity = invalid => this.setState({ invalid: invalid });

  validate = ( value ) => {
    let below = value <= this.props.timeState[ 'contractRent' ]
    return below && isPositiveNumber( value );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { invalid } = this.state;

    const inputProps = {
      value:      timeState[ 'rentShare' ],
      name:       'rentShare',
      className:  [ time, type, 'cashflow-column', 'monthly' ].join(' '),
      validate:   this.validate,
      updateFieldValidity: this.updateFieldValidity,
    }

    return (
      <RentRow
        inputProps={inputProps}
        setClientProperty={setClientProperty}
        label={'Your Monthly Rent Share (how much of the total rent you have to pay)'}
        invalid={invalid}
        invalidMessage={'Rent share must be less than contract rent'} />
    );
  }
}


class ContractRentField extends Component {
  state = { invalid: false }

  updateFieldValidity = invalid => this.setState({ invalid: invalid });

  validate = ( value ) => {
    let above = value >= this.props.timeState[ 'rentShare' ]
    return above && isPositiveNumber( value );
  }

  render() {
    const { timeState, setClientProperty, type, time } = this.props;
    const { invalid } = this.state;

    const inputProps = {
      value:      timeState[ 'contractRent' ],
      name:       'contractRent',
      className:  [ time, type, 'cashflow-column', 'monthly' ].join(' '),
      validate:   this.validate,
      updateFieldValidity: this.updateFieldValidity,
    }

    return (
      <RentRow
        inputProps={inputProps}
        setClientProperty={setClientProperty}
        label={'Monthly Contract Rent (the total rent for your apartment)'}
        invalid={invalid}
        invalidMessage={'Rent share must be less than contract rent'} />
    );
  }
}

export {
  RentRow,
  ContractRentField,
  RentShareField,
};
