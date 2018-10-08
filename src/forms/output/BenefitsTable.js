// REACT COMPONENTS
import React from 'react';
import { Table } from 'semantic-ui-react';

// BENEFIT LOGIC
import { applyAndPushBenefits } from '../../programs/applyAndPushBenefits';

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

  var allData         = {},
      activeBenefits  = [ `income` ];

  if (curr.hasSection8) {
    activeBenefits.push(`section8`);
  }

  if (curr.hasSnap) {
    activeBenefits.push(`snap`);
  }

  var currentCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `current`,
  };
  applyAndPushBenefits (currentCalcData);

  // Add to the `current` data already there
  var futureCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `future`,
  };
  applyAndPushBenefits (futureCalcData);

  // @todo Abstract getting values for each row
  var income   = allData.income,
      section8 = allData.section8,
      snap     = allData.snap;

  var sec8BenefitCurrent = 0,
      sec8BenefitFuture  = 0,
      SNAPBenefitCurrent = 0,
      SNAPBenefitFuture  = 0;

  if (curr.hasSection8) {
    sec8BenefitCurrent     = Math.round(section8[ 0 ]);
    sec8BenefitFuture      = Math.round(section8[ 1 ]);
  }

  if (curr.hasSnap) {
    SNAPBenefitCurrent = Math.round(snap[ 0 ]);
    SNAPBenefitFuture  = Math.round(snap[ 1 ]);
  }

  var SNAPDiff            = SNAPBenefitFuture - SNAPBenefitCurrent,
      sec8Diff            = sec8BenefitFuture - sec8BenefitCurrent,
      totalBenefitCurrent = SNAPBenefitCurrent + sec8BenefitCurrent,
      totalBenefitFuture  = SNAPBenefitFuture + sec8BenefitFuture,
      totalDiff           = SNAPDiff + sec8Diff,
      incomeCurrent       = Math.round(income[ 0 ]),
      incomeFuture        = Math.round(income[ 1 ]),
      incomeDiff          = incomeFuture - incomeCurrent,
      netCurrent          = totalBenefitCurrent + incomeCurrent,
      netFuture           = totalBenefitFuture + incomeFuture,
      netDiff             = totalDiff + incomeDiff;

  const columnHeaderStyle = {
          background:    'rgba(0, 181, 173, 1)',
          color:         'white',
          fontSize:      '1.3em',
          fontWeight:    900,
          textAlign:     'center',
          borderRadius:  'inherit',
          letterSpacing: '0.02em',
        },
        totalsRowStyle    = {
          borderTop:  '2px solid rgba(0, 181, 173, 1)',
          fontWeight: 700,
          fontSize:   '1.1em',
          padingTop:  '0.25em',
        },
        rowHeaderStyle    = {
          fontSize:   '1.1em',
          fontWeight: 700,
          textAlign:  'left',
        },
        totalsRowHeaderStyle = {
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
        <Table.Cell style={ rowHeaderStyle }>{ snippets.i_rowSNAP }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{SNAPBenefitCurrent}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{SNAPBenefitFuture}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(SNAPDiff) } { snippets.i_beforeMoney }{ Math.abs(SNAPDiff) }{ snippets.i_afterMoney }</Table.Cell>
      </Table.Row>
    );
  };

  const Sec8BenefitRow  = function({ client, snippets }){
    if (!client.current.hasSection8) {
      return (null);
    }

    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.i_rowSection8 }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{sec8BenefitCurrent}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{sec8BenefitFuture}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(sec8Diff) } { snippets.i_beforeMoney }{ Math.abs(sec8Diff) }{ snippets.i_afterMoney }</Table.Cell>
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
          style={ totalsRowHeaderStyle }>{ snippets.i_rowTotalBenefits }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoney }{totalBenefitCurrent}{ snippets.i_afterMoney }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoney }{totalBenefitFuture}{ snippets.i_afterMoney }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(totalDiff) } { snippets.i_beforeMoney }{ Math.abs(totalDiff) }{ snippets.i_afterMoney }
        </Table.Cell>
      </Table.Row>
    );
  };

  const IncomeRow = function ({ snippets }) {
    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.i_rowIncome }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{incomeCurrent}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoney }{incomeFuture}{ snippets.i_afterMoney }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } { snippets.i_beforeMoney }{ Math.abs(incomeDiff) }{ snippets.i_afterMoney }</Table.Cell>
      </Table.Row>
    );
  };

  const TotalsRow = function ({ snippets }) {
    return (
      <Table.Row style={{ border: 'none' }}>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowHeaderStyle }>{ snippets.i_rowNetTotal }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoney }{netCurrent}{ snippets.i_afterMoney }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoney }{netFuture}{ snippets.i_afterMoney }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(netDiff) } { snippets.i_beforeMoney }{ Math.abs(netDiff) }{ snippets.i_afterMoney }
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
              width={ 3 }>{ snippets.i_columnBenefit }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.i_columnCurrentBenefits }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.i_columnNewEstimate }
            </Table.Cell>
            <Table.Cell
              style={ columnHeaderStyle }
              width={ 3 }>{ snippets.i_columnDifference }
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
