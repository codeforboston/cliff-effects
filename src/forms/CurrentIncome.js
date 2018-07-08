// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';

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
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
const IncomeForm = function ({ current, time, setClientProperty, snippets }) {

  var type = 'income';

  /** Makes sure values are propagated to 'future' properties if needed */
  var ensureFuture = function (evnt, inputProps) {
    setClientProperty(evnt, { ...inputProps, fillFuture: true });
  };  // End ensureFuture()

  var sharedProps = {
    timeState:         current,
    time:              time,
    type:              type,
    setClientProperty: ensureFuture,
  };

  return (
    <div className='field-aligner two-column'>

      <IntervalColumnHeadings type={ type } />

      {/* All kinds of things need to be explained. */}
      
      <CashFlowRow
        { ...sharedProps }
        generic='earned'>
        { snippets.earnedIncome.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='TAFDC'> 
        { snippets.TAFDC.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='SSI'> 
        { snippets.SSI.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='SSDI'>
        { snippets.SSI.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='childSupportIn'>
        { snippets.childSupport.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='unemployment'> 
        { snippets.unemployment.label }      
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='workersComp'> 
        { snippets.workersComp.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='pension'>
        { snippets.pension.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='socialSecurity'>
        { snippets.socialSecurity.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='alimony'> 
        { snippets.alimony.label }
      </CashFlowRow>
      <CashFlowRow
        { ...sharedProps }
        generic='otherIncome'>
        { snippets.otherIncome.label }
      </CashFlowRow>
      <Form.Field>{ snippets.explainSnapCalculation }</Form.Field>

    </div>
  );  // end return

};  // End IncomeForm()


/** @todo description
*
* @function
* @param {object} props
* @property {object} props.__ - explanation
*
* @returns Component
*/
// `props` is a cloned version of the original props. References broken.
/** @todo  Make currentIncomeStep compatible with CurrentBenefitsStep
 *         currentBenefits looks like this:
 *         const CurrentBenefitsStep = ({ changeClient, nextStep, client, snippets })
*/
const CurrentIncomeStep = function (props) {

  const setTimeProp = getTimeSetter('current', props.changeClient);
  const snippets = props.snippets;

  return (
    <Form className = 'income-form flex-item flex-column'>
      <FormPartsContainer
        title     = { snippets.title }
        clarifier = { snippets.clarifier }
        left      = {{ name: 'Previous', func: props.previousStep }}
        right     = {{ name: 'Next', func: props.nextStep }}>
        <IncomeForm
          setClientProperty={ setTimeProp }
          current={ props.client.current }
          time={ 'current' }
          snippets={ snippets } />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentIncomeStep()


export { CurrentIncomeStep };
