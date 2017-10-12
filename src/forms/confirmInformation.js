// REACT COMPONENTS
import React from 'react';
import { Header } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './formHelpers';

const ConfirmInformation = (props) => (
		<FormPartsContainer
			title     = 'Confirm Information'
			clarifier = ''
			left      = {{name: 'Previous', func: props.previousStep}}
			right     = {{name: 'Next', func: props.nextStep}}>
			  <div>
				<Header as='span' color='teal'>Current Benefits</Header> 
				{props.pageState.hasSnap ? "SNAP, ": ""}
				{props.pageState.hasHousing ? "Section 8, ": ""}
				{props.pageState.hasMassHealth ? "MassHealth": ""}<br/>
				<Header as='span' color='teal'>Household Size</Header> {props.pageState.householdSize}<br/>
				<Header as='span' color='teal'>Household Annual Income</Header> {props.pageState.annualIncome}<br/>
				<Header as='span' color='teal'>Citizenship Status</Header> {props.pageState.citizenshipStatus == "citizen" ? "US Citizen" : "Resident" }<br/>
				<Header as='span' color='teal'>MassHealth</Header> {props.pageState.hasMassHealth ? "Yes, has qualifying conditions" : "No qualifying conditions"  }
			  </div>
      </FormPartsContainer>
	  )

export { ConfirmInformation };