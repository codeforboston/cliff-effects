import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

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
  ColumnSeries,
  withHighcharts,
} from 'react-jsx-highcharts';

// LOGIC
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import { getChartData } from './getChartData';
import { toFancyMoneyStr } from './chartFormatting';
import {
  setThousandsSeparator,
  formatMoneyWithK,
  textFromTranslatedElement,
} from './chartStringTransformers';

// DATA
import { CHART_FROSTING } from './CHART_FROSTING';


// Graphs get things in monthly values, so we'll convert from there
let multipliers = timescaleMultipliers.fromMonthly;


/** Graph of all incoming resources as household income changes. Uses Highchart lib.
 * @class
 *
 * @params {object} props
 * @params {object} props.client Data for current and future client circumstances.
 * @params {'Weekly'|'Monthly'|'Yearly'} props.timescale Interval of time to show for pay amount.
 * @params {string[]} props.activePrograms Benefit programs in which the household enrolled.
 * @params {object} props.className An extra class for the outermost component,
 *     whether it's the chart or the no-chart message.
 * @params {object} props.translations Translation spans of text in app.
 */
class ResourcesColumnsComp extends Component {

  constructor (props) {
    super(props);
    setThousandsSeparator(props.translations, Highcharts);
  }

  render () {
    const {
      client,
      timescale,
      activePrograms,
      className,
      translations,
    } = this.props;

    let clone = cloneDeep(client);

    let multiplier    = multipliers[ timescale ],
        resources     = [ `earned` ].concat(activePrograms),
        currentEarned = client.current.earned * multiplier,
        futureEarned  = client.future.earned * multiplier,
        getText       = textFromTranslatedElement;

    // Adjust to time-interval. Highcharts will round
    // for displayed ticks.
    let xRange   = [
          currentEarned,
          futureEarned, 
        ],  // x-axis/earned income numbers
        datasets = getChartData(xRange, multiplier, clone, resources, {});

    // Columns and categories for each pay amount
    let columns    = [],
        categories = [];
    for (let dataseti = 0; dataseti < datasets.length; dataseti++) {
      let dataset = datasets[ dataseti ],
          column  = (
            <ColumnSeries
              key         = { dataset.label }
              id          = { dataset.label.replace(` `, ``) }
              name        = { dataset.label }
              data        = { dataset.data }
              legendIndex = { dataseti }
              x           = { dataseti }
              label       = { dataseti } />
          );

      columns.unshift(column);

      if (dataset.label === `Earned`) {
        for (let amount of dataset.data) {
          let formatted = toFancyMoneyStr(amount);
          categories.push(formatted);
        }
      }
    }  // ends for every dataset

    let beforeMoney = getText(translations.i_beforeMoney);

    const plotOptions =  { column: { stacking: `normal` }};
    // @todo Abstract different component attributes as frosting
    return (
      <div className={ `benefit-columns-graph ` + (className || ``) }>
        <HighchartsChart plotOptions={ plotOptions }>

          <Chart
            { ...CHART_FROSTING.chart }
            tooltip  = {{ enabled: true }}
            zoomType = { `y` } />

          <Title>{ getText(translations.i_stackedBarGraphTitle) }</Title>

          <Legend { ...CHART_FROSTING.legend } />

          <Tooltip
            { ...CHART_FROSTING.tooltip }
            valuePrefix = { beforeMoney } />

          <XAxis
            { ...CHART_FROSTING.xAxis }
            categories = { categories }
            crosshair  = {{}}>

            <XAxis.Title>{ `${timescale} ${getText(translations.i_xAxisTitleEnd)}` }</XAxis.Title>
            { columns }

          </XAxis>

          <YAxis
            { ...CHART_FROSTING.yAxis }
            labels = {{ useHTML: true, formatter: this.formatMoneyWithK }}>

            <YAxis.Title>{ getText(translations.i_benefitValue) }</YAxis.Title>

          </YAxis>

        </HighchartsChart>
      </div>
    );
  };  // Ends render()


  /** Adds translation-specific money designations
   *     (like a dollar sign for English) to the number value
   *     string Highcharts creates, then wraps it in a span with
   *     a class.
   * @method
   *
   * @params {highchartsObject} hcObject Object Highcharts sends to event
   *     handlers
   *
   * @returns {string} String representing an HTML element.
   * 
   * @example
   * let toShow = formatMoneyWithk({ axis: { defaultLabelFormatter: function () { return '10k'; }} });
   * console.log(toShow);
   * // If app's language code is 'en':
   * // <span class="graph-label">$10k</span>
   * // If app's language code is 'vi':
   * // <span class="graph-label">10k$</span>
   */
  formatMoneyWithK = (highchartsObject) => {
    return formatMoneyWithK(highchartsObject, this.props.translations);
  };
};  // Ends <ResourcesColumnsComp>


const ResourcesColumns = withHighcharts(ResourcesColumnsComp, Highcharts);


export { ResourcesColumns };
