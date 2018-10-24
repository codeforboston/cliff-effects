import { connect } from 'react-redux';

import { Summary } from '../../../forms/output/Summary';

const mapStateToProps  = (state) => {
  return { client: state.get('client') };
};

export default connect(mapStateToProps)(Summary);
