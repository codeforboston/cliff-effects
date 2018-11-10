import React, { Component } from 'react';

// HIGHCHARTS
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Chart,
  Title,
  XAxis,
  YAxis,
  LineSeries,
  withHighcharts,
} from 'react-jsx-highcharts';

// // LOGIC
// import { timescaleMultipliers } from '../../utils/convert-by-timescale';
// import { getChartData } from '../../utils/charts/getChartData';
// import { toFancyMoneyStr } from '../../utils/charts/chartFormatting';

// // DATA
// // In future, graphs will control their own aspect ratio,
// // zoom levels, etc., so for now they'll have access to
// // the limit values.
// import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


// // Graphs get things in monthly values, so we'll convert from there
// let multipliers = timescaleMultipliers.fromMonthly,
//     // Each graph controls its own scaling
//     limits      = PROGRAM_CHART_VALUES.limits;


// Going to copy the benefits line graph into here
class TestChartComp extends Component {
  render () {
    const { className } = this.props;

    return (
      <div className={ `test-chart ` + (className || ``) }>
        <HighchartsChart>
                
          <Chart />

          <Title>Test</Title>

          <XAxis>
            <XAxis.Title>Pay</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Benefit Value</YAxis.Title>

            <LineSeries data={ [
              1,
              2,
              3, 
            ] } />
          </YAxis>

        </HighchartsChart>
      </div>
    );
  }  // Ends render()
};


const TestChart = withHighcharts(TestChartComp, Highcharts);


export { TestChart };
