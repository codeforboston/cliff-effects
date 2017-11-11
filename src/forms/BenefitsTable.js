// REACT COMPONENTS
import React from 'react';
import {
  Table,
  Header
} from 'semantic-ui-react';

// CUSTOM COMPONENTS
// Both the table and graph should just be added to a results page, but
// this will do for now
import ResultsGraph from '../resultsGraph';

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






const totalsRowStyle = {
  borderTop: "2px solid teal"
}


const columnHeaderStyle = {
  background: 'teal',
  color: 'white',
  fontSize: '1.2em',
  fontStyle: 'bolder',
  borderRadius:'0.25'
}

const rowHeaderStyle = {
    fontSize: '1.2em',
    fontStyle: 'bold',
    textAlign: 'left'
}

const basicCellStyle = {
}


const Cell = function(props){
    let styleCheck = {extensible: true};

    if (typeof props.value === 'string'){
     styleCheck = Object.assign(styleCheck, rowHeaderStyle);
    }
    if (props.style === totalsRowStyle){
      styleCheck = Object.assign(styleCheck, totalsRowStyle);
    }

    if (props.style === columnHeaderStyle){
      styleCheck = Object.assign(styleCheck, columnHeaderStyle);

    }


  return (
    <Table.Cell width={3} style={styleCheck}> {props.value} </Table.Cell>
  );
}


const Row = function(props) {
  const numbers = props.numbers;
  const cell = numbers.map((D) =>
    <Cell key={D.index}
        value={D}
        style={props.style}
        type={props.type}/>
  );
  return (
    <Table.Row textAlign='center'>
      {cell}
    </Table.Row>
  );
}

const numbers = ['Benefit', 'Current Benefits', 'New Estimate', 'Difference'];
const numbers1 = ['SNAP', SNAPBenefitCurrent, SNAPBenefitFuture, Math.abs(SNAPDiff)];
const numbers2 = ['Section 8 Housing', sec8BenefitCurrent, sec8BenefitFuture, Math.abs(sec8Diff)];
const numbers3 = ['Total Benefits', totalBenefitCurrent, totalBenefitFuture, Math.abs(totalDiff)];
const numbers4 = ['Income', incomeCurrent, incomeFuture, Math.abs(incomeDiff)];
const numbers5 = ['Net Total', netCurrent, netFuture, Math.abs(netDiff)];


  return (
    <wrapper>


      <Table celled>
        <Table.Body>
            <Row numbers={numbers} style={columnHeaderStyle}/>
            <Row numbers={numbers1} />
            <Row numbers={numbers2} />
            <Row numbers={numbers3} style={totalsRowStyle}/>
            <Row numbers={numbers4} />
            <Row numbers={numbers5} style={totalsRowStyle}/>
        </Table.Body>
      </Table>

{/*
      <Table celled>
      <Table.Body>
       <Table.Header>  Removed for formatting purposes temporarily}
          <Table.Row textAlign='center' style={columnHeaderStyle}>
            <Table.Cell width={3}>Benefit</Table.Cell>
            <Table.Cell width={3}>Current Benefits</Table.Cell>
            <Table.Cell width={3}>New Estimate</Table.Cell>
            <Table.Cell width={3}>Difference</Table.Cell>
        </Table.Row>
        </Table.Header>
      </Table.Body>
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
            <Table.Row>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='left'><Header as='h4'>Total Benefits</Header></Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>${totalBenefitCurrent} / year</Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>${totalBenefitFuture} / year</Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>{ getSignSymbol(totalDiff) } ${Math.abs(totalDiff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='left'><Header as='h4'>Income</Header></Table.Cell>
              <Table.Cell textAlign='right'>${incomeCurrent} / year</Table.Cell>
              <Table.Cell textAlign='right'>${incomeFuture} / year</Table.Cell>
              <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } ${Math.abs(incomeDiff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row style={{border: 'none'}}>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='left'><Header as='h4'>Net Total</Header></Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>${netCurrent} / year</Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>${netFuture} / year</Table.Cell>
              <Table.Cell width={3} style={rowHeaderStyle} textAlign='right'>{ getSignSymbol(netDiff) } ${Math.abs(netDiff)} / year</Table.Cell>
            </Table.Row>
        </Table.Body>

      </Table>
    )*/}

      <br/>
      <br/>

      <ResultsGraph {...props}/>
    </wrapper>
  );

};  // End BenefitsTable(<>)


export {
	BenefitsTable
};
