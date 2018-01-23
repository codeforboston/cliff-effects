import React from 'react';
import { Form, Divider, Header, Message } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/massachusetts/housing';
import {
  formatAxis,
  formatLabel,
  stackedTitle
} from '../utils/charts/chartFunctions';

// DATA
import { PROGRAM_CHART_VALUES } from '../utils/charts/PROGRAM_CHART_VALUES';


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
    {/* @todo Add a floating download button and add instructions here to download the data using that button */}
    <Message>This tool is in testing and these numbers might not be right. Please send a report to <a href="mailto:andrew@codeforboston.org">andrew@codeforboston.org</a> saying what the numbers were and what they should have been.</Message>
    <BenefitsTable client={client} />
    </div>
  );
};

const Chart = function({ client }) {

  var curr = client.current;

  var SNAPBenefitCurrent  = curr.hasSnap ? Math.round( getSNAPBenefits( client, 'current' ) * 12 ) : 0,
      SNAPBenefitFuture   = curr.hasSnap ? Math.round( getSNAPBenefits( client, 'future' ) * 12 ) : 0,
      sec8BenefitCurrent  = curr.hasHousing ? Math.round( getHousingBenefit( client, 'current' ) * 12 ) : 0,
      sec8BenefitFuture   = curr.hasHousing ? Math.round( getHousingBenefit( client, 'future' ) * 12 ) : 0,
      incomeCurrent       = Math.round( curr.earned * 12 ),
      incomeFuture        = Math.round( client.future.earned * 12 );

  var snapData    = [ SNAPBenefitCurrent, SNAPBenefitFuture ],
      housingData = [ sec8BenefitCurrent, sec8BenefitFuture ],
      incomeData  = [ incomeCurrent, incomeFuture ];

  const SNAPColor     = PROGRAM_CHART_VALUES.SNAP.color,
        SNAPName      = PROGRAM_CHART_VALUES.SNAP.name,
        section8Color = PROGRAM_CHART_VALUES.section8.color,
        section8Name  = PROGRAM_CHART_VALUES.section8.name,
        incomeColor   = PROGRAM_CHART_VALUES.income.color,
        incomeName    = PROGRAM_CHART_VALUES.income.name;

  var datasets = [{
    label: incomeName,
    backgroundColor: incomeColor,
    data: incomeData,
    fill: "origin"
  }];

  if ( curr.hasSnap ) {
    datasets.push({
      label: SNAPName,
      backgroundColor: SNAPColor,
      data: snapData
    });
  }

  if ( curr.hasHousing ) {
    datasets.push({
      label: section8Name,
      backgroundColor: section8Color,
      data: housingData
    });
  }

  const stackedBarProps = {
    data: {
      labels: incomeData,
      datasets: datasets
    },
    options: {
      title: {
        display: true,
        text: 'Money Coming In as Income Changes'
      },
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Total Money Coming In ($)'
          },
          ticks: {
            beginAtZero: true,
            callback: formatAxis
          }
        }],
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: formatAxis
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: stackedTitle,
          label: formatLabel
        }
      }
    }
  };


  return (
    <div>
      <Header as='h1' className='ui Header teal align centered'>Chart</Header>
      <Bar {...stackedBarProps} />
    </div>
  );

};  // End <Chart>


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
          <Divider className='ui section divider hidden' />
          <Chart client={props.client}/>
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
