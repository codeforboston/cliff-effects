import React from 'react';
import { Bar } from 'react-chartjs-2';

// COMPONENT HELPER FUNCTIONS
import {
  getBenefitTimeFrames,
  getIncomeTimeFrames,
} from '../../utils/getTimeFrames';
import { getSNAPBenefits } from '../../programs/federal/snap';
import { getSection8Benefit } from '../../programs/massachusetts/section8';
import {
  formatAxis,
  formatLabel,
  formatStackedTitle,
} from '../../utils/charts/chartFormatting';

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
* @param {object} client - full client object, with current
*     and future. All client props are needed.
*/
const StackedBarGraph = function({ client }) {

  var clone = cloneDeep(client),
      curr  = clone.current,
      {
        benefitCurrent: sec8BenefitCurrent,
        benefitFuture:  sec8BenefitFuture,
      } = getBenefitTimeFrames(clone, 'hasSection8', getSection8Benefit);

  // Mutate clone for correct SNAP calculations
  clone.future.rentShare = (clone.future.contractRent - sec8BenefitFuture);

  var {
        benefitCurrent: SNAPBenefitCurrent,
        benefitFuture:  SNAPBenefitFuture,
      } = getBenefitTimeFrames(clone, 'hasSnap', getSNAPBenefits),
      { incomeCurrent, incomeFuture } = getIncomeTimeFrames(clone);

  var snapData    = [
        SNAPBenefitCurrent,
        SNAPBenefitFuture, 
      ],
      housingData = [
        sec8BenefitCurrent,
        sec8BenefitFuture, 
      ],
      incomeData  = [
        incomeCurrent,
        incomeFuture, 
      ];

  const SNAPColor     = PROGRAM_CHART_VALUES.snap.color,
        SNAPName      = PROGRAM_CHART_VALUES.snap.name,
        section8Color = PROGRAM_CHART_VALUES.section8.color,
        section8Name  = PROGRAM_CHART_VALUES.section8.name,
        incomeColor   = PROGRAM_CHART_VALUES.income.color,
        incomeName    = PROGRAM_CHART_VALUES.income.name;

  var datasets = [
    {
      label:           incomeName,
      backgroundColor: incomeColor,
      data:            incomeData,
      fill:            'origin',
    },
  ];

  if (curr.hasSnap) {
    datasets.push({
      label:           SNAPName,
      backgroundColor: SNAPColor,
      data:            snapData,
    });
  }

  if (curr.hasSection8) {
    datasets.push({
      label:           section8Name,
      backgroundColor: section8Color,
      data:            housingData,
    });
  }

  const stackedBarProps = {
    data: {
      labels:   incomeData,
      datasets: datasets,
    },
    options: {
      title: {
        display: true,
        text:    'Money Coming In as Income Changes',
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
              labelString: 'Monthly Income ($)',
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
