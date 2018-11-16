import { connect } from 'react-redux';

import { CurrentExpensesStep } from '../../forms/CurrentExpenses';

import { setCashValue, setHousingType, setPaysUtility, setGetsFuelAssistance } from '../../actions';

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
    setExpenseValue({ name, value }) {
      dispatch(
        setCashValue({
          time: 'current',
          name,
          value,
        })
      );
    },

    setHousingType({ housingType }) {
      dispatch(
        setHousingType({
          time: 'current',
          housingType,
        })
      );
    },

    setPaysUtility({ utility, paysUtility }) {
      dispatch(
        setPaysUtility({
          time: 'current',
          utility,
          paysUtility,
        })
      );
    },

    setGetsFuelAssistance({ getsAssistance }) {
      dispatch(
        setGetsFuelAssistance({
          time: 'current',
          getsAssistance,
        })
      );
    },
  };
};

const CurrentExpensesStepContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentExpensesStep);

export { CurrentExpensesStepContainer as CurrentExpensesStep };
