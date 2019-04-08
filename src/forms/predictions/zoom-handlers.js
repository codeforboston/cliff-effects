// Works until you get into the lowest x-axis unit
// allowed, at which point only y gets zoomed in


// Zoom functionality that's shared between charts


/** Sends data to `zoom()` when the chart itself is clicked
 *     on, formatted in the way that `zoom()` needs.
 * @param {object} event Highcharts event object
 * @returns nothing (but in future may be a message if
 *     zooming is blocked)
 */
const zoomChart = function (event) {
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


/** Proportional zooming in charts. Mutator.
 *
 * @param {object} event Whatever event highchart sends. Should have a `.altKey`
 * @param {object} chart Highcharts `chart` object to show reset zoom button.
 * @param {object} valuesAtMouse
 * @param {number} valuesAtMouse.x X-axis graph value (earnings) at mouse position.
 * @param {number} valuesAtMouse.y Y-axis graph value (total in) at mouse position.
 * @param {object} axes
 * @param {object} axes.x Highcharts `xAxis` object
 * @param {object} axes.y Highcharts `yAxis` object
 *
 * @returns nothing */
const zoom = function (event, chart, valuesAtMouse, axes) {
  // Don't mess with panning
  if (event.altKey === true) {
    return true;  // continue with what you were doing?
  }

  let xVal      = valuesAtMouse.x,
      yVal      = valuesAtMouse.y,
      xAxis     = axes.x,
      yAxis     = axes.y,
      xExtremes = xAxis.getExtremes(),
      yExtremes = yAxis.getExtremes(),
      xAxisMin  = xExtremes.min,
      xAxisMax  = xExtremes.max,
      yAxisMin  = yExtremes.min,
      yAxisMax  = yExtremes.max;

  xAxisMin = Math.max(0, xAxisMin);
  xAxisMax = Math.min(xAxis.dataMax, xAxisMax);
  yAxisMin = Math.max(0, yAxisMin);
  yAxisMax = Math.min(yAxis.dataMax, yAxisMax);

  // Trim off a proportionally equal amount from each edge
  // to keep the right ratio of the dimensions of the graph
  // so it doesn't get warped.
  const ZOOM_BASE_X = 1 / 6 * (xAxisMax - xAxisMin),
        ZOOM_BASE_Y = 1 / 6 * (yAxisMax - yAxisMin);

  let xRaw = {
        min: xVal - ZOOM_BASE_X,
        max: xVal + ZOOM_BASE_X,
      },
      yRaw = {
        min: yVal - ZOOM_BASE_Y,
        max: yVal + ZOOM_BASE_Y, 
      },
      xMin = Math.max(0, xRaw.min),
      xMax = Math.min(xAxis.dataMax, xRaw.max),
      yMin = Math.max(0, yRaw.min),
      yMax = Math.min(yAxis.dataMax, yRaw.max);

  // If we had to crop off a side, our zoom rectangle doesn't
  // match the graph rectangle ratios any more. Get back to the
  // right ratio.
  if (xMin > xRaw.min) {
    xMax += Math.abs(xMin - xRaw.min);
  }
  if (xMax < xRaw.max) {
    xMin -= Math.abs(xRaw.max - xMax);
  }
  if (yMin > yRaw.min) {
    yMax += Math.abs(yMin - yRaw.min);
  }
  if (yMax < yRaw.max) {
    yMin -= Math.abs(yRaw.max - yMax);
  }

  xAxis.setExtremes(xMin, xMax);
  yAxis.setExtremes(yMin, yMax);

  chart.showResetZoom();

};  // Ends zoom()


export {
  zoomChart,
  zoom,
};
