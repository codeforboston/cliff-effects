import React from 'react';
import { Divider, Header, Tab, Message, Button, Menu } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';
import { GraphHolder } from './output/GraphHolder';
import { TestChart } from './output/TestChart';
import { Summary } from './output/Summary';
import { BenefitsTable } from './output/BenefitsTable';
import { StackedBarGraph } from './output/StackedBarGraph';
import { StackedAreaGraph } from './output/StackedAreaGraph';
import { BenefitsLineGraph } from './output/BenefitsLineGraph';

// ========================================
// COMPONENTS
// ========================================
/** @todo Cash flow row for trying out different future incomes.
 *
 * As per Project Hope's input, for the first prototype
 *     we're only including the ability to change earned income.
 *
 * @function
 * @param {object} props
 * @param {object} props.future Client future/predictive data.
 * @param {string} props.time Used in class names. Meant to make
 *     this more easily decoupled in future.
 * @param {function} props.updateClientValue Update client state
 *     value.
 * @param {object} props.snippets Language-specific text
 *
 * @returns {object} React element
 */
const IncomeForm = function ({ future, time, updateClientValue, snippets }) {

  var type = 'income';

  return (
    <div className='field-aligner two-column'>
      <IntervalColumnHeadings type={ type } />
      <CashFlowInputsRow
        timeState={ future }
        type={ type }
        time={ time }
        updateClientValue = { updateClientValue }
        generic='earned'
        labelInfo='(Weekly pay = hourly wage times average number of work hours per week)'>
        { snippets.i_futureIncomeQuestion }
      </CashFlowInputsRow>
    </div>
  );
};  // End IncomeForm() Component


const TabbedVisualizations = ({ client, openFeedback, snippets }) => {
  return (
    <Tab
      menu={{ color: 'teal',  attached: true, tabular: true }}
      panes={ [
        {
          menuItem: (
            <Menu.Item
              key = { `tab5` }
              as  = { Button }>
              { `Test` }
            </Menu.Item>
          ),
          render: () => {
            return (
              <Tab.Pane>
                <GraphHolder
                  client={ client }
                  Graph={ TestChart } />
              </Tab.Pane>
            );
          },
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab0` }
              as  = { Button }>
              { snippets.i_summaryTitle }
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


const PredictionsStep = function ({ updateClientValue, navData, client, snippets, openFeedback }) {

  return (
    <FormPartsContainer
      title     = { snippets.i_title }
      clarifier = { null }
      navData   = { navData }
      formClass = { `predictions` }>
      {/* `predictionsForm`: This whole div will be outside
        the form in the future and then we'll be able to
        access its style that way */}
      <div id = { `predictionsForm` }>
        <IncomeForm
          updateClientValue = { updateClientValue }
          future            = { client.future }
          time              = { 'future' }
          snippets          = { snippets } />
        <Divider className='ui section divider hidden' />
      </div>
      <div id={ `resultsIntro` }>
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
      </div>
      <TabbedVisualizations 
        client       = { client }
        openFeedback = { openFeedback }
        snippets     = { snippets } />
    </FormPartsContainer>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };

