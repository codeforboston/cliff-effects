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
  AreaSeries,
  withHighcharts,
} from 'react-jsx-highcharts';

// LOGIC
import { timescaleMultipliers } from '../../utils/convert-by-timescale';
import { getChartData } from './getChartData';
import { toFancyMoneyStr } from './chartFormatting';
import {
  setThousandsSeparator,
  textFromTranslatedElement,
  formatMoneyWithK,
} from './chartStringTransformers';
import { zoom } from './zoom';

// DATA
import { BENEFIT_CHART_VALUES } from './BENEFIT_CHART_VALUES';


// Graphs get things in monthly values, so we'll convert from there
let multipliers = timescaleMultipliers.fromMonthly,
    // Each graph controls its own scaling
    limits      = BENEFIT_CHART_VALUES.limits;


// Still @todo
// - [ ] Function descriptions
// - [ ] Abstract pan key?

/** Graph of all incoming resources as household income changes. Uses Highchart lib.
 * @class
 *
 * @params {object} props
 * @params {object} props.client Data for current and future client circumstances.
 * @params {'Weekly'|'Monthly'|'Yearly'} props.timescale Should be `timeInterval`.
 * @params {string[]} props.activePrograms Benefit programs in which the household enrolled.
 * @params {object} props.className An extra class for the outermost component,
 *     whether it's the chart or the no-chart message.
 * @params {object} props.translations Translation spans of text in app.
 */
class StackedResourcesComp extends Component {

  constructor (props) {
    super(props);
    setThousandsSeparator(props.translations, Highcharts);
    this.state = { altKeyClass: `` };
  };

  componentDidMount () {
    document.addEventListener(`keydown`, this.handleKeyDown);
    document.addEventListener(`keyup`, this.handleKeyUp);
  };

  componentWillUnmount () {
    document.removeEventListener(`keydown`, this.handleKeyDown);
    document.removeEventListener(`keyup`, this.handleKeyUp);
  };

  render () {
    const {
      client,
      timescale,
      activePrograms,
      className,
      translations,
    } = this.props;

    let classes = `resources-stacked zoomable ` + this.state.altKeyClass;
    if (className) {
      classes += ` ` + className;
    }

    let multiplier    = multipliers[ timescale ],
        resources     = [ `earned` ].concat(activePrograms),
        currentEarned = client.current.earned * multiplier,
        getText       = textFromTranslatedElement;

    // Adjust to time-interval. Highcharts will round
    // for displayed ticks.
    let max      = (limits.max * multiplier),
        interval = ((max / 100) / 10);

    let xRange   = range(limits.min, max, interval),  // x-axis/earned income numbers
        datasets = getChartData(xRange, multiplier, client, resources, {});

    // Data to stack
    let lines = [];
    for (let dataseti = 0; dataseti < datasets.length; dataseti++) {
      let dataset = datasets[ dataseti ],
          line = (
            <AreaSeries
              key         = { dataset.label }
              id          = { dataset.label.replace(` `, ``) }
              name        = { dataset.label }
              data        = { dataset.data }
              legendIndex = { dataseti }
              onClick     = { this.zoomPoint } />
          );

      lines.unshift(line);
    }

    // Label for split tooltip 'labels'/'label headers' that appear
    // at the bottom. Really long.
    // @todo Change to prep for context, like in @knod 'other-expenses' branch
    let bottomTooltipFormatStart = `<span class="tooltip-label-header">${getText(translations.i_beforeMoney)}`,
        bottomTooltipFormatEnd   = `{point.key:,.2f}${getText(translations.i_afterMoney)}</span><br/>`,
        bottomTooltipFormat      = bottomTooltipFormatStart + bottomTooltipFormatEnd;


    let plotOptions =  {
      area:   { stacking: `normal`, pointInterval: interval },
      series: { marker: { enabled: false }},  // No dots on the lines
    };

    // @todo Abstract different component attributes as frosting
    return (
      <div className={ classes }>
        <HighchartsChart plotOptions={ plotOptions }>

          <Chart
            onClick = { this.zoomChart }
            tooltip = {{ enabled: true }}
            panning = { true }
            panKey  = { `alt` }
            resetZoomButton = {{ theme: { zIndex: 200 }, relativeTo: `chart` }} />

          <Title>{ getText(translations.i_benefitProgramsTitle) }</Title>

          <Legend
            align         = { `center` }
            verticalAlign = { `top` } />

          <Tooltip
            split         = { true }
            headerFormat  = { bottomTooltipFormat }
            valuePrefix   = { `$` }
            valueDecimals = { 2 }
            padding       = { 8 }
            borderRadius  = { 4 }
            borderColor   = { `transparent`  }
            hideDelay     = { 300 } />

          <XAxis
            endOnTick = { false }
            labels    = {{ formatter: this.formatMoneyWithK }}
            crosshair = {{}}>

            <XAxis.Title>{ `${timescale} ${getText(translations.i_xAxisTitleEnd)}<br/>${getText(translations.i_panInstructions)}` }</XAxis.Title>
            <PlotLine
              value     = { currentEarned }
              useHTML   = { true }
              label     = {{ text: `${getText(translations.i_currentPayPlotLineLabel)}<br/>${toFancyMoneyStr(currentEarned)}`, rotation: 0 }}
              zIndex    = { 5 }
              width     = { 2 }
              color     = { `gray` }
              dashStyle = { `ShortDashDot` } />

          </XAxis>

          <YAxis
            endOnTick = { false }
            labels    = {{ useHTML: true, formatter: this.formatMoneyWithK }}
            crosshair = {{}}>

            <YAxis.Title>{ getText(translations.i_benefitValue) }</YAxis.Title>
            { lines }

          </YAxis>

        </HighchartsChart>

      </div>
    );
  }  // Ends render()

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

  /** Sends data to `zoom()` when the chart itself is clicked
   *     on, formatted in the way that `zoom()` needs.
   * @param {object} event Highcharts event object
   * @returns nothing (but in future may be a message if
   *     zooming is blocked)
   */
  zoomChart (event) {
    let valuesAtMouse = {
          x: event.xAxis[ 0 ].value,
          y: event.yAxis[ 0 ].value,
        },
        axes = {
          x: event.xAxis[ 0 ].axis,
          y: event.yAxis[ 0 ].axis,
        };
    zoom(event, this, valuesAtMouse, axes);
  };

  /** Sends data to `zoom()` when a stacked-line chart series
   *     point is clicked on, formatted in the way that `zoom()`
   *     needs.
   * @param {object} event Highcharts event object
   * @returns nothing (but in future may be a message if
   *     zooming is blocked)
   */
  zoomPoint (event) {
    let valuesAtMouse = {
          x: event.point.x,
          y: event.point.total,
        },
        axes = {
          x: this.xAxis,
          y: this.yAxis,
        };
    zoom(event, this.chart, valuesAtMouse, axes);
  };

  /** Alters class name based on which keys were depressed.
   *     Right now, it's use is to detect someone using the 'alt'
   *     key so that the mouse cursor image can be changed to
   *     show the user can pan the chart.
   *
   * @param {object} event Highcharts event object
   * @returns nothing
   */
  handleKeyDown = (event) => {
    if (event.key === `Alt`) {
      this.setState({ altKeyClass: `alt-down` });
    }
  };

  /** Alters class name based on which keys were released.
   *     Right now, it's use is to detect someone letting go of
   *     the 'alt' key so that the mouse cursor image can be
   *     changed to show the user can zoom on the chart.
   *
   * @param {object} event Highcharts event object
   * @returns nothing
   */
  handleKeyUp = (event) => {
    if (event.key === `Alt`) {
      this.setState({ altKeyClass: `` });
    }
  };
};  // Ends <StackedResourcesComp>


let StackedResources = withHighcharts(StackedResourcesComp, Highcharts);


export { StackedResources };
