import React, { Component } from 'react';
import {
  Grid,
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
import { CurrentIncomeStep } from '../forms/currentIncome';
import { CurrentExpensesStep } from '../forms/currentExpenses';
import { PredictionsStep } from '../forms/Predictions';
import { HouseholdStep } from '../forms/Household';
import { CurrentBenefitsStep } from '../forms/current-benefits';
import StepBar from '../components/StepBar';
import ResultsGraph from '../ResultsGraph';

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
        isBlocking: true,
        redirect: false,
        client : {
          ...CLIENT_DEFAULTS,
          snapAlert: 'good',
          housingAlert: 'good',
        },
        userChanged: {}
    };  // end this.state {}

    this.steps = [
      { title: 'Current Benefits', form: CurrentBenefitsStep, },
      { title: 'Household', form: HouseholdStep },
      { title: 'Current Income', form: CurrentIncomeStep },
      { title: 'Current Expenses', form: CurrentExpensesStep },
      { title: 'Predictions', form: PredictionsStep },
      { title: 'Results', form: ResultsGraph }
    ];  // end this.steps {}
  };  // End constructor()




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

    this.setState( prevState => ({ client: client, userChanged: userChanged }) );
  }  // End onClientChange()

  saveForm = (exitAfterSave) => {
    alert('Form saved (not really, this is a placeholder).');
    if (exitAfterSave) {
      this.setState({isBlocking: false, redirect: true});
    } else {
      this.setState({isBlocking: false});
    }
  }

  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1
    }));
  };

  previousStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1
    }));
  };

  goToStep = (index) => {
    this.setState({ currentStep: index });
  }

  getCurrentStep = () => {
    var step = Math.max( 1, Math.min( this.steps.length, this.state.currentStep )) - 1;   //keep it between 1 and 8 and convert to 0 index
    var FormSection = this.steps[ step ].form;

    return (
      <FormSection currentStep={this.state.currentStep}
                   client={this.state.client}
                   nextStep={this.nextStep}
                   previousStep={this.previousStep}
                   changeClient={this.changeClient}
                   saveForm={this.saveForm} />
    );
  };  // End getCurrentStep()

  render() {

    return (
      <div className='forms-container'>
        <Prompt
          when={this.state.isBlocking}
          message='Are you sure you want to leave the page with unsaved changes?'
        />

        {this.state.redirect ?
          <Redirect to={`/detail/${this.state.clientInfo.clientId}`}/> :
          false
        }

        <Grid
          style={{ height: '100%', padding: '2em 0' }}
          verticalAlign='middle'
          container
        >
          <Grid.Row>
            <Grid.Column width={10}>

            </Grid.Column>
            <Grid.Column floated='right' width={6}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='computer'>
            <Grid.Column width = {16}>
              <StepBar
                currentStepIndex={this.state.currentStep}
                steps={this.steps}
                goToStep={this.goToStep}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <div>
                {this.getCurrentStep()}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default VisitPage
