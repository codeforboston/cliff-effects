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

const Utilities = function ({ client, type, time, setClientProperty }) {

  let climate     = client[ time + 'HasClimateControl' ],
      electricity = client[ time + 'NonHeatElectricity' ],
      phone       = client[ time + 'Phone' ],
      fuelAssist  = client[ time + 'HasFuelAssistance' ];


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
        name={time + 'HasClimateControl'}
        label={'Heating or cooling (e.g. A/C during summer)'}
        checked={climate}
        onChange={setChecked}
      />
      <br/>
      <Checkbox
        name={time + 'NonHeatElectricity'}
        label={'Electricity for non-heating purposes'}
        checked={electricity}
        onChange={setChecked}
      />
      <br/>
      <Checkbox
        name={time + 'Phone'}
        label={'Telephone service'}
        checked={phone}
        onChange={setChecked}
      />

      <Header as='h4'>Do you get Fuel Assistance?</Header>
      <Form.Field style={{display: 'inline-block', paddingRight: '1em'}}>
        <Radio
          name={time + 'HasFuelAssistance'}
          label={'Yes'} value={'Yes'}
          checked={fuelAssist}
          onChange={toBool}
        />
      </Form.Field>
      <Form.Field style={{display: 'inline-block', paddingRight: '1em'}}>
        <Radio
          name={time + 'HasFuelAssistance'}
          label={'No'} value={'No'}
          checked={!fuelAssist}
          onChange={toBool}
        />
      </Form.Field>
    </wrapper>

  );
};  // End Utilities(<>)


const ShelterDetails = function ({ client, type, time, setClientProperty }) {

  let shelter = client[ time + 'Shelter' ],
      sharedProps = {
        client: client, type: type, time: time,
        setClientProperty: setClientProperty
      };

  if ( client.current.hasHousing ) {
    return (
      <wrapper>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'RentShare'}> Rent Share </CashFlowRow>
        <CashFlowRow {...sharedProps}
          generic={'ContractRent'}
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
        <CashFlowRow {...sharedProps} generic={'Rent'}> Rent </CashFlowRow>
        <Utilities {...sharedProps}/>
      </wrapper>
    );

  } else if ( shelter === 'homeowner' ) {
    return (
      <wrapper>
        <IntervalColumnHeadings type={ type }/>
        <CashFlowRow {...sharedProps} generic={'Mortgage'}> Mortgage </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'HousingInsurance'}> Insurance Costs </CashFlowRow>
        <CashFlowRow {...sharedProps} generic={'PropertyTax'}> Property Tax </CashFlowRow>
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
        name={time + 'Shelter'}
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
const Housing = function ({ client, type, time, setClientProperty }) {

  // We're using a bunch of radio buttons. Since `checked` is defined
  // in Radio components, `setClientProperty()` would store it, but we
  // want the value, so get rid of checked.
  /** Makes sure values are propagated to 'current' properties if needed */
  let ensureFuture = function ( evnt, inputProps ) {
    var obj = { ...inputProps, checked: null, value: inputProps.value, fillFuture: true };
    setClientProperty( evnt, obj );
  };

  let sharedProps = {
    client: client, type: type, time: time,
    setClientProperty: ensureFuture
  };

  return (
    <wrapper>

      <FormHeading>Shelter</FormHeading>

      { client.current.hasHousing
      ? null
      : <wrapper>

        <Header as='h4'>What is your housing situation?</Header>
        <ShelterRadio
          currentValue={client[ time + 'Shelter' ]}
          label={'Homeless'}
          time={time}
          setClientProperty={ensureFuture}
        />
        <ShelterRadio
          currentValue={client[ time + 'Shelter' ]}
          label={'Renter'}
          time={time}
          setClientProperty={ensureFuture}
        />
        <ShelterRadio
          currentValue={client[ time + 'Shelter' ]}
          label={'Homeowner'}
          time={time}
          setClientProperty={ensureFuture}
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
const ExpensesFormContent = function ({ client, time, setClientProperty }) {

  let type        = 'expense',
      sharedProps = { client: client, type: type, time: time, setClientProperty: setClientProperty },
      household   = client[ time + 'Household' ];

  var isOver12 = function ( member ) { return member.age > 12; };

  // Won't include head or spouse
  var allDependents = getDependentMembers( household ),
      under13       = getEveryMember( allDependents, isUnder13 ),
      // or under13 = getUnder13Members( allDependents ),
      over12        = getEveryMember( allDependents, isOver12 );

  // 'Elderly' here is using the lowest common denominator - SNAP standards
  var isElderlyOrDisabled = function ( member ) {
    return isDisabled( member ) || member.age >= 60;
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
          <CashFlowRow {...sharedProps} generic={'ChildDirectCareCosts'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildBeforeAndAfterSchoolCareCosts'}> Before- and after-school care </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildTransportationCosts'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'ChildOtherCareCosts'}> Other care </CashFlowRow>
          <CashFlowRow {...sharedProps} type={'income'} generic={'EarnedIncomeBecauseOfChildCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by child care expenses </CashFlowRow>
        </wrapper>
        : null
      }

      {/** Wrapper here or else margins get added here, but not other
      * places, making spacing hard to manage */}
      <wrapper>
        <FormHeading>Child Support</FormHeading>
        <IntervalColumnHeadings type={type}/>
        <CashFlowRow {...sharedProps} generic={'ChildSupportPaidOut'}> <strong>Legally obligated</strong> child support </CashFlowRow>
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
          <CashFlowRow {...sharedProps} generic={'AdultDirectCareCosts'}> Direct care costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'AdultTransportationCosts'}> Transportation costs </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'AdultOtherCareCosts'}> Other care </CashFlowRow>
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
          <CashFlowRow {...sharedProps} generic={'DisabledAssistance'}> Disabled/Handicapped assistance </CashFlowRow>
          <CashFlowRow {...sharedProps} generic={'EarnedIncomeBecauseOfAdultCare'}> <span style={{textDecoration: 'underline'}}>Income</span> made possible by assistance expenses </CashFlowRow>
        </wrapper>
        : null
      }

        {/* These medical expenses don't count for Section 8 unless
          the disabled person is the head or spouse. From 
          http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf 
          Appendix B, item (D) */}
        { elderlyOrDisabledHeadAndSpouse.length > 0 || (client.current.hasSnap && elderlyOrDisabled.length > 0)
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
          <CashFlowRow {...sharedProps} generic='DisabledOrElderlyMedicalCosts'> Disabled/Elderly medical expenses </CashFlowRow>
          <CashFlowRow {...sharedProps} generic='MembersMedicalCosts'> Medical expenses of other members </CashFlowRow>
        </wrapper>
        : null
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
