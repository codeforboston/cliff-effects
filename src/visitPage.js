import React, { Component } from 'react';
import { Grid, Step } from 'semantic-ui-react';
import { Redirect, Prompt } from 'react-router-dom';

// Logic
import { getSnapEligibility } from './programs/state/massachusetts/snap';
import { getHousingBenefit } from './programs/state/massachusetts/housing';
import { getMassHealthEligibility } from './programs/state/massachusetts/masshealth';

// Data
import { clientList } from './clientList';

// Our Components
import SimpleMenu from './simpleMenu';
import AlertSidebar from './alertSidebar'
import ResultsGraph from './resultsGraph';
import { PreviousIncomeStep } from './forms/previousIncome';
import { CurrentIncomeStep } from './forms/currentIncome';
import { PreviousExpensesStep } from './forms/previousExpenses';
import { HealthStep } from './forms/health';
import { CitizenshipStep } from './forms/citizenship';
import { HouseholdSizeStep } from './forms/household-size';
import { CurrentBenefitsStep } from './forms/current-benefits';

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
        previousHomeless: false,
        previousHomeowner: false,
        areaOfResidence: 'Boston city',
        previousEarnedIncomeMonthly: 0,
        previousTAFDCMonthly: 0,
        previousSSIMonthly: 0,
        previousSSDIMonthly: 0,
        previousChildSupportInMonthly: 0,
        previousUnemploymentMonthly: 0,
        previousWorkersCompMonthly: 0,
        previousPensionMonthly: 0,
        previousSocialSecurityMonthly: 0,
        previousAlimonyMonthly: 0,
        previousOtherIncomeMonthly: 0,
        previousUnearnedIncomeMonthly: 0,
        currentEarnedIncomeMonthly: 0,
        currentUnearnedIncomeMonthly: 0,
        clientInfo: clientList.filter(client => client.clientId === this.props.match.params.clientId)[0],
        visitId: this.props.match.params.visitId
    };  // end this.state {}

    this.steps = [
      { completed: false, active: false, title: 'Current Benefits', form: CurrentBenefitsStep, },
      { completed: false, active: false, title: 'Household Size', form: HouseholdSizeStep },
      { completed: false, active: false, title: 'Previous Income', form: PreviousIncomeStep },
      { completed: false, active: false, title: 'Previous Expenses', form: PreviousExpensesStep },
      { completed: false, active: false, title: 'Current Income', form: CurrentIncomeStep },
      { completed: false, active: false, title: 'Citizenship', form: CitizenshipStep },
      { completed: false, active: false, title: 'MassHealth', form: HealthStep },
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

  storeChecked = (e, { name, checked }, callback) => {
    var truth = this;
    truth.setState({ [name]: checked },
      function () {
       // console.log( name, checked, truth );
       if ( callback ) { callback( truth ); }
    });
  }

  storeComplex = (e, { name, value }, callback) => {
    var truth = this;
    truth.setState(
      { [name]: value },
      function () {
        // console.log( truth );
        if ( callback ) { callback( truth ); }
      }  // This is given no arguments
    );
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
    return ( <FormSection { ...this.stepProps} pageState={this.state} currentStep={step} /> );
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
              <AlertSidebar hasSnap={this.state.hasSnap} 
                            hasHousing={this.state.hasHousing} 
                            hasMassHealth={this.state.hasMassHealth}
                            snapAlert={getSnapEligibility(this.state)}
                            housingAlert={getHousingBenefit(this.state)}
                            massHealthAlert={getMassHealthEligibility(this.state)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default VisitPage
