// COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';


// ========================================
// COMPONENTS
// ========================================

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const IncomeForm = function ({ future, time, setClientProperty }) {

  var type = 'income';

  /** 
  * As per Project Hope input, for the first prototype we're only
  * including the ability to change earned income.
  */
  return (
    <wrapper className='field-aligner two-column'>

      <IntervalColumnHeadings type={type}/>
      <CashFlowRow
          timeState={future}
				  type={type} 
				  time={time}
				  setClientProperty={setClientProperty}
				  generic='earned' 
				  labelInfo='(Weekly income = hourly wage times average number of work hours per week)'>
          Earned income
      </CashFlowRow>

    </wrapper>
  );

};  // End IncomeForm() Component


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const FutureIncomeStep = function ( props ) {

  const setTimeProp = getTimeSetter( 'future', props.changeClient );

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form'>
      <FormPartsContainer
        title     = 'Future Household Income'
        clarifier = 'How much money would your household make in the future?'
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <IncomeForm setClientProperty={setTimeProp} future={props.client.future} time={'future'} />
      </FormPartsContainer>
    </Form>
  );

};  // End FutureIncomeStep() Component


export { FutureIncomeStep };
