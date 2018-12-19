// REACT COMPONENTS
import React from 'react';
import {
  Form,
  Radio,
  Checkbox,
  Header,
} from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer } from './FormPartsContainer';
import { AttentionArrow } from './formHelpers';
import { CashFlowInputsRow } from './cashflow';
import { ControlledRadioYesNo } from './inputs';
import {
  ContentH1,
  IntervalColumnHeadings,
} from '../components/headings';
import {
  ContractRentField,
  RentShareField,
  PlainRentRow,
} from './rentFields';
import { HeadingWithDetail } from '../components/details';
// Premature feature temporarily hidden to avoid messy revert
// import { ExpensesOther } from './ExpensesOther';
import { ShowOnYes } from './ShowOnYes';

// LOGIC
import {
  getEveryMember,
  isHeadOrSpouse,
  getDependentMembers,
  isDisabled,
  isUnder13,
} from '../utils/getMembers';
import { getUnder13Expenses } from '../utils/cashflow';


/* Move these to SNAP calc logic scripts:
 * @todo SNAP: Does a medical assistant's payments count as a medical expense?
 *     (Answer: Yes. @see {@link https://www.mass.gov/service-details/snap-verifications})
 * @todo SNAP: Medical expense only matters if household has elder/disabled, but
 *     are they any medical expenses or only those of the disabled person? "Medical
 *     Expenses for Disabled or Elderly". Also, do they sometimes need to
 *     enter medical expenses even if they don't have an elderly or disabled
 *     household member?
 */

// `props` is a cloned version of the original props. References broken.
/**
  * @function
  * @param {object} props
  * @param {function} props.updateClientValue Setting client state
  * @param {object} props.navData Buttons for bottom row
  * @param {object} props.client Data for calculating benefits, `future` and `current`
  * @param {object} props.translations  Language-specific content
  *
  * @returns React element
  */
const CurrentExpensesStep = function ({ updateClientValue, navData, client, translations }) {

  return (
    <FormPartsContainer
      title     = { translations.i_title }
      clarifier = { translations.i_clarifier }
      navData   = { navData }
      formClass = { `expenses` }>
      <ExpensesFormContent
        updateClientValue = { updateClientValue }
        current           = { client.current }
        time              = { `current` }
        translations      = { translations } />
    </FormPartsContainer>
  );

};  // Ends CurrentExpensesStep()


/** Abstracted for future use in 'future' value setting as well.
 * @function
 * @param {object} props
 * @param {object} props.current Client data of current user circumstances
 * @param {string} props.time 'current' or 'future'
 * @param {function} props.updateClientValue Sets state values
 * @param {object} props.translations Language-specific content
 *
 * @returns React element
 */
const ExpensesFormContent = function ({ current, time, updateClientValue, translations }) {

  let type        = `expense`,
      household   = current.household,
      sharedProps = {
        timeState:         current,
        type:              type,
        time:              time,
        updateClientValue: updateClientValue,
      };

  /* @todo Make a more general age-checking function to keep
   * household data format under control in one place. */
  const isOver12 = function (member) {
    return !isUnder13(member);
  };

  // Won't include head or spouse
  const allDependents = getDependentMembers(household),
        under13       = getEveryMember(allDependents, isUnder13),
        over12        = getEveryMember(allDependents, isOver12);

  // 'Elderly' here is using the lowest common denominator - SNAP standards.
  // @todo Make this dependant on type of benefit and use that benefit's
  // values
  const isElderlyOrDisabled = function (member) {
    return isDisabled(member) || member.m_age >= 60;
  };
  const elderlyOrDisabled             = getEveryMember(household, isElderlyOrDisabled),
        elderlyOrDisabledHeadOrSpouse = getEveryMember(elderlyOrDisabled, isHeadOrSpouse);

  return (
    <div className={ `field-aligner two-column` }>

      { (under13.length > 0) ? (
        <Under13
          translations      = { translations }
          type              = { type }
          sharedProps       = { sharedProps }
          current           = { current }
          updateClientValue = { updateClientValue } />
      ) : (
        null
      ) }

      { current.benefits.includes(`snap`) ? (
        <ChildSupport
          translations = { translations }
          type         = { type }
          sharedProps  = { sharedProps } />
      ) : (
        null
      ) }

      {/* Head or spouse can't be a dependent, so they don't count. */}
      { (over12.length > 0) ? (
        <DependentsOver12
          translations = { translations }
          type         = { type }
          sharedProps  = { sharedProps } />
      ) : (
        null
      ) }

      { (elderlyOrDisabled.length > 0) ? (
        <ElderlyOrDisabledAssistance
          translations      = { translations }
          type              = { type }
          sharedProps       = { sharedProps }
          current           = { current }
          updateClientValue = { updateClientValue } />
      ) : (
        null
      ) }

      {/* This comment may or may not belong here. Deeper discussion needed:
        * These medical expenses count for Section 8 too if the disabled
        *     person is the head or spouse. From Appendix B, item (D)
        *     {@link http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf} */}
      { (elderlyOrDisabledHeadOrSpouse.length > 0 || (current.benefits.includes('snap') && elderlyOrDisabled.length > 0)) ? (
        <UnreimbursedMedical
          translations = { translations }
          type         = { type }
          sharedProps  = { sharedProps } />
      ) : (
        null
      ) }

      <Housing
        current           = { current }
        time              = { time }
        type              = { type }
        updateClientValue = { updateClientValue } />

      {/* Premature feature temporarily hidden to avoid messy revert
        <ShowOnYes
          clientPartial     = { current }
          propName          = { `wantsToSeeOtherExpenses` }
          updateClientValue = { updateClientValue }
          question          = { `Do you want to enter your other expenses so you can see if you need to make a different plan?` }
          heading           = { `Other Expenses` }>
          <ExpensesOther { ...sharedProps } />
        </ShowOnYes>
      */}
    </div>
  );

};  // Ends <ExpensesFormContent>


const Under13 = function ({ translations, type, sharedProps, current, updateClientValue }) {
  return (
    <div>
      <ContentH1 subheading={ translations.i_childCareSubheading }>
        { translations.i_childCareSectionHeading }
      </ContentH1>

      <IntervalColumnHeadings type={ type } />

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childDirectCare` }>
        { translations.i_childDirectCareLabel }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childBeforeAndAfterSchoolCare` }>
        { translations.i_childBeforeAndAfterSchoolCareLabel}
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childTransportation` }>
        { translations.i_childTransportationLabel }
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childOtherCare` }>
        { translations.i_childOtherCareLabel }
      </CashFlowInputsRow>

      <EarnedFrom
        hasExpenses = { getUnder13Expenses(current) !== 0 }
        label       = { `If you didn't have that child care, would it change how much pay you can bring home?` }
        propData    = {{
          client:        current,
          childPropName: `earnedBecauseOfChildCare`,
          update:        updateClientValue,
        }}
        CashFlowRow = {
          <CashFlowInputsRow
            { ...sharedProps }
            generic = { `earnedBecauseOfChildCare` }>
            How much less would you make?
          </CashFlowInputsRow>
        } />

    </div>
  );
};  // Ends <Under13>


const ChildSupport = function ({ type, sharedProps, translations }) {
  return (
    <div>
      <ContentH1>Child Support</ContentH1>

      <IntervalColumnHeadings type={ type } />

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `childSupportPaidOut` }>
        { translations.childSupport.i_childSupportPaidOut }
      </CashFlowInputsRow>
    </div>
  );
};


const DependentsOver12 = function ({ type, sharedProps }) {
  return (
    <div>
      <ContentH1 subheading={ `For the care of people who are older than 12, but are still dependents (those under 18 or disabled). Don't include amounts that are paid for by other benefit programs.` }>
        Dependent Care of Persons Over 12 Years of Age
      </ContentH1>

      <IntervalColumnHeadings type={ type } />

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `adultDirectCare` }>
        Direct care costs
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `adultTransportation` }>
        Transportation costs
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `adultOtherCare` }>
        Other care
      </CashFlowInputsRow>
    </div>
  );
};  // Ends <DependentsOver12>


const ElderlyOrDisabledAssistance = function ({ current, type, sharedProps, updateClientValue }) {
  return (
    <div>
      <HeadingWithDetail>
        <ContentH1>Unreimbursed Disabled/Handicapped/Elderly Assistance</ContentH1>
        <div>
          <div>Unreimbursed expenses to cover care attendants and auxiliary apparatus for any family member who is elderly or is a person with disabilities. Auxiliary apparatus are items such as wheelchairs, ramps, adaptations to vehicles, or special equipment to enable a blind person to read or type, but only if these items are directly related to permitting the disabled person or other family member to work.</div>
          <div>Examples of eligible disability assistance expenses:</div>
          <ul>
            <li>The payments made on a motorized wheelchair for the 42 year old son of the head of household enable the son to leave the house and go to work each day on his own. Prior to the purchase of the motorized wheelchair, the son was unable to make the commute to work. These payments are an eligible disability assistance expense.</li>
            <li>Payments to a care attendant to stay with a disabled 16-year-old child allow the child’s mother to go to work every day. These payments are an eligible disability assistance allowance.</li>
          </ul>
        </div>
      </HeadingWithDetail>

      <IntervalColumnHeadings type={ type } />

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `disabledAssistance` }>
        Disabled/Handicapped assistance
      </CashFlowInputsRow>

      <EarnedFrom
        hasExpenses = { current.disabledAssistance !== 0 }
        label       = { `If you didn't have that assistance, would it change how much pay you can bring home?` }
        propData    = {{
          client:        current,
          childPropName: `earnedBecauseOfAdultCare`,
          update:        updateClientValue,
        }}
        CashFlowRow = {
          <CashFlowInputsRow
            { ...sharedProps }
            generic = { `earnedBecauseOfAdultCare` }>
            How much less would you make?
          </CashFlowInputsRow>
        } />
    </div>
  );
};  // Ends <ElderlyOrDisabledAssistance>


const UnreimbursedMedical = function ({ type, sharedProps }) {
  return (
    <div>

      <HeadingWithDetail>
        <ContentH1>Unreimbursed Medical Expenses</ContentH1>
        <div>
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
        </div>
      </HeadingWithDetail>

      <IntervalColumnHeadings type={ type } />

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `disabledMedical` }>
        Disabled/Elderly medical expenses
      </CashFlowInputsRow>
      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `otherMedical` }>
        Medical expenses of other members
      </CashFlowInputsRow>
    </div>
  );
};  // Ends <UnreimbursedMedical>


/**
 * @function
 * @param {object} props
 * @param {object} props.current Client data of current user circumstances
 * @param {string} props.type 'expense' or 'income', etc., for classes
 * @param {string} props.time 'current' or 'future'
 * @param {function} props.updateClientValue Sets state values
 *
 * @returns React element
 */
const Housing = function ({ current, type, time, updateClientValue }) {

  /** @deprecated This is handled differently now */
  let ensureRouteAndValue = function (evnt, inputProps) {
    let obj = { ...inputProps, name: inputProps.name, value: inputProps.value, checked: null };
    updateClientValue(evnt, obj);
  };

  let sharedProps = {
    current:           current,
    type:              type,
    time:              time,
    updateClientValue: ensureRouteAndValue,
  };

  return (
    <div>
      <ContentH1>Housing</ContentH1>

      { (current.housing === `voucher`) ? (
        null
      ) : (
        <div>
          <Header as={ `h4` }>What is your housing situation?</Header>
          <HousingRadio
            currentValue = { current.housing }
            label        = { `Homeless` }
            time         = { time }
            updateClientValue = { ensureRouteAndValue } />
          <HousingRadio
            currentValue = { current.housing }
            label        = { `Renter` }
            time         = { time }
            updateClientValue = { ensureRouteAndValue } />
          <HousingRadio
            currentValue = { current.housing }
            label        = { `Homeowner` }
            time         = { time }
            updateClientValue = { ensureRouteAndValue } />
        </div>
      ) }

      <HousingDetails { ...sharedProps } />

    </div>
  );

};  // Ends <Housing>


const HousingRadio = function ({ currentValue, label, time, updateClientValue }) {

  const value = label.toLowerCase();

  return (
    <Form.Field>
      <Radio
        name     = { `housing` }
        label    = { label }
        value    = { value }
        checked  = { currentValue === value }
        onChange = { updateClientValue } />
    </Form.Field>
  );

};  // Ends <HousingRadio>


const HousingDetails = function ({ current, type, time, updateClientValue }) {

  let housing = current.housing,
      sharedProps = {
        timeState:         current,
        current:           current,
        type:              type,
        time:              time,
        updateClientValue: updateClientValue,
      };

  if (current.housing === `voucher`) {
    return (
      <div>
        <ContractRentField { ...sharedProps } />
        <RentShareField { ...sharedProps } />
        <Utilities { ...sharedProps } />
      </div>
    );

  } else if (housing === `homeless`) {
    return null;

  } else if (housing === `renter`) {
    return (
      <div>
        <br />
        <PlainRentRow { ...sharedProps } />
        <Utilities { ...sharedProps } />
      </div>
    );

  } else if (housing === `homeowner`) {
    return (
      <div>
        <IntervalColumnHeadings type={ type } />
        <CashFlowInputsRow
          { ...sharedProps }
          generic = { `mortgage` }> Mortgage
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic = { `housingInsurance` }> Insurance Costs
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic = { `propertyTax` }> Property Tax
        </CashFlowInputsRow>
        <Utilities { ...sharedProps } />
      </div>
    );

  }  // ends which kind of housing
};  // Ends <HousingDetails>


const Utilities = function ({ current, type, time, updateClientValue }) {

  let hasClimate     = current.climateControl,
      hasElectricity = current.nonHeatElectricity,
      hasPhone       = current.phone,
      hasFuelAssist  = current.fuelAssistance;

  let setChecked = function (evnt, inputProps) {
    const obj = { ...inputProps, value: inputProps.checked };
    updateClientValue(evnt, obj);
  };

  // For keyboard access (already does spacebar)
  let onKeyDown = function (evnt) {
    if (evnt.key === `Enter`) {
      evnt.target.click();
    }
  };

  // May want to change name to 'utilities' and value to what's 'name' now
  // Will require more work in the change handler
  return (
    <div>
      <Header as={ `h4` }>Which of these utilities do you pay for?</Header>

      <Checkbox
        name      = { `climateControl` }
        label     = { `Heating or cooling (e.g. A/C during summer)` }
        checked   = { hasClimate }
        onChange  = { setChecked }
        onKeyDown = { onKeyDown } />
      <br />
      <Checkbox
        name      = { `nonHeatElectricity` }
        label     = { `Electricity for non-heating purposes` }
        checked   = { hasElectricity }
        onChange  = { setChecked }
        onKeyDown = { onKeyDown } />
      <br />
      <Checkbox
        name      = { `phone` }
        label     = { `Telephone service` }
        checked   = { hasPhone }
        onChange  = { setChecked }
        onKeyDown = { onKeyDown } />
      <br />
      <br />
      <ControlledRadioYesNo
        labelText = { `Do you get Fuel Assistance?` }
        checked   = { hasFuelAssist }
        name      = { `fuelAssistance` }
        onChange  = { updateClientValue } />
    </div>

  );
};  // Ends <Utilities>


/** Renders a yes/no choice that will reveal the cash
 *     flow component given when the user selects 'yes'.
 *
 *     We added this extra step between the user and
 *     the input because people kept skipping that question.
 *
 * @param {object} props
 * @param {bool} props.hasExpenses True if client has any
 *     expenses here that could affect their income.
 * @param {object} props.CashFlowRow To be rendered if user
 *     chooses 'yes'.
 * @param {string | object} props.label To be rendered as
 *     the yes/no question.
 * @param {object} props.propData Data for the prop changed
 *     by the given cash flow component. (move component in
 *     here?)
 * @param {string} props.propData.childPropName Name of cash
 *     flow client prop to be updated.
 * @param {object} props.propData client Current or future
 *     client data.
 * @param {function} props.propData update Updates client
 *     values
 *
 * @returns Value that React can render
 */
const EarnedFrom = function ({ hasExpenses, CashFlowRow, label, propData }) {

  /** @todo Save amount temporarily when 'source'
   *      amount is set to 0. */
  const reset = function (evnt) {
    const { childPropName, update } = propData;

    update(evnt, {
      name:  childPropName,
      value: 0,
    });
  };

  if (hasExpenses) {

    const {
      childPropName,
      client,
    } = propData;
    const showProps = {
      childName:           childPropName,
      showChildrenAtStart: client[ childPropName ] > 0,
      question:            label,
      heading:             null,
      onNo:                reset,
      // `<Surrounder>` props
      Left:                <AttentionArrow />,
    };

    return (
      <div className={ `earned-from` }>
        <ShowOnYes { ...showProps }>
          { CashFlowRow }
        </ShowOnYes>
      </div>
    );

  } else {
    return null;
  }  // ends if client has expenses

};  // Ends <EarnedFrom>


export {
  CurrentExpensesStep,
  ExpensesFormContent,
  Under13,
  ChildSupport,
  DependentsOver12,
  ElderlyOrDisabledAssistance,
  UnreimbursedMedical,
  Housing,
  HousingRadio,
  HousingDetails,
  Utilities,
  EarnedFrom,
};
