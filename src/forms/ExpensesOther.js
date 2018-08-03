// REACT COMPONENTS
import React from 'react';
// import {
//   // Form,
//   // Radio,
//   // Checkbox,
//   Header,
// } from 'semantic-ui-react';

// PROJECT COMPONENTS
// import {
//   FormPartsContainer,
//   AttentionArrow,
// } from './formHelpers';
import {
  CashFlowInputsRow,
  CashFlowDisplayRow,
} from './cashflow';
// import { ControlledRadioYesNo } from './inputs';
import {
  ContentH1,
  IntervalColumnHeadings,
} from '../components/headings';
// import {
//   ContractRentField,
//   RentShareField,
//   PlainRentRow,
// } from './rentFields';
// import CashFlowRowAfterConfirm from './CashFlowRowAfterConfirm';

// // LOGIC
// import {
//   getEveryMember,
//   isHeadOrSpouse,
//   getDependentMembers,
//   isDisabled,
//   isUnder13,
// } from '../utils/getMembers';
import {
  // getUnder13Expenses,
  // getOver12Expenses,
  getMedicalExpenses,
  getNonTransportCareCosts,
  getTransportDependentCosts,
  // sumProps,
} from '../utils/cashflow';


// export {
//   getDependentCostsMonthly,
//   getUnder13Expenses,
//   sumProps
// };



// // DATA
// import {
//   // UNEARNED_INCOME_SOURCES,
//   // UNDER13_CARE_EXPENSES,
//   OVER12_CARE_EXPENSES,
// } from '../data/massachusetts/name-cores';


/**
 * `children` will be a function
 */
const RenderIfTrue = function ({ shouldRender, children }) {
  var ToRender = children;
  if (shouldRender) {
    return <ToRender />;
  } else {
    return null;
  }
};  // End <RenderIfTrue>


/* @note From https://drive.google.com/drive/folders/0B61uzoaPZg7qUXJuRFhndTFkaTA
 *    (the bugdet assessment from the last page)
 *    which is Project Hope's own assessment worksheet
 * @note It's a weird name, but I want the file to sit
 *    next to other expenses stuff we're breaking out
 *    in the future. The alternative is to make a folder.
 */
const ExpensesOther = function ({ timeState, type, time, updateClientValue }) {

  // xFood Expenses covered by SNAP/Food Stamps – $
  // xAdditional Food Expenses not covered by
  // SNAP/Food Stamps – $
  // xRent/Mortgage – $
  // xChildcare – $
  // xTransportation
  // xMedical Expenses – $  // if already entered
  // Total Expenses – $

  // xCash food expenses
  // xUtilities – $
  // xCable/Internet – $
  // xOther Transportation... – $ (show child and adult transportation separate from other care expenses?)
  // xMedical Expenses – $  // if not already entered
  // xPersonal Care and Household Goods – $
  // xClothing – $
  // xPhone – $
  // xEntertainment – $
  // Other Expenses: _______________ – $


  var sharedProps = {
    timeState:         timeState,
    current:           timeState,
    type:              `expense`,
    time:              time,
    updateClientValue: updateClientValue,
  };

  var housing        = timeState.housing,
      // childCareCosts = getUnder13Expenses(timeState),
      // otherCareCosts = getOver12Expenses(timeState),
      dependentCare      = getNonTransportCareCosts(timeState),
      dependentTransport = getTransportDependentCosts(timeState),
      medExpenses        = getMedicalExpenses(timeState);
  // var {
  //       climateControl,
  //       nonHeatElectricity,
  //       phone,
  //       fuelAssistance,
  //     } = timeState;

  return (
    <div>
      <ContentH1>Other Expenses</ContentH1>
      <div>
        <IntervalColumnHeadings type={ `Expenses` } />

        {/* Is this complexity really required? Can we just
        * have children and include a warning in the docs? */}
        <RenderIfTrue shouldRender = { housing === `voucher` }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              generic   = { `rentShare` }> Rent payment
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <RenderIfTrue shouldRender = { housing === `renter` }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              generic   = { `rent` }> Rent
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <RenderIfTrue shouldRender = { housing === `homeowner` }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              generic   = { `mortgage` }> Mortgage
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <RenderIfTrue shouldRender = { dependentCare > 0 }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              value     = { dependentCare }
              generic   = { `dependentCare` }> Dependent care (other than transportation)
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <RenderIfTrue shouldRender = { dependentTransport > 0 }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              value     = { dependentTransport }
              generic   = { `dependentTransport` }> Transportation for dependents
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <CashFlowInputsRow
          { ...sharedProps }
          generic = { `otherExpensesTransport` }>
          {
            dependentTransport > 0 ?
              `Money you spend on other transportation`
              : `Money you spend on transportation`
          }
        </CashFlowInputsRow>

        <RenderIfTrue shouldRender = { medExpenses > 0 }>
          {() => { return (
            <CashFlowDisplayRow
              timeState = { timeState }
              value     = { medExpenses }
              generic   = { `medicalTotal` }> Medical expenses you wrote in earlier
            </CashFlowDisplayRow>
          );}}
        </RenderIfTrue>

        <CashFlowInputsRow
          { ...sharedProps }
          generic = { `otherExpensesMedical` }>
          {
            medExpenses > 0 ?
              `Money you spend because of other medical problems`
              : `Money you spend because of medical problems`
          }
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesFood` }> Money you spend on food 
        </CashFlowInputsRow>
        {/* Utilities are complicated because the housing
        * voucher could be taking them into account and
        * there isn't a way to know the amount that is
        * specifically for that. The client is still
        * spending that cash, though, so if we're looking
        * at out of pocket expenses, it's still relevant. */}
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesPhone` }> Any phone costs
        </CashFlowInputsRow>

        <RenderIfTrue shouldRender = { housing !== `homeless` }>
          {() => { return (
            <CashFlowInputsRow
              { ...sharedProps }
              generic={ `otherExpensesCable` }> Cable/internet costs
            </CashFlowInputsRow>
          );}}
        </RenderIfTrue>

        <RenderIfTrue shouldRender = { housing !== `homeless` }>
          {() => { return (
            <CashFlowInputsRow
              { ...sharedProps }
              generic={ `otherExpensesUtilities` }> Other utility costs
            </CashFlowInputsRow>
          );}}
        </RenderIfTrue>

        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesEntertainment` }> Other entertainment costs
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesCareProducts` }> Personal care and household goods costs
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesClothes` }> Money you spend on clothing
        </CashFlowInputsRow>
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesOther` }> Any other money you spend
        </CashFlowInputsRow>

      </div>
    </div>

  );
};


export {
  ExpensesOther,
  RenderIfTrue,
};
