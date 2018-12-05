import React from 'react';
import {
  Divider,
  Header,
  Tab,
  Message,
  Button,
  Menu,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';
import { GraphHolder } from './output/GraphHolder';
import { Summary } from './output/Summary';
import { BenefitsTable } from './output/BenefitsTable';
import { ResourcesColumns } from './output/ResourcesColumns';
import { StackedResources } from './output/StackedResources';
import { BenefitsLines } from './output/BenefitsLines';


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
 * @param {object} props.translations Language-specific text
 *
 * @returns {object} React element
 */
const IncomeForm = function ({ future, time, updateClientValue, translations }) {

  let type = `income`;

  return (
    <div className={ `field-aligner two-column` }>
      <IntervalColumnHeadings type={ type } />
      <CashFlowInputsRow
        timeState         = { future }
        type              = { type }
        time              = { time }
        updateClientValue = { updateClientValue }
        generic           = { `earned` }
        labelInfo         = { `(Weekly pay = hourly wage times average number of work hours per week)` }>
        { translations.i_futureIncomeQuestion }
      </CashFlowInputsRow>
    </div>
  );
};


const TabbedVisualizations = ({ client, openFeedback, translations }) => {
  return (
    <Tab
      menu  = {{ color: `teal`,  attached: true, tabular: true }}
      panes = { [
        {
          menuItem: (
            <Menu.Item
              key = { `tab0` }
              as  = { Button }>
              { translations.i_summaryTitle }
            </Menu.Item>
          ),
          render: () => { return (
            <Tab.Pane><Summary
              client       = { client }
              openFeedback = { openFeedback }
              translations = { translations } />
            </Tab.Pane>
          );}, 
        },
        { 
          menuItem: (
            <Menu.Item
              key = { `tab1` }
              as  = { Button }>
              { translations.i_tabTitleChanges }
            </Menu.Item>
          ),
          render: () => {
            return (
              <Tab.Pane>
                <BenefitsTable
                  client       = { client }
                  translations = { translations } />
              </Tab.Pane>
            );
          },
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab2` }
              as  = { Button }>
              { translations.i_tabTitleChangesChart }
            </Menu.Item>
          ),
          render: () => { return (
            <Tab.Pane>
              <GraphHolder
                client       = { client }
                Graph        = { ResourcesColumns }
                translations = { translations } />
            </Tab.Pane>
          );},
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab3` }
              as  = { Button }>
              { translations.i_tabTitleStackedIncomes }
            </Menu.Item>
          ),
          render: () => {
            return (
              <Tab.Pane>
                <GraphHolder
                  client       = { client }
                  Graph        = { StackedResources }
                  translations = { translations } />
              </Tab.Pane>
            );
          },
        },
        {
          menuItem: (
            <Menu.Item
              key = { `tab4` }
              as  = { Button }>
              { translations.i_tabTitleBenefitPrograms }
            </Menu.Item>
          ),
          render: () => {
            return (
              <Tab.Pane>
                <GraphHolder
                  client       = { client }
                  Graph        = { BenefitsLines }
                  translations = { translations } />
              </Tab.Pane>
            );
          },
        },
      ] } />
  );
};  // Ends <TabbedVisualizations>


const PredictionsStep = function ({ updateClientValue, navData, client, translations, openFeedback }) {

  return (
    <FormPartsContainer
      title     = { translations.i_title }
      clarifier = { null }
      navData   = { navData }
      formClass = { `predictions` }>
      {/* `predictions-form`: This whole div will be outside
        the form in the future and then we'll be able to
        access its style that way */}
      <div id={ `predictions-form` }>
        <IncomeForm
          updateClientValue = { updateClientValue }
          future            = { client.future }
          time              = { `future` }
          translations      = { translations } />
        <Divider className={ `ui section divider hidden` } />
      </div>
      <div id={ `results-intro` }>
        <Header
          as        = { `h3` }
          className = { `ui Header align centered` }>
          { translations.i_chartsHeader }
        </Header>
        <Message
          visible
          warning
          className = { `prediction-message` }>
          { translations.i_warningMessage }
          <Button
            compact
            className = { `feedback-button` }
            size      = { `small` }
            color     = { `teal` }
            onClick   = { openFeedback }>
            { translations.i_submitFeedback }
          </Button>
        </Message>
      </div>
      <TabbedVisualizations 
        client       = { client }
        openFeedback = { openFeedback }
        translations = { translations } />
    </FormPartsContainer>
  );
};  // End <PredictionsStep>


export { PredictionsStep };
