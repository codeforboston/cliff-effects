// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { IntervalColumnHeadings } from '../components/headings';
import { CashFlowInputsRow } from './cashflow';

/**
* @todo Figure out which programs need to know which types of incomes
* and categorize/tag them accordingly.
*
* @todo Calc and store `client.currentUnearnedIncomeMonthly`. I think
* we do still have to keep the other specific income soruces separate
* as they're possibly used in other calculations.
*/

// ========================================
// COMPONENTS
// ========================================
/**
* @todo Is it possible for id's to be the same as the text in the label?
* @todo Stuff like interest of bank accounts? (unearned income?)
* @todo Other assets (not counted in gross income? income categories?)
* @todo Add note: "Household income (a before tax income, and does not include
* funds such as income from children under 18 years old, amounts received
* through training programs funded by HUD, and the income of a live-in aide)"
* (@see {@link http://www.masslegalhelp.org/housing/financial-eligibility})
* @todo Relevant? "State housing programs base eligibility on net yearly income.
* Net yearly income does not include funds such as wages earned by full-time
* students, worker's compensation, and a certain amount of wages earned by a
* tenant 62 or older. It also allows you to deduct certain amounts, such as
* necessary medical expenses and personal care services." (@see {@link
* http://www.masslegalhelp.org/housing/financial-eligibility})
*/

/** @todo description
 *
 * @function
 * @param {object} props - See below
 * @property {object} props.current - Client current info.
 * @property {string} props.time - 'current' or 'future'
 * @property {function} props.updateClientValue - Updates state upstream.
 * @property {function} props.snippets - Uses user chosen language-specific
 *
* @returns Component
*/
const IncomeForm = function ({ current, time, updateClientValue, snippets }) {

  var type = 'income';

  /** Makes sure values are propagated to 'future' properties if needed */
  var ensureFuture = function (evnt, inputProps) {
    updateClientValue(evnt, { ...inputProps, fillFuture: true });
  };  // End ensureFuture()

  var sharedProps = {
    timeState:         current,
    time:              time,
    type:              type,
    updateClientValue: ensureFuture,
  };

  return (
    <div className='field-aligner two-column'>

      <IntervalColumnHeadings type={ type } />

      {/* All kinds of things need to be explained. */}
      
      <CashFlowInputsRow
        { ...sharedProps }
        generic='earned'>
        { snippets.earnedIncome.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='TAFDC'> 
        { snippets.TAFDC.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='SSI'> 
        { snippets.SSI.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='SSDI'>
        { snippets.SSDI.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='childSupportIn'>
        { snippets.childSupport.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='unemployment'> 
        { snippets.unemployment.label }      
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='workersComp'> 
        { snippets.workersComp.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='pension'>
        { snippets.pension.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='socialSecurity'>
        { snippets.socialSecurity.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='alimony'> 
        { snippets.alimony.label }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic='otherIncome'>
        { snippets.otherIncome.label }
      </CashFlowInputsRow>
      <Form.Field>{ snippets.explainSnapCalculation }</Form.Field>

    </div>
  );  // end return

};  // End IncomeForm()


/** @todo description
 *
 * @function
 * @param {object} props - See below.
 * @property {function} props.updateClientValue - Updates state upstream.
 * @property {object} props.navData  - properties for two buttons and middle compponent TBD 
 * @property {object} props.client - JSON object with future and current values.
 * @property {function} props.snippets - Uses user chosen language-specific
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.

const CurrentIncomeStep = function ({ updateClientValue, navData, client, snippets }) {

  return (
    <Form className = 'income-form flex-item flex-column'>
      <FormPartsContainer
        title     = { snippets.title }
        clarifier = { snippets.clarifier }
        navData   = { navData }>
        <IncomeForm
          updateClientValue = { updateClientValue }
          current={ client.current }
          time={ 'current' }
          snippets={ snippets } />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentIncomeStep()


export { CurrentIncomeStep };
