import { connect } from 'react-redux';

import App from '../components/App';
import { setUSState, setLanguage } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    setUSState({ state }) {
      dispatch(setUSState({ state }));
    },

    setLanguage({ language }) {
      dispatch(setLanguage({ language }));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
