// REACT COMPONENTS
import React from 'react';
import {
  Form,
  Radio,
  Checkbox,
  Header
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import {
  FormPartsContainer,
  // MassiveToggle,
  FormHeading,
  IntervalColumnHeadings,
  CashFlowRow
} from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';

// LOGIC
import {
  getEveryMember,
  isHeadOrSpouse,
  getDependentMembers,
  isDisabled,
  isUnder13,
} from '../utils/getMembers';


// ========================================
// COMPONENTS
// ========================================

const Utilities = function ({ current, type, time, setClientProperty }) {

  let climate     = current.hasClimateControl,
      electricity = current.nonHeatElectricity,
      phone       = current.phone,
      fuelAssist  = current.hasFuelAssistance;


  let setChecked = function ( evnt, inputProps ) {
    var obj = { ...inputProps, value: inputProps.checked };
    setClientProperty( evnt, obj );
  };  // End setChecked()

  let toBool = function ( evnt, inputProps ) {
    var val = inputProps.value === 'Yes',
        obj = { ...inputProps, value: val };
    setClientProperty( evnt, obj );
  };  // End toBool()

  return (
    <wrapper>
      <Header as='h4'>Which of these utilities do you pay for?</Header>

      <Checkbox
        name={'hasClimateControl'}
        label={'Heating or cooling (e.g. A/C during summer)'}
        checked={climate}
        onChange={setChecked}
      />
      <br/>
      <Checkbox
        name={'nonHeatElectricity'}
        label={'Electricity for non-heating purposes'}
        checked={electricity}
        onChange={setChecked}
      />
      <br/>
      <Checkbox
        name={'phone'}
        label={'Telephone service'}
        checked={phone}
        onChange={setChecked}
      />

      <Header as='h4'>Do you get Fuel Assistance?</Header>
      <Form.Field style={{display: 'inline-block', paddingRight: '1em'}}>
        <Radio
          name={'hasFuelAssistance'}
          label={'Yes'} value={'Yes'}
          checked={fuelAssist}
          onChange={toBool}
        />
      </Form.Field>
      <Form.Field style={{display: 'inline-block', paddingRight: '1em'}}>
        <Radio
          name={'hasFuelAssistance'}
          label={'No'} value={'No'}
          checked={!fuelAssist}
          onChange={toBool}
        />
      </Form.Field>
    </wrapper>

  );
};  // End Utilities(<>)


const ShelterDetails = function ({ current, type, time, setClientProperty }) {

  let shelter = current.shelter,
      sharedProps = {
        timeState: current, current: current, type: type, time: time,
        setClientProperty: setClientProperty
      };

  if ( current.hasHousing ) {
    return (
      <wrapper>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'rentShare'}> Rent Share </CashFlowRow>
        <CashFlowRow {...sharedProps}
          generic={'contractRent'}
          labeInfo={'The full amount the landlord would charge without a Section 8 voucher'}>
            Contract Rent
        </CashFlowRow>
        <Utilities {...sharedProps}/>
      </wrapper>
    );

  } else if ( shelter === 'homeless' ) {
    return null;

  } else if ( shelter === 'renter' ) {
    return (
      <wrapper>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'rent'}> Rent </CashFlowRow>
        <Utilities {...sharedProps}/>
      </wrapper>
    );

  } else if ( shelter === 'homeowner' ) {
    return (
      <wrapper>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'mortgage'}> Mortgage </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'housingInsurance'}> Insurance Costs </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'propertyTax'}> Property Tax </CashFlowRow>
        <Utilities {...sharedProps}/>
      </wrapper>
    );

  }  // end which expenses
};  // End ShelterDetails(<>)


const ShelterRadio = function ({ currentValue, label, time, setClientProperty }) {

  var value = label.toLowerCase();

  return (
    <Form.Field>
      <Radio
        name={'shelter'}
        label={label}
        value={value}
        checked={currentValue === value}
        onChange={setClientProperty}
      />
    </Form.Field>
  );

};  // End ShelterRadio(<>)


/** @todo description
* 
* @function
* @param {object} props
* @property {object} props.__ - explanation
* 
* @returns Component
*/
const Housing = function ({ current, type, time, setClientProperty }) {

  // We're using a bunch of radio buttons. Since `checked` is defined
  // in Radio components, `setClientProperty()` would store it, but we
  // want the value, so get rid of checked.
  /** Makes sure values are propagated to 'current' properties if needed */
  let ensureRouteAndValue = function ( evnt, inputProps ) {
    var obj = { ...inputProps, name: inputProps.name, value: inputProps.value, checked: null };
    setClientProperty( evnt, obj );
  };

  let sharedProps = {
    current: current, type: type, time: time,
    setClientProperty: ensureRouteAndValue
  };

  return (
    <wrapper>

      <FormHeading>Shelter</FormHeading>

      { current.hasHousing
      ? null
      : <wrapper>

        <Header as='h4'>What is your housing situation?</Header>
        <ShelterRadio
          currentValue={current.shelter}
          label={'Homeless'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />
        <ShelterRadio
          currentValue={current.shelter}
          label={'Renter'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />
        <ShelterRadio
          currentValue={current.shelter}
          label={'Homeowner'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />

      </wrapper>}

      <ShelterDetails {...sharedProps}/>

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
const ExpensesFormContent = function ({ client, current, time, setClientProperty }) {

  let type        = 'expense',
      household   = client[ time ].household,
      sharedProps = { timeState: current, type: type, time: time, setClientProperty: setClientProperty };

  /* @todo Make an age-checking function to
   *     keep household data structure under 
   *     control in one place.
   */
  var isOver12 = function ( member ) { return member.m_age > 12; };

  // Won't include head or spouse
  var allDependents = getDependentMembers( household ),
      under13       = getEveryMember( allDependents, isUnder13 ),
      // or under13 = getUnder13Members( allDependents ),
      over12        = getEveryMember( allDependents, isOver12 );

  // 'Elderly' here is using the lowest common denominator - SNAP standards
  var isElderlyOrDisabled = function ( member ) {
    return isDisabled( member ) || member.m_age >= 60;
  };
  var elderlyOrDisabled = getEveryMember( household, isElderlyOrDisabled ),
      elderlyOrDisabledHeadAndSpouse = getEveryMember( elderlyOrDisabled, isHeadOrSpouse );

  /**
  * @todo Does money from any programs count as income?
  * @todo Complete only show questions that are relevant to the client's slected programs
  */
  return (
    <wrapper className='field-aligner two-column'>

      { under13.length > 0
        ? <wrapper>
          <FormHeading subheading = {'A "child" is a person 12 or younger. Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Reasonable Unreimbursed Non-Medical Child(ren) Care</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'childDirectCare'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childBeforeAndAfterSchoolCare'}> Before- and after-school care </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childTransportation'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childOtherCare'}> Other care </CashFlowRow>
          <CashFlowRow {...sharedProps} type={'income'} generic={'earnedBecauseOfChildCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by child care expenses </CashFlowRow>
        </wrapper>
        : null
      }

      {/** Wrapper here or else margins get added here, but not other
      * places, making spacing hard to manage */}
      <wrapper>
        <FormHeading>Child Support</FormHeading>
        <IntervalColumnHeadings type={type}/>
        <CashFlowRow {...sharedProps} generic={'childSupportPaidOut'}> <strong>Legally obligated</strong> child support </CashFlowRow>
      </wrapper>

      {/* Head or spouse can't be a dependent, so they don't count */}
      {/* With future version of form, don't show if there are only elderly,
        but not disabled, members. Also, show if there are people between
        > 12, but <= 18 */}
      { over12.length > 0
        ? <wrapper>
          <FormHeading subheading = {'For the care of people who are older than 12, but are still dependents (those under 18 or disabled). Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Dependent Care of Persons Over 12 Years of Age</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'adultDirectCare'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'adultTransportation'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'adultOtherCare'}> Other care </CashFlowRow>
        </wrapper>
        : null
      }

      { elderlyOrDisabled.length > 0
        ? <wrapper>
          <FormHeading>Unreimbursed Disabled/Handicapped/Elderly Assistance</FormHeading>
          <div>Unreimbursed expenses to cover care attendants and auxiliary apparatus for any family member who is elderly or is a person with disabilities. Auxiliary apparatus are items such as wheelchairs, ramps, adaptations to vehicles, or special equipment to enable a blind person to read or type, but only if these items are directly related to permitting the disabled person or other family member to work.</div>
          <div>Examples of eligible disability assistance expenses:</div>
          <ul>
            <li>The payments made on a motorized wheelchair for the 42 year old son of the head of household enable the son to leave the house and go to work each day on his own. Prior to the purchase of the motorized wheelchair, the son was unable to make the commute to work. These payments are an eligible disability assistance expense.</li>
            <li>Payments to a care attendant to stay with a disabled 16-year-old child allow the child’s mother to go to work every day. These payments are an eligible disability assistance allowance.</li>
          </ul>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'disabledAssistance'}> Disabled/Handicapped assistance </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'earnedBecauseOfAdultCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by assistance expenses </CashFlowRow>
        </wrapper>
        : null
      }

        {/* These medical expenses don't count for Section 8 unless
          the disabled person is the head or spouse. From 
          http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf 
          Appendix B, item (D) */}
        { elderlyOrDisabledHeadAndSpouse.length > 0 || (current.hasSnap && elderlyOrDisabled.length > 0)
          ? <wrapper>
          <FormHeading>Unreimbursed Medical Expenses</FormHeading>
          <div>Do not repeat anything you already listed in the section above. Examples of allowable medical expenses:</div>
          <ul>
            <li>The orthodontist expenses for a child’s braces.</li>
            <li>Services of doctors and health care professionals.</li>
            <li>Services of health care facilities.</li>
            <li>Medical insurance premiums. </li>
            <li>Prescription/non-prescription medicines (prescribed by a physician).</li>
            <li>Transportation to treatment (cab fare, bus fare, mileage).</li>
            <li>Dental expenses, eyeglasses, hearing aids, batteries.</li>
            <li>Live-in or periodic medical assistance.</li>
            <li>Monthly payment on accumulated medical bills (regular monthly payments on a bill that was previously incurred).</li>
          </ul>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic='disabledOrElderlyMedical'> Disabled/Elderly medical expenses </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='membersMedical'> Medical expenses of other members </CashFlowRow>
        </wrapper>
        : null
      }

      <Housing current={current} time={time} type={type} setClientProperty={setClientProperty} />

      <FormHeading>Other</FormHeading>
      <CashFlowRow {...sharedProps} generic={'otherExpenses'}> Other Expenses </CashFlowRow>

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

  /** @todo Maybe getTimeSetter can actually convert to 'route' too? */
  const setTimeProp = getTimeSetter( 'current', props.changeClient );

  return (
    <Form className = 'expense-form flex-item flex-column'>
      <FormPartsContainer
        title     = {'Current Household Expenses'}
        clarifier = {null}
        left      = {{name: 'Previous', func: props.previousStep}}
        right     = {{name: 'Next', func: props.nextStep}}
      >
        <ExpensesFormContent setClientProperty={setTimeProp} client={props.client} current={props.client.current} time={'current'} />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentExpensesStep()


export { CurrentExpensesStep };
