import _ from 'lodash';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// Logic
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import {
  formatAxis,
  formatLabel,
  formatStackedTitle,
} from '../../utils/charts/chartFormatting';
import { getDatasets } from '../../utils/charts/getChartData';

// Our Components
import { BenefitsLineGraph } from './BenefitsLineGraph';
import { FormPartsContainer } from '../formHelpers';
import { GraphTimeButtons } from '../../components/GraphTimeButtons';
import { VerticalLine } from './VerticalLine';

// Data
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


const MAX_X_MONTHLY = PROGRAM_CHART_VALUES.limits.max,
      // Graphs get things in monthly values, so we'll convert from there
      MULTIPLIERS   = timescaleMultipliers.fromMonthly;

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
    this.state = { verticalLine: new VerticalLine() };
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
            title: formatStackedTitle,
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
    if (current.hasSection8) { 
      activePrograms.push('section8');
    }
    if (current.hasSnap)    {
      activePrograms.push('snap');
    }

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
          Graph={ BenefitsLineGraph } />
      </FormPartsContainer>
    </div>
  );

};  // End Results()


export default ResultsGraph;

export {
  GraphHolder,
  GrossGraph,
};
