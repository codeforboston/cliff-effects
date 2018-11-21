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
import {
  formatMoneyWithK,
  snippetToText,
} from './chartStringTransformers';
import { zoom } from './zoom';

// DATA
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


// Graphs get things in monthly values, so we'll convert from there
let multipliers = timescaleMultipliers.fromMonthly,
    // Each graph controls its own scaling
    limits      = PROGRAM_CHART_VALUES.limits;


// Still @todo
// - [ ] Function descriptions
// - [ ] Test
// - [ ] ~Add highcharts global options to graph frosting file (change file name and maybe location)~
//          1. It's going to need the `snippets` object, which is a bigger change.
//          2. It's got `limits` too, so is it still just 'frosting?' Also, should we move all the
//          stuff in the src/utils/charts folder?
// - [ ] * Hover style for legend items (button-like style always, then different for active vs. inactive?)
// - [ ] * Hover style for plot line
// - [ ] * Legend item for PlotLine
// - [ ] * Bigger font?
// - [ ] * Different zoom note for touch device

// Possible future improvements:
// 1. Add PlotLine to Legend? Haven't found it yet and can't seem to do a
//     vertical series. Add/remove PlotLine (can add button to legend?) -
//     https://stackoverflow.com/a/14632292/3791179.
// 1. PlotLine hover style - has a mousein and mouseout hook we can use
//     to make it bigger when hovered over.
// 1. Possibly remove point markers on lines - https://stackoverflow.com/a/14642909/3791179.
// 1. Possible tooltips for PlotLine -
//     https://stackoverflow.com/questions/12451549/highcharts-plotband-tooltip-hover-default-styling#21277491.
//     CSS solution hides the label text except on hover (not great).
//     Maybe do something similar where the HTML has the label part
//     and a separate tooltip part and just hide/reveal the tooltip part.
// 1. Haven't figured out how to pan vertically. This might help, but
//     means chart may have set dimensions:
//     https://api.highcharts.com/highcharts/chart.scrollablePlotArea.
//     Not sure how it would act with zoom.

/** Graph of each benefit as household income changes. Uses Highchart lib.
 * @class
 *
 * @params {object} props
 * @params {object} props.client Data for current and future client circumstances.
 * @params {'Weekly'|'Monthly'|'Yearly'} props.timescale Should be `timeInterval`.
 * @params {string[]} props.activePrograms Benefit programs in which the household enrolled.
 * @params {object} props.className An extra class for the outermost component,
 *     whether it's the chart or the no-chart message.
 * @params {object} props.snippets Translation spans of text in app.
 */
class BenefitsLinesComp extends Component {

  constructor (props) {
    super(props);
    let separator = snippetToText(props.snippets.i_thousandsSeparator);
    // This doesn't affect the strings we put in there, just pure numbers
    Highcharts.setOptions({ lang: { thousandsSep: separator }});

    this.state = { altKeyClass: `` };
  }

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
      snippets,
    } = this.props;

    let classes = `benefits-lines-graph zoomable ` + this.state.altKeyClass;
    if (className) {
      classes += ` ` + className;
    }

    const multiplier    = multipliers[ timescale ],
          resources     = activePrograms,
          currentEarned = client.current.earned * multiplier,
          getText       = snippetToText;

    // Adjust to time-interval. Highcharts will round
    // for displayed ticks.
    const max      = (limits.max * multiplier),
          interval = ((max / 100) / 10);

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
          data = { dataset.data }
          onClick = { this.zoomPoint } />
      );

      lines.push(line);
    }

    // Get 'Unexpected template string expression' warning otherwise
    // @todo Abstract commonalities between graphs
    const labelHeaderFormatStart = `<span style="font-size: 10px">${getText(snippets.i_beforeMoney)}`,
          labelHeaderFormatEnd   = `{point.key:,.2f}${getText(snippets.i_afterMoney)}</span><br/>`,
          labelHeaderFormat      = labelHeaderFormatStart + labelHeaderFormatEnd;


    const plotOptions =  { line: { pointInterval: interval }};
    return (
      <div className={ classes }>
        <HighchartsChart plotOptions={ plotOptions }>

          <Chart
            onClick = { this.zoomChart }
            tooltip = {{ enabled: true }}
            panning = { true }
            panKey  = { `alt` }
            resetZoomButton = {{ theme: { zIndex: 200 }, relativeTo: `chart` }} />

          <Title>{ getText(snippets.i_benefitProgramsTitle) }</Title>

          <Legend
            align         = { `center` }
            verticalAlign = { `top` } />

          <Tooltip
            split         = { true }
            headerFormat  = { labelHeaderFormat }
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

            <XAxis.Title>{ `${timescale} ${getText(snippets.i_xAxisTitleEnd)}<br/>${getText(snippets.i_panInstructions)}` }</XAxis.Title>
            <PlotLine
              value     = { currentEarned }
              useHTML   = { true }
              label     = {{ text: `${getText(snippets.i_currentPayPlotLineLabel)}<br/>${toFancyMoneyStr(currentEarned)}`, rotation: 0 }}
              zIndex    = { 5 }
              width     = { 2 }
              color     = { `gray` }
              dashStyle = { `ShortDashDot` } />

          </XAxis>

          <YAxis
            endOnTick = { false }
            labels    = {{ useHTML: true, formatter: this.formatMoneyWithK }}
            crosshair = {{}}>

            <YAxis.Title>{ getText(snippets.i_benefitValue) }</YAxis.Title>
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
   * @params {object} highchartsObject Object Highcharts sends to event
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
    return formatMoneyWithK(highchartsObject, this.props.snippets);
  };

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

  zoomPoint (event) {
    let valuesAtMouse = {
          x: event.point.x,
          y: event.point.y,
        },
        axes = {
          x: this.xAxis,
          y: this.yAxis,
        };
    zoom(event, this.chart, valuesAtMouse, axes);
  };

  handleKeyDown = (event) => {
    if (event.key === `Alt`) {
      this.setState({ altKeyClass: `alt-down` });
    }
  };

  handleKeyUp = (event) => {
    if (event.key === `Alt`) {
      this.setState({ altKeyClass: `` });
    }
  };
};


const BenefitsLines = withHighcharts(BenefitsLinesComp, Highcharts);


export { BenefitsLines };
