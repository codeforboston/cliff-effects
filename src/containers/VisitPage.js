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
import ConfirmLeave from '../components/prompts/ConfirmLeave';
import ErrorPrompt from '../components/prompts/ErrorPrompt';
import FeedbackPrompt from '../components/prompts/FeedbackPrompt';
import ReactRouterConfirmLeave from '../components/prompts/ReactRouterConfirmLeave';
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
        open:      false,  // Start as hidden
        message:   '',
        header:    '',
        leaveText: 'Reset',
        callback:  () => {},
      },
      shouldShowFeedback: false,
      // Hack for MVP
      oldHousing:         clone.current.housing,
      userChanged:        {},
      snippets:           props.snippets,
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

  askToResetClient = () => {
    // If the user hasn't interacted with the form at all
    if (!this.state.isBlocking) {
      // just go to the start of the form
      this.goToStep(1);
    } else {
      // Otherwise, suggest the user submit feedback
      var promptData = {
        leaveText: 'Reset',
        message:   'default',
      };
      this.askForFeedback(this.resetClientIfOk, promptData);
    }
  };

  askForFeedback = (callback, promptProps) => {

    // Function that will be called when user is done.
    var closePrompt = (isOk) => {
      this.setState({ promptData: { open: false }});
      callback(isOk);
    };

    this.setState({
      promptData: {
        ...promptProps,
        open:     true,
        callback: closePrompt,
      },
    });

  };

  openFeedback = () => {
    this.setState({ shouldShowFeedback: true });
  };

  closeFeedback = () => {
    this.setState({ shouldShowFeedback: false });
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
    return (
      <div className='forms-container flex-item flex-column'>
        <FeedbackPrompt
          { ...this.state.promptData }
          isBlocking={ this.state.isBlocking }
          openFeedback={ this.openFeedback } />

        <ReactRouterConfirmLeave
          message='default'
          askForFeedback={ this.askForFeedback }
          confirmer = { this.props.confirmer }
          isBlocking={ this.state.isBlocking } />
        <ErrorPrompt
          callback={ this.resetClientIfOk }
          client={ this.state.client }
          header='There was an unexpected error. Do you want to submit feedback?'
          leaveText='Reset'
          askForFeedback={ this.askForFeedback } />

        <ConfirmLeave isBlocking={ this.state.isBlocking } />
        <FeedbackForm
          isOpen={ this.state.shouldShowFeedback }
          close={ this.closeFeedback }
          data={ this.state.client } />

        {this.state.redirect ?
          <Redirect to={ `/detail/${this.state.clientInfo.clientId}` } /> :
          false
        }

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
