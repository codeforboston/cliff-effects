import React from 'react';

import { CashFlowRow, ControlledRadioYesNo } from './formHelpers';

const IncomeField = (props) => {return (
  <CashFlowRow
    {...props}
    type={'income'} />
);};

/**
 * Query the user before presenting a CashFlowRow
 * 
 * @todo Update params
 * 
 * @param {object} props
 * @param {string} props.generic - The key of the value being set.
 * @param {string} props.confirmLabel - Label for preceding confirmation.
 * @param {string} props.children - Label for fields updating the value.
 * 
 * @extends React.Component
 * @see CashFlowRow
 */
class CashFlowRowAfterConfirm extends React.Component {
  constructor(props) {
    super(props);
    
    const value = props.timeState[props.generic];
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
    const { generic, setClientProperty, timeState } = this.props;

    this.setState({
      showField:   false,
      storedValue: timeState[generic],
    });

    setClientProperty(evt, {
      name:  generic,
      value: 0,
    });
  }

  showField(evt) {
    const { generic, setClientProperty } = this.props;
    const { storedValue } = this.state;

    setClientProperty(evt, {
      name:  generic,
      value: storedValue,
    });

    this.setState({ showField: true });
  }

  render() {
    const { confirmLabel, generic, ...rest } = this.props;
    const { showField } = this.state;

    return (

      <div>

        <ControlledRadioYesNo
          labelText = { confirmLabel }
          checked   = { showField }
          name      = { 'confirm_' + generic }
          onChange  = { this.handleChange } />
        
        {showField && <IncomeField
          generic={generic}
          {...rest} />}

      </div>
    );
  }
}

export default CashFlowRowAfterConfirm;
