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



const cellStyle = function(entry) {

  const   basicCellStyle    = {textAlign: 'right'}
        , columnHeaderStyle = {background: 'rgba(0, 128, 128, 1)',
                              color: 'white',
                              fontSize: '1.3em',
                              fontWeight: 900,
                              textAlign: 'center',
                              borderRadius: 'inherit',
                              letterSpacing: '0.02em'
                              }
        , rowHeaderStyle    = {fontSize: '1.2em',
                              fontWeight: 700,
                              textAlign: 'left'}
        , totalsRowStyle    = {borderTop: "2px solid rgba(0, 128, 128, 1)"};


    switch(entry) {
        case 'basicCellStyle': 
          return basicCellStyle; 
        case 'columnHeaderStyle':
          return columnHeaderStyle; 
        case 'rowHeaderStyle' :
          return  Object.assign(basicCellStyle, rowHeaderStyle);
        case 'totalsRowStyle':
          return {function(){
                    Object.assign(basicCellStyle, totalsRowStyle);
                    }
                  };
        default: 
          return basicCellStyle;
                  }
  };


const Cell = function(props) {

  return (
    <Table.Cell width={3} style={cellStyle(props.style)}> {props.value} </Table.Cell>
  );
};



const Row = function(props) {
  const numbers = props.numbers;
  const cell = numbers.map((D) =>
    <Cell key={D.index}
        value={D} />
  );

  return (
    <Table.Row>
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


      <Table celled borderRadius='0.25em 0.25em 0 0'>
        <Table.Body >
            <Row numbers={numbers} />
            <Row numbers={numbers1} />
            <Row numbers={numbers2} />
            <Row numbers={numbers3} />
            <Row numbers={numbers4} />
            <Row numbers={numbers5} />
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
