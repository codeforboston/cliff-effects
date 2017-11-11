import React from 'react';
import {
  Header, 
  Segment,
  Card, 
  Icon, 
  Reveal
} from 'semantic-ui-react';

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

const BenefitCard = ({alert, benefit}) => (
      <Card fluid color={alertColor(alert.result)} style={{ minHeight:'150px', marginTop:'10px' }}>
        <Card.Content>
          <AlertIcon alert={alert.result} />
		  <Card.Header>{benefit}</Card.Header>
          <Reveal animated='fade' >        
            <AlertDescription alert={alert.result} benefit={benefit} />                    
            <Reveal.Content hidden as={Card.Description}>
            {alert.details}           
            </Reveal.Content>
          </Reveal>
        </Card.Content>
    </Card>
)
     
const AlertSidebar = (props) => {
  return (
    <Segment padded='very' style={{ minHeight: '100%' }}>
      <Header as='h1'>Warnings and Alerts</Header>
      <Card.Group>
        {props.hasSnap ? <BenefitCard alert={props.snapAlert} benefit='SNAP' /> : ''}
        {props.hasHousing ? <BenefitCard alert={props.housingAlert} benefit='Section 8 Housing' /> : ''}
      </Card.Group>
    </Segment>
  )
};  

export default AlertSidebar;