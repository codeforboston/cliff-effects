/** Shared settings for the appearance of benefit charts
 *     that doesn't need to be calculated at the time of
 *     rendering.
 *
 * Some shared settings were left in place. They're
 *     connected to other stuff that's going on and it's
 *     probably better if they stay there for clarity.
 */
let CHART_FROSTING = {
  chart: {
    // reset zoom button placement
    resetZoomButton: {
      theme:      { zIndex: 200 },
      relativeTo: `chart`,
    },
  },

  legend: {
    align:         `center`,
    verticalAlign: `top`,
  },

  tooltip: {
    split:         true,
    valueDecimals: 2,
    padding:       8,
    borderRadius:  4,
    borderColor:   `transparent` ,
    hideDelay:     300,
  },

  xAxis: { endOnTick: false },

  plotLine: {
    zIndex:    5,
    width:     2,
    color:     `gray`,
    dashStyle: `ShortDashDot`,
  },

  yAxis: { endOnTick: false },
};


export { CHART_FROSTING };
