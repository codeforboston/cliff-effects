import React, { Component } from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import {
  Redirect,
  Prompt,
  Link
} from 'react-router-dom';

// Logic
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/state/massachusetts/housing';

// Data
import { clientList } from '../config/dummyClients';

// Our Components
import AlertSidebar from '../AlertSidebar'
import { BenefitsTable } from '../forms/BenefitsTable';
import { CurrentIncomeStep } from '../forms/currentIncome';
import { CurrentExpensesStep } from '../forms/currentExpenses';
import { FutureIncomeStep } from '../forms/futureIncome';
import { HouseholdStep } from '../forms/Household';
import { CurrentBenefitsStep } from '../forms/current-benefits';
import StepBar from '../components/StepBar'

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
          hasSnap: false,
          hasHousing: false,
          snapAlert: 'good',
          housingAlert: 'good',
          currentHousehold: [
            { age: 30, role: 'head', disabled: false, required: true }
          ],
          futureHousehold: [
            { age: 30, role: 'head', disabled: false, required: true }
          ],
          currentHomeless: false,
          currentHomeowner: false,
          currentEarnedIncomeMonthly: 0,
          currentTAFDCMonthly: 0,
          currentSSIMonthly: 0,
          currentSSDIMonthly: 0,
          currentChildSupportInMonthly: 0,
          currentUnemploymentMonthly: 0,
          currentWorkersCompMonthly: 0,
          currentPensionMonthly: 0,
          currentSocialSecurityMonthly: 0,
          currentAlimonyMonthly: 0,
          currentOtherIncomeMonthly: 0,
          currentUnearnedIncomeMonthly: 0,
          futureEarnedIncomeMonthly: 0,
          futureUnearnedIncomeMonthly: 0,
          currentShelter: 'homeless',
          currentHasFuelAssistance: false,
        }
    };  // end this.state {}

    this.steps = [
      { title: 'Current Benefits', form: CurrentBenefitsStep, },
      { title: 'Household', form: HouseholdStep },
      { title: 'Current Income', form: CurrentIncomeStep },
      { title: 'Current Expenses', form: CurrentExpensesStep },
      { title: 'Future Income', form: FutureIncomeStep },
      { title: 'Results', form: BenefitsTable }
    ];  // end this.steps {}
  };  // End constructor()

  setClientProperty = (e, data) => {
    let propertyName = data.name
    let value = typeof(data.checked) === "boolean" ? data.checked : data.value  //This handles both complex values and checked values

     //If fillFuture is true, values will be propagated to both 'current' and 'future' versions
    let newClientValues = {[propertyName]: value}
    let futurePropertyName = propertyName.replace('current', 'future')
    if(this.state.client[futurePropertyName] === 'undefined' && data.fillFuture){
      newClientValues[futurePropertyName] = value
    }

    //if it's a household size field, check if dependents is larger than it, and if so, force dependents to be smaller
    //can't think of a better place to put this logic yet
    if(propertyName.includes("HouseholdSize")){
        let timeframe = propertyName.replace("HouseholdSize", "");
        if(this.state.client[timeframe + "Dependents"] >= newClientValues[propertyName]){ //If dependents is lower than the new value for the # of people in the household
          newClientValues[timeframe + "Dependents"] = data.value - 1;
        }
    }

    this.setState(prevState => ({ client:  {...prevState.client, ...newClientValues }}));
  }

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
                   setClientProperty={this.setClientProperty}
                   saveForm={this.saveForm} />
    );
  };  // End getCurrentStep()

  render() {
    const { clientInfo, visitId } = this.state

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

              <Header
                as='h2'
                content={'Visit #' + visitId + ' for ' + clientInfo.name}
              />
              { clientInfo ?
                <Link to={`/detail/${clientInfo.clientId}`}>
                  Back to Client Detail
                </Link> :
                <Link to="/">Go Home</Link>
              }

            </Grid.Column>
            <Grid.Column floated='right' width={6}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
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
            <Grid.Column width={4} style={{ height: '100%' }}>
              <AlertSidebar
                hasSnap={this.state.client.hasSnap}
                hasHousing={this.state.client.hasHousing}
                snapAlert={getSNAPBenefits(this.state.client)}
                housingAlert={getHousingBenefit(this.state.client)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default VisitPage
