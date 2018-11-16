import { connect } from 'react-redux';

import { HouseholdStep } from '../../forms/Household';
import {
  addMember,
  removeMember,
  setMemberIsDisabled,
  setMemberRole,
  setMemberAge,
} from '../../actions';

const time = 'current';

const mapStateToProps = (state) => {
  return {
    household: state.getIn([
      'client',
      'current',
      'household', 
    ]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMemberAge({ index, age }) {
      dispatch(
        setMemberAge({
          time,
          index,
          age,
        })
      );
    },

    setMemberIsDisabled({ index, isDisabled }) {
      dispatch(
        setMemberIsDisabled({
          time,
          index,
          isDisabled,
        })
      );
    },

    setMemberRole({ index, role }) {
      dispatch(
        setMemberRole({
          time,
          index,
          role,
        })
      );
    },

    removeMember({ index }) {
      dispatch(
        removeMember({
          time,
          index,
        })
      );
    },

    addMember({ member }) {
      dispatch(
        addMember({
          time,
          member,
        })
      );
    },
  };
};

const HouseholdStepContainer = connect(mapStateToProps, mapDispatchToProps)(HouseholdStep);

export { HouseholdStepContainer as HouseholdStep };
