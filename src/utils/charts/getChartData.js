import _ from 'lodash';
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';

// LOGIC
import { getSection8Benefit } from '../../programs/massachusetts/section8';
import { getSNAPBenefits } from '../../programs/federal/snap';


/** Order in which benefits must be run to affect
 *     each other correctly. @todo Store this
 *     where it can be easily edited by non-coders
 */
var benefitOrder = [
  `income`,
  `section8`,
  `snap`,
];

/** Container for functions so we can access them
 *     as we iterate.
 */
var getBenefit = {
  income: {
    getSubsidy: function (client, timeframe) {
      return client.future.earned;
    },
    getProps: function () {
      return {};
    },
  },
  section8: {
    getSubsidy: getSection8Benefit,
    getProps:   function (client, newSubsidy) {
      return { rentShare: newSubsidy };
    },
  },
  snap: {
    getSubsidy: getSNAPBenefits,
    getProps:   function (client, newSubsidy) {
      return {};
    },
  },
};

/** Returns various arrays of values over change in income */
var getData = {};

getData.income = function (xRange, client, multiplier) {
  return xRange;
};  // End getData.income

getData.snap = function (xRange, client, multiplier) {

  var data = xRange.map(function (income) {
    client.future.earned = income / multiplier;  // Turn it back into monthly
    return getSNAPBenefits(client, 'future') * multiplier;
  });

  return data;
};  // End getData.snap


getData.section8 = function (xRange, client, multiplier) {

  // How the heck did I calculate subsidy amount for the past
  // considering I only know the current subsidy amount? I'm
  // worried about that.
  var data = xRange.map(function (income) {
    // New renting data
    client.future.earned  = income / multiplier;  // Turn it back into monthly
    var monthlySubsidy    = getSection8Benefit(client, 'future');
    return monthlySubsidy * multiplier;
  });

  return data;
};  // End getData.section8()

/** Mutates `benefitDatasets` items to push new data onto
 *     their `.data` prop.
 * 
 * @todo Research how to jsdoc arrays of objects
 *
 * @param {array} xRange All income values to be included.
 * @param {object} clone Clone of the client object
 * @param {object} clone.future
 * @param {object} clone.client
 * @param {float} multiplier Adjusts income and data
 *     values (meant to adjust to weekly, monthly, and yearly amounts)
 * @param {array} benefitDatasets List of datasets, one for
 *     each benefit.
 * @param {object} benefitDatasets[n]
 * @param {string} benefitDatasets[n].name Name of the benefit
 * @param {array} benefitDatasets[n].data List to which output
 *     will be pushed.
 * 
 * @returns undefined
 */
const insertBenefitData = function (xRange, clone, multiplier, benefitDatasets) {

  // Don't loop if there's nothing to do
  if (benefitDatasets.length === 0) {
    return;
  }

  // Otherwise, loop over incomes
  for (var incomei = 0; incomei < xRange.length; incomei++) {
    var income = xRange[ incomei ];
    clone.future.earned = income / multiplier;

    // Datasets need to be in correct order for benefits to
    // affect each other corrrectly.
    for (let benefiti = 0; benefiti < benefitDatasets.length; benefiti++) {

      let dataset = benefitDatasets[ benefiti ],
          name    = dataset.benefitName,
          funcs   = getBenefit[ name ];

      let monthlyAmount = funcs.getSubsidy(clone, `future`);
      dataset.data.push(monthlyAmount * multiplier);

      // Mutate the clone in whatever way is appropriate for
      // that program.
      let newPropValues = funcs.getProps(clone, monthlyAmount);
      Object.assign(clone, newPropValues);

    }  // end for each benefit, in order

  }  // end for all incomes

  return;
};  // End insertBenefitData()


/** Returns the graph data formated in a way our graph library understands.
 * 
 * @param {array} activeBenefits List of active benefits. @todo - use object instead?
 * */
const getDatasets = function (xRange, client, multiplier, activeBenefits, extraProps) {

  // Don't want to change actual client's data
  var clone    = _.cloneDeep(client),
      datasets = [];

  for (let benefiti = 0; benefiti < benefitOrder.length; benefiti++) {

    let benefitName = benefitOrder[ benefiti ];

    if (activeBenefits.indexOf(benefitName) > -1) {

      var graphFrosting = PROGRAM_CHART_VALUES[ benefitName ];

      datasets.push({
        benefitName:     benefitName,
        label:           graphFrosting.name,
        backgroundColor: graphFrosting.color,
        borderColor:     graphFrosting.color,
        data:            [],  // Will be populated later
        ...extraProps[ benefitName ],  // Override other props
      });
    }
  }  // end for benefits (in correct order)

  // Mutates each `.data` prop for each benefit
  insertBenefitData(xRange, clone, multiplier, datasets);

  return datasets;
};  // End getDatasets()


export {
  benefitOrder,
  getBenefit,
  getData,
  insertBenefitData,
  getDatasets,
};
