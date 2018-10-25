import React, { Component } from 'react';
import {
  Icon,
  Transition,
  Message,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { Surrounder } from '../components/Surrounder';


/** Really it's a top component that has a question mark
 *    next to it followed by a bottom one that starts
 *    as hidden, but is revealed when the question mark
 *    is clicked.
 *
 * @param {object} props
 * @param {object} props.children Must have exactly two
 *    children. The first is always visible. The second
 *    is revealed when the icon is clicked and then hidden
 *    when the icon is clicked again.
 */
class HeadingWithDetail extends Component {
  state = { showDetails: false };

  toggleDetails = () => {
    this.setState((prevState) => {
      return { showDetails: !prevState.showDetails };
    });
  };

  // For keyboard access
  // 'Icon' won't take `onKeyDown` event handler
  onKeyDown = (evnt) => {
    if (evnt.key === `Enter`) {
      this.toggleDetails();
    }
  };

  render () {
    const { showDetails } = this.state;

    const children  = this.props.children;
    if (!Array.isArray(children) || children.length !== 2) {
      // eslint-disable-next-line no-console
      console.warn(`<HeadingWithDetail> must have exactly two children`);
      return null;
    }

    const top       = children[ 0 ] || children,
          details   = children[ 1 ] || null;
    // Has a green question mark icon by default
    let iconName  = `question circle outline`,
        iconColor = `teal`;

    // Show a red 'x' instead if the detail is visible right now
    if (showDetails) {
      iconName  = `remove circle`;
      iconColor = `red`;
    }

    return (
      <div className = { `heading-with-detail` }>
        
        <Surrounder
          Right = {
            <span onKeyDown = { this.onKeyDown } >
              <Icon
                tabIndex  = { 0 }
                name      = { iconName }
                color     = { iconColor }
                className = { `details-icon` }
                onClick   = { this.toggleDetails } />
            </span>
          }
          Bottom = {
            <Transition
              visible   = { showDetails }
              animation = { `slide down` }>
              <Message>{ details }</Message>
            </Transition>
          }>
          <div className={ `has-details` }>{ top }</div>
        </Surrounder>
      </div>
    );
  }
}  // End <HeadingWithDetail>


/** @todo Have rows that can have details. Maybe other things too. */
class RowWithDetail extends Component {}  // <End RowWithDetail>


export {
  HeadingWithDetail,
  RowWithDetail,
};
