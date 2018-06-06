import React from 'react';
import { Form, Divider, Header, Tab } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { BenefitsTable } from './BenefitsTable';
import {
  GraphHolder,
  GrossGraph,
  BenefitGraph,
} from './ResultsGraph';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';
import { getBenefitTimeFrames, getIncomeTimeFrames } from '../utils/getTimeFrames';
import { getSNAPBenefits } from '../programs/federal/snap';
import { getSection8Benefit } from '../programs/massachusetts/section8';
import {
  formatAxis,
  formatLabel,
  stackedTitle,
} from '../utils/charts/chartFunctions';

// DATA
import { PROGRAM_CHART_VALUES } from '../utils/charts/PROGRAM_CHART_VALUES';


// ========================================
// COMPONENTS
// ========================================
/** @todo description
*
* @function
* @param {object} props Values described below
* @property {object} props.future Client future/predictive data.
* @property {string} props.time Used in class names. Meant to make
*     this more easily decoupled in future.
* @property {function} props.setClientProperty Update client state
*     values.
*
* @returns {class} Component
*/
const IncomeForm = function ({ future, time, setClientProperty }) {

  var type = 'income';

  /**
  * As per Project Hope input, for the first prototype we're only
  * including the ability to change earned income.
  */
  return (
    <div className='field-aligner two-column'>
      <IntervalColumnHeadings type={ type } />
      <CashFlowRow
        timeState={ future }
				  type={ type }
				  time={ time }
				  setClientProperty={ setClientProperty }
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
      { benefitCurrent: SNAPBenefitCurrent, benefitFuture: SNAPBenefitFuture } = getBenefitTimeFrames(client, 'hasSnap', getSNAPBenefits),
      { benefitCurrent: sec8BenefitCurrent, benefitFuture: sec8BenefitFuture } = getBenefitTimeFrames(client, 'hasSection8', getSection8Benefit),
      { incomeCurrent, incomeFuture } = getIncomeTimeFrames(client);

  var snapData    = [ SNAPBenefitCurrent, SNAPBenefitFuture ],
      housingData = [ sec8BenefitCurrent, sec8BenefitFuture ],
      incomeData  = [ incomeCurrent, incomeFuture ];

  const SNAPColor     = PROGRAM_CHART_VALUES.snap.color,
        SNAPName      = PROGRAM_CHART_VALUES.snap.name,
        section8Color = PROGRAM_CHART_VALUES.section8.color,
        section8Name  = PROGRAM_CHART_VALUES.section8.name,
        incomeColor   = PROGRAM_CHART_VALUES.income.color,
        incomeName    = PROGRAM_CHART_VALUES.income.name;

  var datasets = [
    {
      label:           incomeName,
      backgroundColor: incomeColor,
      data:            incomeData,
      fill:            'origin',
    },
  ];

  if (curr.hasSnap) {
    datasets.push({
      label:           SNAPName,
      backgroundColor: SNAPColor,
      data:            snapData,
    });
  }

  if (curr.hasSection8) {
    datasets.push({
      label:           section8Name,
      backgroundColor: section8Color,
      data:            housingData,
    });
  }

  const stackedBarProps = {
    data: {
      labels:   incomeData,
      datasets: datasets,
    },
    options: {
      title: {
        display: true,
        text:    'Money Coming In as Income Changes',
      },
      scales: {
        yAxes: [
          {
            stacked:    true,
            scaleLabel: {
              display:     true,
              labelString: 'Total Money Coming In ($)',
            },
            ticks: {
              beginAtZero: true,
              callback:    formatAxis,
            },
          },
        ],
        xAxes: [
          {
            stacked:    true,
            scaleLabel: {
              display:     true,
              labelString: 'Monthly Income ($)',
            },
            ticks: { callback: formatAxis },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: stackedTitle,
          label: formatLabel,
        },
      },
    },
  };


  return (
    <Bar { ...stackedBarProps } />
  );

};  // End <Chart>

const TabbedVisualizations = ({ client }) => {
  return (
  // Benefit Courses, Tracks, Routes, Traces, Progressions, Progress, Trajectories, Changes
    <Tab
      menu={{ color: 'teal',  attached: true, tabular: true }}
      panes={ [
        { menuItem: 'Summary', render: () => {return <Tab.Pane><BenefitsTable client={ client } /></Tab.Pane>;} },
        { menuItem: 'Summary Chart', render: () => {return <Tab.Pane><Chart client={ client } /></Tab.Pane>;} },
        {
          menuItem: 'Stacked Incomes',
          render:   () => {return <Tab.Pane><GraphHolder
            client={ client }
            Graph={ GrossGraph } />
          </Tab.Pane>;},
        },
        {
          menuItem: 'Benefit Changes',
          render:   () => {return <Tab.Pane><GraphHolder
            client={ client }
            Graph={ BenefitGraph } />
          </Tab.Pane>;},
        },
      ] } />
  );
};

/** @todo Abstract all the step components?
 *
 * @function
 * @param {object} props See below.
 * @property {function} props.changeClient Updates state upstream.
 * @property {function} props.translate Uses user chosen language-specific
 *    snippets.
 * @property {object} props.client JSON object with future and current values.
 * @property {function} props.nextStep Go to next form section.
 * @property {function} props.previousStep Go to previous form section.
 *
 * @returns {object} Component
 */
const PredictionsStep = function (props) {

  const setTimeProp = getTimeSetter('future', props.changeClient);

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form flex-item flex-column'>
      <FormPartsContainer
        title     = 'Future Household Income'
        clarifier = 'How much money would your household make in the future?'
        left      = {{ name: 'Previous', func: props.previousStep }}
        right     = {{ name: 'New Client', func: props.resetClient }}>
        <IncomeForm
          setClientProperty ={ setTimeProp }
          future            ={ props.client.future }
          time              ={ 'future' } />
        <Divider className='ui section divider hidden' />
        <Header
          as        ='h3'
          className ='ui Header align centered'>
            How will your income affect your future benefits?
        </Header>
        <TabbedVisualizations client={ props.client } />
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
