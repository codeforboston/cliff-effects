import React from 'react';

// PROJECT COMPONENTS
import { ControlledRadioYesNo } from './inputs';
import { ContentH1 } from '../components/headings';

/**
 * Yes/No radio buttons. 'Yes' reveals the given Component(s)
 * 
 * @param {object} props See below
 * @param {object} props.clientPartial - Current or future client data.
 * @param {string} props.propName - Client prop name to store user's choice.
 * @param {function} props.updateClientValue
 * @param {string} props.question - Yes/no question for user.
 * @param {string} props.heading - Heading for this section.
 * @param {object} props.children - Components to be revealed.
 * 
 * @returns {object} Component
 */
class ShowOnYes extends React.Component {

  handleChange = (evt, inputProps) => {

    if (inputProps.value === 'Yes') {
      this.showChildren(evt);
    } else {
      this.hideChildren(evt);
    }

  };

  showChildren = (evt) => {
    const { propName, updateClientValue } = this.props;
    updateClientValue(evt, {
      name:  propName,
      value: true,
    });
  };

  hideChildren = (evt) => {
    const { propName, updateClientValue } = this.props;
    updateClientValue(evt, {
      name:  propName,
      value: false,
    });
  };

  // Instead of a header and children, discuss using
  // a function instead that would return a heading
  // and contents.
  render() {
    const {
      clientPartial,
      propName,
      question,
      heading,
      children,
    } = this.props;

    const showChildren = clientPartial[ propName ];

    return (
      <div className = { `show-on-yes` }>

      	<ContentH1>{ heading }</ContentH1>
        <ControlledRadioYesNo
          labelText         = { question }
          checked           = { showChildren }
          name              = { 'confirm_' + propName }
          updateClientValue = { this.handleChange } />
        
        {showChildren && children }

      </div>
    );
  }
}


export { ShowOnYes };
