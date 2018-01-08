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

  confirm = event => {
    if (!this.props.when) return; // do not block unload
    return (event.returnValue = this.props.message || '');
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.confirm);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.confirm);
  }

  render() {
    return null;
  }
}

export default ConfirmLeave;
