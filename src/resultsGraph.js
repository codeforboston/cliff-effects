import _ from 'lodash'
import React from 'react';
import { Line } from 'react-chartjs-2';

// Logic
import { getSNAPBenefits } from './programs/state/massachusetts/snap';
import { getHousingBenefit } from './programs/state/massachusetts/housing';
import { getMassHealthEligibility } from './programs/state/massachusetts/masshealth';

// Our Components
import { FormPartsContainer } from './forms/formHelpers';

const ResultsGraph = (props) => {
  var xRange = _.range(0, 100000, 1000);
  /** Need a new object so client's data doesn't get changed. */
  var fakeClient = { ...props.client };

  var massHealthData = xRange.map(x => {
      fakeClient.annualIncome = x;
      return getMassHealthEligibility(fakeClient).benefitValue});

  var snapData = xRange.map(annualIncome => {
      fakeClient.futureEarnedIncomeMonthly = annualIncome/12;
      return getSNAPBenefits(fakeClient).benefitValue * 12});

  /** Section-8 Housing Choice Voucher */
  /** @todo Base this rent on FMR areas and client area of residence if no rent available. */
  fakeClient.currentContractRentMonthly = 700;
  fakeClient.currentEarnedIncomeMonthly = 0;
  var housingData = xRange.map(function ( annualIncome ) {
    // New renting data
    fakeClient.futureEarnedIncomeMonthly = annualIncome/12;

    var result  = getHousingBenefit( fakeClient ),
        subsidy = result.benefitValue * 12;

    // Prep for next loop
    var newShare = result.data.newRentShare
    fakeClient[ 'currentRentShareMonthly' ] = newShare;
    fakeClient.currentEarnedIncomeMonthly   = annualIncome/12;

    return subsidy;
  });

  var data = {
    labels: xRange,
    datasets: [{
        label: "MassHealth",
        borderColor: "rgba(206, 125, 61, 1)",
        data: massHealthData,
        fill: false,
    },
    {
      label: "SNAP",
      borderColor: "rgba(101, 47, 138, 1)",
      data: snapData, //xRange.map(x => ({ annualIncome: x, householdSize: props.client.householdSize }).benefitValue),
      fill: false
    },
    {
      label: "Section 8 Housing",
      borderColor: "rgba(206, 203, 61, 1)",
      data: housingData, //xRange.map(x => getHousingBenefit({ annualIncome: x, householdSize: props.client.householdSize }).benefitValue),
      fill: false
    },
    ]};

  var options = {
    title: {
      display: true,
        text: 'Benefit Eligibility for Household Size ' +
                props.client.householdSize
    },
    showLines: true,
    scales: {
        yAxes: [{
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
                return data.labels[tooltipItems[0].index].toLocaleString("en-US",
                    {style:"currency",currency:"USD"}).replace('.00','');
            },
            /*
             * to add number formatting to the tooltips. returns the data label
             * + currency format
             * from https://github.com/chartjs/Chart.js/issues/2386
             */
            label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ": " +
                    tooltipItem.yLabel.toLocaleString("en-US",{style:"currency",
                        currency:"USD"}).replace('.00','');
            }
        }
    }
  };

  // return (
  //   <wrapper className = 'result-page'>
  //     <FormPartsContainer
  //       title     = {'Results'}
  //       left      = {{ name: 'Go Back', func: props.previousStep }}
  //       right     = {{ name: 'Save Results', func: () => props.saveForm(false) }}
  //        <div> <Line data={data} options={options} /> </div>
  //     </FormPartsContainer>
  //   </wrapper>
  // )

  // Non-saving version for first prototype testing
  return (
    <wrapper className = 'result-page'>
      <FormPartsContainer
        title     = {'Results'}
        left      = {{ name: 'Go Back', func: props.previousStep }}
      >
         <div> <Line data={data} options={options} /> </div>
      </FormPartsContainer>
    </wrapper>
  )

};  // End Results()

export default ResultsGraph
