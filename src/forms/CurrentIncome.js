// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { ImmutableCashFlowInputsRow as CashFlowInputsRow } from './cashflow';


// ========================================
// COMPONENTS
// ========================================
/* Move to program calculations
 * @todo Figure out which programs need to know which types of incomes
 * and categorize/tag them accordingly.
 * @todo Calc and store `client.currentUnearnedIncomeMonthly`? I think
 * we do still have to keep the other specific income soruces separate
 * as they're possibly used in other calculations.
 * @todo Stuff like interest of bank accounts? (unearned income?)
 * @todo Other assets (not counted in gross income? income categories?)
 * @todo Relevant? "State housing programs base eligibility on net yearly income.
 * Net yearly income does not include funds such as wages earned by full-time
 * students, worker's compensation, and a certain amount of wages earned by a
 * tenant 62 or older. It also allows you to deduct certain amounts, such as
 * necessary medical expenses and personal care services." (@see {@link
 * http://www.masslegalhelp.org/housing/financial-eligibility})
 */

/**
 * @todo Add note: "Household income (a before tax income, and does not include
 * funds such as income from children under 18 years old, amounts received
 * through training programs funded by HUD, and the income of a live-in aide)"
 * (@see {@link http://www.masslegalhelp.org/housing/financial-eligibility})
 */

/** Contents of income step. Abstract to allow entry of `future` values too.
 *
 * @function
 * @param {object} props
 * @property {Immutable.Map} props.currentClient Client current info. Could be
 *     changed to just 'client' to allow future values in abstraction.
 * @property {string} props.time 'current' or 'future'. (needed?)
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {function} props.snippets Uses user chosen language-specific text.
 *
 * @returns {object} React element
 */
const IncomeForm = function ({ client, setIncomeValue, snippets }) {

  var type = 'income';

  var sharedProps = {
    timeState: client,
    type:      type,
    setValue:  setIncomeValue,
  };

  return (
    <div className='field-aligner two-column'>

      <IntervalColumnHeadings type={ type } />

      {/* All kinds of things need to be explained. */}
      
      <CashFlowInputsRow
        { ...sharedProps }
        generic='earned'>
        { snippets.earnedIncome.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='TAFDC'> 
        { snippets.TAFDC.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='SSI'> 
        { snippets.SSI.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='SSDI'>
        { snippets.SSDI.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='childSupportIn'>
        { snippets.childSupport.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='unemployment'> 
        { snippets.unemployment.i_label }      
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='workersComp'> 
        { snippets.workersComp.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='pension'>
        { snippets.pension.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='socialSecurity'>
        { snippets.socialSecurity.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='alimony'> 
        { snippets.alimony.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='otherIncome'>
        { snippets.otherIncome.i_label }
      </CashFlowInputsRow>
      <Form.Field>{ snippets.i_explainSnapCalculation }</Form.Field>

    </div>
  );  // end return

};  // End IncomeForm()


/**
 * @function
 * @param {object} props
 * @property {function} props.setIncomeValue Updates the state of an income value.
 * @property {object} props.navData Bottom row buttons. 
 * @property {object} props.client JSON object with `future` and `current` props.
 * @property {function} props.snippets Uses user chosen language-specific text.
 *
 * @returns {object} React element
 */
const CurrentIncomeStep = function ({ setIncomeValue, navData, currentClient, snippets }) {
// `props` is a cloned version of the original props. References broken.

  return (
    <FormPartsContainer
      title     = { snippets.i_title }
      clarifier = { snippets.i_clarifier }
      navData   = { navData }
      formClass = { `income` }>
      <IncomeForm
        setIncomeValue = { setIncomeValue }
        client={ currentClient }
        snippets={ snippets } />
    </FormPartsContainer>
  );

};  // End CurrentIncomeStep()


export {
  CurrentIncomeStep,
  IncomeForm,
};
