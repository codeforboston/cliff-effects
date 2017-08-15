import React, { Component } from 'react';
import { Button, 
        Form, 
        Grid, 
        Header, 
        Segment, 
        Progress, 
        Card, 
        Icon, 
        Checkbox, 
        Divider, 
        Radio, 
        Statistic } from 'semantic-ui-react';
import { Redirect, Prompt } from 'react-router-dom';
import SimpleMenu from './simpleMenu';
import { percentPovertyLevel, percentStateMedianIncome } from './helperFunctions';
import { clientList } from './clientList';

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
          <Card.Description>
              <strong>All Good!</strong> Based on your inputs, your <strong>{benefit}</strong> benefits are safe.
          </Card.Description>
        );
      case 'information':
        return (
          <Card.Description>
              <strong>FYI!</strong> You are in danger of losing your <strong>{benefit}</strong> benefits.
          </Card.Description>
        );
      case 'warning':
        return (
        <Card.Description>
            <strong>Warning!</strong> Based on your inputs, you will lose <strong>{benefit}</strong> benefits!
          </Card.Description>
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
      <Card fluid color={alertColor(props.massHealthAlert)}>
        <Card.Content>
            {alertIcon(props.massHealthAlert)}
            <Card.Header>
              MassHealth
            </Card.Header>
            {alertDescription(props.massHealthAlert,'MassHealth')}
        </Card.Content>                    
      </Card>
    );
  }

  if (props.hasHousing) {
    housingCard = (
      <Card fluid color={alertColor(props.housingAlert)}>
        <Card.Content>
            {alertIcon(props.housingAlert)}
            <Card.Header>
              Section 8 Housing
            </Card.Header>
            {alertDescription(props.housingAlert,'Section 8 Housing')}
        </Card.Content>                    
      </Card>
    )
  }

  if (props.hasSnap) {
    snapCard = (
      <Card fluid color={alertColor(props.snapAlert)}>
        <Card.Content>
            {alertIcon(props.snapAlert)}
            <Card.Header>
              SNAP
            </Card.Header>
            {alertDescription(props.snapAlert,'SNAP')}
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
}

const ProgressBar = (props) => {
  return (
    <div>
      <Progress percent={props.percentDone} indicating progress />
    </div>
  )
}

const Results = (props) => {
  return (      
    <Segment padded='very' style={{ minHeight: '600' }}>
      <Segment style={{ minHeight: '500' }} basic={true}>
        <Header as='h1' color='teal' textAlign='center'>
          Results
        </Header>
        <div>
        </div>
      </Segment>
      <Divider />
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.previousStep()}>Go Back</Button>
            </Grid.Column>
            <Grid.Column width={10}/>
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.saveForm(false)}>Save Results</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Segment>
  )
}

const CurrentBenefitsStep = (props) => {
  return (      
    <Form size='massive'>
      <Segment padded='very' style={{ minHeight: '600' }}>
        <Segment style={{ minHeight: '500' }} basic={true}>
        <Header as='h1' color='teal' textAlign='center'>
          Current Benefits
        </Header>
        <Header as='h3' textAlign='center'>
          Select the benefits you currently receive.
        </Header>
        <br/>
        <Form.Field
          name='hasSnap'
          checked={props.pageState.hasSnap}
          onChange={props.handleChange}
          control={Checkbox}
          label={{ children: props.pageState.hasSnap ? <strong>SNAP</strong> : 'SNAP' }}
          size='massive'
          toggle      
        />
        <br/>
        <Form.Field
          name='hasHousing'
          checked={props.pageState.hasHousing}
          onChange={props.handleChange}
          control={Checkbox}
          label={{ children: props.pageState.hasHousing ? <strong>Section 8 Housing</strong> : 'Section 8 Housing' }}
          toggle
        />
        <br/>
        <Form.Field
          name='hasMassHealth'
          checked={props.pageState.hasMassHealth}
          onChange={props.handleChange}
          control={Checkbox}
          label={{ children: props.pageState.hasMassHealth ? <strong>MassHealth</strong> : 'MassHealth' }}
          toggle
        />
        </Segment>
        <Divider />
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width={13}>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.nextStep()}>Next</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  )
}

const HouseholdSizeStep = (props) => {
  return (      
    <Form>
      <Segment padded='very' style={{ minHeight: '600' }}>
        <Segment style={{ minHeight: '500' }} basic={true}>
          <Header as='h1' color='teal' textAlign='center'>
            Household Size
          </Header>
          <Header as='h3' textAlign='center'>
            Select the number of people in your household including yourself.
          </Header>
            {[1,2,3,4,5,6,7,8].map(size =>
              (<Form.Field>
                <Radio
                  label={size}
                  name='householdSize'
                  value={size}
                  checked={props.pageState.householdSize === size}
                  onChange={props.handleChange}
                />
              </Form.Field>)
            )}        
        </Segment>
        <Divider />
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.previousStep()}>Previous</Button>
            </Grid.Column>
            <Grid.Column width={10} />
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.nextStep()}>Next</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  )
}

const IncomeStep = (props) => {
  return (
      <Form>
        <Segment padded='very' style={{ minHeight: '600' }}>
          <Segment style={{ minHeight: '500' }} basic={true}>
            <Header as='h1' color='teal' textAlign='center'>
              Household Annual Income
            </Header>
            <Header as='h3' textAlign='center'>
              How much money does your household earn every year before taxes?
            </Header>
            <Form.Input label='Annual Income' placeholder='Annual Income' name='annualIncome' onChange={props.handleChange} type='number' />
            <br/>
            <br/>
            <div>
              <Header as='h4' textAlign='center'>
                FOR A HOUSEHOLD SIZE OF <strong>{props.pageState.householdSize}</strong>:
              </Header>
              <Statistic>
                <Statistic.Label>% of Federal Poverty Level</Statistic.Label>
                <Statistic.Value>{Math.round(percentPovertyLevel(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>% of State Median Income</Statistic.Label>
                <Statistic.Value>{Math.round(percentStateMedianIncome(props.pageState.annualIncome,props.pageState.householdSize))}%</Statistic.Value>
              </Statistic>
            </div>
          </Segment>
          <Divider />
          <Grid
            textAlign='center'
            verticalAlign='middle'
          >
            <Grid.Row>
              <Grid.Column width={3}>
                <Button color='teal' fluid size='large' onClick={() => props.previousStep()}>Previous</Button>
              </Grid.Column>
              <Grid.Column width={10} />
              <Grid.Column width={3}>
                <Button color='teal' fluid size='large' onClick={() => props.nextStep()}>Next</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
  )
}

const CitizenshipStep = (props) => {
  return (      
    <Form>
      <Segment padded='very' style={{ minHeight: '600' }}>
        <Segment style={{ minHeight: '500' }} basic={true}>
          <Header as='h1' color='teal' textAlign='center'>
            Citizenship Status
          </Header>
          <Header as='h3' textAlign='center'>
            Select your citizenship status.
          </Header>
            <br/>
            <Form.Field>
              <Radio
                label='US Citizen / National'
                name='citizenshipStatus'
                value='citizen'
                checked={props.pageState.citizenshipStatus === 'citizen'}
                onChange={props.handleChange}
              />
            </Form.Field>
            <br/>
            <Form.Field>
              <Radio
                label='Lawfully present immigrant / AWSS'
                name='citizenshipStatus'
                value='immigrant'
                checked={props.pageState.citizenshipStatus === 'immigrant'}
                onChange={props.handleChange}
              />
            </Form.Field>
            <br/>
            <Form.Field>
              <Radio
                label="Don't Know"
                name='citizenshipStatus'
                value='unknown'
                checked={props.pageState.citizenshipStatus === 'unknown'}
                onChange={props.handleChange}
              />
            </Form.Field>     
        </Segment>
        <Divider />
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.previousStep()}>Previous</Button>
            </Grid.Column>
            <Grid.Column width={10} />
            <Grid.Column width={3}>
              <Button color='teal' fluid size='large' onClick={() => props.nextStep()}>Next</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  )
}

const HealthStep = (props) => {
  return (        
      <Form>
        <Segment padded='very' style={{ minHeight: '600' }}>
          <Segment style={{ minHeight: '500' }} basic={true}>
            <Header as='h1' color='teal' textAlign='center'>
              MassHealth Qualifying Conditions
            </Header>
            <Header as='h3' textAlign='center'>
              Do you have any of the following MassHealth qualifying conditions?
            </Header>
            <Form.Field
              name='qualifyingConditions'
              checked={props.pageState.qualifyingConditions}
              onChange={props.handleChange}
              control={Checkbox}
              label={props.pageState.qualifyingConditions ? { children: 'Yes'} : {children: 'No'}}
              size='massive'
              toggle      
            />
            <br/>
            <Segment.Group>
              <Segment>Pregnant</Segment>
              <Segment>HIV+</Segment>
              <Segment>Disabled</Segment>
              <Segment>Woman with breast or cervical cancer</Segment>
            </Segment.Group>
          </Segment>
          <Divider />
          <Grid
            textAlign='center'
            verticalAlign='middle'
          >
            <Grid.Row>
              <Grid.Column width={3}>
                <Button color='teal' fluid size='large' onClick={() => props.previousStep()}>Previous</Button>
              </Grid.Column>
              <Grid.Column width={10} />
              <Grid.Column width={3}>
                <Button color='teal' fluid size='large' onClick={() => props.nextStep()}>Next</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
  )
}

class VisitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {currentStep: 1,
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
        clientInfo: clientList.filter(client => client.id == this.props.match.params.clientId)[0],
        visitId: this.props.match.params.visitId}
  }

  static totalSteps = () => 5;

  handleToggleChange = (e, { name, checked }) => this.setState({ [name]: checked })
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  saveForm = (exitAfterSave) => {
    alert('Form saved (not really, this is a placeholder).');
    if (exitAfterSave) {
      this.setState({isBlocking: false, redirect: true});
    } else {
      this.setState({isBlocking: false});
    }
  }

  getCurrentStep = () => {
    switch (this.state.currentStep) {
      case 1:
        return (<CurrentBenefitsStep currentStep={this.state.currentStep} 
                                      nextStep={this.nextStep} 
                                      previousStep={this.previousStep} 
                                      handleChange={this.handleToggleChange} 
                                      pageState={this.state}/>);
      case 2:
        return (<HouseholdSizeStep currentStep={this.state.currentStep} 
                                    nextStep={this.nextStep} 
                                    previousStep={this.previousStep}
                                    handleChange={this.handleChange} 
                                    pageState={this.state}/>);
      case 3:
        return (<IncomeStep currentStep={this.state.currentStep} 
                            nextStep={this.nextStep} 
                            previousStep={this.previousStep}
                            handleChange={this.handleChange} 
                            pageState={this.state}/>);
      case 4:
        return (<CitizenshipStep currentStep={this.state.currentStep} 
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            handleChange={this.handleChange} 
                            pageState={this.state}/>);
      case 5:
        return (<HealthStep currentStep={this.state.currentStep} 
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                            handleChange={this.handleToggleChange} 
                            pageState={this.state}/>);
      case 6:
        return (<Results currentStep={this.state.currentStep} 
                          previousStep={this.previousStep}
                          pageState={this.state}
                          saveForm={this.saveForm}/>);
      default:
        return (<HouseholdSizeStep currentStep={this.state.currentStep} 
                                    nextStep={this.nextStep} 
                                    previousStep={this.previousStep}
                                    handleChange={this.handleChange} 
                                    pageState={this.pageState}/>);
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

  render() {
      
    return (
      <div className='login-form'>
        <Prompt
          when={this.state.isBlocking}
          message='Are you sure you want to leave the page with unsaved changes?'
        />
        {this.state.redirect ? (<Redirect to={`/detail/${this.state.clientInfo.id}`}/>) : false}
        <SimpleMenu save={this.saveForm} client={this.state.clientInfo} visit={this.state.visitId} />
        <br/>
        <ProgressBar style={{ display: 'block'}} percentDone={Math.round(((this.state.currentStep - 1) / VisitPage.totalSteps())*100)} />
        <br/>
        <Grid
          textAlign='center'
          style={{ height: '100%', padding: '2em 2em' }}
          verticalAlign='middle'
        >
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
                            snapAlert={this.state.snapAlert}
                            housingAlert={this.state.housingAlert}
                            massHealthAlert={this.state.massHealthAlert} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default VisitPage
