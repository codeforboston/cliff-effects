// REACT COMPONENTS
import React from 'react';
import {
  Table,
  Header
} from 'semantic-ui-react';

// CUSTOM COMPONENTS
// Both the table and graph should just be added to a results page, but
// this will do for now
import ResultsGraph from '../ResultsGraph';

// BENEFIT LOGIC
import { getSNAPBenefits } from '../programs/state/massachusetts/snap';
import { getHousingBenefit } from '../programs/state/massachusetts/housing';


const getSignSymbol = function ( num ) {
  if ( num > 0 ) { return '+'; }
  else if ( num < 0 ) { return '-'; }
  else { return ''; }
};  // End getSignSymbol()


const BenefitsTable = function ( props ) {

  var client        = props.client,
      currentClient = { ...client };
  currentClient.futureEarnedIncomeMonthly = currentClient.currentEarnedIncomeMonthly;

  var SNAPBenefitCurrent  = Math.round( getSNAPBenefits( currentClient ).benefitValue * 12 ),
      SNAPBenefitFuture   = Math.round( getSNAPBenefits( client ).benefitValue * 12 ),
      SNAPDiff            = SNAPBenefitFuture - SNAPBenefitCurrent,
      sec8BenefitCurrent  = Math.round( getHousingBenefit( currentClient ).benefitValue * 12 ),
      sec8BenefitFuture   = Math.round( getHousingBenefit( client ).benefitValue * 12 ),
      sec8Diff            = sec8BenefitFuture - sec8BenefitCurrent,
      totalBenefitCurrent = SNAPBenefitCurrent + sec8BenefitCurrent,
      totalBenefitFuture  = SNAPBenefitFuture + sec8BenefitFuture,
      totalDiff           = SNAPDiff + sec8Diff,
      incomeCurrent       = Math.round( client.currentEarnedIncomeMonthly * 12 ),
      incomeFuture        = Math.round( client.futureEarnedIncomeMonthly * 12 ),
      incomeDiff          = incomeFuture - incomeCurrent,
      netCurrent          = totalBenefitCurrent + incomeCurrent,
      netFuture           = totalBenefitFuture + incomeFuture,
      netDiff             = totalDiff + incomeDiff;

console.log(SNAPDiff);

  return (
    <wrapper>
      <Table celled color='black'>

        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell width={3}>Program</Table.HeaderCell>
            <Table.HeaderCell width={3}>Current Benefits</Table.HeaderCell>
            <Table.HeaderCell width={3}>New Estimate</Table.HeaderCell>
            <Table.HeaderCell width={3}>Difference</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign='left'><Header as='h4'>SNAP</Header></Table.Cell>
            <Table.Cell textAlign='right'>${SNAPBenefitCurrent} / year</Table.Cell>
            <Table.Cell textAlign='right'>${SNAPBenefitFuture} / year</Table.Cell>
            <Table.Cell textAlign='right'>{ getSignSymbol(SNAPDiff) } ${Math.abs(SNAPDiff)} / year</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='left'><Header as='h4'>Section 8 Housing</Header></Table.Cell>
            <Table.Cell textAlign='right'>${sec8BenefitCurrent} / year</Table.Cell>
            <Table.Cell textAlign='right'>${sec8BenefitFuture} / year</Table.Cell>
            <Table.Cell textAlign='right'>{ getSignSymbol(sec8Diff) } ${Math.abs(sec8Diff)} / year</Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table>

      <Table celled color='black'>

        <Table.Body>
          <Table.Row>
            <Table.Cell width={3} textAlign='left'><Header as='h4'>Total Benefits</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>${totalBenefitCurrent} / year</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>${totalBenefitFuture} / year</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>{ getSignSymbol(totalDiff) } ${Math.abs(totalDiff)} / year</Header></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='left'>Income</Table.Cell>
            <Table.Cell textAlign='right'>${incomeCurrent} / year</Table.Cell>
            <Table.Cell textAlign='right'>${incomeFuture} / year</Table.Cell>
            <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } ${Math.abs(incomeDiff)} / year</Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table>

      <Table celled color='black'>

        <Table.Body>
          <Table.Row>
            <Table.Cell width={3} textAlign='left'><Header as='h4'>Net Total</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>${netCurrent} / year</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>${netFuture} / year</Header></Table.Cell>
            <Table.Cell width={3} textAlign='right'><Header as='h4'>{ getSignSymbol(netDiff) } ${Math.abs(netDiff)} / year</Header></Table.Cell>
          </Table.Row>
        </Table.Body>

      </Table>

      <br/>
      <br/>

      <ResultsGraph {...props}/>
    </wrapper>
  );

};  // End BenefitsTable(<>)


export {
	BenefitsTable
};
