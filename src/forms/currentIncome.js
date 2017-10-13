// COMPONENTS
import React from 'react';
import { Form, Header, Statistic } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';

// UTILITIES
import { roundMoney } from '../helpers/math';

// BENEFIT PROGRAM CALCULATIONS
import { percentPovertyLevel, percentStateMedianIncome } from '../helpers/helperFunctions';
import { getSimpleGrossIncomeMonthly } from '../helpers/cashflow';


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
const IncomeForm = function ({ storeComplex, client }) {

  var time = 'current', 
	  type = 'income'

  var monthly     = getSimpleGrossIncomeMonthly( client, 'current' ),
      grossAnnual = monthly * 12;

  /** 
  * As per Project Hope input, for the first prototype we're only
  * including the ability to change earned income.
  */
  return (
    <div className='field-aligner two-column'>

      <IntervalColumnHeadings type={type}/>
      <CashFlowRow client={client}
				  type={type} 
				  time={time}
				  storeComplex={storeComplex}
				  generic='EarnedIncome' 
				  labelInfo='(Weekly income = hourly wage times average number of work hours per week)'>
          Earned income
      </CashFlowRow>

      <br/>
      <br/>

      <div style={{ textAlign: 'center' }}>
        <Header as='h4' textAlign='center'>
          FOR A HOUSEHOLD SIZE OF <strong>{ client.householdSize }</strong>:
        </Header>
        <Statistic>
          <Statistic.Label>Federal Poverty Level Percentage</Statistic.Label>
          <Statistic.Value>{Math.round( percentPovertyLevel( grossAnnual, client.householdSize ))}%</Statistic.Value>
        </Statistic>
        {/*<Statistic>
          <Statistic.Label>Area Median Income Percentage</Statistic.Label>
          <Statistic.Value>{Math.round( percentStateMedianIncome( grossAnnual, client.householdSize ))}%</Statistic.Value>
        </Statistic>*/}
      </div>

    </div>
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
const CurrentIncomeStep = function ( props ) {

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form'>
      <FormPartsContainer
        title     = 'Current Household Income'
        clarifier = 'How much money does your household make now?'
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <IncomeForm storeComplex={props.storeComplex} storeChecked={props.storeChecked} client={props.pageState} />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentIncomeStep() Component


export { CurrentIncomeStep };
