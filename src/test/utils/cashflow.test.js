// To test
/** @todo Add  tests for getSimpleGrossIncomeMonthly, sumProps and add to utils/cashflow import statement below */
import { getGrossUnearnedIncomeMonthly }  from '../../utils/cashflow';

// Object of sample clients to use in these tests.
import { sampleClients } from '../sampleClients';

// getDependentCostsMonthly tests

// getSimpleGrossIncomeMonthly tests

// getGrossUnearnedIncomeMonthly tests
test('Sample client row 3 unearned income to be 997', () => {
  expect(getGrossUnearnedIncomeMonthly(sampleClients.row3.current)).toBe(997);
});

// sumProps tests
