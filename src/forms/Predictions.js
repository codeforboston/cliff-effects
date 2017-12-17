import React from 'react';
import { Form, Divider, Header } from 'semantic-ui-react';
// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';

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
    <div className='field-aligner two-column'>
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
    </div>
  );
};  // End IncomeForm() Component

const Table = function ({ client }) {
  return(
    <div>
    <Header as='h1' className='ui Header teal align centered'>Results</Header>
    <Header as='h3' className='ui Header align centered'>How will your income affect your future benefits?</Header>
    <BenefitsTable client={client} />
    </div>
  );
};
/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
const PredictionsStep = function ( props ) {

  const setTimeProp = getTimeSetter( 'future', props.changeClient );

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form flex-item flex-column'>
      <FormPartsContainer
        title     = 'Future Household Income'
        clarifier = 'How much money would your household make in the future?'
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <IncomeForm setClientProperty={setTimeProp} future={props.client.future} time={'future'} />
          <Divider className='ui section divider hidden' />
          <Table client={props.client}/>
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
