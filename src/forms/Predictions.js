import React from 'react';
import { Divider, Header, Tab, Message, Button, Menu } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';
import { GraphHolder } from './output/GraphHolder';
import { Summary } from './output/Summary';
import { BenefitsTable } from './output/BenefitsTable';
import { StackedBarGraph } from './output/StackedBarGraph';
import { StackedAreaGraph } from './output/StackedAreaGraph';
import { BenefitsLineGraph } from './output/BenefitsLineGraph';

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
* @property {function} props.updateClientValue Update client state
*     values.
*
* @returns {class} Component
*/
const IncomeForm = function ({ future, time, updateClientValue, snippets }) {

  var type = 'income';

  /**
  * As per Project Hope input, for the first prototype we're only
  * including the ability to change earned income.
  */
  return (
    <div className='field-aligner two-column'>
      <IntervalColumnHeadings type={ type } />
      <CashFlowInputsRow
        timeState={ future }
        type={ type }
        time={ time }
        updateClientValue = { updateClientValue }
        generic='earned'
        labelInfo='(Weekly income = hourly wage times average number of work hours per week)'>
        { snippets.i_futureIncomeQuestion }
      </CashFlowInputsRow>
    </div>
  );
};  // End IncomeForm() Component


const TabbedVisualizations = ({ client, openFeedback, snippets }) => {
  return (
  // Benefit Courses, Tracks, Routes, Traces, Progressions, Progress, Trajectories, Changes
    <Tab
      menu={{ color: 'teal',  attached: true, tabular: true }}
      panes={ [
        {
          menuItem: (
            <Menu.Item key="tab0">
              { `Summary` }
            </Menu.Item>
          ),
          render: () => {return (
            <Tab.Pane><Summary
              client       = { client }
              openFeedback = { openFeedback }
              snippets     = { snippets } />
            </Tab.Pane>
          );}, 
        },
        { 
          menuItem: (
            <Menu.Item
              key = { `tab1` }
              as  = { Button }>
              { snippets.i_tabTitleChanges }
            </Menu.Item>
          ),
          render: () => {
            return (
              <Tab.Pane>
                <BenefitsTable
                  client={ client }
                  snippets={ snippets } />
              </Tab.Pane>
            );
          },
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab2` }
              as  = { Button }>
              { snippets.i_tabTitleChangesChart }
            </Menu.Item>
          ),
          render: () => {return <Tab.Pane><StackedBarGraph client={ client } /></Tab.Pane>;},
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab3` }
              as  = { Button }>
              { snippets.i_tabTitleStackedIncomes }
            </Menu.Item>
          ),
          render: () => {
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
          menuItem: (
            <Menu.Item
              key = { `tab4` }
              as  = { Button }>
              { snippets.i_tabTitleBenefitPrograms }
            </Menu.Item>
          ),
          render: () => {
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
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {function} props.translate Uses user chosen language-specific
 *    snippets.
 * @property {object} props.client JSON object with future and current values.
 * @property {function} props.nextStep Go to next form section.
 * @property {function} props.previousStep Go to previous form section.
 *
 * @returns {object} Component
 */
const PredictionsStep = function ({ updateClientValue, navData, client, snippets, openFeedback }) {

  /** @todo Are these titles accurate now? */
  return (
    <FormPartsContainer
      title     = { snippets.i_title }
      clarifier = { null }
      navData   = { navData }
      formClass = { `predictions` }>
      <IncomeForm
        updateClientValue = { updateClientValue }
        future            = { client.future }
        time              = { 'future' }
        snippets          = { snippets } />
      <Divider className='ui section divider hidden' />
      <Header
        as        ='h3'
        className ='ui Header align centered'>
        { snippets.i_chartsHeader }
      </Header>
      <Message
        className = { `prediction-message` }
        visible
        warning>
        { snippets.i_warningMessage }
        <Button
          className = { `feedback-button` }
          size      = { `small` }
          color     = { `teal` }
          compact
          onClick   = { openFeedback }>
          { snippets.i_submitFeedback }
        </Button>
      </Message>
      <TabbedVisualizations 
        client       = { client }
        openFeedback = { openFeedback }
        snippets     = { snippets } />
    </FormPartsContainer>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };

