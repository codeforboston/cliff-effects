// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';


// ========================================
// COMPONENTS
// ========================================
/* Move to program calculations:
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

/** Contents of income step. Abstracted to allow entry of `future` values too.
 *
 * @function
 * @param {object} props
 * @property {object} props.current Client current info. Could be
 *     changed to just 'client' to allow future values in abstraction.
 * @property {string} props.time 'current' or 'future'. (needed?)
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {function} props.translations Uses user chosen language-specific text.
 *
 * @returns {object} React element
 */
const IncomeForm = function ({ current, time, updateClientValue, translations }) {

  let type = `income`;

  /** Makes sure values are propagated to 'future' properties if needed
   * @member
   * @depricated
   */
  let ensureFuture = function (evnt, inputProps) {
    updateClientValue(evnt, { ...inputProps, fillFuture: true });
  };

  let sharedProps = {
    timeState:         current,
    time:              time,
    type:              type,
    updateClientValue: ensureFuture,
  };

  return (
    <div className={ `field-aligner two-column` }>

      <IntervalColumnHeadings type={ type } />

      {/* Need to give user more info on these. */}
      
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `earned` }>
        { translations.earnedIncome.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `TAFDC` }> 
        { translations.TAFDC.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `SSI` }> 
        { translations.SSI.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `SSDI` }>
        { translations.SSDI.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childSupportIn` }>
        { translations.childSupport.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `unemployment` }> 
        { translations.unemployment.i_label }      
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `workersComp` }> 
        { translations.workersComp.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `pension` }>
        { translations.pension.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `socialSecurity` }>
        { translations.socialSecurity.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `alimony` }> 
        { translations.alimony.i_label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `otherIncome` }>
        { translations.otherIncome.i_label }
      </CashFlowInputsRow>
      <Form.Field>{ translations.i_explainSnapCalculation }</Form.Field>

    </div>
  );  // ends return

};  // Ends <IncomeForm>


/**
 * @function
 * @param {object} props
 * @property {function} props.updateClientValue Updates state upstream.
 * @property {object} props.navData Bottom row buttons. 
 * @property {object} props.client JSON object with `future` and `current` props.
 * @property {function} props.translations Uses user chosen language-specific text.
 *
 * @returns {object} React element
 */
const CurrentIncomeStep = function ({ updateClientValue, navData, client, translations }) {
// `props` is a cloned version of the original props. References broken.

  return (
    <FormPartsContainer
      title     = { translations.i_title }
      clarifier = { translations.i_clarifier }
      navData   = { navData }
      formClass = { `income` }>
      <IncomeForm
        updateClientValue = { updateClientValue }
        current           = { client.current }
        time              = { 'current' }
        translations      = { translations } />
    </FormPartsContainer>
  );

};


export {
  CurrentIncomeStep,
  IncomeForm,
};
