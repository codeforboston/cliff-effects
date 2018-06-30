import React, { Component } from 'react';
import {
  Container,
  Responsive,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

// Object Manipulation
import { setNestedProperty } from '../utils/setNestedProperty';
import { cloneDeep } from 'lodash';

// Data
// import { clientList } from '../config/dummyClients';
import { CLIENT_DEFAULTS } from '../utils/CLIENT_DEFAULTS';

// Our Components
// import AlertSidebar from '../AlertSidebar'
import BrowserLeaveListener from '../components/prompts/BrowserLeaveListener';
import ReactRouterLeaveListener from '../components/prompts/ReactRouterLeaveListener';
import ErrorListener from '../components/prompts/ErrorListener';
import FeedbackPrompt from '../components/prompts/FeedbackPrompt';
import FeedbackForm from '../components/prompts/FeedbackForm';
import { FeedbackAnytime } from '../components/prompts/FeedbackAnytime';
import { ResetAnytime } from '../components/prompts/ResetAnytime';
import { CurrentIncomeStep } from '../forms/CurrentIncome';
import { CurrentExpensesStep } from '../forms/CurrentExpenses';
import { PredictionsStep } from '../forms/Predictions';
import { HouseholdStep } from '../forms/Household';
import { CurrentBenefitsStep } from '../forms/CurrentBenefits';
import StepBar from '../components/StepBar';
//import ResultsGraph from '../forms/ResultsGraph';

// Dev Components
import { CustomClient } from '../components/CustomClient';


// Temporary for developing prompts
const RenderIfTrue = function ({ shouldRender, children }) {

  if (shouldRender) {
    return children;
  } else {
    return null;
  }

}; // End <RenderIfTrue>


class VisitPage extends Component {
  constructor(props) {
    super(props);


    var { location, match } = this.props;

    // @todo use visitId to upload last file if possible?
    var wantLoad = false;
    if (location.pathname.indexOf('/load') !== -1) {
      wantLoad = true;
    }

    var clone = cloneDeep(CLIENT_DEFAULTS);

    this.state = {
      clientInfo:          match.params.clientId,
      visitId:             match.params.visitId,
      mayLoadCustomClient: wantLoad,
      currentStep:         1,
      isBlocking:          false,
      redirect:            false,
      client:              clone,
      // For `FeedbackPrompt`
      promptData:          {
        message:   '',
        header:    '',
        leaveText: 'Reset',
        callback:  () => {},
      },
      whichPrompts: {
        FeedbackForm:             false,
        FeedbackPrompt:           false,
        // will only be true for first form section
        BrowserLeaveListener:     true,
        // will only be true for first form section. Combine with above?
        ReactRouterLeaveListener: true,
        // will always be true. Include for consistency?
        ErrorListener:            true,
      },
      // Hack for MVP
      oldHousing:  clone.current.housing,
      userChanged: {},
      snippets:    props.snippets,
    };  // end this.state {}

    this.steps = [
      {
        form: CurrentBenefitsStep,
        key:  'currentBenefits',
      },
      {
        form: HouseholdStep,
        key:  'household',
      },
      {
        form: CurrentIncomeStep,
        key:  'currentIncome',
      },
      {
        form: CurrentExpensesStep,
        key:  'currentExpenses',
      },
      {
        form: PredictionsStep,
        key:  'predictions',
      },//,
    //  { title: 'Graphs', form: ResultsGraph }
    ];  // end this.steps {}

  };  // End constructor()

  loadClient = ({ client }) => {
    const defaultClient = cloneDeep(CLIENT_DEFAULTS);

    const current = Object.assign(defaultClient.current, client.current);
    const future = Object.assign(defaultClient.future, client.future);

    const nextClient = { current: current, future: future };

    this.setState({ client: nextClient });
  };

  resetClientIfOk = (shouldReset) => {

    if (!shouldReset) {
      return;
    }

    this.setState({
      currentStep: 1,
      client:      cloneDeep(CLIENT_DEFAULTS),
      oldHousing:  CLIENT_DEFAULTS.current.housing,
      isBlocking:  false,
      userChanged: {},
    });

  };

  askToResetClient = (promptData) => {
    // If the user hasn't interacted with the form at all
    if (!this.state.isBlocking) {
      // just go to the start of the form
      this.goToStep(1);
    } else {
      // Otherwise, suggest the user submit feedback
      this.askForFeedback(this.resetClientIfOk, promptData);
    }
  };

  setPrompt = (promptName, value) => {
    var newPromptVals = { ...this.state.whichPrompts };
    newPromptVals[ promptName ] = value;
    this.setState({ whichPrompts: newPromptVals });
  };

  askForFeedback = (callback, promptText) => {

    // When user exits feedback prompt somehow, 
    // close it before finishing the callback.
    var closePrompt = (isOk) => {
      this.setPrompt('FeedbackPrompt', false);
      callback(isOk);
    };

    this.setState({
      whichPrompts: {
        ...this.state.whichPrompts,
        FeedbackPrompt: true,
      },
      promptData: {
        ...promptText,
        callback: closePrompt,
      },
    });

  };

  openFeedback = () => {
    this.setPrompt('FeedbackForm', true);
  };

  closeFeedback = () => {
    this.setPrompt('FeedbackForm', false);
  };

  changeClient = (evnt, { route, name, value, checked, time }) => {

    route = route || name;

    var val = value;
    if (typeof checked === 'boolean') {
      val = checked;
    }

    var client      = cloneDeep(this.state.client),
        userChanged = { ...this.state.userChanged },  // only 1 deep
        current     = client.current,
        future      = client.future,
        routeList   = route.split('/'),
        id          = routeList[ 0 ],  // `routeList` gets mutated
        newEvent    = { time: time, route: routeList, value: val };

    setNestedProperty(newEvent, { current, future }, this.state.userChanged[ id ]);
    // Only set if the input was valid...? For now, always.
    // Also, userChanged should be only one step deep
    if (time === 'future') {
      userChanged[ id ] = true;
    }

    // Hack for MVP (otherwise need dependency + history system)
    let oldHousing = this.state.oldHousing;
    if (route === 'housing') {
      // client housing should be right now
      oldHousing = client.current.housing;
    }

    if (client.current.hasSection8) {
      client.current.housing = 'voucher';
    } else {
      // Restore housing to previous value
      client.current.housing = oldHousing;
    }

    client.future.housing = client.current.housing;

    this.setState((prevState) => {
      return {
        client:      client,
        userChanged: userChanged,
        oldHousing:  oldHousing,
        // Form has been changed, data should now be downloadable
        isBlocking:  true,
      };
    });
  };  // End onClientChange()

  // Implement once privacy and security are worked out
  saveForm = (exitAfterSave) => {
    alert('Form saved (not really, this is a placeholder).');
    if (exitAfterSave) {
      this.setState({ isBlocking: false, redirect: true });
    } else {
      this.setState({ isBlocking: false });
    }
  };

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  nextStep = () => {
    this.setState((prevState) => {
      return { currentStep: prevState.currentStep + 1 };
    });
    this.scrollToTop();
  };

  previousStep = () => {
    this.setState((prevState) => {
      return { currentStep: prevState.currentStep - 1 };
    });
    this.scrollToTop();
  };

  goToStep = (index) => {
    this.setState({ currentStep: index });
  };

  getCurrentStep = () => {
    var step = Math.max(1, Math.min(this.steps.length, this.state.currentStep)) - 1;   //keep it between 1 and 8 and convert to 0 index
    var FormSection = this.steps[ step ].form;
    var formSnippets = this.state.snippets[ this.steps[ step ].key ];

    return (
      <div>
        <CustomClient
          mayLoadCustomClient={ this.state.mayLoadCustomClient }
          loadClient={ this.loadClient } />
        <FormSection
          currentStep={ this.state.currentStep }
          client={ this.state.client }
          nextStep={ this.nextStep }
          previousStep={ this.previousStep }
          changeClient={ this.changeClient }
          saveForm={ this.saveForm }
          askToResetClient={ this.askToResetClient }
          openFeedback={ this.openFeedback }
          snippets={ formSnippets } />
        <FeedbackAnytime openFeedback={ this.openFeedback } />
        <ResetAnytime askToResetClient={ this.askToResetClient } />
      </div>
    );
  };  // End getCurrentStep()

  render() {
    var {
      client,
      whichPrompts,
      promptData,
      isBlocking,
    } = this.state;

    return (
      <div className='forms-container flex-item flex-column'>

        {/* = PROMPTS & PROMPT TRIGGERS = */}
        {/* - Sometimes visible - */}
        {/* Triggered by `ReactRouterLeaveListener`,
         *`ResetAnytime`, or `ErrorListener` */}
        <RenderIfTrue shouldRender={ whichPrompts.FeedbackPrompt }>
          <FeedbackPrompt
            { ...promptData }
            isBlocking={ isBlocking }
            openFeedback={ this.openFeedback } />
        </RenderIfTrue>
        {/* Triggered by `FeedbackPrompt` & `FeedbackAnytime` */}
        <RenderIfTrue shouldRender={ whichPrompts.FeedbackForm }>
          <FeedbackForm
            close={ this.closeFeedback }
            data={ client } />
        </RenderIfTrue>

        {/* - Never visible - */}
        <RenderIfTrue shouldRender={ whichPrompts.ErrorListener }>
          <ErrorListener
            callback={ this.resetClientIfOk }
            client={ client }
            askForFeedback={ this.askForFeedback } />
        </RenderIfTrue>
        {/* Browser nav - reload/back/unload. */}
        <RenderIfTrue shouldRender={ whichPrompts.BrowserLeaveListener }>
          <BrowserLeaveListener isBlocking={ isBlocking } />
        </RenderIfTrue>
        {/* React nav buttons (Home/About) */}
        <RenderIfTrue shouldRender={ whichPrompts.ReactRouterLeaveListener }>
          <ReactRouterLeaveListener
            askForFeedback={ this.askForFeedback }
            confirmer = { this.props.confirmer }
            isBlocking={ isBlocking } />
        </RenderIfTrue>

        {/* = LINKS? = */}
        {/* We should probably remove this. If we want to
         * do this we might do this a different way at this
         * point. Perhaps a user's page should be a route
         * in VisitPage? Like our form sections will be? */}
        {this.state.redirect ?
          <Redirect to={ `/detail/${this.state.clientInfo.clientId}` } /> :
          false
        }

        {/* = SECTION = */}
        {/* `padding` here duplicates previous `<Grid>` styleing */}
        <Container
          className='flex-item flex-column'
          style={{ padding: '42px 0' }}>
          <Responsive
            minWidth='874.5'
            style={{ padding: '14px 0' }}>
            <StepBar
              currentStepIndex={ this.state.currentStep }
              steps={ this.steps }
              goToStep={ this.goToStep }
              snippets={ this.state.snippets.stepBar } />
          </Responsive>
          <div
            className="flex-item flex-column"
            style={{ padding: '14px 0' }}>
            {this.getCurrentStep()}
          </div>
        </Container>
      </div>
    );
  }
}

export default VisitPage;
