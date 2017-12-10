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

  addListener = (message = '') =>
    (this.listener = window.addEventListener(
      'beforeunload',
      event => (event.returnValue = message)
    ));

  removeListener = () => {
    if (this.listener !== undefined)
      window.removeEventListener('beforeunload', this.listener);
  };

  componentDidMount() {
    if (this.props.when) {
      this.addListener(this.props.message);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.when && !this.props.when) {
      this.addListener(nextProps.message);
    }
    if (nextProps.message !== this.props.message) {
      this.removeListener();
      this.addListener(nextProps.message);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return null;
  }
}

export default ConfirmLeave;
