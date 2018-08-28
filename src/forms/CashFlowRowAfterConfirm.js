import React from 'react';

import { CashFlowInputsRow } from './cashflow';
import { ControlledRadioYesNo } from './inputs';

const IncomeField = (props) => {
  return (
    <CashFlowInputsRow
      { ...props }
      type={ 'income' } />
  );
};

/**
 * Query the user before presenting a CashFlowInputsRow
 * 
 * @todo Update params
 * @todo Can we remove the requirement for jsdoc object descriptions?
 * @todo jsdoc thinks this is for `handleChange()` as well. Fix?
 * 
 * @param {object} props See below
 * @param {string} props.generic - The key of the value being set.
 * @param {string} props.confirmLabel - Label for preceding confirmation.
 * @param {string} props.children - Label for fields updating the value.
 * 
 * @returns {object} Component
 * @extends React.Component
 * @see CashFlowInputsRow
 */
class CashFlowRowAfterConfirm extends React.Component {
  constructor(props) {
    super(props);
    
    const value = props.timeState[ props.generic ];
    this.state = {
      showField:   value !== 0,
      storedValue: value,
    };
  }

  handleChange = (evt, inputProps) => {

    if (inputProps.value === 'Yes') {
      this.showField(evt);
    } else {
      this.hideField(evt);
    }
  };

  hideField(evt) {
    const { generic, updateClientValue, timeState } = this.props;

    this.setState({
      showField:   false,
      storedValue: timeState[ generic ],
    });

    updateClientValue(evt, {
      name:  generic,
      value: 0,
    });
  }

  showField(evt) {
    const { generic, updateClientValue } = this.props;
    const { storedValue } = this.state;
    
    updateClientValue(evt, {
      name:  generic,
      value: storedValue,
    });

    this.setState({ showField: true });
  }

  render() {
    const { confirmLabel, generic, ...rest } = this.props;
    const { showField } = this.state;

    return (

      <div style={{ display: 'inline-block' }}>

        <ControlledRadioYesNo
          labelText          = { confirmLabel }
          checked            = { showField }
          name               = { 'confirm_' + generic }
          updateClientValue = { this.handleChange } />
        
        {showField && <IncomeField
          generic={ generic }
          { ...rest } />}

      </div>
    );
  }
}

export default CashFlowRowAfterConfirm;
