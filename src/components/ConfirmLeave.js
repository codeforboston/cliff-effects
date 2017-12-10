import React from 'react';

/**
 * Ask the user for confirmation to leave the page.
 * @extends React.Component
 *
 * @param props {object}
 * @param props.when {boolean} - Whether the component should block
 * @param props.message {string} - The message the browser shows, maybe
 */
class ConfirmLeave extends React.Component {
  static defaultProps = {
    when: true
  };

  handleBeforeUnload = event => (event.returnValue = this.props.message || '');

  componentDidMount() {
    if (this.props.when) {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.when && !this.props.when) {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    }
    if (!nextProps.when && this.props.when) {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  render() {
    return null;
  }
}

export default ConfirmLeave;
