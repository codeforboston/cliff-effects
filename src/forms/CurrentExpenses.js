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
  FormHeading,
  IntervalColumnHeadings,
  CashFlowRow,
  ControlledRadioYesNo,
} from './formHelpers';
import {
  ContractRentField,
  RentShareField,
  PlainRentRow
} from './rentFields';
import CashFlowRowAfterConfirm from './CashFlowRowAfterConfirm';

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

  let climate     = current.climateControl,
      electricity = current.nonHeatElectricity,
      phone       = current.phone,
      fuelAssist  = current.fuelAssistance;

  let setChecked = function ( evnt, inputProps ) {
    var obj = { ...inputProps, value: inputProps.checked };
    setClientProperty( evnt, obj );
  };  // End setChecked()

  return (
    <div>
      <Header as='h4'>Which of these utilities do you pay for?</Header>

      <Checkbox
        name={'climateControl'}
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

      <br/>
      <br/>
      <ControlledRadioYesNo
        labelText = { 'Do you get Fuel Assistance?' }
        checked   = { fuelAssist }
        name      = { 'fuelAssistance' }
        onChange  = { setClientProperty } />

    </div>

  );
};  // End Utilities(<>)


const HousingDetails = function ({ current, type, time, setClientProperty }) {

  let shelter = current.shelter,
      sharedProps = {
        timeState: current, current: current, type: type, time: time,
        setClientProperty: setClientProperty
      };

  if ( current.shelter === 'voucher' ) {
    return (
      <div>
        <ContractRentField {...sharedProps} />
        <RentShareField {...sharedProps} />
        <Utilities {...sharedProps}/>
      </div>
    );

  } else if ( shelter === 'homeless' ) {
    return null;

  } else if ( shelter === 'renter' ) {
    return (
      <div>
        <br/>
        <PlainRentRow {...sharedProps} />
        <Utilities {...sharedProps}/>
      </div>
    );

  } else if ( shelter === 'homeowner' ) {
    return (
      <div>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'mortgage'}> Mortgage </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'housingInsurance'}> Insurance Costs </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'propertyTax'}> Property Tax </CashFlowRow>
        <Utilities {...sharedProps}/>
      </div>
    );

  }  // end which expenses
};  // End HousingDetails(<>)


const HousingRadio = function ({ currentValue, label, time, setClientProperty }) {

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

};  // End HousingRadio(<>)


/** 
 * @function
 * @param {object} props
 * @param {object} props.current - Client data of current user circumstances
 * @param {string} props.type - 'expense' or 'income', etc., for classes
 * @param {string} props.time - 'current' or 'future'
 * @param {function} props.setClientProperty - Sets state values
 * 
 * @returns React element
 */
const Housing = function ({ current, type, time, setClientProperty }) {

  // We're using a bunch of radio buttons. Since `checked` is defined
  // in Radio components, `setClientProperty()` would store it, but we
  // want the value, so get rid of checked.
  /** Makes sure values are propagated to 'current' properties if needed. */
  let ensureRouteAndValue = function ( evnt, inputProps ) {
    var obj = { ...inputProps, name: inputProps.name, value: inputProps.value, checked: null };
    setClientProperty( evnt, obj );
  };

  let sharedProps = {
    current: current, type: type, time: time,
    setClientProperty: ensureRouteAndValue
  };

  return (
    <div>

      <FormHeading>Housing</FormHeading>

      { current.shelter === 'voucher'
      ? null
      : <div>

        <Header as='h4'>What is your housing situation?</Header>
        <HousingRadio
          currentValue={current.shelter}
          label={'Homeless'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />
        <HousingRadio
          currentValue={current.shelter}
          label={'Renter'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />
        <HousingRadio
          currentValue={current.shelter}
          label={'Homeowner'}
          time={time}
          setClientProperty={ensureRouteAndValue}
        />

      </div>}

      <HousingDetails {...sharedProps}/>

    </div>
  );

};  // End Housing()


/** 
 * @function
 * @param {object} props
 * @param {object} props.current - Client data of current user circumstances
 * @param {object} props.time - 'current' or 'future'
 * @param {object} props.setClientProperty - Sets state values
 * 
 * @returns React element
 */
const ExpensesFormContent = function ({ current, time, setClientProperty }) {

  let type        = 'expense',
      household   = current.household,
      sharedProps = { timeState: current, type: type, time: time, setClientProperty: setClientProperty };

  /** @todo Make an age-checking function to
   *     keep household data structure under 
   *     control in one place. */
  var isOver12 = function ( member ) { return !isUnder13( member ); };

  // Won't include head or spouse
  var allDependents = getDependentMembers( household ),
      under13       = getEveryMember( allDependents, isUnder13 ),
      over12        = getEveryMember( allDependents, isOver12 );

  // 'Elderly' here is using the lowest common denominator - SNAP standards.
  var isElderlyOrDisabled = function ( member ) {
    return isDisabled( member ) || member.m_age >= 60;
  };
  var elderlyOrDisabled = getEveryMember( household, isElderlyOrDisabled ),
      elderlyOrDisabledHeadOrSpouse = getEveryMember( elderlyOrDisabled, isHeadOrSpouse );

  return (
    <div className='field-aligner two-column'>

      { under13.length > 0
        ? <div>
          <FormHeading subheading = {'A "child" is a person 12 or younger. Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Reasonable Unreimbursed Non-Medical Child(ren) Care</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'childDirectCare'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childBeforeAndAfterSchoolCare'}> Before- and after-school care </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childTransportation'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'childOtherCare'}> Other care </CashFlowRow>
          <CashFlowRowAfterConfirm {...sharedProps}
            generic={'earnedBecauseOfChildCare'}
            confirmLabel={'Does childcare allow you to make additional income?'}
          >
            <span style={{textDecoration: 'underline'}}>Income</span> made possible by child care expenses
          </CashFlowRowAfterConfirm>
        </div>
        : null
      }

      { current.hasSnap
        ? <div>
          <FormHeading>Child Support</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'childSupportPaidOut'}> <strong>Legally obligated</strong> child support </CashFlowRow>
        </div>
        : null
      }

      {/* Head or spouse can't be a dependent, so they don't count. */}
      { over12.length > 0
        ? <div>
          <FormHeading subheading = {'For the care of people who are older than 12, but are still dependents (those under 18 or disabled). Don\'t include amounts that are paid for by other benefit programs.\n'}>
            Dependent Care of Persons Over 12 Years of Age</FormHeading>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'adultDirectCare'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'adultTransportation'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'adultOtherCare'}> Other care </CashFlowRow>
        </div>
        : null
      }

      { elderlyOrDisabled.length > 0
        ? <div>
          <FormHeading>Unreimbursed Disabled/Handicapped/Elderly Assistance</FormHeading>
          <div>Unreimbursed expenses to cover care attendants and auxiliary apparatus for any family member who is elderly or is a person with disabilities. Auxiliary apparatus are items such as wheelchairs, ramps, adaptations to vehicles, or special equipment to enable a blind person to read or type, but only if these items are directly related to permitting the disabled person or other family member to work.</div>
          <div>Examples of eligible disability assistance expenses:</div>
          <ul>
            <li>The payments made on a motorized wheelchair for the 42 year old son of the head of household enable the son to leave the house and go to work each day on his own. Prior to the purchase of the motorized wheelchair, the son was unable to make the commute to work. These payments are an eligible disability assistance expense.</li>
            <li>Payments to a care attendant to stay with a disabled 16-year-old child allow the child’s mother to go to work every day. These payments are an eligible disability assistance allowance.</li>
          </ul>
          <IntervalColumnHeadings type={type}/>
          <CashFlowRow {...sharedProps} generic={'disabledAssistance'}> Disabled/Handicapped assistance </CashFlowRow>
          <CashFlowRowAfterConfirm {...sharedProps}
            generic={'earnedBecauseOfAdultCare'}
            confirmLabel={'Do assistance expenses allow you to make additional income?'}
          >
            <span style={{textDecoration: 'underline'}}>Income</span> made possible by assistance expenses
          </CashFlowRowAfterConfirm>
        </div>
        : null
      }

      {/** These medical expenses don't count for Section 8 unless
        *     the disabled person is the head or spouse. From 
        *     {@link http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf}
        *     Appendix B, item (D) */}
      { elderlyOrDisabledHeadOrSpouse.length > 0 || (current.hasSnap && elderlyOrDisabled.length > 0)
        ? <div>
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
          <CashFlowRow {...sharedProps} generic='disabledMedical'> Disabled/Elderly medical expenses </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='otherMedical'> Medical expenses of other members </CashFlowRow>
        </div>
        : null
      }

      <Housing current={current} time={time} type={type} setClientProperty={setClientProperty} />
  </div>
  );

};  // End ExpensesFormContent()

/**
 * @todo SNAP: Does a medical assistant's payments count as a medical expense?
 *     (Answer: Yes. @see {@link https://www.mass.gov/service-details/snap-verifications})
 * @todo SNAP: Medical expense only matters if household has elder/disabled, but
 *     are they any medical expenses or only those of the disabled person? "Medical
 *     Expenses for Disabled or Elderly". Also, do they sometimes need to
 *     enter medical expenses even if they don't have an elderly or disabled
 *     household member?
 */

/** 
  * @function
  * @param {object} props
  * @param {function} props.changeClient - Setting client state
  * @param {function} props.previousStep - Go to previous form step
  * @param {function} props.nextStep - Go to next form step
  * @param {object} props.client - Object will all the data for calculating benefits
  * 
  * @returns React element
  */
// `props` is a cloned version of the original props. References broken.
const CurrentExpensesStep = function ({ changeClient, previousStep, nextStep, client }) {

  const setTimeProp = getTimeSetter( 'current', changeClient );

  return (
    <Form className = 'expense-form flex-item flex-column'>
      <FormPartsContainer
        title     = {'Current Household Expenses'}
        clarifier = {null}
        left      = {{name: 'Previous', func: previousStep}}
        right     = {{name: 'Next', func: nextStep}}
      >
        <ExpensesFormContent setClientProperty={setTimeProp} current={client.current} time={'current'} />
      </FormPartsContainer>
    </Form>
  );

};  // End CurrentExpensesStep()


export { CurrentExpensesStep };
