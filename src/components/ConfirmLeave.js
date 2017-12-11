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

  componentDidMount() {
    if (window.onbeforeunload != null) {
      throw new TypeError('Expected no event handler for `window.onbeforeunload`');
    }
    window.onbeforeunload = event => {
      if (!this.props.when) return; // do not block unload
      return (event.returnValue = this.props.message || '');
    };;
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  render() {
    return null;
  }
}

export default ConfirmLeave;
