import React from 'react';
import { Input, Form } from 'semantic-ui-react';

import InlineLabelInfo from './InlineLabelInfo';
import { roundMoney, toMonthlyAmount } from '../../utils/math';

const lefter  = { width: '7em', marginRight: '.2em' };
const righter = { width: '7em', marginRight: '.9em' };

/**
 * @callback setClientProperty
 * @param {Object} event - React Event
 */

/**
 * @todo description
 * 
 * @param {Object} props
 * @param {*} props.generic
 * @param {*} props.timeState
 * @param {setClientProperty} props.setClientProperty
 * @param {*} props.children
 * @param {string} props.label
 * @param {string} props.type
 * @param {*} props.time
 *
 * @returns {Object} - React Element
 */
const CashFlowRow = function ({ generic, timeState, setClientProperty, children, labelInfo, type, time }) {
  /**
   * Get the time ('future' or 'current') monthly value unless there is
   * none, in which case, get the 'current' monthly cash flow value (to
   * prefill future values with 'current' ones if needed).
   * 
   * @todo Add some kind of UI indication when it's the same as the 'current'
   * value. What if some of the row's values are the same and some are
   * different?
   */
  const baseVal = timeState[ generic ];

  // Could use `_.capitalize()` in CashFlowInput to use `type`
  // to get id, but doesn't seem worth it at the moment.

  const buildOnChange = (interval) => (
    (event) => {
      const monthly = toMonthlyAmount[ interval ]( event, event.target.value );
      setClientProperty( event, { name: generic, value: monthly } );
    }
  )
  
  return (
    <Form.Field inline>
      <Input
        type='number'
        className={`${type} cashflow-column weekly`}
        onChange={buildOnChange('weekly')}
        value={roundMoney( baseVal / 4.33 ) || ''}
        name={generic + 'Weekly'}
        style={lefter}
      />
      <Input
        type='number'
        className={`${type} cashflow-column monthly`}
        onChange={buildOnChange('monthly')}
        value={roundMoney( baseVal ) || ''}
        name={generic}
        style={lefter}
      />
      <Input
        type='number'
        className={`${type} cashflow-column yearly`}
        onChange={buildOnChange('yearly')}
        value={roundMoney( baseVal * 12 ) || ''}
        name={generic + 'Yearly'}
        style={righter}
      />
      <wrapper>
        <label>{ children }</label>
        <InlineLabelInfo>{ labelInfo }</InlineLabelInfo>
      </wrapper>
    </Form.Field>
  );
};

export default CashFlowRow;
