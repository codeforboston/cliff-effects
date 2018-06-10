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
import ConfirmLeave from '../components/ConfirmLeave';
import ErrorPrompt from '../components/ErrorPrompt';
import OnLeavePrompt from '../components/OnLeavePrompt';
import ReactRouterConfirmLeave from '../components/ReactRouterConfirmLeave';
import FeedbackPrompt from '../components/FeedbackPrompt';
import { FeedbackAnytime } from '../components/FeedbackAnytime';
import { ResetAnytime } from '../components/ResetAnytime';
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
      prompt:              {
        open:      false,
        message:   '',
        header:    '',
        leaveText: 'Reset',
        callback:  () => {},
      },
      feedbackOpen: false,
      // Hack for MVP
      oldHousing:   clone.current.housing,
      userChanged:  {},
      snippets:     props.snippets,
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

  resetClient = () => {
    this.setState({
      currentStep: 1,
      client:      cloneDeep(CLIENT_DEFAULTS),
      oldHousing:  CLIENT_DEFAULTS.current.housing,
      isBlocking:  false,
      userChanged: {},
    });
  };

  resetClientPrompt = () => {
    // If the user hasn't interacted with the form at all
    if (!this.state.isBlocking) {
      // just go to the start of the form
      this.goToStep(1);
    } else {
      // Otherwise, suggest the user submit feedback
      this.prompt((ok) => {
        return ok && this.resetClient();
      },
      {
        leaveText: 'Reset',
        message:   'default',
      });
    }
  };

  prompt = (callback, promptProps) => {
    this.setState({
      prompt: {
        ...promptProps,
        open:     true,
        callback: (ok) => {
          this.setState({ prompt: { open: false }});
          callback(ok);
        },
      },
    });
  };

  feedbackPrompt = () => {
    this.setState({ feedbackOpen: true });
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
          resetClient={ this.resetClientPrompt }
          feedbackPrompt={ this.feedbackPrompt }
          snippets={ formSnippets } />
        <FeedbackAnytime feedbackPrompt={ this.feedbackPrompt } />
        <ResetAnytime resetClient={ this.resetClientPrompt } />
      </div>
    );
  };  // End getCurrentStep()

  render() {
    return (
      <div className='forms-container flex-item flex-column'>
        <OnLeavePrompt
          { ...this.state.prompt }
          isBlocking={ this.state.isBlocking }
          feedbackPrompt={ this.feedbackPrompt } />

        <ReactRouterConfirmLeave
          message='default'
          prompt={ this.prompt }
          isBlocking={ this.state.isBlocking } />
        <ErrorPrompt
          callback={ (ok) => {return ok && this.resetClient();} }
          client={ this.state.client }
          header='There was an unexpected error. Do you want to submit feedback?'
          leaveText='Reset'
          prompt={ this.prompt } />

        <ConfirmLeave isBlocking={ this.state.isBlocking } />
        <FeedbackPrompt
          isOpen={ this.state.feedbackOpen }
          close={ () => { this.setState({ feedbackOpen: false }); } }
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
