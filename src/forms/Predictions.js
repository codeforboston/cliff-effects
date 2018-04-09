import React from 'react';
import { Form, Divider, Header, Message, Button } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';
import { getBenefitTimeFrames, getIncomeTimeFrames } from '../utils/getTimeFrames';
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

const Table = function ({ client, feedbackPrompt }) {
  return(
    <div>
    <Header as='h1' className='ui Header teal align centered'>Results</Header>
    <Header as='h3' className='ui Header align centered'>How will your income affect your future benefits?</Header>
    {/* @todo Export/clean up styles  */}
    <Message visible warning style={{ 'textAlign': 'center' }}>
      This tool is in testing and these numbers might not be right. If they're not, we'd appreciate your feedback.<br />
      <Button
        fluid
        color='teal'
        style={{ 'display': 'block',
                 'marginLeft': 'auto',
                 'marginRight': 'auto',
                 'marginTop': '10px',
                 'maxWidth': '400px' }}
        onClick={feedbackPrompt}>Submit Feedback</Button>
    </Message>
    <BenefitsTable client={client} />
    </div>
  );
};

const Chart = function({ client }) {

  var curr = client.current;

  var
    { benefitCurrent: SNAPBenefitCurrent, benefitFuture: SNAPBenefitFuture } = getBenefitTimeFrames( client, 'hasSnap', getSNAPBenefits ),
    { benefitCurrent: sec8BenefitCurrent, benefitFuture: sec8BenefitFuture } = getBenefitTimeFrames( client, 'hasHousing', getHousingBenefit ),
    { incomeCurrent, incomeFuture } = getIncomeTimeFrames( client );

  var snapData    = [ SNAPBenefitCurrent, SNAPBenefitFuture ],
      housingData = [ sec8BenefitCurrent, sec8BenefitFuture ],
      incomeData  = [ incomeCurrent, incomeFuture ];

  const SNAPColor     = PROGRAM_CHART_VALUES.snap.color,
        SNAPName      = PROGRAM_CHART_VALUES.snap.name,
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
            labelString: 'Monthly Income ($)'
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
        right     = {{name: 'Reset', func: props.resetClient}}>
          <IncomeForm setClientProperty={setTimeProp} future={props.client.future} time={'future'} />
          <Divider className='ui section divider hidden' />
          <Table client={props.client} feedbackPrompt={props.feedbackPrompt} />
          <Divider className='ui section divider hidden' />
          <Chart client={props.client}/>
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
