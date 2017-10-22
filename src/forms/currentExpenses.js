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
const Housing = function ({ client, type, time, setClientProperty }) {

  // `hasHousing` is actually whether they're in the housing voucher program
  let ownsAHome   = client[ time + 'Homeowner' ],
      isHomeless  = client[ time + 'Homeless' ] && !client.hasHousing && !ownsAHome,
      rented      = !isHomeless && !ownsAHome;

  let utils       = client[ time + 'PaysUtilities' ],
      climate     = client[ time + 'GotClimateControl' ],
      electricity = client[ time + 'NonHeatElectricity' ],
      phone       = client[ time + 'Phone' ];

  /** Makes sure values are propagated to 'current' properties if needed */
  let ensureFuture = function ( evnt, inputProps ) {
    setClientProperty( evnt, {...inputProps, fillFuture: true });
  };

  let sharedProps = {
    client: client, type: type, time: time,
    setClientProperty: ensureFuture
  };

  /** @todo Owning a home vs. rented vs. homeless should probably be radio buttons */
  return (
    <wrapper>

      <FormHeading>Shelter</FormHeading>

      <MassiveToggle name={ time + 'Homeless' } value={ isHomeless } setClientProperty={ ensureFuture }
          label='Are you homeless?' />
      { isHomeless
        ? null
        : <MassiveToggle name={ time + 'Homeowner' } value={ ownsAHome }
            setClientProperty={ ensureFuture } label='Do you own a home?' />
      }
      { !ownsAHome
        ? null
        : <wrapper>

          <FormHeading>Homeowner</FormHeading>

          <IntervalColumnHeadings type={ type }/>
          <CashFlowRow {...sharedProps} generic='Mortgage'> Mortgage </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='HousingInsurance'> Insurance Costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='PropertyTax'> Property Tax </CashFlowRow>
        </wrapper>
      }
      { !rented
        ? null
        : <wrapper>

          <FormHeading>Renter</FormHeading>

          <IntervalColumnHeadings type={ type }/>
          { client.hasHousing
            ? <wrapper>
              <CashFlowRow {...sharedProps} generic='RentShare'> Rent Share </CashFlowRow>
              <CashFlowRow {...sharedProps}
                generic='ContractRent'
                labeInfo='The full amount the landord would charge without a Section 8 voucher'>
                  Contract Rent
              </CashFlowRow>
            </wrapper>
            : <CashFlowRow {...sharedProps} generic='Rent'> Rent </CashFlowRow>
          }
          
          {/** No padding for an element all on its own */}
          <br/>

          <MassiveToggle name={ time + 'PaysUtilities' } value={ utils } setClientProperty={ ensureFuture }
            label='Do you pay utilities seperately from the rent?' />
          { !client[ time + 'PaysUtilities' ]
            ? null
            : <wrapper>
              <MassiveToggle name={ time + 'ClimateControl' } value={ climate } setClientProperty={ ensureFuture }
                label='Do you pay for heating or cooling (e.g. A/C during summer), OR did you receive Fuel Assistance in the past 12 months?' />
              <MassiveToggle name={ time + 'NonHeatElectricity' } value={ electricity } setClientProperty={ ensureFuture }
                label='Do you pay for electricity for non-heating purposes?' />
              <MassiveToggle name={ time + 'Phone' } value={ phone } setClientProperty={ ensureFuture }
                label='Do you pay for your own telephone service?' />
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
const ExpensesFormContent = function ({ client, time, setClientProperty }) {

  let type        = 'expense',
      sharedProps = { client: client, type: type, time: time, setClientProperty: setClientProperty };

  /** @todo 1) Can client only enter amounts not covered by other programs
  * for childcare expenses? 2) Does money from those programs count as income?
  * Answers: 1) Yes. 2) Unkown.
  * 
  * @todo Only show questions that are relevant to the client's slected programs
  */
  return (
    <wrapper className='field-aligner two-column'>

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

      { !client[ time + 'DisabledOrElderlyHeadOrSpouse' ]
        ? null
        : <wrapper>
          <FormHeading>Unreimbursed Medical Expenses</FormHeading>
          <div>If the head and/or spouse is elderly and/or disabled, any unreimbursed medical expenses of the last 12 months are eligible.</div>
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
          <CashFlowRow {...sharedProps} generic='DisabledOrElderlyMedicalCosts'> Disabled/Elderly medical expenses </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='MembersMedicalCosts'> Medical expenses of other members </CashFlowRow>
        </wrapper>
      }

      <Housing client={client} time={time} type={type} setClientProperty={setClientProperty} />

      <FormHeading>Other</FormHeading>
      <CashFlowRow {...sharedProps} generic={'OtherExpenses'}> Other Expenses </CashFlowRow>

    </wrapper>
  );

};  // End ExpensesFormContent()

/**
* @todo SNAP: Does a medical assistant's payments count as a medical expense?
* (Answer: Yes. https://www.mass.gov/service-details/snap-verifications)
* @todo SNAP: Medical expense only matters if household has elder/disabled, but
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
// `props` is a cloned version of the original props. References broken.
const CurrentExpensesStep = function ( props ) {

  return (
    <Form className = 'expense-form'>
      <FormPartsContainer
        title     = {'Current Household Expenses'}
        clarifier = {null}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}
      >
        <ExpensesFormContent {...props} client={props.client} time={'current'} />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentExpensesStep()


export { CurrentExpensesStep };
