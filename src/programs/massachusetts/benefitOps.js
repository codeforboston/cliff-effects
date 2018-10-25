import { getSection8Benefit } from './section8';
import { getSNAPBenefits } from '../federal/snap';


const benefitOps = {
  section8: {
    calc:        getSection8Benefit,
    getNewProps: function (client, timeframe, newSubsidy) {
      const timedClient = client[ timeframe ];
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


export { benefitOps };
