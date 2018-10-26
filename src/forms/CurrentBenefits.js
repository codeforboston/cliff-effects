// REACT COMPONENTS
import React from 'react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { ControlledRadioYesNo } from './inputs';


class LocalizedRadioYesNo extends React.PureComponent {
  handleRadioChange = (event, data) => {
    this.props.setHasBenefit({ benefit: this.props.name, value: data.checked });
  };

  render() {
    return (
      <ControlledRadioYesNo
        checked   = { this.props.checked }
        labelText = { this.props.snippets[ `i_` + this.props.name + `Label` ] }
        name      = { this.props.name }
        onChange  = { this.handleRadioChange } />
    );
  }
}


/** Asks which benefits the user is currently receiving
 *
 * @todo Add 'vertical list of options' creator that will create a list of fields using the `.field-aligner` class
 *
 * @function
 * @param {object} props
 * @property {Immutable.Map} props.currentClient Client current info.
 * @property {function} props.setHasBenefit Sets whether the client has a particular benefit.
 * @property {function} props.snippets Uses user chosen language-specific
 *    snippets.
 *
 * @returns {object} Component
 */
const CurrentBenefitsContent = ({ currentClient, setHasBenefit, snippets }) => {

  var sharedProps = {
    setHasBenefit,
    snippets,
  };

  return (
    <div >
      <LocalizedRadioYesNo
        { ...sharedProps }
        checked = { currentClient.get('hasSection8') }
        name    = { 'hasSection8' } />
      <div className = { `question-spacer` } />
      <LocalizedRadioYesNo
        { ...sharedProps }
        checked = { currentClient.get('hasSnap') }
        name    = { 'hasSnap' } />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()

/**
 * @todo Combine with related components?
 *
 * @function
 * @param {object} props
 * @property {object} props.navData Bottom row buttons
 * @property {Immutable.Map} props.currentClient Immutable Map with current values.
 * @property {function} props.snippets Uses user chosen language-specific
 *    snippets.
 *
 * @returns {object} Component
 */
const CurrentBenefitsStep = ({ setHasBenefit, navData, currentClient, snippets }) => {

  return (
    <FormPartsContainer
      title     = { snippets.i_currentBenefits }
      clarifier = { snippets.i_selectBenefits }
      navData   = { navData }
      formClass = { `benefits` }
      formSize  = { `massive` }>
      <CurrentBenefitsContent
        setHasBenefit = { setHasBenefit }
        currentClient      = { currentClient }
        snippets     = { snippets } />
    </FormPartsContainer>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
