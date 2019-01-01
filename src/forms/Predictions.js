import React, { Fragment } from 'react';
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
import { GraphHolder } from './predictions/GraphHolder';
import { Summary } from './predictions/Summary';
import { BenefitsTable } from './predictions/BenefitsTable';
import { ResourcesColumns } from './predictions/ResourcesColumns';
import { StackedResources } from './predictions/StackedResources';
import { BenefitsLines } from './predictions/BenefitsLines';

// NON-COMPONENTS
import { applyAndPushBenefits } from '../benefits/applyAndPushBenefits';
import { calcDataToChartData } from './predictions/build-resource-data';
import { toMoneyStr } from '../utils/prettifiers';
import { cloneDeep } from 'lodash';


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


// Recap of current info from client
let Recap = function ({ client, translations, openFeedback }) {

  // Get the data for the component
  let clone        = cloneDeep(client),
      current      = clone.current,
      resourceKeys = [
        `earned`,
        ...current.benefits,
      ],
      accumulated = {},
      calcData    = {
        activeBenefits: resourceKeys,
        dataToAddTo:    accumulated,
        clientToChange: clone,
        timeframe:      `current`,
      };

  applyAndPushBenefits(calcData);
  let data = calcDataToChartData(resourceKeys, accumulated, 0);

  // Build the contents of the component
  let start = (<p>The tool is still being tested, so don't use it to make decisions. If it's right, it has calculated your money coming in as:</p>);

  // Benefit list items
  let resourceList = [
    (
      <li key={ `earned` }>{ `Pay from work: ` }{translations.i_beforeMoneyWithTime}{round$(data.earned)} {translations.i_eachTimeInterval}</li>
    ),
  ];
  let numBenefits = current.benefits.length;
  for (let benefiti = 0; benefiti < numBenefits; benefiti++) {

    let cBenefit = data.benefits[ benefiti ];
    resourceList.push(
      <li key={ cBenefit.label }>
        {cBenefit.label}: {translations.i_beforeMoneyWithTime}{round$(cBenefit.amount)} {translations.i_eachTimeInterval}
      </li>
    );
  }  // ends for each benefit

  let totals = (
    <p>
      { `That's ` }
      <strong>
        { translations.i_beforeMoneyWithTime }{ round$(data.total) + ` ` }
      </strong>
      { translations.i_eachTimeInterval }{ translations.i_period }
    </p>
  );

  // Ask for feedback. Stays put when printing. A take-home hint
  // that the tool is still a prototype
  let feedbackAsk = (
    <Message>
      <span key={ `pre-ask` }>{ translations.i_feedbackAsk }</span>
      <Button
        compact
        key     = { `ask` }
        size    = { `small` }
        onClick = { openFeedback }>
        { translations.i_submitFeedback }
      </Button>
    </Message>
  );

  return (
    <Fragment>
      <Header>Right now</Header>
      { start }
      <ol>{ resourceList }</ol>
      { totals }
      { feedbackAsk }
      <Divider />
    </Fragment>
  );
};  // Ends <Recap>


const PredictionsStep = function ({ updateClientValue, navData, client, translations, openFeedback }) {

  // Really quick returns if other calcs not needed
  if (client.current.benefits.length === 0) {
    return translations.i_noBenefitsChosen;
  }

  return (
    <FormPartsContainer
      title     = { translations.i_title }
      clarifier = { null }
      navData   = { navData }
      formClass = { `predictions` }>

      {/* `predictions-form`: This whole div will be outside
        the form in the future and then we'll be able to
        access its style that way */}

      <Recap
        client       = { client }
        translations = { translations }
        openFeedback = { openFeedback } />

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


/** Rounds money values, turns them into money-formatted
 *     strings, then removes trailing '.00'
 *
 * @param {number} number Number to round and format
 * @returns {string}
 */
let round$ = function (number) {
  return toMoneyStr(Math.round(number)).replace(`.00`, ``);
};


export { PredictionsStep };
