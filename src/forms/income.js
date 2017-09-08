// import _ from 'lodash'
import React, { Component } from 'react';
import {
	Button,
  Form,
  Grid,
  Header,
  Segment,
  // Step,
  // Card,
  // Icon,
  // Checkbox,
  Divider,
  // Radio,
  Statistic,
  // Reveal
} from 'semantic-ui-react';
// import { Redirect, Prompt } from 'react-router-dom';
import { percentPovertyLevel, 
        percentStateMedianIncome } from '../helpers/helperFunctions';
import { PrevNext, FormPartsContainer } from './formHelpers';


// ========================================
// COMPONENTS
// ========================================


const IncomeForm = ( propsContainer ) => {

  let props = propsContainer.props;
  return (
    <div>
      <Form.Input
        label='Annual Income'
        placeholder='Annual Income'
        name='annualIncome'
        onChange={props.handleChange}
        type='number'
      />
      <br/>
      <br/>
      <div>
        <Header as='h4' textAlign='center'>
          FOR A HOUSEHOLD SIZE OF <strong>{props.pageState.householdSize}</strong>:
        </Header>
        <Statistic>
          <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
          <Statistic.Value>{Math.round(percentPovertyLevel(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
        </Statistic>
        <Statistic>
          <Statistic.Label>% of State Median Income</Statistic.Label>
          <Statistic.Value>{Math.round(percentStateMedianIncome(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
        </Statistic>
      </div>
    </div>
  );

};  // End IncomeForm() Component

const IncomeStep = (props) => {

  return (
    <Form>
      <FormPartsContainer
        title='Household Annual Income'
        clarifier='How much money does your household earn every year before taxes?'
        props={props}
        Insertable={IncomeForm}
      />
    </Form>
  );

};  // End IncomeStep() Component

export { IncomeStep };
