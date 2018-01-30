import _ from 'lodash'
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react';

// Logic
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/massachusetts/housing';
import {
  formatAxis,
  formatTitle,
  formatLabel,
  stackedTitle
} from '../utils/charts/chartFunctions';

// Data
import { PROGRAM_CHART_VALUES } from '../utils/charts/PROGRAM_CHART_VALUES';

// Our Components
import { FormPartsContainer } from './formHelpers';


const SNAPColor     = PROGRAM_CHART_VALUES.SNAP.color,
      SNAPName      = PROGRAM_CHART_VALUES.SNAP.name,
      section8Color = PROGRAM_CHART_VALUES.section8.color,
      section8Name  = PROGRAM_CHART_VALUES.section8.name,
      incomeColor   = PROGRAM_CHART_VALUES.income.color,
      incomeName    = PROGRAM_CHART_VALUES.income.name;


const maxXMonthly       = 100000/12,
      intervalXMontyly  = 1000/12;

const multipliers = {
  'Weekly': 1/(4 + 1/3),
  'Monthly': 1,
  'Yearly': 12
}


const GraphButton = function ({ id, activeID, onClick }) {
  return (
    <Button id={id} active={activeID === id} onClick={onClick}>
      {id}
    </Button>
  );
};  // End <GraphButton>


const GraphTimeButtons = function ({ activeID, onClick }) {
  return (
    <Button.Group basic className='graph-time-options'>
      <GraphButton id={'Weekly'} activeID={activeID} onClick={onClick}/>
      <GraphButton id={'Monthly'} activeID={activeID} onClick={onClick}/>
      <GraphButton id={'Yearly'} activeID={activeID} onClick={onClick}/>
    </Button.Group>
  );
};  // End <GraphTimeButtons>


// ===============
// GRAPH DATA
// ===============
/* Note: default tooltip for chart.js 2.0+:
 * options: { tooltips: { callbacks: {
 *  label: function(tooltipItem, data) {
 *    return tooltipItem.yLabel;
 *  }
 * }}}
 */
const getFauxSNAP = function ( xRange, client, multiplier ) {
  var fakeClient = _.cloneDeep( client );
  var data = xRange.map( function ( income ) {
    fakeClient.future.earned = income / multiplier;  // Turn it back into monthly
    return getSNAPBenefits( fakeClient, 'future' ) * multiplier;
  });

  return data;
};  // End getFauxSNAP


const getFauxSec8 = function ( xRange, client, multiplier ) {
  /** Section-8 Housing Choice Voucher */
  /** @todo Base this rent on FMR areas and client area of residence if no rent available. */
  var fakeClient = _.cloneDeep( client );

  fakeClient.current.contractRent = fakeClient.current.contractRent || 1000;
  fakeClient.current.earned       = 0;

  var data = xRange.map( function ( income ) {
    // New renting data
    fakeClient.future.earned  = income / multiplier;  // Turn it back into monthly
    var monthlySubsidy        = getHousingBenefit( fakeClient, 'future' );

    // Prep for next loop
    // Will use current values to calculate new values
    var newShare                  = fakeClient.current.contractRent - monthlySubsidy;
    fakeClient.current.rentShare  = newShare;
    fakeClient.current.earned     = fakeClient.future.earned;

    return monthlySubsidy * multiplier;
  });

  return data;
}


const GrossGraph = function ({ client, multiplier }) {
  // Adjust to time-interval, round to hundreds
  var max       = Math.ceil((maxXMonthly * multiplier)/100) * 100,
      interval  = Math.ceil((intervalXMontyly * multiplier)/100) * 100;

  var xRange = _.range(0, max, interval);

  /** Need a new object so client's data doesn't get changed. */
  var snapData    = getFauxSNAP( xRange, client, multiplier ),
      sec8Data    = getFauxSec8( xRange, client, multiplier ),
      incomeData  = xRange;

  var stackedAreaProps = {
    data: {
      labels: xRange,
      datasets: [
        {
          label: incomeName,
          backgroundColor: incomeColor,
          data: incomeData,
          fill: "origin"
        },
        {
          label: SNAPName,
          backgroundColor: SNAPColor,
          data: snapData
        },
        {
          label: section8Name,
          backgroundColor: section8Color,
          data: sec8Data
        },
      ]  // end `datasets`
    },  // end `data`
    options: {
      title: {
        display: true,
        text: 'All Money Coming in as Income Changes'
      },  // end `title`
      elements: {
        line: { fill: '-1' },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 10
        }
      },  // end `elements`
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Total Money Coming In ($)'
          },
          ticks: {
            beginAtZero: true,
            callback: formatAxis
          }
        }],  // end `yAxes`
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: formatAxis
          }
        }]  // end `xAxes`
      },  // end `scales`
      tooltips: {
        callbacks: {
          title: stackedTitle,
          label: formatLabel
        }
      }  // end `tooltips`
    }  // end `options`
  };  // end `stackedAreaProps`

  return (
    <Line {...stackedAreaProps} />
  );
};  // End <GrossGraph>


const BenefitGraph = function ({ client, multiplier }) {
  // Adjust to time-interval, round to hundreds
  var max       = Math.ceil((maxXMonthly * multiplier)/100) * 100,
      // interval  = Math.ceil((intervalXMontyly * multiplier)/100) * 100;
      interval  = Math.ceil((max/100)/10) * 10;
  console.log(max, interval)

  var xRange = _.range(0, max, interval);

  /** Need a new object so client's data doesn't get changed. */
  var snapData = getFauxSNAP( xRange, client, multiplier ),
      sec8Data = getFauxSec8( xRange, client, multiplier );
  
  var lineProps = {
    data: {
      labels: xRange,
      datasets: [
        {
          label: SNAPName,
          borderColor: SNAPColor,
          data: snapData,
          fill: false,
          lineTension: 0
        },
        {
          label: section8Name,
          borderColor: section8Color,
          data: sec8Data,
          fill: false,
          lineTension: 0
        },
      ]
    },  // end `data`
    options: {
      title: {
        display: true,
          text: 'Individual Benefit Amounts for Household as Income Changes'
      },
      showLines: true,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Benefit Value ($)'
          },
          ticks: {
            beginAtZero: true,
            /* chart.js v2.7 requires a callback function */
            callback: formatAxis
          }
        }],  // end `yAxes`
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: formatAxis
          }
        }]  // end `xAxes`
      },  // end `scales`
      tooltips: {
        callbacks: {
          title: formatTitle,
          label: formatLabel
        }
      }  // end `tooltips`
    }  // end `options`
  };  // end lineProps

  return (
    <Line {...lineProps} />
  );
};  // End <BenefitGraph>


class GraphHolder extends Component {

  constructor ( props ) {
    super( props );
    this.state = { activeID: 'Yearly', multiplier: multipliers[ 'Yearly' ] };
  }

  onClick = ( evnt ) => {
    var id = evnt.target.id;
    this.setState({ activeID: id, multiplier: multipliers[ id ] });
  }

  render () {
    const { activeID, multiplier }  = this.state,
          { Graph, client }         = this.props;

    return (
      <div className='graph-holder'>
        <Graph client={client} multiplier={multiplier} />
        <GraphTimeButtons activeID={activeID} onClick={this.onClick} />
      </div>
    );
  };  // End render()

};  // End <GraphHolder>




const ResultsGraph = ({ client, previousStep, resetClient }) => {

  return (
    <div className = 'result-page flex-item flex-column'>
      <FormPartsContainer
        title     = {'Graphs'}
        left      = {{ name: 'Go Back', func: previousStep }}
        right      = {{ name: 'Reset', func: resetClient }}
      >
        <GraphHolder client={client} Graph={BenefitGraph} />
        <GraphHolder client={client} Graph={GrossGraph} />
      </FormPartsContainer>
    </div>
  )

};  // End Results()


export default ResultsGraph
