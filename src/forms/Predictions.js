import React from 'react';
import { Form, Divider, Header } from 'semantic-ui-react';
// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';

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
const IncomeForm = function ({ client, time, setClientProperty }) {
  var type        = 'income';
  /**
  * As per Project Hope input, for the first prototype we're only
  * including the ability to change earned income.
  */
  return (
    <wrapper className='field-aligner two-column'>
      <IntervalColumnHeadings type={type}/>
      <CashFlowRow client={client}
          type={type}
          time={time}
          setClientProperty={setClientProperty}
          generic='EarnedIncome'
          labelInfo='(Weekly income = hourly wage times average number of work hours per week)'>
          Earned income
      </CashFlowRow>
    </wrapper>
  );
};  // End IncomeForm() Component

const Table = function ({ client }) {
  return(
    <wrapper>
    <Header as='h1' className='ui Header teal align centered'>Results</Header>
    <Header as='h3' className='ui Header align centered'>How will your income affect your future benefits?</Header>
    <BenefitsTable client={client} />
    </wrapper>
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
  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form'>
      <FormPartsContainer
        title     = 'Future Household Income'
        clarifier = 'How much money would your household make in the future?'
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <IncomeForm setClientProperty={props.setClientProperty} client={props.client} time={'future'} />
          <Divider className='ui section divider hidden' />
          <Table client={props.client}/>
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
