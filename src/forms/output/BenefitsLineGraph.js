import React, { Component } from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import { Message } from 'semantic-ui-react';

// CUSTOM ELEMENTS
import { VerticalLine } from './VerticalLine';

// LOGIC
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import {
  formatAxis,
  formatLabel,
  formatBenefitLinesTitle,
} from '../../utils/charts/chartFormatting';
import { getDatasets } from '../../utils/charts/getChartData';

// DATA
// In future, graphs will control their own aspect ratio,
// zoom levels, etc., so for now they'll have access to
// the limit values.
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


// Graphs get things in monthly values, so we'll convert from there
var multipliers = timescaleMultipliers.fromMonthly,
    // Each graph controls its own scaling
    limits      = PROGRAM_CHART_VALUES.limits;


class BenefitsLineGraph extends Component {

  constructor (props) {
    super(props);
    this.state = { verticalLine: new VerticalLine() };
  }

  render () {
    const { client, timescale, activePrograms, className } = this.props;
    const multiplier = multipliers[ timescale ];

    if (activePrograms.length === 0) {
      return <Message className={ className }>No public benefit programs have been selected</Message>;
    }

    // Adjust to time-interval, round to hundreds
    var max       = Math.ceil((limits.max * multiplier) / 100) * 100,
        interval  = Math.ceil((max / 100) / 10) * 10;

    var xRange      = _.range(limits.min, max, interval),  // x-axis/income numbers
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

};  // End <BenefitsLineGraph>


export { BenefitsLineGraph };
