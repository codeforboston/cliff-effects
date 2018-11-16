import { connect } from 'react-redux';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';
import { setHasBenefit } from '../../actions';

const mapStateToProps = (state) => {
  return {
    currentClient: state.getIn([
      'client',
      'current', 
    ]),

    USState: state.getIn([
      'geography',
      'state',
    ]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHasBenefit({ benefit, value }) {
      dispatch(
        setHasBenefit({
          time: 'current',
          benefit,
          value,
        })
      );
    },
  };
};

const CurrentBenefitsContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentBenefitsStep);

export { CurrentBenefitsContainer as CurrentBenefitsStep };
