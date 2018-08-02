import React, { Component } from 'react';
import {
  Icon,
  Transition,
  Message,
} from 'semantic-ui-react';


class HeadingWithDetail extends Component {
  state = { showDetails: false };

  toggleDetails = () => {
    if (this.state.showDetails) {
      this.setState({ showDetails: false });
    } else {
      this.setState({ showDetails: true });
    }
  };

  render () {
    var { showDetails } = this.state;

    var children  = this.props.children,
        top       = children[ 0 ] || children,
        details   = children[ 1 ] || null,
        iconName  = `question circle outline`,
        iconColor = `teal`;

    if (showDetails) {
      iconName  = `remove circle`;
      iconColor = `red`;
    }

    return (
      <div>
        <div className={ `has-details` }>{ top }</div>
        <Icon
          name      = { iconName }
          color     = { iconColor }
          className = { `details-icon` }
          onClick   = { this.toggleDetails } />
        <Transition
          visible   = { showDetails }
          animation = { `slide down` }>
          <Message>{ details }</Message>
        </Transition>
      </div>
    );
  };
};  // End <HeadingWithDetail>


/** @todo Have rows that can have details. Maybe other things too. */
class RowWithDetail extends Component {};  // <End RowWithDetail>


export {
  HeadingWithDetail,
  RowWithDetail,
};
