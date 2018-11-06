import { CurrentIncomeStep } from '../containers/forms/CurrentIncome';
import { CurrentExpensesStep } from '../containers/forms/CurrentExpenses';
import { PredictionsStep } from '../containers/forms/Predictions';
import { HouseholdStep } from '../containers/forms/Household';
import { CurrentBenefitsStep } from '../containers/forms/CurrentBenefits';

export const STEP_VALS = [
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
]; // end STEP_VALS
