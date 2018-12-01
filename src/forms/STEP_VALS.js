import { CurrentIncomeStep } from './CurrentIncome';
import { CurrentExpensesStep } from './CurrentExpenses';
import { PredictionsStep } from './Predictions';
import { HouseholdStep } from './Household';
import { CurrentBenefitsStep } from './CurrentBenefits';

export const STEP_VALS = [
  {
    component: CurrentBenefitsStep,
    key:       `currentBenefits`,
    time:      `current`,
  },
  {
    component: HouseholdStep,
    key:       `household`,
    time:      `current`,
  },
  {
    component: CurrentIncomeStep,
    key:       `currentIncome`,
    time:      `current`,
  },
  {
    component: CurrentExpensesStep,
    key:       `currentExpenses`,
    time:      `current`,
  },
  {
    component: PredictionsStep,
    key:       `predictions`,
    time:      `future`,
  },
]; // ends STEP_VALS
