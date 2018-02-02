import React, { Component } from 'react';
import {
  Container,
  Responsive,
} from 'semantic-ui-react';
import {
  Redirect,
  Prompt,
} from 'react-router-dom';

// Object Manipulation
import { setNestedProperty } from '../utils/setNestedProperty';
import { cloneDeep } from 'lodash';

// Data
import { clientList } from '../config/dummyClients';
import { CLIENT_DEFAULTS } from '../utils/CLIENT_DEFAULTS';

// Our Components
// import AlertSidebar from '../AlertSidebar'
import ConfirmLeave from '../components/ConfirmLeave';
import DownloadErrorPrompt from '../components/DownloadErrorPrompt';
import OnLeavePrompt from '../components/OnLeavePrompt';
import { DownloadAnytime } from '../components/DownloadAnytime';
import { CurrentIncomeStep } from '../forms/CurrentIncome';
import { CurrentExpensesStep } from '../forms/CurrentExpenses';
import { PredictionsStep } from '../forms/Predictions';
import { HouseholdStep } from '../forms/Household';
import { CurrentBenefitsStep } from '../forms/CurrentBenefits';
import StepBar from '../components/StepBar';
import ResultsGraph from '../forms/ResultsGraph';

// React Router <Prompt> customization shenanigans
import * as getUserConfirmation from '../utils/getUserConfirmation';

class VisitPage extends Component {
  constructor(props) {
    super(props);

    const clientInfo = clientList.find( client => {
      return client.clientId === parseInt(this.props.match.params.clientId, 10);
    });

    this.state = {
        clientInfo: clientInfo,
        visitId: this.props.match.params.visitId,
        currentStep: 1,
        isBlocking: false,
        redirect: false,
        client: cloneDeep(CLIENT_DEFAULTS),
        promptOpen: false,
        promptMessage: '',
        promptHeader: '',
        promptLeaveText: 'Reset',
        promptData: {},
        promptCallback: () => {},
        // Hack for MVP
        oldShelter: CLIENT_DEFAULTS.current.shelter,
        userChanged: {}
    };  // end this.state {}

    this.steps = [
      { title: 'Current Benefits', form: CurrentBenefitsStep, },
      { title: 'Household', form: HouseholdStep },
      { title: 'Income', form: CurrentIncomeStep },
      { title: 'Expenses', form: CurrentExpensesStep },
      { title: 'Predictions', form: PredictionsStep },
      { title: 'Graphs', form: ResultsGraph }
    ];  // end this.steps {}
  };  // End constructor()

  componentDidMount() {
    const data = { client: this.state.client };
    const confirm = (message, callback) =>
      this.prompt(callback, data, null, null, message);
    getUserConfirmation.set(confirm);
  }

  componentWillUnmount() {
    getUserConfirmation.unset();
  }

  resetClient = () => {
    this.setState({
      currentStep: 1,
      client: cloneDeep(CLIENT_DEFAULTS),
      oldShelter: CLIENT_DEFAULTS.current.shelter,
      isBlocking: false,
      userChanged: {}
    });
  }

  resetClientPrompt = () => {
    // If the user hasn't interacted with the form at all
    if ( !this.state.isBlocking ) {
      // just go to the start of the form
      this.goToStep( 1 );
    } else {
      // Otherwise, suggest the user download the data
      const data = { client: this.state.client };
      this.prompt(ok => ok && this.resetClient(), data, 'Reset');
    }
  }

  prompt = (callback, data, leaveText, header, message) => {
    this.setState({
      promptOpen: true,
      promptMessage: message,
      promptLeaveText: leaveText,
      promptHeader: header,
      promptData: data,
      promptCallback: ok => {
        this.setState({ promptOpen: false });
        callback(ok);
      }
    });
  }

  changeClient = (evnt, { route, name, value, checked, time }) => {

    route = route || name;

    var val = value;
    if ( typeof checked === 'boolean' ) { val = checked; }

    var client      = cloneDeep( this.state.client ),
        userChanged = {...this.state.userChanged},  // only 1 deep
        current     = client.current,
        future      = client.future,
        routeList   = route.split('/'),
        id          = routeList[0],  // `routeList` gets mutated
        newEvent    = { time: time, route: routeList, value: val };

    setNestedProperty(newEvent, {current, future}, this.state.userChanged[ id ]);
    // Only set if the input was valid...? For now, always.
    // Also, userChanged should be only one step deep
    if ( time === 'future' ) { userChanged[ id ] = true; }

    // Hack for MVP (otherwise need dependency + history system)
    let oldShelter = this.state.oldShelter;
    if ( route === 'shelter' ) { oldShelter = client.current.shelter; }  // client shelter should be right now
    if ( client.current.hasHousing ) { client.current.shelter = 'voucher'; }
    // Restore shelter to previous value
    else { client.current.shelter = oldShelter; }
    client.future.shelter = client.current.shelter;

    this.setState( prevState => ({
      client: client,
      userChanged: userChanged,
      oldShelter: oldShelter,
      // Form has been changed, data should now be downloadable
      isBlocking: true
    }) );
  }  // End onClientChange()

  saveForm = (exitAfterSave) => {
    alert('Form saved (not really, this is a placeholder).');
    if (exitAfterSave) {
      this.setState({isBlocking: false, redirect: true});
    } else {
      this.setState({isBlocking: false});
    }
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1
    }));
    this.scrollToTop();
  };

  previousStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1
    }));
    this.scrollToTop();
  };

  goToStep = (index) => {
    this.setState({ currentStep: index });
  }

  getCurrentStep = () => {
    var step = Math.max( 1, Math.min( this.steps.length, this.state.currentStep )) - 1;   //keep it between 1 and 8 and convert to 0 index
    var FormSection = this.steps[ step ].form;

    return (
      <div>
        <FormSection currentStep={this.state.currentStep}
                     client={this.state.client}
                     nextStep={this.nextStep}
                     previousStep={this.previousStep}
                     changeClient={this.changeClient}
                     saveForm={this.saveForm}
                     resetClient={this.resetClientPrompt} />
        <DownloadAnytime client={this.state.client}/>
      </div>
    );
  };  // End getCurrentStep()

  render() {
    return (
      <div className='forms-container flex-item flex-column'>
        <Prompt
          when={this.state.isBlocking}
          message='default'
        />
        <OnLeavePrompt
          callback={this.state.promptCallback}
          data={this.state.promptData}
          header={this.state.promptHeader}
          leaveText={this.state.promptLeaveText}
          message={this.state.promptMessage}
          open={this.state.promptOpen}
          isBlocking={this.state.isBlocking}
        />
        <DownloadErrorPrompt
          callback={ok => ok && this.resetClient()}
          client={this.state.client}
          header='There was an unexpected error. Do you want to download the error data?'
          leaveText='Reset'
          prompt={this.prompt}
        />
        <ConfirmLeave isBlocking={this.state.isBlocking}/>

        {this.state.redirect ?
          <Redirect to={`/detail/${this.state.clientInfo.clientId}`}/> :
          false
        }

        {/* `padding` here duplicates previous `<Grid>` styleing */}
        <Container
          className='flex-item flex-column'
          style={{ padding: '42px 0' }}
        >
          <Responsive minWidth='874.5' style={{ padding: '14px 0' }}>
            <StepBar
              currentStepIndex={this.state.currentStep}
              steps={this.steps}
              goToStep={this.goToStep}
            />
          </Responsive>
          <div className="flex-item flex-column" style={{ padding: '14px 0' }}>
            {this.getCurrentStep()}
          </div>
        </Container>
      </div>
    )
  }
}

export default VisitPage
