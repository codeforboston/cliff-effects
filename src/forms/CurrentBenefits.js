// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import FormPartsContainer from './FormPartsContainer';
import { ControlledRadioYesNo } from './inputs';


const LocalizedRadioYesNo = function ({ snippets, checked, name, updateClientValue }) {

  return (
    <ControlledRadioYesNo
      checked            = { checked }
      labelText          = { snippets[ name ][ 'label' ] }
      name               = { name }
      updateClientValue = { updateClientValue } />
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
        checked   = { current.hasSection8 }
        name      = { 'hasSection8' } />
      <LocalizedRadioYesNo
        { ...sharedProps }
        checked   = { current.hasSnap }
        name      = { 'hasSnap' } />
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
    <Form
      size='massive'
      className='household-size-form flex-item flex-column'>
      <FormPartsContainer
        title     = { snippets.currentBenefits }
        clarifier = { snippets.selectBenefits }
        navData   = { navData }>
        <CurrentBenefitsContent
          updateClientValue = { updateClientValue }
          current      = { client.current }
          snippets     = { snippets } />
      </FormPartsContainer>

    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
