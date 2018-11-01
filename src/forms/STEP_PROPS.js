import { CurrentIncomeStep } from './CurrentIncome';
import { CurrentExpensesStep } from './CurrentExpenses';
import { PredictionsStep } from './Predictions';
import { HouseholdStep } from './Household';
import { CurrentBenefitsStep } from './CurrentBenefits';

export const STEP_PROPS = [
  {
    form: CurrentBenefitsStep,
    key:  'currentBenefits',
    time: 'current',
  },
  {
    form: HouseholdStep,
    key:  'household',
    time: 'current',
  },
  {
    form: CurrentIncomeStep,
    key:  'currentIncome',
    time: 'current',
  },
  {
    form: CurrentExpensesStep,
    key:  'currentExpenses',
    time: 'current',
  },
  {
    form: PredictionsStep,
    key:  'predictions',
    time: 'future',
  },
]; // end STEP_PROPS
