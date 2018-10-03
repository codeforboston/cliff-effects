// REACT COMPONENTS
import React from 'react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { ControlledRadioYesNo } from './inputs';


const LocalizedRadioYesNo = function ({ snippets, checked, name, updateClientValue }) {
  return (
    <ControlledRadioYesNo
      checked   = { checked }
      labelText = { snippets[ `i_` + name + `Label` ] }
      name      = { name }
      onChange  = { updateClientValue } />
  );
};


/**
 * @todo Add 'vertical list of options' creator that will create a list of fields using the `.field-aligner` class
 *
 * @function
 * @param {object} props See below.
 * @property {object} props.current Client current info.
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {function} props.snippets Uses user chosen language-specific
 *    snippets.
 *
 * @returns {object} Component
 */
const CurrentBenefitsContent = ({ current, updateClientValue, snippets }) => {

  var sharedProps = {
    updateClientValue: updateClientValue,
    snippets:          snippets,
  };

  return (
    <div >
      <LocalizedRadioYesNo
        { ...sharedProps }
        checked = { current.hasSection8 }
        name    = { 'hasSection8' } />
      <div className = { `question-spacer` } />
      <LocalizedRadioYesNo
        { ...sharedProps }
        checked = { current.hasSnap }
        name    = { 'hasSnap' } />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()

/** @todo Abstract all the step components?
 *
 * @function
 * @param {object} props See below.
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {function} props.snippets Uses user chosen language-specific
 *    snippets.
 * @property {object} props.client JSON object with future and current values.
 * @property {function} props.nextStep Go to next form section.
 *
 * @returns {object} Component
 */
const CurrentBenefitsStep = ({ updateClientValue, navData, client, snippets }) => {

  return (
    <FormPartsContainer
      title     = { snippets.i_currentBenefits }
      clarifier = { snippets.i_selectBenefits }
      navData   = { navData }
      formClass = { `benefits` }
      formSize  = { `massive` }>
      <CurrentBenefitsContent
        updateClientValue = { updateClientValue }
        current      = { client.current }
        snippets     = { snippets } />
    </FormPartsContainer>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
