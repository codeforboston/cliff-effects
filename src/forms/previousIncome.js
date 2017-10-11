// REACT COMPONENTS
import React from 'react';
import { Form, Divider } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, IntervalColumnHeadings, CashFlowRow } from './formHelpers';

/**
* @todo Figure out which programs need to know which types of incomes
* and categorize/tag them accordingly.
* 
* @todo Calc and store `client.previousUnearnedIncomeMonthly`. I think
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
const IncomeForm = function ( props ) {

  var time    = 'previous',
      type    = 'income',
      client  = props.client,
      origin  = props.props;


  /** Makes sure values are propagated to 'current' properties if needed */
  var ensureCurrent = function ( evnt, inputProps ) {
    
    var keyOfCurr = inputProps.name.replace( 'previous', 'current' );
    if ( !client[ keyOfCurr ] ) {
      origin.storeComplex( evnt, { name: keyOfCurr, value: inputProps.value } );
    }

    // Do the usual thing too
    origin.storeComplex( evnt, inputProps );

  };  // End ensureCurrent()


  var sharedProps = { client: client, type: type, time: time,
                      storeComplex: ensureCurrent };

  return (
    <div className='field-aligner two-column'>

      <IntervalColumnHeadings type={type}/>

      {/* All kinds of things need to be explained. */}
      <CashFlowRow  {...sharedProps} generic={'EarnedIncome'} labelInfo={'(Weekly income = hourly wage times average number of work hours per week)'}>
          Earned income
      </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'TAFDC'}> TAFDC </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'SSI'}> SSI </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'SSDI'}> SSDI </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'ChildSupportIn'}> Child support coming in </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'Unemployment'}> Unemployment </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'WorkersComp'}> Worker’s comp </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'Pension'}> Pension </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'SocialSecurity'}> Social security </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'Alimony'}> Alimony </CashFlowRow>
      <CashFlowRow {...sharedProps} generic={'OtherIncome'}> Other income </CashFlowRow>
      <Divider/>
      <CashFlowRow {...sharedProps} generic={'IncomeExclusions'}> Income exclusions </CashFlowRow>

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
const PreviousIncomeStep = function ( props ) {

  /** @todo Are these titles accurate now? */
  return (
    <Form className = 'income-form'>
      <FormPartsContainer
        title     = 'Previous Household Income'
        clarifier = 'Income that you expected to collect during the 12 months following the previous assessment'
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
          <IncomeForm client={props.pageState} props={props}/>
      </FormPartsContainer>
    </Form>
  );

};  // End PreviousIncomeStep()


export { PreviousIncomeStep };
