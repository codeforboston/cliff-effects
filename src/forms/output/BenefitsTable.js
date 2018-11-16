// REACT COMPONENTS
import React from 'react';
import { Table } from 'semantic-ui-react';

// BENEFIT LOGIC
import { applyAndPushBenefits } from '../../programs/applyAndPushBenefits';


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
  // @todo: make applyAndPushBenefits() work with Immutable.js collections
  const clone = client.toJS();
  const curr = clone.current;

  let allData         = {},
      activeBenefits  = [
        `earned`,
        ...curr.benefits,
      ];

  let currentCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `current`,
    USState:        client.USState,
  };
  applyAndPushBenefits (currentCalcData);

  // Add to the `current` data already there
  let futureCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `future`,
    USState:        client.USState,
  };
  applyAndPushBenefits (futureCalcData);

  const earned = allData.earned;
  
  const currentBenefits = {};
  const futureBenefits = {};
  const benefitDiffs = {};
  let totalDiff = 0;
  let totalBenefitCurrent = 0;
  let totalBenefitFuture = 0;

  for (let benefitIndex = 0; benefitIndex < curr.benefits.length; benefitIndex++) {
    const benefit = curr.benefits[ benefitIndex ];

    const benefitData = allData[ benefit ];
    
    if (benefitData) {
      const [
        currentBenefit,
        futureBenefit, 
      ] = benefitData;
      
      currentBenefits[ benefit ] = Math.round(currentBenefit);
  
      futureBenefits[ benefit ] = Math.round(futureBenefit);

      totalBenefitCurrent += currentBenefits[ benefit ];
      totalBenefitFuture += futureBenefits[ benefit ];
    }
    else {
      currentBenefits[ benefit ] = 0;

      futureBenefits[ benefit ] = 0;
    }

    benefitDiffs[ benefit ] = futureBenefits[ benefit ] - currentBenefits[ benefit ];
    totalDiff += benefitDiffs[ benefit ];
  }

  const earnedCurrent       = Math.round(earned[ 0 ]),
        earnedFuture        = Math.round(earned[ 1 ]),
        earnedDiff          = earnedFuture - earnedCurrent,
        netCurrent          = totalBenefitCurrent + earnedCurrent,
        netFuture           = totalBenefitFuture + earnedFuture,
        netDiff             = totalDiff + earnedDiff;

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

  const TotalBenefitsRow = function({ client, snippets }){
    if (client.current.benefits.length <= 1) {
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
          style={ totalsRowStyle }>{ snippets.i_beforeMoneyWithTime }{totalBenefitCurrent}{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoneyWithTime }{totalBenefitFuture}{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(totalDiff) } { snippets.i_beforeMoneyWithTime }{ Math.abs(totalDiff) }{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
      </Table.Row>
    );
  };

  const EarnedRow = function ({ snippets }) {
    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ snippets.i_rowEarned }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoneyWithTime }{earnedCurrent}{ snippets.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoneyWithTime }{earnedFuture}{ snippets.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(earnedDiff) } { snippets.i_beforeMoneyWithTime }{ Math.abs(earnedDiff) }{ snippets.i_afterMoneyWithTime }</Table.Cell>
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
          style={ totalsRowStyle }>{ snippets.i_beforeMoneyWithTime }{netCurrent}{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ snippets.i_beforeMoneyWithTime }{netFuture}{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign='right'
          width={ 3 }
          style={ totalsRowStyle }>{ getSignSymbol(netDiff) } { snippets.i_beforeMoneyWithTime }{ Math.abs(netDiff) }{ snippets.i_afterMoneyWithTime }
        </Table.Cell>
      </Table.Row>
    );
  };

  const benefitRows = [];

  for (let benefitIndex = 0; benefitIndex < curr.benefits.length; benefitIndex++) {
    const benefit = curr.benefits[ benefitIndex ];

    const diff = benefitDiffs[ benefit ];

    const label = snippets[ `i_row_${benefit}` ];

    benefitRows.push(
      <Table.Row
        key={ benefit }>
        <Table.Cell style={ rowHeaderStyle }>{ label }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoneyWithTime }{currentBenefits[ benefit ]}{ snippets.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign='right'>{ snippets.i_beforeMoneyWithTime }{futureBenefits[ benefit ]}{ snippets.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign='right'>{ getSignSymbol(diff) } { snippets.i_beforeMoneyWithTime }{ Math.abs(diff) }{ snippets.i_afterMoneyWithTime }</Table.Cell>
      </Table.Row>
    );
  }

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
          {benefitRows}
          <TotalBenefitsRow 
            client={ clone } 
            snippets={ snippets } />
          <EarnedRow snippets={ snippets } />
          <TotalsRow snippets={ snippets } />
        </Table.Body>
      </Table>
    </div>
  );

};  // End BenefitsTable(<>)


export { BenefitsTable };
