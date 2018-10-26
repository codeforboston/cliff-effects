import { connect } from 'react-redux';

import { CurrentBenefitsStep } from '../../forms/CurrentBenefits';
import { setClientValue } from '../../actions';

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
    setHasBenefit({ benefit, value }) {
      dispatch(
        setClientValue({
          time:  'current',
          route: [ benefit ],
          value,
        })
      );
    },
  };
};

const CurrentBenefitsContainer = connect(mapStateToProps, mapDispatchToProps)(CurrentBenefitsStep);

export { CurrentBenefitsContainer as CurrentBenefitsStep };
