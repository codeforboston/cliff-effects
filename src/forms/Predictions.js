import React, { Component, Fragment } from 'react';
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
import { CashFlowInputsRow } from './cashflow';
import { ShowOnYes } from './ShowOnYes';
import { AttentionArrow } from './formHelpers';
import { GraphHolder } from './predictions/GraphHolder';
import { Summary } from './predictions/Summary';
import { BenefitsTable } from './predictions/BenefitsTable';
import { ResourcesColumns } from './predictions/ResourcesColumns';
import { StackedResources } from './predictions/StackedResources';
import { BenefitsLines } from './predictions/BenefitsLines';

// NON-COMPONENTS
import { applyAndPushBenefits } from '../benefits/applyAndPushBenefits';
import { benefitArrayDataToSingleData } from './predictions/build-resource-data';
import { toMoneyStr } from '../utils/prettifiers';
import { cloneDeep } from 'lodash';


class PredictionsStep extends Component{
  // Accumulated data for rendering results
  state = {
    client:             this.props.client,
    currentBenefitData: {},
  };

  componentDidMount () {
    // Multiple things need the current benefit data
    // to show results
    this.setState((prevState) => {
      let clone        = cloneDeep(prevState.client),
          accumulated = {};

      let resourceKeys = [
            `earned`,
            ...clone.current.benefits,
          ],
          calcData    = {
            activeBenefits: resourceKeys,
            dataToAddTo:    accumulated,
            clientToChange: clone,
            timeframe:      `current`,
          };

      // mutates `accumulated`
      applyAndPushBenefits(calcData);

      return {
        client:             clone,
        currentBenefitData: accumulated,
      };
    });
  }

  render () {
    let { currentBenefitData } = this.state;
    let { client, updateClientValue, navData, translations, openFeedback } = this.props;

    if (currentBenefitData.earned === undefined) {
      return null;
    }

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
          client             = { client }
          currentBenefitData = { currentBenefitData }
          translations       = { translations }
          openFeedback       = { openFeedback } />

        <div id={ `predictions-form` }>
          <Raise
            client            = { client }
            updateClientValue = { updateClientValue }
            currentBenefitData = { currentBenefitData }
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
  }  // End render()
};  // End <PredictionsStep>


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
let Recap = function ({ client, currentBenefitData, translations, openFeedback }) {

  // Get the data for the component
  let current      = client.current,
      resourceKeys = [
        `earned`,
        ...current.benefits,
      ];

  let data = benefitArrayDataToSingleData(resourceKeys, currentBenefitData, 0);

  // Build the contents of the component
  let start = (
    <p>
      { `The tool is still being tested, so don't use it to make decisions. If it's right, it has calculated your money coming in as:` }
    </p>
  );

  // Stays put when printing. A take-home hint
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
      <TextResults
        client       = { client }
        data         = { data }
        translations = { translations } />
      { feedbackAsk }
      <Divider />
    </Fragment>
  );
};  // Ends <Recap>


/** As per Project Hope's input, for the first prototype
 *     we're only including the ability to change earned income.
 *
 * @function
 * @param {object} props
 * @param {object} props.client Client current and future data.
 * @param {function} props.updateClientValue Update client state
 *     value.
 * @param {object} props.translations Language-specific text
 *
 * @returns {object} React element
 */
const Raise = function ({ client, updateClientValue, currentBenefitData, translations }) {

  let future = client.future,
      key    = `raise`,
      type   = `income`;

  let reset = function (event) {
    updateClientValue(event, {
      name:  key,
      value: 0,
    });
  };

  let inputs = (
    <div className={ `field-aligner two-column` }>
      <CashFlowInputsRow
        timeState         = { future }
        type              = { type }
        time              = { `future` }
        updateClientValue = { updateClientValue }
        generic           = { key }>
        { `How much would your raise be?` }
      </CashFlowInputsRow>
    </div>
  );

  return (
    <Fragment>
      <div className={ `question-spacer` } />
      <Header>What would happen with a raise?</Header>
      <ShowOnYes
        childName           = { key }
        showChildrenAtStart = { future.raise > 0 }
        question            = { `Do you want to see what would happen if you got a raise?` }
        heading             = { null }
        onNo                = { reset }
        Left                = { <AttentionArrow /> }>
        { inputs }
      </ShowOnYes>
      <div className={ `question-spacer` } />
      <RaiseResults
        client             = { client }
        currentBenefitData = { currentBenefitData }
        translations       = { translations } />
    </Fragment>
  );
};


let RaiseResults = function ({ client, currentBenefitData, translations }) {
  // Add the data for the future of the client using the raise
  let clone             = cloneDeep(client),
      futureBenefitData = {};

  let resourceKeys = [
        `earned`,
        ...clone.current.benefits,
      ],
      calcData    = {
        activeBenefits: resourceKeys,
        dataToAddTo:    futureBenefitData,
        clientToChange: clone,
        timeframe:      `future`,
      };

  // mutates `accumulated`
  applyAndPushBenefits(calcData);
  let currentData = benefitArrayDataToSingleData(resourceKeys, currentBenefitData, 0),
      futureData  = benefitArrayDataToSingleData(resourceKeys, futureBenefitData, 0);

  let start = (
    <p>
      <span>{ `If you get a raise of ` }</span>
      <span>{ translations.i_beforeMoneyWithTime }{ round$(clone.future.raise) } { translations.i_eachTimeInterval }</span>
      <span>{ ` your money coming in could look like this:` }</span>
    </p>
  );

  let diff        = futureData.total - currentData.total,
      changeStart = (<span>{ ` That would be ` }</span>),
      amount      = (
        <span>
          { translations.i_beforeMoneyWithTime }{ round$(Math.abs(diff)) } { translations.i_eachTimeInterval }
        </span>
      ),
      lessOrMore = null;

  if (diff === 0) {
    lessOrMore = (<span>{ `the same as before.` }</span>);
  } else if (diff > 0) {
    lessOrMore = (<strong>{ amount }{ ` more than before.` }</strong>);
  } else {
    lessOrMore = (<strong>{ amount }{ ` less than before.` }</strong>);
  }

  return (
    <Fragment>
      { start }
      <TextResults
        client       = { client }
        data         = { futureData }
        translations = { translations } />
      { changeStart }
      { lessOrMore }
      <Message>{ translations.i_findHelp }</Message>
    </Fragment>
  );
};  // Ends <RaiseResults>


let TextResults = function ({ client, data, translations }) {
  // Benefit list items. Always starts with `earned`.
  let resourceList = [
    (
      <li key={ `earned` }>{ `Pay from work: ` }{translations.i_beforeMoneyWithTime}{round$(data.earned)} {translations.i_eachTimeInterval}</li>
    ),
  ];

  let numBenefits = client.current.benefits.length;
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

  return (
    <Fragment>
      <ol>{ resourceList }</ol>
      { totals }
    </Fragment>
  );
};


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
