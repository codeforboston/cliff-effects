import _ from 'lodash'
import React, { Component } from 'react';
import { Button, 
        Form, 
        Grid, 
        Header, 
        Segment,
        Step, 
        Card, 
        Icon, 
        Checkbox, 
        Divider, 
        Radio, 
        Statistic,
        Reveal } from 'semantic-ui-react';
import { Redirect, Prompt } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
 
// Utilities
import { merge } from './helpers/object-manipulation.js'

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
import { FormPartsContainer } from './forms/formHelpers';
import { PreviousIncomeStep } from './forms/previousIncome';
import { CurrentIncomeStep } from './forms/currentIncome';
import { PreviousExpensesStep } from './forms/previousExpenses';
import { HealthStep } from './forms/health';
import { CitizenshipStep } from './forms/citizenship';
import { HouseholdSizeStep } from './forms/household-size';
import { CurrentBenefitsStep } from './forms/current-benefits';

const StepBar = (props) => {
  let steps = props.steps;

  props.completedSteps.forEach(function(element) {
    steps[element].completed = true
  }, this);

  steps[props.currentStep-1].active = true

  return(
    <Step.Group size='mini' ordered items={steps} />
  )
}

const AlertSidebar = (props) => {
  let massHealthCard = null;
  let snapCard = null;
  let housingCard = null;

  let alertIcon = (alert) => {
    switch (alert) {
      case 'good':
        return(<Icon name='thumbs up' size='huge' color='green' />);
      case 'information':
        return(<Icon name='info circle' size='huge' color='orange' />);
      case 'warning':
        return(<Icon name='warning sign' size='huge' color='red' />);
      default:
        break;
    }
  }

  let alertDescription = (alert, benefit) => {
    switch (alert) {
      case 'good':
        return (
          <Reveal.Content visible as={Card.Description} style={{ backgroundColor: '#ffffff' }} >
            <strong>All Good!</strong> Based on your inputs, your <strong>{benefit}</strong> benefits are safe.
          </Reveal.Content>
        );
      case 'information':
        return (
          <Reveal.Content visible as={Card.Description} style={{ backgroundColor: '#ffffff' }} >
            <strong>FYI!</strong> You are in danger of losing your <strong>{benefit}</strong> benefits.
          </Reveal.Content>
        );
      case 'warning':
        return (
          <Reveal.Content visible as={Card.Description} style={{ backgroundColor: '#ffffff' }} >
            <strong>Warning!</strong> Based on your inputs, you will lose <strong>{benefit}</strong> benefits!
          </Reveal.Content>
        );
      default:
        break;
    }
  }

  let alertColor = (alert) => {
    switch (alert) {
      case 'good':
        return 'green';
      case 'information':
        return 'orange';
      case 'warning':
        return 'red';
      default:
        break;
    }
  }

  if (props.hasMassHealth) {
    massHealthCard = (
      <Card fluid color={alertColor(props.massHealthAlert.result)} style={{ minHeight:'150px', marginTop:'10px' }}>
        <Card.Content>
          {alertIcon(props.massHealthAlert.result)}
          <Card.Header>
            MassHealth
          </Card.Header>
          <Reveal animated='fade' >        
            {alertDescription(props.massHealthAlert.result,'MassHealth')}                    
            <Reveal.Content hidden as={Card.Description}>
            {props.massHealthAlert.details}           
            </Reveal.Content>
          </Reveal>
        </Card.Content>
    </Card>      
    )
  }
  /** @todo 'hasHousing' really means 'has housing voucher'. Change name for clarity? */
  if (props.hasHousing) {
    housingCard = (
      <Card fluid color={alertColor(props.housingAlert.result)} style={{ minHeight:'150px', marginTop:'10px' }}>
        <Card.Content>
          {alertIcon(props.housingAlert.result)}
          <Card.Header>
            Section 8 Housing
          </Card.Header>
          <Reveal animated='fade' >        
              {alertDescription(props.housingAlert.result,'Section 8 Housing')}                   
            <Reveal.Content hidden as={Card.Description}>
                {props.housingAlert.details}              
            </Reveal.Content>
          </Reveal>
        </Card.Content>
      </Card>     
    )
  }

  if (props.hasSnap) {
    snapCard = (
      <Card fluid color={alertColor(props.snapAlert.result)} style={{ minHeight:'150px', marginTop:'10px' }}>
        <Card.Content>
          {alertIcon(props.snapAlert.result)}
          <Card.Header>
            SNAP
          </Card.Header>
          <Reveal animated='fade' >        
            {alertDescription(props.snapAlert.result,'SNAP')}                   
            <Reveal.Content hidden as={Card.Description}>
              {props.snapAlert.details}            
            </Reveal.Content>
          </Reveal>
        </Card.Content>
      </Card>     
    )
  }

  return (
    <Segment padded='very'  style={{ minHeight: '700' }}>
      <Header as='h1'>Warnings and Alerts</Header>
      <Card.Group>
        {snapCard}
        {housingCard}
        {massHealthCard}
      </Card.Group>
    </Segment>
  )
};  // End AlertSidebar()

const Results = (props) => {
  var xRange = _.range(0, 100000, 1000);
  /** Need a new object so client's data doesn't get changed. */
  var fakeClient = {};
  merge( fakeClient, props.pageState );

  var massHealthData = xRange.map(x => {
      fakeClient.annualIncome = x;
      return getMassHealthEligibility(fakeClient).benefitValue});
    
  var snapData = xRange.map(x => {
      fakeClient.annualIncome = x;
      return getSnapEligibility(fakeClient).benefitValue});

  /** Section-8 Housing Choice Voucher */
  /** @todo Base this rent on FMR areas and client area of residence if no rent available. */
  fakeClient.previousContractRentMonthly = 700;
  fakeClient.previousEarnedIncomeMonthly = 0;
  var housingData = xRange.map(function ( annualIncome ) {
    // New renting data
    var oldRentShare = fakeClient[ 'previousRentShareMonthly' ];
    fakeClient.currentEarnedIncomeMonthly = annualIncome/12;

    var result  = getHousingBenefit(fakeClient),
        subsidy = result.benefitValue * 12;

    // Prep for next loop
    var newShare = result.data.newRentShare
    fakeClient[ 'previousRentShareMonthly' ] = newShare;
    fakeClient.previousEarnedIncomeMonthly   = annualIncome/12;

    return subsidy;
  });

  var data = {
    labels: xRange,
    datasets: [{
        label: "MassHealth",
        borderColor: "rgba(206, 125, 61, 1)",
        data: massHealthData,
        fill: false,
    },
    {
      label: "SNAP",
      borderColor: "rgba(101, 47, 138, 1)",
      data: snapData, //xRange.map(x => ({ annualIncome: x, householdSize: props.pageState.householdSize }).benefitValue),
      fill: false
    },
    {
      label: "Section 8 Housing",
      borderColor: "rgba(206, 203, 61, 1)",
      data: housingData, //xRange.map(x => getHousingBenefit({ annualIncome: x, householdSize: props.pageState.householdSize }).benefitValue),
      fill: false
    },
    ]};

  var options = {
    title: {
      display: true,
        text: 'Benefit Eligibility for Household Size ' + 
                props.pageState.householdSize
    },
    showLines: true,
    scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
              labelString: 'Benefit Value ($)'
          },
          ticks: {
              beginAtZero: true,
              /*
               * function to add $ and 1,000s separators to graph axes
               * we are using chart.js v2.7 so it requires a callback function
               */
              callback: function(label) {
                  return label.toLocaleString("en-US");
              }
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
              labelString: 'Annual Income ($)'
          },
            ticks: {
              callback: function(label) {
                  return label.toLocaleString("en-US");
              }
            }
        }]
    },
      /*        
       * default tooltip for chart.js 2.0+  when unspecified looks like:
       *
       * options: {
       *   tooltips: {
       *       callbacks: {
       *           label: function(tooltipItem, data) {
       *               return tooltipItem.yLabel;
       *           }
       *       }
       *   }
       * }
       *
       */
    tooltips: {
        callbacks: {
            // format the title of the tooltips to be in USD
            title: function(tooltipItems, data) {
                return data.labels[tooltipItems[0].index].toLocaleString("en-US",
                    {style:"currency",currency:"USD"}).replace('.00','');
            },
            /*
             * to add number formatting to the tooltips. returns the data label 
             * + currency format 
             * from https://github.com/chartjs/Chart.js/issues/2386
             */
            label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ": " + 
                    tooltipItem.yLabel.toLocaleString("en-US",{style:"currency", 
                        currency:"USD"}).replace('.00','');
            }
        }
    }
  };

  // return (
  //   <wrapper className = 'result-page'>
  //     <FormPartsContainer
  //       title     = {'Results'}
  //       left      = {{ name: 'Go Back', func: props.previousStep }}
  //       right     = {{ name: 'Save Results', func: () => props.saveForm(false) }}
  //        <div> <Line data={data} options={options} /> </div>
  //     </FormPartsContainer>
  //   </wrapper>
  // )

  // Non-saving version for first prototype testing
  return (
    <wrapper className = 'result-page'>
      <FormPartsContainer
        title     = {'Results'}
        left      = {{ name: 'Go Back', func: props.previousStep }}
      >
         <div> <Line data={data} options={options} /> </div>
      </FormPartsContainer>
    </wrapper>
  )

};  // End Results()


class VisitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentStep: 1,
        completedSteps: [],
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
        clientInfo: clientList.filter(client => client.clientId == this.props.match.params.clientId)[0],
        visitId: this.props.match.params.visitId
    };  // end this.state {}

    this.steps = [
      { completed: false, active: false, title: 'Current Benefits', form: CurrentBenefitsStep, /*description: 'Choose your shipping options' (what does this mean?)*/ },
      { completed: false, active: false, title: 'Household Size', form: HouseholdSizeStep },
      { completed: false, active: false, title: 'Previous Income', form: PreviousIncomeStep },
      { completed: false, active: false, title: 'Previous Expenses', form: PreviousExpensesStep },
      { completed: false, active: false, title: 'Current Income', form: CurrentIncomeStep },
      { completed: false, active: false, title: 'Citizenship', form: CitizenshipStep },
      { completed: false, active: false, title: 'MassHealth', form: HealthStep },
      // { completed: false, active: false, title: 'SNAP', form: SNAPStep },
      // { completed: false, active: false, title: 'Housing', form: HousingStep },
      { completed: false, active: false, title: 'Results', form: Results }
    ];  // end this.steps {}

    this.stepProps = {
      currentStep:  this.state.currentStep,
      nextStep:     this.nextStep,
      previousStep: this.previousStep,
      storeComplex: this.storeComplex, // Maybe put these straight on state
      storeChecked: this.storeChecked, // Maybe put these straight on state
      saveForm:     this.saveForm,
      pageState:    this.state
    };

  };  // End constructor()

  updateProps () {
    this.stepProps.currentStep = this.state.currentStep;
    this.stepProps.pageState   = this.state;
  }

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

    // Apparently, the reference to the `this` created in `constructor()`
    // doesn't stay. `this` becomes something new. Which is crazy.
    this.updateProps();

    // keep it between 1 and 8
    var step = this.state.currentStep = Math.max( 1, Math.min( 8, this.state.currentStep ));
    step -= 1;  // convert to 0 index
    var FormSection = this.steps[ step ].form;

    return ( <FormSection { ...this.stepProps } /> );

  };  // End getCurrentStep()

  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
      completedSteps: _.range(prevState.currentStep)
    }));
  };

  previousStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep - 1,
      completedSteps: _.range(prevState.currentStep-2)
    }));
  };

  render() {

    // Why are we resetting these values each time? Especially `.completed`
    const steps = this.steps;
    for ( let stepi = 0; stepi < steps.length; stepi++ ) {
      let step = steps[ stepi ];
      step.completed = false;
      step.active = false;
    }

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
              <StepBar currentStep={this.state.currentStep} steps={steps} completedSteps={this.state.completedSteps} />
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
