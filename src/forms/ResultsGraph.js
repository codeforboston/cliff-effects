import _ from 'lodash';
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

// Logic
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/massachusetts/housing';
import {
  formatAxis,
  formatTitle,
  formatLabel,
  stackedTitle,
} from '../utils/charts/chartFunctions';

// Data
import { PROGRAM_CHART_VALUES } from '../utils/charts/PROGRAM_CHART_VALUES';

// Our Components
import { FormPartsContainer } from './formHelpers';
import { GraphTimeButtons } from '../components/GraphTimeButtons';

const MAX_X_MONTHLY = 100000 / 12;
const MULTIPLIERS = {
  'Weekly':  1 / (4 + 1 / 3),
  'Monthly': 1,
  'Yearly':  12,
};


class verticalLinePlugin {

  constructor () {
    this.xRange = [];
    this.income = 0;
  }

  afterDatasetsDraw = (chart) => {
    const xRange = this.xRange,
          income = this.income;

    const i = xRange.findIndex((val) => {return income < val;});
    const positionBetweenTwoPoints = (income - xRange[ i - 1 ]) / (xRange[ i ] - xRange[ i - 1 ]);

    const data = chart.getDatasetMeta(0).data;
    const prevX = data[ i - 1 ]._model.x;
    const currX = data[ i ]._model.x;
    const offset = Math.floor(positionBetweenTwoPoints * (currX - prevX) + prevX);

    const ctx = chart.chart.ctx;
    const scale = chart.scales[ 'y-axis-0' ];

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([ 5, 5 ]);
    ctx.moveTo(offset, scale.top);
    ctx.lineTo(offset, scale.bottom);
    ctx.stroke();

    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.textAlign = 'left';
    const lineHeight = ctx.measureText('M').width * 1.2;
    const xMargin = 5;
    const yMargin = 200;
    ctx.fillText('Future', offset + xMargin, yMargin);
    ctx.fillText('Income', offset + xMargin, lineHeight + yMargin);

    ctx.restore();
  };
};



var getData = {};

getData.income = function (xRange, client, multiplier) {
  return xRange;
};  // End getData.income

getData.snap = function (xRange, client, multiplier) {

  var data = xRange.map(function (income) {
    client.future.earned = income / multiplier;  // Turn it back into monthly
    return getSNAPBenefits(client, 'future') * multiplier;
  });

  return data;
};  // End getData.snap


getData.section8 = function (xRange, client, multiplier) {

  client.current.contractRent = client.current.contractRent;
  client.current.earned       = 0;

  var data = xRange.map(function (income) {
    // New renting data
    client.future.earned  = income / multiplier;  // Turn it back into monthly
    var monthlySubsidy        = getHousingBenefit(client, 'future');

    // Prep for next loop
    // Will use current values to calculate new values
    var newShare                  = client.current.contractRent - monthlySubsidy;
    client.current.rentShare  = newShare;
    client.current.earned     = client.future.earned;

    return monthlySubsidy * multiplier;
  });

  return data;
};  // End getData.section8()


/** Returns the graph data formated in a way our graph library understands. */
const getDatasets = function (xRange, client, multiplier, activePrograms, extraProps) {

  var datasets = [];

  for (let programi = 0; programi < activePrograms.length; programi++) {

    let programName   = activePrograms[ programi ],
        graphFrosting = PROGRAM_CHART_VALUES[ programName ];

    datasets.push({
      label:           graphFrosting.name,
      backgroundColor: graphFrosting.color,
      borderColor:     graphFrosting.color,
      /** Need a new object so client's data doesn't get changed. */
      data:            getData[ programName ](xRange, _.cloneDeep(client), multiplier),
      ...extraProps[ programName ],
    });
  }  // end for programs in program chart values

  return datasets;
};  // End getDatasets()


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
class GrossGraph extends Component {

  constructor (props) {
    super(props);
    this.state = { verticalLine: new verticalLinePlugin() };
  }

  render () {
    const { client, timescale, activePrograms } = this.props;
    const multiplier = MULTIPLIERS[ timescale ];

    // Adjust to time-interval, round to hundreds
    var max       = Math.ceil((MAX_X_MONTHLY * multiplier) / 100) * 100,
        interval  = Math.ceil((max / 100) / 10) * 10;

    var withIncome    = activePrograms.slice();
    withIncome.unshift('income');

    var xRange        = _.range(0, max, interval),
        extraProps    = { income: { fill: 'origin' }},
        datasets      = getDatasets(xRange, client, multiplier, withIncome, extraProps);

    // react-chartjs-2 keeps references to plugins, so we
    // have to mutate that reference
    var income  = client.future.earned * multiplier,
        hack    = this.state.verticalLine;
    hack.xRange = xRange;
    hack.income = income;

    var stackedAreaProps = {
      data: {
        labels:   xRange,
        datasets: datasets,
      },  // end `data`
      options: {
        title: {
          display: true,
          text:    'All Money Coming in as Income Changes',
        },  // end `title`
        elements: {
          line:  { fill: '-1' },
          point: {
            radius:      0,
            hitRadius:   10,
            hoverRadius: 10,
          },
        },  // end `elements`
        scales: {
          yAxes: [
            {
              stacked:    true,
              scaleLabel: {
                display:     true,
                labelString: 'Total Money Coming In ($)',
              },
              ticks: {
                beginAtZero: true,
                callback:    formatAxis,
              },
            },
          ],  // end `yAxes`
          xAxes: [
            {
              stacked:    true,
              scaleLabel: {
                display:     true,
                labelString: timescale + ' Income ($)',
              },
              ticks: { callback: formatAxis },
            },
          ],  // end `xAxes`
        },  // end `scales`
        tooltips: {
          callbacks: {
            title: stackedTitle,
            label: formatLabel,
          },
        },  // end `tooltips`
      },  // end `options`
      plugins: [ this.state.verticalLine ],
    };  // end `stackedAreaProps`

    return (
      <Line { ...stackedAreaProps } />
    );
  }
};  // End <GrossGraph>


class BenefitGraph extends Component {

  constructor (props) {
    super(props);
    this.state = { verticalLine: new verticalLinePlugin() };
  }

  render () {
    const { client, timescale, activePrograms, className } = this.props;
    const multiplier = MULTIPLIERS[ timescale ];

    if (activePrograms.length === 0) {
      return <Message className={ className }>No public benefit programs have been selected</Message>;
    }

    // Adjust to time-interval, round to hundreds
    var max       = Math.ceil((MAX_X_MONTHLY * multiplier) / 100) * 100,
        interval  = Math.ceil((max / 100) / 10) * 10;

    var xRange      = _.range(0, max, interval),  // x-axis/income numbers
        extraProps  = { snap: { fill: false }, section8: { fill: false }},
        datasets    = getDatasets(xRange, client, multiplier, activePrograms, extraProps);

    // If there's no data to show, don't show the table
    if (datasets.length === 0) { return null; }

    // react-chartjs-2 keeps references to plugins, so we
    // have to mutate that reference
    var income  = client.future.earned * multiplier,
        hack    = this.state.verticalLine;
    hack.xRange = xRange;
    hack.income = income;

    var lineProps = {
      data: {
        labels:   xRange,
        datasets: datasets,
      },  // end `data`
      options: {
        title: {
          display: true,
          text:    'Individual Benefit Amounts for Household as Income Changes',
        },
        showLines: true,
        scales:    {
          yAxes: [
            {
              scaleLabel: {
                display:     true,
                labelString: 'Benefit Value ($)',
              },
              ticks: {
                beginAtZero: true,
                /* chart.js v2.7 requires a callback function */
                callback:    formatAxis,
              },
            },
          ],  // end `yAxes`
          xAxes: [
            {
              scaleLabel: {
                display:     true,
                labelString: timescale + ' Income ($)',
              },
              ticks: { callback: formatAxis },
            }, 
          ],  // end `xAxes`
        },  // end `scales`
        tooltips: {
          callbacks: {
            title: formatTitle,
            label: formatLabel,
          },
        },  // end `tooltips`
      },  // end `options`
      plugins: [ this.state.verticalLine ],
    };  // end lineProps

    return (
      <Line { ...lineProps } />
    );
  }

};  // End <BenefitGraph>


class GraphHolder extends Component {

  constructor (props) {
    super(props);
    this.state = { activeID: 'Yearly' };
  }

  onClick = (evnt) => {
    var id = evnt.target.id;
    this.setState({ activeID: id });
  };

  render () {
    const { activeID }  = this.state,
          { Graph, client }         = this.props,
          { current }               = client,
          activePrograms            = [];

    // The ids later used to access all program-specific data and functions
    // Only active programs are added
    if (current.hasSection8) { activePrograms.push('section8'); }
    if (current.hasSnap)    { activePrograms.push('snap'); }

    return (
      <div className='graph-holder'>
        <Graph
          className='client-graph'
          client={ client }
          timescale={ activeID }
          activePrograms={ activePrograms } />
        <GraphTimeButtons
          activeID={ activeID }
          onClick={ this.onClick } />
      </div>
    );
  };  // End render()

};  // End <GraphHolder>


const ResultsGraph = ({ client, previousStep, resetClient }) => {

  return (
    <div className = 'result-page flex-item flex-column'>
      <FormPartsContainer
        title     = { 'Graphs' }
        left      = {{ name: 'Go Back', func: previousStep }}
        right     = {{ name: 'Reset', func: resetClient }}>
        <GraphHolder
          client={ client }
          Graph={ GrossGraph } />
        <GraphHolder
          client={ client }
          Graph={ BenefitGraph } />
      </FormPartsContainer>
    </div>
  );

};  // End Results()


export default ResultsGraph;

export {
  GraphHolder,
  GrossGraph,
  BenefitGraph,
};
