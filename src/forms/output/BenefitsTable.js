// REACT COMPONENTS
import React from 'react';
import { Table } from 'semantic-ui-react';

// CUSTOM COMPONENTS
// Both the table and graph should just be added to a results page, but
// this will do for now

// BENEFIT LOGIC
import { getSNAPBenefits } from '../../programs/federal/snap';
import { getSection8Benefit } from '../../programs/massachusetts/section8';

// OBJECT MANIPULATION
import { cloneDeep } from 'lodash';


const getSignSymbol = function (num) {
  if (num > 0) {
    return '+';
  }
  else if (num < 0) {
    return '-';
  }
  else { return ''; }
};  // End getSignSymbol()


const BenefitsTable = function ({ client, snippets }) {

  var clone = cloneDeep(client);
  var curr = clone.current;

  var sec8BenefitCurrent = 0,
      sec8BenefitFuture  = 0,
      SNAPBenefitCurrent = 0,
      SNAPBenefitFuture  = 0;

  if (curr.hasSection8) {
    sec8BenefitCurrent     = Math.round(getSection8Benefit(clone, 'current'));
    sec8BenefitFuture      = Math.round(getSection8Benefit(clone, 'future'));
    // Mutate clone for correct SNAP values
    clone.future.rentShare = (clone.future.contractRent - sec8BenefitFuture);
  }

  if (curr.hasSnap) {
    SNAPBenefitCurrent = Math.round(getSNAPBenefits(clone, 'current'));
    SNAPBenefitFuture  = Math.round(getSNAPBenefits(clone, 'future'));
  }

  var SNAPDiff            = SNAPBenefitFuture - SNAPBenefitCurrent,
      sec8Diff            = sec8BenefitFuture - sec8BenefitCurrent,
      totalBenefitCurrent = SNAPBenefitCurrent + sec8BenefitCurrent,
      totalBenefitFuture  = SNAPBenefitFuture + sec8BenefitFuture,
      totalDiff           = SNAPDiff + sec8Diff,
      incomeCurrent       = Math.round(curr.earned),
      incomeFuture        = Math.round(clone.future.earned),
      incomeDiff          = incomeFuture - incomeCurrent,
      netCurrent          = totalBenefitCurrent + incomeCurrent,
      netFuture           = totalBenefitFuture + incomeFuture,
      netDiff             = totalDiff + incomeDiff;

  /** @todo: linting - discuss indentation for object properties and colons */
  const columnHeaderStyle = {
          background:    'rgba(0, 181, 173, 1)',
          color:         'white',
          fontSize:      '1.3em',
          fontWeight:    900,
          textAlign:     'center',
          borderRadius:  'inherit',
          letterSpacing: '0.02em',
        }
        , totalsRowStyle    = {
          borderTop:  '2px solid rgba(0, 181, 173, 1)',
          fontWeight: 700,
          fontSize:   '1.1em',
          padingTop:  '0.25em',
        }
        , rowHeaderStyle    = {
          fontSize:   '1.1em',
          fontWeight: 700,
          textAlign:  'left',
        }
        , totalsRowHeaderStyle = {
          fontSize:   '1.2em',
          fontWeight: 700,
          textAlign:  'left',
          borderTop:  '2px solid rgba(0, 181, 173, 1)',
          padingTop:  '0.25em',


        };


  const SNAPBenefitRow = function({ client, snippets }){

    if (!client.current.hasSnap) {
      return (null);
    }

    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.rowSNAP_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{SNAPBenefitCurrent} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{SNAPBenefitFuture} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(SNAPDiff) } { snippets.dollarSign_v1 }{ Math.abs(SNAPDiff) } { snippets.perMonth_v1 }</Table.Cell>
      </Table.Row>
    );
  };

  const Sec8BenefitRow  = function({ client, snippets }){
    if (!client.current.hasSection8) {
      return (null);
    }

    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.rowSection8_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{sec8BenefitCurrent} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{sec8BenefitFuture} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(sec8Diff) } { snippets.dollarSign_v1 }{ Math.abs(sec8Diff) } { snippets.perMonth_v1 }</Table.Cell>
      </Table.Row>
    );
  };

  const TotalBenefitsRow = function({ client, snippets }){
    if (!client.current.hasSnap || !client.current.hasSection8) {
      return (null);
    }

    return (
      <Table.Row>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowHeaderStyle }>{ snippets.rowTotalBenefits_v1 }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.dollarSign_v1 }{totalBenefitCurrent} { snippets.perMonth_v1 }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.dollarSign_v1 }{totalBenefitFuture} { snippets.perMonth_v1 }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(totalDiff) } { snippets.dollarSign_v1 }{ Math.abs(totalDiff) } { snippets.perMonth_v1 }
        </Table.Cell>
      </Table.Row>
    );
  };

  const IncomeRow = function ({ snippets }) {
    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.rowIncome_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{incomeCurrent} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.dollarSign_v1 }{incomeFuture} { snippets.perMonth_v1 }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } { snippets.dollarSign_v1 }{ Math.abs(incomeDiff) } { snippets.perMonth_v1 }</Table.Cell>
      </Table.Row>
    );
  };

  const TotalsRow = function ({ snippets }) {
    return (
      <Table.Row style={{ border: 'none' }}>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowHeaderStyle }>{ snippets.rowNetTotal_v1}
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.dollarSign_v1 }{netCurrent} { snippets.perMonth_v1 }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.dollarSign_v1 }{netFuture} { snippets.perMonth_v1 }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(netDiff) } { snippets.dollarSign_v1 }{ Math.abs(netDiff) } { snippets.perMonth_v1 }
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row >
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.columnBenefit_v1 }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.columnCurrentBenefits_v1 }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.columnNewEstimate_v1 }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.columnDifference_v1 }
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <SNAPBenefitRow 
            client={ clone }
            snippets={ snippets } />
          <Sec8BenefitRow 
            client={ clone }
            snippets={ snippets } />
          <TotalBenefitsRow 
            client={ clone } 
            snippets={ snippets } />
          <IncomeRow snippets={ snippets } />
          <TotalsRow snippets={ snippets } />
        </Table.Body>
      </Table>
    </div>
  );

};  // End BenefitsTable(<>)


export { BenefitsTable };
