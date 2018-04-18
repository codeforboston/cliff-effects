// REACT COMPONENTS
import React from 'react';
import {
  Table
} from 'semantic-ui-react';

// CUSTOM COMPONENTS
// Both the table and graph should just be added to a results page, but
// this will do for now

// BENEFIT LOGIC
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/massachusetts/housing';

// OBJECT MANIPULATION
import { cloneDeep } from 'lodash';


const getSignSymbol = function ( num ) {
  if ( num > 0 ) { return '+'; }
  else if ( num < 0 ) { return '-'; }
  else { return ''; }
};  // End getSignSymbol()


const BenefitsTable = function ( props ) {

  var client = cloneDeep( props.client ),
      curr   = client.current;

  var SNAPBenefitCurrent  = curr.hasSnap ? Math.round( getSNAPBenefits( client, 'current' ) ) : 0,
      SNAPBenefitFuture   = curr.hasSnap ? Math.round( getSNAPBenefits( client, 'future' ) ) : 0,
      SNAPDiff            = SNAPBenefitFuture - SNAPBenefitCurrent,
      sec8BenefitCurrent  = curr.hasHousing ? Math.round( getHousingBenefit( client, 'current' ) ) : 0,
      sec8BenefitFuture   = curr.hasHousing ? Math.round( getHousingBenefit( client, 'future' ) ) : 0,
      sec8Diff            = sec8BenefitFuture - sec8BenefitCurrent,
      totalBenefitCurrent = SNAPBenefitCurrent + sec8BenefitCurrent,
      totalBenefitFuture  = SNAPBenefitFuture + sec8BenefitFuture,
      totalDiff           = SNAPDiff + sec8Diff,
      incomeCurrent       = Math.round( curr.earned ),
      incomeFuture        = Math.round( client.future.earned ),
      incomeDiff          = incomeFuture - incomeCurrent,
      netCurrent          = totalBenefitCurrent + incomeCurrent,
      netFuture           = totalBenefitFuture + incomeFuture,
      netDiff             = totalDiff + incomeDiff;

const   columnHeaderStyle = {
                            background: 'rgba(0, 181, 173, 1)',
                            color: 'white',
                            fontSize: '1.3em',
                            fontWeight: 900,
                            textAlign: 'center',
                            borderRadius: 'inherit',
                            letterSpacing: '0.02em',
                            }
      , totalsRowStyle    = {
                            borderTop: "2px solid rgba(0, 181, 173, 1)",
                            fontWeight: 700,
                            fontSize: '1.1em',
                            padingTop: '0.25em'
                              }
      , rowHeaderStyle    = {
                    fontSize: '1.1em',
                    fontWeight: 700,
                    textAlign: 'left'
                    }
      , totalsRowHeaderStyle = {
                    fontSize: '1.2em',
                    fontWeight: 700,
                    textAlign: 'left',
                    borderTop: "2px solid rgba(0, 181, 173, 1)",
                    padingTop: '0.25em'


      };






const SNAPBenefitRow = function( props ){
  if(!client.current.hasSnap ) return (null)
    return (
      <Table.Row>
        <Table.Cell style={rowHeaderStyle}>SNAP</Table.Cell>
        <Table.Cell textAlign='right'>${SNAPBenefitCurrent} / month</Table.Cell>
        <Table.Cell textAlign='right'>${SNAPBenefitFuture} / month</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(SNAPDiff) } ${Math.abs(SNAPDiff)} / month</Table.Cell>
      </Table.Row>
    )
  };

const Sec8BenefitRow  = function( props ){
  if(!client.current.hasHousing) return (null)
    return (
      <Table.Row>
        <Table.Cell style={rowHeaderStyle}>Section 8 Housing</Table.Cell>
        <Table.Cell textAlign='right'>${sec8BenefitCurrent} / month</Table.Cell>
        <Table.Cell textAlign='right'>${sec8BenefitFuture} / month</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(sec8Diff) } ${Math.abs(sec8Diff)} / month</Table.Cell>
      </Table.Row>
    )
};

const TotalBenefitsRow = function( props ){
  if(!client.current.hasSnap || !client.current.hasHousing) return (null)
    return(
      <Table.Row>
        <Table.Cell textAlign='right' width={3} style={totalsRowHeaderStyle}>Total Benefits</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>${totalBenefitCurrent} / month</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>${totalBenefitFuture} / month</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>{ getSignSymbol(totalDiff) } ${Math.abs(totalDiff)} / month</Table.Cell>
      </Table.Row>
    )
};

const IncomeRow = function ( props ) {
    return (
      <Table.Row>
        <Table.Cell style={rowHeaderStyle}>Income</Table.Cell>
        <Table.Cell textAlign='right'>${incomeCurrent} / month</Table.Cell>
        <Table.Cell textAlign='right'>${incomeFuture} / month</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } ${Math.abs(incomeDiff)} / month</Table.Cell>
      </Table.Row>
    )
};

const TotalsRow = function ( props ) {
    return (
      <Table.Row style={{border: 'none'}}>
        <Table.Cell textAlign='right' width={3} style={totalsRowHeaderStyle}>Net Total</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>${netCurrent} / month</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>${netFuture} / month</Table.Cell>
        <Table.Cell textAlign='right' width={3} style={totalsRowStyle}>{ getSignSymbol(netDiff) } ${Math.abs(netDiff)} / month</Table.Cell>
      </Table.Row>
    )
  };

  return (
    <div>
      <Table celled>
       <Table.Header>
          <Table.Row >
            <Table.Cell style={columnHeaderStyle} width={3}>Benefit</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>Current Benefits</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>New Estimate</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>Difference</Table.Cell>
          </Table.Row>
      </Table.Header>
        <Table.Body>
          <SNAPBenefitRow client={client} />
          <Sec8BenefitRow client={client} />
          <TotalBenefitsRow client={client} />
          <IncomeRow />
          <TotalsRow />
        </Table.Body>
      </Table>
    </div>
  )

};  // End BenefitsTable(<>)


export {
	BenefitsTable
};
