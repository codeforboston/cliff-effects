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
  stackedTitle,
} from '../../utils/charts/chartFunctions';

// DATA
// Colors and text for parts of the chart
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';


const BarGraph = function({ client }) {

  var curr = client.current;

  var
      { benefitCurrent: SNAPBenefitCurrent, benefitFuture: SNAPBenefitFuture } = getBenefitTimeFrames(client, 'hasSnap', getSNAPBenefits),
      { benefitCurrent: sec8BenefitCurrent, benefitFuture: sec8BenefitFuture } = getBenefitTimeFrames(client, 'hasSection8', getSection8Benefit),
      { incomeCurrent, incomeFuture } = getIncomeTimeFrames(client);

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
          title: stackedTitle,
          label: formatLabel,
        },
      },
    },
  };


  return (
    <Bar { ...stackedBarProps } />
  );

};  // End <BarGraph>


export { BarGraph };
