// REACT COMPONENTS
import React from 'react';

// PROJECT COMPONENTS
import {
  CashFlowInputsRow,
  CashFlowDisplayRow,
} from './cashflow';
import { IntervalColumnHeadings } from '../components/headings';

// // LOGIC
import {
  getMedicalExpenses,
  getNonTransportCareCosts,
  getTransportDependentCosts,
  getHousingCosts,
} from '../utils/cashflow';


/* From https://drive.google.com/drive/folders/0B61uzoaPZg7qUXJuRFhndTFkaTA
 *    (the bugdet assessment from the last page)
 *    which is Project Hope's own assessment worksheet.
 *    It's a weird name, but I want the file to sit
 *    next to other expenses stuff we're breaking out
 *    in the future. The alternative is to make a folder.
 */
const ExpensesOther = function ({ timeState, type, time, updateClientValue }) {

  var sharedProps = {
    timeState:         timeState,
    current:           timeState,
    type:              `expense`,
    time:              time,
    updateClientValue: updateClientValue,
  };

  var housing            = timeState.housing,
      housingCosts       = getHousingCosts(timeState),
      dependentCare      = getNonTransportCareCosts(timeState),
      dependentTransport = getTransportDependentCosts(timeState),
      medExpenses        = getMedicalExpenses(timeState);

  return (
    <div>
      <IntervalColumnHeadings type={ `Expenses` } />

      {/* Is this complexity really required? Can we just
      * have children and include a warning in the docs? */}
      { housingCosts > 0 ? (
        <CashFlowDisplayRow
          timeState = { timeState }
          value     = { housingCosts }
          generic   = { `housingCosts` }> Payments for housing
        </CashFlowDisplayRow>
      ) : (
        null
      ) }

      { dependentCare > 0 ? (
        <CashFlowDisplayRow
          timeState = { timeState }
          value     = { dependentCare }
          generic   = { `dependentCare` }> Dependent care (other than transportation)
        </CashFlowDisplayRow>
      ) : (
        null
      ) }

      { dependentTransport > 0 ? (
        <CashFlowDisplayRow
          timeState = { timeState }
          value     = { dependentTransport }
          generic   = { `dependentTransport` }> Transportation for dependents
        </CashFlowDisplayRow>
      ) : (
        null
      ) }

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `otherExpensesTransport` }>
        { dependentTransport > 0 ? (
          `Money you spend on other transportation`
        ) : (
          `Money you spend on transportation`
        ) }
      </CashFlowInputsRow>

      { medExpenses > 0 ? (
        <CashFlowDisplayRow
          timeState = { timeState }
          value     = { medExpenses }
          generic   = { `medicalTotal` }> Medical expenses you wrote in earlier
        </CashFlowDisplayRow>
      ) : (
        null
      ) }

      <CashFlowInputsRow
        { ...sharedProps }
        generic = { `otherExpensesMedical` }>
        { medExpenses > 0 ? (
          `Money you spend because of other medical problems`
        ) : (
          `Money you spend because of medical problems`
        ) }
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

      { housing !== `homeless` ? (
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesCable` }> Cable/internet costs
        </CashFlowInputsRow>
      ) : (
        null
      )
      }

      { housing !== `homeless` ? (
        <CashFlowInputsRow
          { ...sharedProps }
          generic={ `otherExpensesUtilities` }> Other utility costs
        </CashFlowInputsRow>
      ) : (
        null
      )
      }

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
  );
};


export { ExpensesOther };
