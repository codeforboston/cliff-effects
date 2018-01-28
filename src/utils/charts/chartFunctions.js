import _ from 'lodash';

// Helper functions to format vlaues
const toFancyMoneyStr = function ( toFormat ) {
  return toFormat.toLocaleString("en-US", {style:"currency",currency:"USD"}).replace('.00','');
}

const formatAxis = function ( label ) {
  /* Adds 1,000s separators to graph axes */
  return label.toLocaleString( "en-US" );
};

const formatTitle = function (tooltipItems, data) {
  var toFormat = data.labels[tooltipItems[0].index];
  return toFancyMoneyStr( toFormat );
};

const formatLabel =  function(tooltipItem, data) {
  /* From https://github.com/chartjs/Chart.js/issues/2386 */
  return data.datasets[tooltipItem.datasetIndex].label
          + ": " + toFancyMoneyStr( tooltipItem.yLabel );
}

const stackedTitle = function(tooltipItems, data) {
  const { index } = tooltipItems[0];
  return toFancyMoneyStr( _.sumBy( data.datasets, dataset => dataset.data[index] ))
}


export {
  toFancyMoneyStr,
  formatAxis,
  formatTitle,
  formatLabel,
  stackedTitle
}
