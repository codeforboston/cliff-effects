import React, { Component } from 'react';
import { Grid, Step } from 'semantic-ui-react';
import { Redirect, Prompt } from 'react-router-dom';

// Logic
import { getSNAPBenefits } from './programs/state/massachusetts/snap';
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

const StepBar = ({ steps, currentStep, goToStep }) => {

  for ( let stepi = 0; stepi < steps.length; stepi++ ) {
      let step = steps[ stepi ];
      step.completed = (stepi < currentStep);
      step.active = (stepi === currentStep - 1);
      step.onClick = (e) => { goToStep(stepi + 1) } //Create unique click handler for each step
  }

  return (<Step.Group size='mini' ordered items={steps} />)
}

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
          hasMassHealth: false,
          snapAlert: 'good',
          housingAlert: 'good',
          massHealthAlert: 'good',
          householdSize: 1,
          annualIncome: 0,
          citizenshipStatus:'citizen',
          qualifyingConditions: false,       
          numberOfBedrooms: 0,
          currentHouseholdSize: 1,
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
      { title: 'Current Benefits', form: CurrentBenefitsStep, },
      { title: 'Household Size', form: HouseholdSizeStep },
      { title: 'Current Income', form: CurrentIncomeStep },
      { title: 'Current Expenses', form: CurrentExpensesStep },
      { title: 'Future Income', form: FutureIncomeStep },
      { title: 'Citizenship', form: CitizenshipStep },
      { title: 'MassHealth', form: HealthStep },      
      // { title: 'SNAP', form: SNAPStep },
      // { title: 'Housing', form: HousingStep },
      { title: 'Results', form: ResultsGraph }
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
              <StepBar currentStep={this.state.currentStep} steps={this.steps} goToStep={this.goToStep} />
            </Grid.Column>
          </Grid.Row>         
          <Grid.Row>
            <Grid.Column width={12}>
              <div>
                {this.getCurrentStep()}
              </div>
            </Grid.Column>
            <Grid.Column width={4} style={{ height: '100%' }}>
              <AlertSidebar hasSnap={this.state.client.hasSnap} 
                            hasHousing={this.state.client.hasHousing} 
                            hasMassHealth={this.state.client.hasMassHealth}
                            snapAlert={getSNAPBenefits(this.state.client)}
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
