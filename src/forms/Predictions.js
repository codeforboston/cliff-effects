import React from 'react';
import { Form, Divider, Header, Tab } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';
import {
  GraphHolder,
  GrossGraph,
  BenefitGraph
} from './ResultsGraph';

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
    <Bar {...stackedBarProps} />
  );

};  // End <Chart>

const TabbedVisualizations = ({ client }) => (
  <Tab panes={[
    { menuItem: "Compare Table", render: () => <BenefitsTable client={client} /> },
    { menuItem: "Compare Chart", render: () => <Chart client={client} /> },
    { menuItem: "Gross", render: () => <GraphHolder client={client} Graph={GrossGraph} /> },
    { menuItem: "Benefits", render: () => <GraphHolder client={client} Graph={BenefitGraph} /> }
  ]}/>
);

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
          <Header as='h3' className='ui Header align centered'>How will your income affect your future benefits?</Header>
          <TabbedVisualizations client={props.client} />
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
