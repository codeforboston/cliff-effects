// REACT COMPONENTS
import React from 'react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { ControlledRadioYesNo } from './inputs';
import { allBenefitOrders } from '../programs/allBenefitOrders';


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
class CurrentBenefitsContent extends React.Component {
  handleRadioChange = (event, inputProps) => {
    const benefitName = inputProps.name;

    this.props.setHasBenefit(benefitName, inputProps.value);
  };

  render() {
    const { current, snippets, benefits } = this.props;

    const components = [];
  
    for (let benefitIndex = 0; benefitIndex < benefits.length; benefitIndex++) {
      const benefit = benefits[ benefitIndex ];

      const snippetKey = `i_has_${benefit}_label`;

      if (!(snippetKey in snippets)) {
        throw new Error(`No snippet found as label for benefit radio buttons; expected key "${snippetKey}"`);
      }

      const labelText = snippets[ snippetKey ];
  
      components.push(
        <ControlledRadioYesNo
          key={ benefit }
          snippets={ snippets }
          labelText={ labelText }
          onChange={ this.handleRadioChange }
          checked = { current.get('benefits').includes(benefit) }
          name    = { benefit } />
      );
    }

    return (
      <div>
        {components}
      </div>
    );
  }
}  // End CurrentBenefitsContent()

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
        currentClient = { currentClient }
        snippets      = { snippets }
        benefits      = { allBenefitOrders[ currentClient.get('USState') ] } />
    </FormPartsContainer>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };
