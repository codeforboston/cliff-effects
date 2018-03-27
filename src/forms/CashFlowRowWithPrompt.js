import React from 'react';
import { Form } from 'semantic-ui-react';

import { CashFlowRow } from './formHelpers';

const NumberField = (props) => (
  <CashFlowRow {...props} type={'income'} />
);

/**
 * Prompt the user before presenting a CashFlowRow
 * 
 * @param {object} props
 * @param {string} props.generic - The key of the value being set.
 * @param {string} props.promptLabel - Label for initial prompt.
 * @param {string} props.children - Label for fields updating the value.
 * 
 * @extends React.Component
 * @see CashFlowRow
 */
class CashFlowRowWithPrompt extends React.Component {
  constructor(props) {
    super(props);
    
    const value = props.timeState[props.generic];
    this.state = {
      showField: value !== 0,
      storedValue: value
    }
  }

  handleChange = (evt, inputProps) => {
    if(inputProps.value === 'Yes') {
      this.showField(evt);
    } else {
      this.hideField(evt);
    }
  }

  hideField = evt => {
    const { generic, setClientProperty, timeState } = this.props;

    this.setState({
      showField: false,
      storedValue: timeState[generic]
    });

    setClientProperty(evt, {
      name: generic,
      value: 0
    });
  }

  showField = evt => {
    const { generic, setClientProperty } = this.props;
    const { storedValue } = this.state;

    setClientProperty(evt, {
      name: generic,
      value: storedValue
    });

    this.setState({
      showField: true
    });
  }

  render() {
    const { promptLabel, ...rest } = this.props;
    const { showField } = this.state;

    return (
      <div>
        <Form.Group inline>
          <label>{promptLabel}</label>
          <Form.Radio label={'Yes'} value={'Yes'} checked={showField} onChange={this.handleChange} />
          <Form.Radio label={'No'} value={'No'} checked={!showField} onChange={this.handleChange} />
        </Form.Group>
        
        {showField && <NumberField {...rest} />}
      </div>
    );
  }
}

export default CashFlowRowWithPrompt;
