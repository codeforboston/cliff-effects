// REACT COMPONENTS
import React from 'react';
import { Table } from 'semantic-ui-react';

// BENEFIT LOGIC
import { applyAndPushBenefits } from '../../benefits/applyAndPushBenefits';

// OBJECT MANIPULATION
import { cloneDeep } from 'lodash';


// @todo Move to utils file somewhere?
const getSignSymbol = function (num) {
  if (num > 0) {
    return `+`;
  } else if (num < 0) {
    return `-`;
  } else { return ``; }
};


const BenefitsTable = function ({ client, translations }) {
  const clone = cloneDeep(client);
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

  let earned = allData.earned;
  
  let currentBenefits     = {},
      futureBenefits      = {},
      benefitDiffs        = {},
      totalDiff           = 0,
      totalBenefitCurrent = 0,
      totalBenefitFuture  = 0;

  for (let benefitIndex = 0; benefitIndex < curr.benefits.length; benefitIndex++) {
    
    let benefit       = curr.benefits[ benefitIndex ],
        benefitData = allData[ benefit ];
    
    if (benefitData) {
      let [
        currentBenefit,
        futureBenefit, 
      ] = benefitData;
      
      currentBenefits[ benefit ] = Math.round(currentBenefit);
      futureBenefits[ benefit ]  = Math.round(futureBenefit);

      totalBenefitCurrent += currentBenefits[ benefit ];
      totalBenefitFuture  += futureBenefits[ benefit ];
    } else {
      currentBenefits[ benefit ] = 0;
      futureBenefits[ benefit ]  = 0;
    }

    benefitDiffs[ benefit ] = futureBenefits[ benefit ] - currentBenefits[ benefit ];
    totalDiff += benefitDiffs[ benefit ];
  }

  let earnedCurrent = Math.round(earned[ 0 ]),
      earnedFuture  = Math.round(earned[ 1 ]),
      earnedDiff    = earnedFuture - earnedCurrent,
      netCurrent    = totalBenefitCurrent + earnedCurrent,
      netFuture     = totalBenefitFuture + earnedFuture,
      netDiff       = totalDiff + earnedDiff;

  // @todo Possible to break the following components out?
  let columnHeaderStyle = {
        background:    `rgba(0, 181, 173, 1)`,
        color:         `white`,
        fontSize:      `1.3em`,
        fontWeight:    900,
        textAlign:     `center`,
        borderRadius:  `inherit`,
        letterSpacing: `0.02em`,
      },
      totalsRowStyle = {
        borderTop:  `2px solid rgba(0, 181, 173, 1)`,
        fontWeight: 700,
        fontSize:   `1.1em`,
        padingTop:  `0.25em`,
      },
      rowHeaderStyle = {
        fontSize:   `1.1em`,
        fontWeight: 700,
        textAlign:  `left`,
      },
      totalsRowHeaderStyle = {
        fontSize:   `1.2em`,
        fontWeight: 700,
        textAlign:  `left`,
        borderTop:  `2px solid rgba(0, 181, 173, 1)`,
        padingTop:  `0.25em`,
      };

  const TotalBenefitsRow = function({ client, translations }){
    if (client.current.benefits.length <= 1) {
      return (null);
    }

    return (
      <Table.Row>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowHeaderStyle }>
          { translations.i_rowTotalBenefits }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { translations.i_beforeMoneyWithTime }{totalBenefitCurrent}{ translations.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { translations.i_beforeMoneyWithTime }{totalBenefitFuture}{ translations.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { getSignSymbol(totalDiff) } { translations.i_beforeMoneyWithTime }{ Math.abs(totalDiff) }{ translations.i_afterMoneyWithTime }
        </Table.Cell>
      </Table.Row>
    );
  };

  const EarnedRow = function ({ translations }) {
    return (
      <Table.Row>
        <Table.Cell style={ rowHeaderStyle }>{ translations.i_rowEarned }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ translations.i_beforeMoneyWithTime }{earnedCurrent}{ translations.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ translations.i_beforeMoneyWithTime }{earnedFuture}{ translations.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ getSignSymbol(earnedDiff) } { translations.i_beforeMoneyWithTime }{ Math.abs(earnedDiff) }{ translations.i_afterMoneyWithTime }</Table.Cell>
      </Table.Row>
    );
  };

  const TotalsRow = function ({ translations }) {
    return (
      <Table.Row style={{ border: `none` }}>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowHeaderStyle }>
          { translations.i_rowNetTotal }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { translations.i_beforeMoneyWithTime }{netCurrent}{ translations.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { translations.i_beforeMoneyWithTime }{netFuture}{ translations.i_afterMoneyWithTime }
        </Table.Cell>
        <Table.Cell
          textAlign = { `right` }
          width     = { 3 }
          style     = { totalsRowStyle }>
          { getSignSymbol(netDiff) } { translations.i_beforeMoneyWithTime }{ Math.abs(netDiff) }{ translations.i_afterMoneyWithTime }
        </Table.Cell>
      </Table.Row>
    );
  };

  const benefitRows = [];

  for (let benefitIndex = 0; benefitIndex < curr.benefits.length; benefitIndex++) {
    let benefit = curr.benefits[ benefitIndex ],
        diff    = benefitDiffs[ benefit ],
        label   = translations[ `i_row_${benefit}` ];

    benefitRows.push(
      <Table.Row
        key={ benefit }>
        <Table.Cell style={ rowHeaderStyle }>{ label }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ translations.i_beforeMoneyWithTime }{currentBenefits[ benefit ]}{ translations.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ translations.i_beforeMoneyWithTime }{futureBenefits[ benefit ]}{ translations.i_afterMoneyWithTime }</Table.Cell>
        <Table.Cell textAlign={ `right` }>{ getSignSymbol(diff) } { translations.i_beforeMoneyWithTime }{ Math.abs(diff) }{ translations.i_afterMoneyWithTime }</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row >
          <Table.Cell
            style = { columnHeaderStyle }
            width = { 3 }>
            { translations.i_columnBenefit }
          </Table.Cell>
          <Table.Cell
            style = { columnHeaderStyle }
            width = { 3 }>
            { translations.i_columnCurrentBenefits }
          </Table.Cell>
          <Table.Cell
            style = { columnHeaderStyle }
            width = { 3 }>
            { translations.i_columnNewEstimate }
          </Table.Cell>
          <Table.Cell
            style = { columnHeaderStyle }
            width = { 3 }>
            { translations.i_columnDifference }
          </Table.Cell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { benefitRows }
        <TotalBenefitsRow 
          client       = { clone } 
          translations = { translations } />
        <EarnedRow translations={ translations } />
        <TotalsRow translations={ translations } />
      </Table.Body>
    </Table>
  );

};  // Ends <BenefitsTable>


export { BenefitsTable };
