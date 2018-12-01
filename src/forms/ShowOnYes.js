import React from 'react';

// PROJECT COMPONENTS
import { ControlledRadioYesNo } from './inputs';
import { ContentH1 } from '../components/headings';
import { Surrounder } from '../components/Surrounder';

/**
 * Yes/No radio buttons. 'Yes' reveals the given Component(s)
 *
 * @param {object} props
 * @param {boolean} props.showChildrenAtStart Whether to start with the
 *     given children as showing or hidden.
 * @param {string} props.childName Child name for unique radio input id.
 * @param {string | object} props.question Yes/no question for user to answer.
 * @param {string | object} props.heading Heading for this section.
 * @param {object} props.children Components to be revealed.
 * @param {function} [props.onYes] Run when 'Yes' is selected.
 * @param {function} [props.onNo] Run when 'No' is selected.
 *
 * @returns {object} Component
 */
class ShowOnYes extends React.Component {
  constructor (props) {
    super(props);
    this.state = { show: props.showChildrenAtStart || false };
  };

  handleChange = (evt, inputProps) => {
    if (inputProps.value === true) {
      this.showChildren(evt);
    } else {
      this.hideChildren(evt);
    }
  };

  showChildren = (evnt) => {
    this.setState({ show: true });
    if (this.props.onYes) {
      this.props.onYes(evnt);
    }
  };

  hideChildren = (evnt) => {
    this.setState({ show: false });
    if (this.props.onNo) {
      this.props.onNo(evnt);
    }
  };

  // Instead of a header and children, discuss using
  // a function instead that would return a heading
  // and contents.
  render () {

    const {
      childName,
      question,
      heading,
      children,
      ...rest
    } = this.props;

    let show = this.state.show;
    return (
      <div className={ `show-on-yes` }>

        <ContentH1>{ heading }</ContentH1>

        <Surrounder { ...rest } >
          <ControlledRadioYesNo
            labelText = { question }
            checked   = { show }
            name      = { `confirm_` + childName }
            onChange  = { this.handleChange } />
        </Surrounder>
        
        { show ? (children) : (null) }

      </div>
    );
  };
};  // Ends <ShowOnYes>


export { ShowOnYes };
