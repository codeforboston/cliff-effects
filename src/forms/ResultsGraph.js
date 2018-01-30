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


class GraphHolder extends Component {

  constructor ( props ) {
    super( props );
    this.state = { activeID: 'Yearly' };
  }

  onClick = ( evnt ) => {
    this.setState({ activeID: evnt.target.id });
  }

  render () {
    return (
      <div className='graph-holder'>
        <Line {...this.props.graphProps} />
        <GraphTimeButtons activeID={this.state.activeID} onClick={this.onClick}/>
      </div>
    );
  };  // End render()

};  // End <GraphHolder>



/* Note: default tooltip for chart.js 2.0+:
 * options: { tooltips: { callbacks: {
 *  label: function(tooltipItem, data) {
 *    return tooltipItem.yLabel;
 *  }
 * }}}
 */

const ResultsGraph = (props) => {
  var xRange = _.range(0, 100000, 1000);
  /** Need a new object so client's data doesn't get changed. */
  var fakeClient = _.cloneDeep( props.client );

  var snapData = xRange.map(annualIncome => {
      fakeClient.future.earned = annualIncome/12;
      return getSNAPBenefits(fakeClient, 'future') * 12});

  /** Section-8 Housing Choice Voucher */
  /** @todo Base this rent on FMR areas and client area of residence if no rent available. */
  fakeClient.current.contractRent = fakeClient.current.contractRent || 700;
  fakeClient.current.earned = 0;
  var housingData = xRange.map(function ( annualIncome ) {
    // New renting data
    fakeClient.future.earned = annualIncome/12;

    var monthlySubsidy  = getHousingBenefit( fakeClient, 'future' ),
        yearlySubsidy   = monthlySubsidy * 12;

    // Prep for next loop
    var newShare = fakeClient.current.contractRent - monthlySubsidy;
    fakeClient.current.rentShare  = newShare;
    fakeClient.current.earned     = annualIncome/12;

    return yearlySubsidy;
  });

  var lineProps = {
    data: {
      labels: xRange,
      datasets: [
        {
          label: SNAPName,
          borderColor: SNAPColor,
          data: snapData,
          fill: false
        },
        {
          label: section8Name,
          borderColor: section8Color,
          data: housingData,
          fill: false
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
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: formatAxis
          }
        }]
      },  // end `scales`
      tooltips: {
        callbacks: {
          title: formatTitle,
          label: formatLabel
        }
      }  // end `tooltips`
    }  // end `options`
  };  // end lineProps

  const stackedAreaProps = {
    data: {
      labels: xRange.slice(0, 50),
      datasets: [
        {
          label: incomeName,
          backgroundColor: incomeColor,
          data: xRange.slice(0, 50),
          fill: "origin"
        },
        {
          label: SNAPName,
          backgroundColor: SNAPColor,
          data: snapData.slice(0, 50)
        },
        {
          label: section8Name,
          backgroundColor: section8Color,
          data: housingData.slice(0, 50)
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: 'All Money Coming in as Income Changes'
      },
      elements: {
        line: { fill: '-1' },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 10
        }
      },
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
        }],
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: formatAxis
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: stackedTitle,
          label: formatLabel
        }
      }
    }
  }

  return (
    <div className = 'result-page flex-item flex-column'>
      <FormPartsContainer
        title     = {'Graphs'}
        left      = {{ name: 'Go Back', func: props.previousStep }}
        right      = {{ name: 'Reset', func: props.resetClient }}
      >
        <GraphHolder graphProps={{...lineProps}} />
        <GraphHolder graphProps={{...stackedAreaProps}} />
      </FormPartsContainer>
    </div>
  )

};  // End Results()


export default ResultsGraph
