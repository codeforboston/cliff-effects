import React from 'react';
import { Bar } from 'react-chartjs-2';

// COMPONENT HELPER FUNCTIONS
import {
  formatAxis,
  formatLabel,
  formatStackedTitle,
} from '../../utils/charts/chartFormatting';
import { applyAndPushBenefits } from '../../programs/applyAndPushBenefits';

// DATA
// Colors and text for parts of the chart
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';

// OBJECT MANIPULATION
import { cloneDeep } from 'lodash';


/** Visual representation of the table
 *
 * Alternatives:
 * 1. Stacked area graph for two data points
 * 2. Line graph of difference of just total money coming in
 * 
 * @param {object} client Full client object, with current
 *     and future. All client props are needed.
 */
const StackedBarGraph = function({ client }) {

  var clone = cloneDeep(client),
      curr  = clone.current;

  var allData         = {},
      activeBenefits  = [
        `earned`,
        ...curr.benefits,
      ];

  var currentCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `current`,
  };
  applyAndPushBenefits (currentCalcData);

  // Add to the `current` data already there
  var futureCalcData = {
    activeBenefits: activeBenefits,
    dataToAddTo:    allData,
    clientToChange: clone,
    timeframe:      `future`,
  };
  applyAndPushBenefits (futureCalcData);

  var datasets    = [],
      moneyLabels = [];
  for (let bName of activeBenefits) {

    let frosting = PROGRAM_CHART_VALUES[ bName ],
        dataset  = {
          label:           frosting.name,
          backgroundColor: frosting.color,
          data:            allData[ bName ],
        };

    if (bName === `earned`) {
      dataset.fill = `origin`;
      for (let amount of dataset.data) {
        moneyLabels.push(Math.round(amount));
      }
    }

    datasets.push(dataset);
  }  // end for each benefit in order

  const stackedBarProps = {
    data: {
      labels:   moneyLabels,
      datasets: datasets,
    },
    options: {
      title: {
        display: true,
        text:    'Money Coming In as Pay Changes',
      },
      scales: {
        yAxes: [
          {
            stacked:    true,
            scaleLabel: {
              display:     true,
              labelString: 'Total Money Coming In ($)',
            },
            ticks: {
              beginAtZero: true,
              callback:    formatAxis,
            },
          }, 
        ],
        xAxes: [
          {
            stacked:    true,
            scaleLabel: {
              display:     true,
              labelString: 'Monthly Pay ($)',
            },
            ticks: { callback: formatAxis },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: formatStackedTitle,
          label: formatLabel,
        },
      },
    },
  };


  return (
    <Bar { ...stackedBarProps } />
  );

};  // End <StackedBarGraph>


export { StackedBarGraph };
