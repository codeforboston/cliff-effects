import _ from 'lodash';
import { PROGRAM_CHART_VALUES } from '../../utils/charts/PROGRAM_CHART_VALUES';

// LOGIC
import { getSNAPBenefits } from '../../programs/federal/snap';
import { getSection8Benefit } from '../../programs/massachusetts/section8';


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

  var data = xRange.map(function (income) {
    // New renting data
    client.future.earned  = income / multiplier;  // Turn it back into monthly
    var monthlySubsidy    = getSection8Benefit(client, 'future');
    return monthlySubsidy * multiplier;
  });

  return data;
};  // End getData.section8()


/** Returns the graph data formated in a way our graph library understands. */
const getDatasets = function (xRange, client, multiplier, activePrograms, extraProps) {

  var datasets = [];

  for (let programi = 0; programi < activePrograms.length; programi++) {

    let programName   = activePrograms[ programi ],
        graphFrosting = PROGRAM_CHART_VALUES[ programName ];

    datasets.push({
      label:           graphFrosting.name,
      backgroundColor: graphFrosting.color,
      borderColor:     graphFrosting.color,
      /** Need a new object so client's data doesn't get changed. */
      data:            getData[ programName ](xRange, _.cloneDeep(client), multiplier),
      ...extraProps[ programName ],
    });
  }  // end for programs in program chart values

  return datasets;
};  // End getDatasets()


export {
  getData,
  getDatasets,
};
