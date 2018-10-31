import { CurrentIncomeStep } from './forms/CurrentIncome';
import { CurrentExpensesStep } from './forms/CurrentExpenses';
import { PredictionsStep } from './forms/Predictions';
import { HouseholdStep } from './forms/Household';
import { CurrentBenefitsStep } from './forms/CurrentBenefits';

export const STEPS = [
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
  }, //,
  //  { title: 'Graphs', form: ResultsGraph }
]; // end STEPS
