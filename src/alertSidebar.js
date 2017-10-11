import React from 'react';
import { Header, 
        Segment,
        Card, 
        Icon, 
        Reveal } from 'semantic-ui-react';

let alertColor = (alert) => {
    let alertColors = {
		'good': 'green',
		'information': 'orange',
		'warning': 'red'
    }
	
	return alertColors[alert] || '';
}

const AlertIcon = ({alert}) => {
	let icons = {
	  'good': 'thumbs up',
      'information': 'info circle',
	  'warning': 'warning sign'
	}

	return <Icon name={icons[alert] || ''} size='huge' color={alertColor(alert)} />
 }
 
const AlertDescription = ({alert, benefit}) => {
	let alertMessages = {
		'good':  (<span><strong>All Good!</strong> Based on your inputs, your <strong>{benefit}</strong> benefits are safe.</span>),
        'information': (<span><strong>FYI!</strong> You are in danger of losing your <strong>{benefit}</strong> benefits.</span>),
	    'warning': (<span><strong>Warning!</strong> Based on your inputs, you will lose <strong>{benefit}</strong> benefits!</span>)
	}

	return (
		<Reveal.Content visible as={Card.Description} style={{ backgroundColor: '#ffffff' }} >
			{alertMessages[alert]}
		</Reveal.Content>
	);
}


const AlertSidebar = (props) => {
  let massHealthCard = null;
  let snapCard = null;
  let housingCard = null;

  if (props.hasMassHealth) {
    massHealthCard = (
      <Card fluid color={alertColor(props.massHealthAlert.result)} style={{ minHeight:'150px', marginTop:'10px' }}>
        <Card.Content>
          <AlertIcon alert={props.massHealthAlert.result} />
          <Card.Header>
            MassHealth
          </Card.Header>
          <Reveal animated='fade' >        
            <AlertDescription alert={props.massHealthAlert.result} benefit={'MassHealth'} />                    
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
          <AlertIcon alert={props.housingAlert.result} />
          <Card.Header>
            Section 8 Housing
          </Card.Header>
          <Reveal animated='fade' >        
              <AlertDescription alert={props.housingAlert.result} benefit={'Section 8 Housing'} />                   
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
          <AlertIcon alert={props.snapAlert.result} />
          <Card.Header>
            SNAP
          </Card.Header>
          <Reveal animated='fade' >        
            <AlertDescription alert={props.snapAlert.result} benefit={'SNAP'} />                   
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
};  

export default AlertSidebar;