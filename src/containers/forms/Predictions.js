import { connect } from 'react-redux';

import { PredictionsStep } from '../../forms/Predictions';

import { setCashValue } from '../../actions';

const mapStateToProps = (state) => {
  return { client: state.get('client') };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPredictionValue({ name, value }) {
      dispatch(
        setCashValue({
          time: 'future',
          name,
          value,
        })
      );
    },
  };
};

const PredictionsStepContainer = connect(mapStateToProps, mapDispatchToProps)(PredictionsStep);

export { PredictionsStepContainer as PredictionsStep };
