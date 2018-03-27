import React from 'react';
import { Form } from 'semantic-ui-react';

import { CashFlowRow } from './formHelpers';

const labelStyle = { textDecoration: 'underline' };

const NumberField = props => (
  <CashFlowRow {...props} type={'income'} generic={'earnedBecauseOfChildCare'}>
    <span style={labelStyle}>Income</span> made possible by child care expenses
  </CashFlowRow>
);

class EarnedBecauseOfChildCare extends React.Component {
  state = {
    showField: false,
    storedIncome: 0
  }

  handleChange = (evt, inputProps) => {
    if(inputProps.value === 'Yes') {
      this.showField(evt);
    } else {
      this.hideField(evt);
    }
  }

  hideField = evt => {
    const { setClientProperty, timeState } = this.props;

    this.setState({
      showField: false,
      storedIncome: timeState.earnedBecauseOfChildCare
    });

    setClientProperty(evt, {
      name: 'earnedBecauseOfChildCare',
      value: 0
    });
  }

  showField = evt => {
    const { setClientProperty } = this.props;
    const { storedIncome } = this.state;

    setClientProperty(evt, {
      name: 'earnedBecauseOfChildCare',
      value: storedIncome
    });

    this.setState({
      showField: true
    });
  }

  render() {
    const { showField } = this.state;

    return (
      <div>
        <Form.Group inline>
          <label>Does childcare allow you to make additional income?</label>
          <Form.Radio label={'Yes'} value={'Yes'} checked={showField} onChange={this.handleChange} />
          <Form.Radio label={'No'} value={'No'} checked={!showField} onChange={this.handleChange} />
        </Form.Group>
        
        {showField && <NumberField {...this.props} />}
      </div>
    );
  }
};

export default EarnedBecauseOfChildCare;
