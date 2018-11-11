import { CurrentIncomeStep } from '../containers/forms/CurrentIncome';
import { CurrentExpensesStep } from '../containers/forms/CurrentExpenses';
import { PredictionsStep } from '../containers/forms/Predictions';
import { HouseholdStep } from '../containers/forms/Household';
import { CurrentBenefitsStep } from '../containers/forms/CurrentBenefits';

export const STEP_VALS = [
  {
    component: CurrentBenefitsStep,
    key:       'currentBenefits',
    time:      'current',
  },
  {
    component: HouseholdStep,
    key:       'household',
    time:      'current',
  },
  {
    component: CurrentIncomeStep,
    key:       'currentIncome',
    time:      'current',
  },
  {
    component: CurrentExpensesStep,
    key:       'currentExpenses',
    time:      'current',
  },
  {
    component: PredictionsStep,
    key:       'predictions',
    time:      'future',
  },
]; // end STEP_VALS
