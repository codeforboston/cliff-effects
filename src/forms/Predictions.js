import React from 'react';
import { Form, Divider, Header, Tab, Message, Button, Menu } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';
import { GraphHolder } from './output/GraphHolder';
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
          { snippets.futureIncomeQuestion_v1 }
      </CashFlowInputsRow>
    </div>
  );
};  // End IncomeForm() Component


const TabbedVisualizations = ({ client, snippets }) => {
  return (
  // Benefit Courses, Tracks, Routes, Traces, Progressions, Progress, Trajectories, Changes
    <Tab
      menu={{ color: 'teal',  attached: true, tabular: true }}
      panes={ [
        { 
          menuItem: (
            <Menu.Item key="tab1">
              { snippets.tabTitleChanges_v1 }
            </Menu.Item>
          ),
          render: () => {return <Tab.Pane><BenefitsTable client={ client } /></Tab.Pane>;} 
        },
        { 
          menuItem: (
            <Menu.Item key="tab2">
              { snippets.tabTitleChangesChart_v1 }
            </Menu.Item>
          ),  
          render: () => {return <Tab.Pane><StackedBarGraph client={ client } /></Tab.Pane>;} 
        },
        {
          menuItem: (
            <Menu.Item key="tab3">
              { snippets.tabTitleStackedIncomes_v1 }
            </Menu.Item>
          ),
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
          menuItem: (
            <Menu.Item key="tab4">
              { snippets.tabTitleBenefitPrograms_v1 }
            </Menu.Item>
          ),
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
    <Form className = 'income-form flex-item flex-column'>
      <FormPartsContainer
        title     = { snippets.title_v1 }
        clarifier = { null }
        navData   = { navData }>
        <IncomeForm
          updateClientValue = { updateClientValue }
          future            = { client.future }
          time              = { 'future' } 
          snippets          = { snippets } />
        <Divider className='ui section divider hidden' />
        <Header
          as        ='h3'
          className ='ui Header align centered'>
            { snippets.chartsHeader_v1 }
        </Header>
        <Message
          visible
          warning
          style={{ 'textAlign': 'center' }}>
          { snippets.warningMessage_v1 }
          <br />
          <Button
            fluid
            color='teal'
            style={{
              'display':     'block',
              'marginLeft':  'auto',
              'marginRight': 'auto',
              'marginTop':   '10px',
              'maxWidth':    '400px', 
            }}
            onClick={ openFeedback }>
            { snippets.submitFeedback_v1 }
          </Button>
        </Message>
        <TabbedVisualizations 
          client   = { client }
          snippets = { snippets } />
      </FormPartsContainer>
    </Form>
  );
};  // End FutureIncomeStep() Component

export { PredictionsStep };
                                              
