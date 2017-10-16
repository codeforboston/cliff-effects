/**
* All benefit programs' return value should be an instance of Result class.
*
* @todo Implement `.expirationDate`to track  when data needs to be update
* @external
* @class
* @param {object}
* @param {string} trial.result - 'good', 'warning', or 'bad' are the proposed
* three values, but right now they're 'good', 'information', and 'warning'
* @param {string} trial.details - Explanation of results that will be seen
* by the user. Examples: 'All good!', 'Because your income is x% above some
* value, your benefit amount could go down soon.'
* @param {string} trial.benefitValue - Monthly subsidy benefit will provide.
* @param {object} trial.data -  other information if needed. The code using your `.data` will have to know
* what to expect in there.
*/

class Result {
  constructor ( trial ) {
    this.result       = trial.result;
    this.details      = trial.details;
    this.benefitValue = trial.benefitValue;
    this.data         = trial.data;
  }
};

export { Result }
