import { connect } from 'react-redux';

import { CurrentIncomeStep } from '../../forms/CurrentIncome';

import { setCashValue } from '../../actions';

const mapStateToProps = (state) => {
  return {
    currentClient: state.getIn([
      'client',
      'current', 
    ]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIncomeValue({ name, value }) {
      dispatch(
        setCashValue({
          time: 'current',
          name,
          value,
        })
      );
    },
  };
};

const CurrentIncomeStepContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentIncomeStep);

export { CurrentIncomeStepContainer as CurrentIncomeStep };
