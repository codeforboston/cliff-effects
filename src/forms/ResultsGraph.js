import _ from 'lodash'
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

// Logic
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/massachusetts/housing';

// Our Components
import { FormPartsContainer } from './formHelpers';

const ResultsGraph = (props) => {
  var xRange = _.range(0, 100000, 1000);
  /** Need a new object so client's data doesn't get changed. */
  var fakeClient = _.cloneDeep( props.client );

  var snapData = xRange.map(annualIncome => {
      fakeClient.future.earned = annualIncome/12;
      return getSNAPBenefits(fakeClient, 'future') * 12});

  /** Section-8 Housing Choice Voucher */
  /** @todo Base this rent on FMR areas and client area of residence if no rent available. */
  fakeClient.current.contractRent = fakeClient.current.contractRent || 700;
  fakeClient.current.earned = 0;
  var housingData = xRange.map(function ( annualIncome ) {
    // New renting data
    fakeClient.future.earned = annualIncome/12;

    var monthlySubsidy  = getHousingBenefit( fakeClient, 'future' ),
        yearlySubsidy   = monthlySubsidy * 12;

    // Prep for next loop
    var newShare = fakeClient.current.contractRent - monthlySubsidy;
    fakeClient.current.rentShare  = newShare;
    fakeClient.current.earned     = annualIncome/12;

    return yearlySubsidy;
  });

  // TAFDC color? "rgba(206, 125, 61, 1)"

  const barProps = {
    data: {
      labels: xRange,
      datasets: [
        {
          label: "SNAP",
          backgroundColor: "rgba(101, 47, 138, 1)",
          data: snapData
        },
        {
          label: "Section 8 Housing",
          backgroundColor: "rgba(206, 203, 61, 1)",
          data: housingData
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Benefit Eligibility for Household Size ' +
          props.client.householdSize
      },
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
              labelString: 'Benefit Value ($)'
          },
          ticks: {
            beginAtZero: true,
            /*
              * function to add $ and 1,000s separators to graph axes
              * we are using chart.js v2.7 so it requires a callback function
              */
            callback: function(label) {
              return label.toLocaleString("en-US");
            }
          }
        }],
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
              labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: function(label) {
              return label.toLocaleString("en-US");
            }
          }
        }]
      },
        /*
         * default tooltip for chart.js 2.0+  when unspecified looks like:
         *
         * options: {
         *   tooltips: {
         *       callbacks: {
         *           label: function(tooltipItem, data) {
         *               return tooltipItem.yLabel;
         *           }
         *       }
         *   }
         * }
         *
         */
      tooltips: {
        callbacks: {
          // format the title of the tooltips to be in USD
          title: function(tooltipItems, data) {
            return data.labels[tooltipItems[0].index].toLocaleString(
              "en-US",
              {style:"currency",currency:"USD"}
            ).replace('.00','');
          },
          /*
            * to add number formatting to the tooltips. returns the data label
            * + currency format
            * from https://github.com/chartjs/Chart.js/issues/2386
            */
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ": " +
              tooltipItem.yLabel.toLocaleString(
                "en-US",
                {style:"currency", currency:"USD"}
              ).replace('.00','');
          }
        }
      }
    }
  };

  const lineProps = {
    data: {
      labels: xRange.slice(0, 50),
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgba(60, 136, 206, 0.55)",
          data: xRange.slice(0, 50),
          fill: "origin"
        },
        {
          label: "SNAP",
          backgroundColor: "rgba(101, 47, 138, 0.55)",
          data: snapData.slice(0, 50)
        },
        {
          label: "Section 8 Housing",
          backgroundColor: "rgba(206, 203, 61, 0.55)",
          data: housingData.slice(0, 50)
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Benefit Eligibility for Household Size ' +
          props.client.householdSize
      },
      elements: {
        line: {
          fill: '-1'
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 10
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
              labelString: 'Benefit Value ($)'
          },
          ticks: {
            beginAtZero: true,
            /*
              * function to add $ and 1,000s separators to graph axes
              * we are using chart.js v2.7 so it requires a callback function
              */
            callback: function(label) {
                return label.toLocaleString("en-US");
            }
          }
        }],
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
              labelString: 'Annual Income ($)'
          },
          ticks: {
            callback: function(label) {
                return label.toLocaleString("en-US");
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          title: function(tooltipItems, data) {
            const { index } = tooltipItems[0];
            return _.sumBy(data.datasets, dataset => dataset.data[index]).toLocaleString(
              "en-US",
              {style:"currency",currency:"USD"}
            ).replace('.00','');
          },
          label: function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ": " +
              tooltipItem.yLabel.toLocaleString(
                "en-US",
                {style:"currency", currency:"USD"}
              ).replace('.00','');
          }
        }
      }
    }
  }

  // Non-saving version for first prototype testing
  return (
    <div className = 'result-page flex-item flex-column'>
      <FormPartsContainer
        title     = {'Graphs'}
        left      = {{ name: 'Go Back', func: props.previousStep }}
        right      = {{ name: 'Reset', func: props.resetClient }}
      >
         <div>
           <Bar {...barProps} />
           <Line {...lineProps} />
          </div>
      </FormPartsContainer>
    </div>
  )

};  // End Results()

export default ResultsGraph
