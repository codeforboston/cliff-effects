import React, { Component } from 'react';
import { Grid, Step } from 'semantic-ui-react';
import { Redirect, Prompt } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

// Logic
import { percentPovertyLevel, 
        percentStateMedianIncome } from './helpers/helperFunctions';
import { getSnapEligibility } from './programs/state/massachusetts/snap';
import { getHousingBenefit } from './programs/state/massachusetts/housing';
import { getMassHealthEligibility } from './programs/state/massachusetts/masshealth';

// Data
import { clientList } from './clientList';

// Our Components
import SimpleMenu from './simpleMenu';
import AlertSidebar from './alertSidebar'
import ResultsGraph from './resultsGraph';
import { CurrentIncomeStep } from './forms/currentIncome';
import { CurrentExpensesStep } from './forms/currentExpenses';
import { FutureIncomeStep } from './forms/futureIncome';
import { HealthStep } from './forms/health';
import { CitizenshipStep } from './forms/citizenship';
import { HouseholdSizeStep } from './forms/household-size';
import { CurrentBenefitsStep } from './forms/current-benefits';
import { ConfirmInformation } from './forms/confirmInformation';

const StepBar = ({ steps, currentStep }) => {

  for ( let stepi = 0; stepi < steps.length; stepi++ ) {
      let step = steps[ stepi ];
      step.completed = (stepi < currentStep);
      step.active = (stepi === currentStep - 1);
  }

  return (<Step.Group size='mini' ordered items={steps} />)
}

class VisitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        isBlocking: true,
        redirect: false,
        clientInfo: clientList.filter(client => client.clientId == this.props.match.params.clientId)[0],
        visitId: this.props.match.params.visitId,
        client : {
          hasSnap: false,
          hasHousing: false,
          hasMassHealth: false,
          snapAlert: 'good',
          housingAlert: 'good',
          massHealthAlert: 'good',
          householdSize: 1,
          annualIncome: 0,
          citizenshipStatus:'citizen',
          qualifyingConditions: false,       
          numberOfBedrooms: 0,
          currentHomeless: false,
          currentHomeowner: false,
          areaOfResidence: 'Boston city',
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
          futureUnearnedIncomeMonthly: 0
        }
    };  // end this.state {}

    this.steps = [
      { completed: false, active: false, title: 'Current Benefits', form: CurrentBenefitsStep, },
      { completed: false, active: false, title: 'Household Size', form: HouseholdSizeStep },
      { completed: false, active: false, title: 'Current Income', form: CurrentIncomeStep },
      { completed: false, active: false, title: 'Current Expenses', form: CurrentExpensesStep },
      { completed: false, active: false, title: 'Future Income', form: FutureIncomeStep },
      { completed: false, active: false, title: 'Citizenship', form: CitizenshipStep },
      { completed: false, active: false, title: 'MassHealth', form: HealthStep },
      { completed: false, active: false, title: 'Confirm Information', form: ConfirmInformation  },
      // { completed: false, active: false, title: 'SNAP', form: SNAPStep },
      // { completed: false, active: false, title: 'Housing', form: HousingStep },
      { completed: false, active: false, title: 'Results', form: ResultsGraph }
    ];  // end this.steps {}

    this.stepProps = {
      currentStep:  this.state.currentStep,
      nextStep:     this.nextStep,
      previousStep: this.previousStep,
      storeComplex: this.storeComplex, // Maybe put these straight on state
      storeChecked: this.storeChecked, // Maybe put these straight on state
      saveForm:     this.saveForm
    };

  };  // End constructor()
  
  
  setClientValue = (name, value) => {
     this.setState({ client: {...this.state.client, [name]: value }});
  }

  storeChecked = (e, { name, checked }) => {
    this.setClientValue(name, true)
  }

  storeComplex = (e, { name, value }) => {
    this.setClientValue(name, value)
  }

  saveForm = (exitAfterSave) => {
    alert('Form saved (not really, this is a placeholder).');
    if (exitAfterSave) {
      this.setState({isBlocking: false, redirect: true});
    } else {
      this.setState({isBlocking: false});
    }
  }

  getCurrentStep = () => {
    var step = Math.max( 1, Math.min( this.steps.length, this.state.currentStep )) - 1;   //keep it between 1 and 8 and convert to 0 index
    var FormSection = this.steps[ step ].form;

    return ( <FormSection { ...this.stepProps } currentStep = {this.state.currentStep} client={this.state.client} /> );

  };  // End getCurrentStep()

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

  render() {
    return (
      <div className='forms-container'>
        <Prompt
          when={this.state.isBlocking}
          message='Are you sure you want to leave the page with unsaved changes?'
        />
        {this.state.redirect ? (<Redirect to={`/detail/${this.state.clientInfo.clientId}`}/>) : false}
        <SimpleMenu save={this.saveForm} client={this.state.clientInfo} visit={this.state.visitId} />
        <Grid
          textAlign='center'
          style={{ height: '100%', padding: '2em 2em' }}
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width = {16}>
              <StepBar currentStep={this.state.currentStep} steps={this.steps} />
            </Grid.Column>
          </Grid.Row>         
          <Grid.Row>
            <Grid.Column width={12}>
              <div>
                {this.getCurrentStep()}
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <AlertSidebar hasSnap={this.state.client.hasSnap} 
                            hasHousing={this.state.client.hasHousing} 
                            hasMassHealth={this.state.client.hasMassHealth}
                            snapAlert={getSnapEligibility(this.state.client)}
                            housingAlert={getHousingBenefit(this.state.client)}
                            massHealthAlert={getMassHealthEligibility(this.state.client)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default VisitPage
