import React from 'react';
import { Form, Divider, Header, Tab } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';
import { GraphHolder } from './output/GraphHolder';
import { BenefitsTable } from './output/BenefitsTable';
import { StackedBarGraph } from './output/StackedBarGraph';
import { StackedAreaGraph } from './output/StackedAreaGraph';
import { BenefitsLineGraph } from './output/BenefitsLineGraph';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';


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
          How much money would you get paid in the future? (You can try different amounts)
      </CashFlowRow>
    </div>
  );
};  // End IncomeForm() Component


const TabbedVisualizations = ({ client }) => {
  return (
  // Benefit Courses, Tracks, Routes, Traces, Progressions, Progress, Trajectories, Changes
    <Tab
      menu={{ color: 'teal',  attached: true, tabular: true }}
      panes={ [
        { menuItem: 'Changes', render: () => {return <Tab.Pane><BenefitsTable client={ client } /></Tab.Pane>;} },
        { menuItem: 'Changes Chart', render: () => {return <Tab.Pane><StackedBarGraph client={ client } /></Tab.Pane>;} },
        {
          menuItem: 'Stacked Incomes',
          render:   () => {
            return (
              <Tab.Pane>
                <GraphHolder
                  client={ client }
                  Graph={ StackedAreaGraph } />
              </Tab.Pane>
            );
          },
        },
        {
          menuItem: 'Benefit Programs',
          render:   () => {
            return (
              <Tab.Pane>
                <GraphHolder
                  client={ client }
                  Graph={ BenefitsLineGraph } />
              </Tab.Pane>
            );
          },
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
const PredictionsStep = function ({ changeClient, navData, client, snippets }) {

  const setTimeProp = getTimeSetter('future', changeClient);

  /** @todo Are these titles accurate now? */
  return (
      <FormPartsContainer
        title     = 'What Might Happen?'
        clarifier = { null }
        navData   = { navData }>
        <IncomeForm
          setClientProperty ={ setTimeProp }
          future            ={ client.future }
          time              ={ 'future' } />
        <Divider className='ui section divider hidden' />
        <Header
          as        ='h3'
          className ='ui Header align centered'>
            With the new pay, how could your benefits change?
        </Header>
        <TabbedVisualizations client={ client } />
      </FormPartsContainer>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
                                              
