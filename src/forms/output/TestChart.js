import React, { Component } from 'react';
import { range } from 'lodash';

// HIGHCHARTS
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Chart,
  Title,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  PlotLine,
  LineSeries,
  withHighcharts,
} from 'react-jsx-highcharts';

// LOGIC
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import { getChartData } from '../../utils/charts/getChartData';
import { toFancyMoneyStr } from '../../utils/charts/chartFormatting';

// DATA
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


// Graphs get things in monthly values, so we'll convert from there
let multipliers = timescaleMultipliers.fromMonthly,
    // Each graph controls its own scaling
    limits      = PROGRAM_CHART_VALUES.limits;


// Add/remove plotLine
// https://stackoverflow.com/a/14632292/3791179
// Also has a mousein and mouseout hook we can use
// to make it bigger when hovered over.

// Remove point markers
// https://stackoverflow.com/a/14642909/3791179

// (Note: If we have room to include the plot lines amount
// in the label, we probably don't need tooltips for them.)
// Possible way to handle tooltips for plot lines
// https://stackoverflow.com/questions/12451549/highcharts-plotband-tooltip-hover-default-styling#21277491
// Dunno if I like the CSS solution since it then hides the label text except on hover.
// Maybe could use something similar where the HTML has the label part and then a separate tooltip part...

// Haven't figured out how to pan vertically
// This might help, but means chart may have set dimensions:
// https://api.highcharts.com/highcharts/chart.scrollablePlotArea
// Not sure how it would act with zoom.


// Still @todo
// - [ ] Bottom ticks' number format
// - [ ] Snippets
// - [ ] Function descriptions
// - [ ] Hover style for legend items
// - [ ] Hover style for plot line
// - [ ] Fixed width for ticks' text
// - [ ] Button placement
// - [ ] Bigger font?


class TestChartComp extends Component {
  render () {
    const { client, timescale, activePrograms, className } = this.props,
          multiplier    = multipliers[ timescale ],
          resources     = activePrograms,
          currentEarned = client.current.earned * multiplier;

    // Adjust to time-interval. Highcharts will round
    // for ticks displayed.
    const max      = (limits.max * multiplier),
          interval = ((max / 100) / 10) * 30;

    const xRange   = range(limits.min, max, interval),  // x-axis/earned income numbers
          datasets = getChartData(xRange, multiplier, client, resources, {});

    // Individual benefit lines
    const lines = [];
    for (let dataset of datasets) {
      let line = (
        <LineSeries
          key  = { dataset.label }
          id   = { dataset.label.replace(` `, ``) }
          name = { dataset.label }
          data = { dataset.data } />
      );

      lines.push(line);
    }


    // `zoomKey` doesn't work without another package
    const plotOptions =  { line: { pointInterval: interval }};
    return (
      <div className={ `benefit-lines-graph ` + (className || ``) }>
        <HighchartsChart plotOptions={ plotOptions }>

          <Chart
            tooltip  = {{ enabled: true }}
            zoomType = { `xy` }
            panning  = { true }
            panKey   = { `alt` }
            resetZoomButton = {{ theme: { zIndex: 200 }, relativeTo: `chart` }} />

          <Title>Test</Title>

          <Legend
            align         = { `center` }
            verticalAlign = { `top` } />

          <Tooltip
            split         = { true }
            valuePrefix   = { `$` }
            valueDecimals = { 2 }
            padding       = { 8 }
            borderRadius  = { 4 }
            borderColor   = { `transparent`  }
            hideDelay     = { 300 } />

          <XAxis endOnTick={ false }>
            <XAxis.Title>{ `${timescale} Pay` }</XAxis.Title>
            <PlotLine
              value     = { currentEarned }
              useHTML   = { true }
              label     = {{ text: `Current pay:<br/>${toFancyMoneyStr(currentEarned)}`, rotation: 0 }}
              zIndex    = { 5 }
              width     = { 2 }
              color     = { `gray` }
              dashStyle = { `ShortDashDot` } />
          </XAxis>

          <YAxis endOnTick={ false }>
            <YAxis.Title>Benefit Value</YAxis.Title>
            { lines }
          </YAxis>

        </HighchartsChart>
      </div>
    );
  }  // Ends render()
};


const TestChart = withHighcharts(TestChartComp, Highcharts);


export { TestChart };
