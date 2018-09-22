// LOGIC
import { getSection8Benefit } from '../../programs/massachusetts/section8';
import { getSNAPBenefits } from '../../programs/federal/snap';


// For development
var benefitsInOrder = [
  `income`,
  `section8`,
  `snap`,
];

var benefitOps = {
  income: {
    calc: function (client, timeframe) {
      return client[ timeframe ].earned;
    },
    getNewProps: function (client, timeframe, newSubsidy) {
      return {};
    },
  },
  section8: {
    calc:        getSection8Benefit,
    getNewProps: function (client, timeframe, newSubsidy) {
      let timedClient = client[ timeframe ];
      return { rentShare: timedClient.contractRent - newSubsidy };
    },
  },
  snap: {
    calc:        getSNAPBenefits,
    getNewProps: function (client, timeframe, newSubsidy) {
      return {};
    },
  },
};
// End for development


/** 'getBenefits' by a more useful name. Mutates
 *     two objects - the client and data objects
 *     handed in. It builds up the data for each
 *     benefit.
 *
 * @param {array} activeBenefits List of benefits the caller wants calculated
 * @param {object} dataToAddTo Contains or will contain arrays, for each
 *     benefit. Data will be pushed onto those arrays.
 * @param {object} clientToChange Client data, both 'current' and 'future',
 *     which will be mutated as each benefit affects its values for the
 *     next benefit.
 * @param {string} timeframe Either 'current' or 'future', whichever is
 *     supposed to be calculated.
 */
const applyAndPushBenefits = function (activeBenefits, dataToAddTo, clientToChange, timeframe) {
  for (let benefiti = 0; benefiti < benefitsInOrder.length; benefiti ++) {

    let benefitName = benefitsInOrder[ benefiti ];

    // If this isn't one of the benefits the caller wants
    if (activeBenefits.indexOf(benefitName) <= -1) {
      continue;  // skip this loop
    }

    // If this benefit doesn't exist in the object, add it
    if (!Array.isArray(dataToAddTo[ benefitName ])) {
      dataToAddTo[ benefitName ] = [];
    }

    // Calculate new subsidy and the client props that are affected
    let funcs    = benefitOps[ benefitName ],
        subsidy  = funcs.calc(clientToChange, timeframe),
        newProps = funcs.getNewProps(clientToChange, timeframe, subsidy);

    // Mutate the client so this benefit will affect the next one
    Object.apply(clientToChange[ timeframe ], newProps);

    // Add an item to that particular benefit
    dataToAddTo[ benefitName ].push(subsidy);

  }  // end for every benefit possible

  // Everything's been mutated, there's nothing to return
  return;
};  // End applyAndPushBenefits


export { applyAndPushBenefits };
