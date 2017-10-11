// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer, MassiveToggle, FormHeading, IntervalColumnHeadings, CashFlowRow
} from './formHelpers';


// ========================================
// COMPONENTS
// ========================================

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const Housing = function ( props ) {

  let client        = props.pageState,
      time          = props.time;

  // `hasHousing` is actually whether they're in the housing voucher program
  let ownedAHome  = client[ time + 'Homeowner' ],
      wasHomeless = client[ time + 'Homeless' ] && !client.hasHousing && !ownedAHome,
      rented      = !wasHomeless && !ownedAHome;

  let utils = client[ time + 'PaidUtilities' ], climate = client[ time + 'GotClimateControl' ],
      electricity = client[ time + 'NonHeatElectricity' ], phone = client[ time + 'Phone' ];


  /** Makes sure values are propagated to 'current' properties if needed */
  let ensureCurrComplex = function ( evnt, inputProps ) {
    
<<<<<<< HEAD

    let keyOfCurr = inputProps.name.replace( 'previous', 'current' );
=======
    let keyOfCurr = inputProps.id.replace( 'previous', 'current' );
>>>>>>> 2097f11f7ef1608d0fbf3c3db939d5077e6d7c2c
    if ( !client[ keyOfCurr ] ) {
      props.storeComplex( evnt, { name: keyOfCurr, value: inputProps.value } );
    }

    // Do the usual thing too
    props.storeComplex( evnt, inputProps );

  };  // End ensureCurrComplex()


  /** Makes sure values are propagated to 'current' properties if needed */
  let ensureCurrChecked = function ( evnt, inputProps ) {
    
<<<<<<< HEAD
	let keyOfCurr = inputProps.name.replace( 'previous', 'current' );
=======
    let keyOfCurr = inputProps.id.replace( 'previous', 'current' );
>>>>>>> 2097f11f7ef1608d0fbf3c3db939d5077e6d7c2c
    if ( !client[ keyOfCurr ] ) {
      props.storeChecked( evnt, { name: keyOfCurr, checked: inputProps.checked } );
    }

    // Do the usual thing too
    props.storeChecked( evnt, inputProps );

  };  // End ensureCurrChecked()


  let storeChecked  = ensureCurrChecked,
      sharedProps   = {
        client: client, type: props.type, time: time,
        storeComplex: ensureCurrComplex
      };


  /** @todo Owning a home vs. rented vs. homeless should probably be radio buttons */
  return (
    <wrapper>
      
      {/** 
      - Shelter
      Was the household homeless?
      [If not homeless]
      Did the household own a home?
      [If owned a home]
      Mortgage
      Insurance
      Property Tax
      [If didn't own a home]
      ~~How many bedrooms does the unit have (for a studio apartment, put 0)~~
      Contract rent (the full amount the landord would charge without a subsidy)
      Rent share
      Did the household pay utilities?
      [If paid utilities]
      Did the household pay for heating or cooling (e.g. A/C during summer), OR did they receive Fuel Assistance in the 12 months previous to the relevant asseessment?
      Does the household pay for electricity for non-heating purposes?
      Does the household pay for its own telephone service?
      */}
      <FormHeading>Shelter</FormHeading>

      <MassiveToggle name={ time + 'Homeless' } value={ wasHomeless } storeChecked={ storeChecked }
          label='Was the household homeless at the last benefit assessment?' />
      { wasHomeless
        ? null
        : <MassiveToggle name={ time + 'Homeowner' } value={ ownedAHome }
            storeChecked={ storeChecked } label='Did the household own a home?' />
      }
      { !ownedAHome
        ? null
        : <wrapper>

          <FormHeading>Homeowner</FormHeading>

          <IntervalColumnHeadings type={ props.type }/>
          <CashFlowRow {...sharedProps} generic='Mortgage'> Mortgage </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='HousingInsurance'> Insurance Costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='PropertyTax'> Property Tax </CashFlowRow>
        </wrapper>
      }
      { !rented
        ? null
        : <wrapper>

          <FormHeading>Renter</FormHeading>

          <IntervalColumnHeadings type={ props.type }/>
          { client.hasHousing
            ? <wrapper>
              <CashFlowRow {...sharedProps} generic='RentShare'> Rent Share </CashFlowRow>
              <CashFlowRow {...sharedProps}
                generic='ContractRent'
                labeInfo='The full amount the landord would charge without a Section 8 voucher'>
				Contract Rent </CashFlowRow>
            </wrapper>
            : <CashFlowRow {...sharedProps} generic='Rent'> Rent </CashFlowRow>
          }
          
          {/** No padding for an element all on its own */}
          <br/>

          <MassiveToggle name={ time + 'PaidUtilities' } value={ utils } storeChecked={ storeChecked }
            label='Did the household pay utilities seperately from the rent?' />
          { !client[ time + 'PaidUtilities' ]
            ? null
            : <wrapper>
              <MassiveToggle name={ time + 'ClimateControl' } value={ climate } storeChecked={ storeChecked }
                label='Did the household pay for heating or cooling (e.g. A/C during summer), OR did they receive Fuel Assistance in the 12 months prior to the previous benefit assessment?' />
              <MassiveToggle name={ time + 'NonHeatElectricity' } value={ electricity } storeChecked={ storeChecked }
                label='Did the household pay for electricity for non-heating purposes?' />
              <MassiveToggle name={ time + 'Phone' } value={ phone } storeChecked={ storeChecked }
                label='Did the household pay for its own telephone service?' />
            </wrapper>
          }
        </wrapper>
      }
    </wrapper>
  );

};  // End Housing()


/** @todo description
* 
* @todo Discuss splitting into a sub-progress bar and breaking it up
* into individual form pages.
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const ExpensesFormContent = function ( props ) {

  let client        = props.client,
      storeChecked  = props.storeChecked,
      time          = 'previous', type = 'expense';

  let needsDisabledAssistance = client[ time + 'GettingDisabledAssistance' ]
    || client[ time + 'DisabledOrElderlyHeadOrSpouse' ]
    || client[ time + 'DisabledOrElderlyHeadOrSpouse' ];

  let sharedProps = { client: client, type: type, time: time, storeComplex: props.storeComplex };

  /** @todo 1) Can client only enter amounts not covered by other programs
  * for childcare expenses? 2) Does money from those programs count as income?
  * Answers: 1) Yes. 2) Unkown.
  * 
  * @todo Only show questions that are relevant to the client's slected programs
  */
  return (
    <wrapper className='field-aligner two-column'>

      {/** 
      - Reasonable Unreimbursed Non-Medical Child(ren) Care
      A "child" is a person 12 or younger (under 13?). Don't include amounts that are paid for by other benefit programs. Don't include medical or handicapped assistance costs. "Reasonable" is what your housing agency would consider reasonable. This tool doesn't know that amount and will have to use the amount you put in here.
      Direct Care Costs
      Before- and After-School Care
      Transportation Costs (to and from non-medical destinations)
      Other Care
      Income made possible by care expenses (income from one individual as determined by the housing agency, usually the one with the lowest income)
      */}
      { !(client[ time + 'ChildrenUnder12' ] > 0)
        ? null
        : <wrapper>
          <FormHeading subheading = {'A "child" is a person 12 or younger. Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Reasonable Unreimbursed Non-Medical Child(ren) Care</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'ChildDirectCareCosts'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildBeforeAndAfterSchoolCareCosts'}> Before- and after-school care </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildTransportationCosts'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildOtherCareCosts'}> Other care </CashFlowRow>
          <CashFlowRow {...sharedProps} type={'income'} generic={'EarnedIncomeBecauseOfChildCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by child care expenses </CashFlowRow>
        </wrapper>
      }

    {/** Wrapper here or else margins get added here, but not other
    * places, making spacing hard to manage */}
      <wrapper>
        <FormHeading>Child Support</FormHeading>
        <IntervalColumnHeadings type={type}/>
        <CashFlowRow {...sharedProps} generic={'ChildSupportPaidOut'}> LEGALLY OBLIGATED Child support paid out </CashFlowRow>
      </wrapper>

      {/** 
      - Unreimbursed Non-Medical Adult Dependent Care
      A adult dependent is a person older than 12 and either disabled or 62 or older. Don't include medical or handicapped assistance costs.
      Direct Care Costs
      Transportation Costs (to and from non-medical destinations)
      Other Care
      */}
      { !client[ time + 'DisabledOrElderlyMember' ]
        ? null
        : <wrapper>
          <FormHeading subheading = {'A adult dependent is a person older than 12 and either disabled or 62 or older. Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Disabled or Elderly Care</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'AdultDirectCareCosts'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'AdultTransportationCosts'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'AdultOtherCareCosts'}> Other care </CashFlowRow>
        </wrapper>
      }

      {/** 
      - Unreimbursed Disabled/Handicapped/Elderly Assistance
      "Unreimbursed expenses to cover care attendants and auxiliary apparatus for any family member who is a person with disabilities. Auxiliary apparatus are items such as wheelchairs, ramps, adaptations to vehicles, or special equipment to enable a blind person to read or type, but only if these items are directly related to permitting the disabled person or other family member to work."
      "Examples of eligible disability assistance expenses:
      * The payments made on a motorized wheelchair for the 42 year old son of the head of household enable the son to leave the house and go to work each day on his own. Prior to the purchase of the motorized wheelchair, the son was unable to make the commute to work. These payments are an eligible disability assistance expense.
      * Payments to a care attendant to stay with a disabled 16-year-old child allow the child’s mother to go to work every day. These payments are an eligible disability assistance allowance."
      Disabled/Handicapped assistance expenses
      Income made possible by assistance expenses (income from one individual as determined by the housing agency, usually the one with the lowest income)
      */}
      { !client[ time + 'DisabledOrElderlyHeadOrSpouse' ] && !client[ time + 'DisabledOrElderlyMember' ]
        ? null
        : <wrapper>
          <FormHeading>Unreimbursed Disabled/Handicapped/Elderly Assistance</FormHeading>
          <div>Unreimbursed expenses to cover care attendants and auxiliary apparatus for any family member who is a person with disabilities. Auxiliary apparatus are items such as wheelchairs, ramps, adaptations to vehicles, or special equipment to enable a blind person to read or type, but only if these items are directly related to permitting the disabled person or other family member to work.</div>
          <div>Examples of eligible disability assistance expenses:</div>
          <ul>
            <li>The payments made on a motorized wheelchair for the 42 year old son of the head of household enable the son to leave the house and go to work each day on his own. Prior to the purchase of the motorized wheelchair, the son was unable to make the commute to work. These payments are an eligible disability assistance expense.</li>
            <li>Payments to a care attendant to stay with a disabled 16-year-old child allow the child’s mother to go to work every day. These payments are an eligible disability assistance allowance.</li>
          </ul>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'DisabledAssistance'}> Disabled/Handicapped assistance </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'EarnedIncomeBecauseOfAdultCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by assistance expenses </CashFlowRow>
        </wrapper>
      }

      {/** 
      - Unreimbursed Medical Expenses (if DisabledOrElderlyHeadOrSpouse)
      If the head and/or spouse is elderly and/or disabled, any household medical expense expected within the 12 months following the relevant assessment is eligible.
      "Examples of allowable medical expenses:
      * The orthodontist expenses for a child’s braces.
      * Services of doctors and health care professionals.
      * Services of health care facilities.
      * Medical insurance premiums. 
      * Prescription/non-prescription medicines (prescribed by a physician).
      * Transportation to treatment (cab fare, bus fare, mileage).
      * Dental expenses, eyeglasses, hearing aids, batteries.
      * Live-in or periodic medical assistance.
      * Monthly payment on accumulated medical bills (regular monthly payments on a bill that was previously incurred). The allowance may include only the amount expected to be paid in the coming 12 months.
      "
      Disabled or elderly members' unreimbursed medical expenses
      Other members' unreimbursed medical expenses [code: check if there are other members]
      */}
      { !client[ time + 'DisabledOrElderlyHeadOrSpouse' ]
        ? null
        : <wrapper>
          <FormHeading>Unreimbursed Medical Expenses</FormHeading>
          <div>If the head and/or spouse is elderly and/or disabled, any household medical expense expected within the 12 months following the relevant assessment is eligible.</div>
          <div>Examples of allowable medical expenses:</div>
          <ul>
            <li>The orthodontist expenses for a child’s braces.</li>
            <li>Services of doctors and health care professionals.</li>
            <li>Services of health care facilities.</li>
            <li>Medical insurance premiums. </li>
            <li>Prescription/non-prescription medicines (prescribed by a physician).</li>
            <li>Transportation to treatment (cab fare, bus fare, mileage).</li>
            <li>Dental expenses, eyeglasses, hearing aids, batteries (but not if they enable someone to work, that was the section above).</li>
            <li>Live-in or periodic medical assistance (but not the kind that enables someone to work, that was the section above).</li>
            <li>Monthly payment on accumulated medical bills (regular monthly payments on a bill that was previously incurred). The allowance may include only the amount expected to be paid in the coming 12 months.</li>
          </ul>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'DisabledAssistance'}> Disabled/Handicapped/Elderly assistance </CashFlowRow>
        </wrapper>
      }

      <Housing {...props} time={time} type={type}/>

      <FormHeading>Other</FormHeading>
      <CashFlowRow {...sharedProps} generic={'OtherExpenses'}> Other Expenses </CashFlowRow>

    </wrapper>
  );

};  // End ExpensesFormContent()

// 'previous' to 'was'? 'current' to 'is'? Not always

/**
* @todo Does a medical assistant's payments count as a medical expense?
* @todo Medical expense only matters if household has elder/disabled, but
* are they any medical expenses or only those of the disabled person? "Medical
* Expenses for Disabled or Elderly". Also, do they sometimes need to
* enter medical expenses even if they don't have an elderly or disabled
* household member?
*/

/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
// `props` is a cloned version of the propsal props. References broken.
const PreviousExpensesStep = function ( props ) {

  return (
    <Form className = 'expense-form'>
      <FormPartsContainer
        title     = {'Previous Household Expenses'}
        clarifier = {'Monthly expenses that were expected to happen during the 12 months following that assessment'}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}>
        <ExpensesFormContent {...props} client={props.pageState} />
      </FormPartsContainer>
    </Form>
  );

};  // End PreviousExpensesStep()


export { PreviousExpensesStep };
