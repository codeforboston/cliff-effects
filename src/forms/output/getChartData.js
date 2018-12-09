import _ from 'lodash';
import { BENEFIT_CHART_VALUES } from './BENEFIT_CHART_VALUES';

// LOGIC
import { applyAndPushBenefits } from '../../benefits/applyAndPushBenefits';


/** Returns the graph data formated in a way our graph
 *     library understands.
 *
 * @todo Change `activeBenefitsInOrder` to an array of
 *     objects with a `name` prop that already contain
 *     graph frosting? Shouldn't each graph take care
 *     of its own frosting?
 * 
 * @param {array} incomes List of numbers representing
 *     each datapoint in the graph.
 * @param {number} multiplier Number to convert from the
 *     given time interval to monthly and back again -
 *     benefit calculations are done with monthly values.
 * @param {object} client Full client data, `current` and
 *     `future` to be cloned, not mutated.
 * @param {array} activeBenefitsInOrder Array of strings
 *     of names of benefits in the order that we want them
 *     to show up in the graph.
 * @param {object} extraGraphProps Extra graph frosting on
 *     top of base frosting
 * */
const getChartData = function (incomes, multiplier, client, activeBenefitsInOrder, extraGraphProps) {
  // Change client data to include object with array
  // of benefits in the order we want?

  // Should activeBenefits be an array of objects, each
  // with their graph props and a name that's then used
  // to get benefits' data in the right order?
  // [{name: `income`, ...}, {name: `section8`, ...}]
  // Existing `name` prop would be changed to `label`

  // Active benefits should include 'income' if want it

  // Shorter name now that we've clearly expressed what it is
  let benefits = activeBenefitsInOrder;

  let benefitDatasets = [],
      allData         = {},  // each active benefit will have data in here
      clone           = _.cloneDeep(client),
      benefitCalcData = {
        activeBenefits: benefits,
        dataToAddTo:    allData,
        clientToChange: clone,
        timeframe:      `future`,
      };

  for (let incomei = 0; incomei < incomes.length; incomei++) {
    let income = incomes[ incomei ];
    // May be worth looking at how incomes are being
    // created and whether they need to use the
    // multiplier as early as they do.
    clone.future.earned = income / multiplier;

    // Collect datasets in `allData`. Mutates `clone` and `allData`.
    applyAndPushBenefits(benefitCalcData);

    // Adjust money amount to correct time interval (weekly, monthly, or yearly)
    for (let benefiti = 0; benefiti < benefits.length; benefiti++) {
      let benefitName = benefits[ benefiti ],
          val         = allData[ benefitName ][ incomei ] * multiplier;
      allData[ benefitName ][ incomei ] = val;
    }  // ends for all active benefits
  }  // ends for all incomes

  // Return in the same order as it was asked for
  for (let benefiti = 0; benefiti < benefits.length; benefiti++) {
    let benefitName   = benefits[ benefiti ],
        graphFrosting = BENEFIT_CHART_VALUES[ benefitName ];

    // All the graph info for that benefit
    benefitDatasets.push({
      label:           graphFrosting.name,
      backgroundColor: graphFrosting.color,
      borderColor:     graphFrosting.color,
      data:            allData[ benefitName ],
      ...extraGraphProps[ benefitName ],  // Override other props
    });
  }

  return benefitDatasets;
};  // Ends getChartData()


export { getChartData };
