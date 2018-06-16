import _ from 'lodash';
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

// Logic
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import {
  formatAxis,
  formatLabel,
  formatBenefitLinesTitle,
} from '../../utils/charts/chartFormatting';
import { getDatasets } from '../../utils/charts/getChartData';

// Our Components
import { FormPartsContainer } from '../formHelpers';
import { GraphTimeButtons } from '../../components/GraphTimeButtons';
import { VerticalLine } from './VerticalLine';
import { StackedAreaGraph } from './StackedAreaGraph';

// Data
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


const MAX_X_MONTHLY = PROGRAM_CHART_VALUES.limits.max,
      // Graphs get things in monthly values, so we'll convert from there
      MULTIPLIERS   = timescaleMultipliers.fromMonthly;


class BenefitGraph extends Component {

  constructor (props) {
    super(props);
    this.state = { verticalLine: new VerticalLine() };
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
    if (datasets.length === 0) {
      return null;
    }

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
            title: formatBenefitLinesTitle,
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
          Graph={ StackedAreaGraph } />
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
  BenefitGraph,
};
